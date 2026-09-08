// --- KS HERBAL FARM ENGINE ---
const FARM_CROPS = {
  ginkgo: { name: "Ginkgo Herb", icon: "🌿", growTimeSec: 60, rewardGold: 25, rewardExp: 15 },
  ginger: { name: "Ginger Root", icon: "🫚", growTimeSec: 180, rewardGold: 55, rewardExp: 30 },
  bilberry: { name: "Bilberry Berry", icon: "🫐", growTimeSec: 300, rewardGold: 95, rewardExp: 50 },
  cordyceps: { name: "Golden Cordyceps", icon: "🌾", growTimeSec: 600, rewardGold: 180, rewardExp: 90 }
};

const FARM_DECORATIONS = [
  { id: "torii", name: "Japanese Torii", icon: "⛩️", price: 250, desc: "Sacred garden arch" },
  { id: "windmill", name: "Rustic Windmill", icon: "💨", price: 300, desc: "Countryside windmill" },
  { id: "mushrooms", name: "Fairy Mushrooms", icon: "🍄", price: 200, desc: "Glowing garden lights" },
  { id: "fountain", name: "Marble Fountain", icon: "⛲", price: 350, desc: "Hydrates crops" },
  { id: "tractor", name: "Harvest Tractor", icon: "🚜", price: 400, desc: "Pharmacy farm lifter" },
  { id: "sunflowers", name: "Sunflower Fence", icon: "🌻", price: 200, desc: "Bright and cheerful" }
];

var selectedCropSeed = "ginkgo";
var currentFarm = (typeof currentFarm !== "undefined" && currentFarm) ? currentFarm : null;
var farmTimerInterval = null;

function getFarmStorageKey() {
  const name = (typeof currentUser !== "undefined" && currentUser) ? currentUser.name : "guest";
  return "ks_farm_" + name.replace(/[^a-zA-Z0-9]/g, "_");
}

function loadFarmData() {
  try {
    const key = getFarmStorageKey();
    const saved = localStorage.getItem(key);

    if (saved) {
      try { currentFarm = JSON.parse(saved); } catch(e) { currentFarm = null; }
    }

    if (!currentFarm) {
      currentFarm = {
        bonusCoins: 0,
        level: 1,
        exp: 0,
        harvestCount: 0,
        ownedDecor: [],
        plots: [
          { cropId: null, plantedAt: 0 },
          { cropId: null, plantedAt: 0 },
          { cropId: null, plantedAt: 0 },
          { cropId: null, plantedAt: 0 }
        ]
      };
    }
    saveFarmData();
    refreshFarmUI();

    if (farmTimerInterval) clearInterval(farmTimerInterval);
    farmTimerInterval = setInterval(refreshFarmUI, 3000);
  } catch (err) {
    console.warn("loadFarmData shielded:", err);
  }
}

function saveFarmData() {
  if (!currentFarm) return;
  try { localStorage.setItem(getFarmStorageKey(), JSON.stringify(currentFarm)); } catch(e) {}
}

function selectCropSeed(seedId) {
  selectedCropSeed = seedId;
  document.querySelectorAll('.seed-btn').forEach(b => b.classList.remove('active'));
  const activeEl = document.getElementById('seed_' + seedId);
  if (activeEl) activeEl.classList.add('active');
}

function handlePlotClick(plotIdx) {
  if (!currentFarm) return;
  const plot = currentFarm.plots[plotIdx];
  const now = Date.now();

  if (!plot.cropId) {
    plot.cropId = selectedCropSeed;
    plot.plantedAt = now;
    saveFarmData();
    refreshFarmUI();
  } else {
    const def = FARM_CROPS[plot.cropId];
    const elapsed = (now - plot.plantedAt) / 1000;
    
    if (elapsed >= def.growTimeSec) {
      openQuizModal(`Harvest ${def.name}`, () => {
        currentFarm.bonusCoins = (currentFarm.bonusCoins || 0) + def.rewardGold;
        currentFarm.exp += def.rewardExp;
        currentFarm.harvestCount++;
        plot.cropId = null;
        plot.plantedAt = 0;

        if (typeof currentPet !== 'undefined' && currentPet) {
          currentPet.hunger = Math.min(100, currentPet.hunger + 15);
          if (typeof savePetData === 'function') savePetData();
        }

        saveFarmData();
        refreshFarmUI();
        if (typeof refreshAllCoinDisplays === 'function') refreshAllCoinDisplays();
      });
    } else {
      alert(`🌱 Still growing! Ready in ${Math.round(def.growTimeSec - elapsed)} seconds.`);
    }
  }
}

function refreshFarmUI() {
  if (!currentFarm) return;
  if (typeof refreshAllCoinDisplays === 'function') refreshAllCoinDisplays();
  setSafeText('farmHarvestCount', currentFarm.harvestCount);

  const terrace = document.getElementById('farmDecorTerrace');
  if (terrace) {
    terrace.innerHTML = "";
    if (currentFarm.ownedDecor && currentFarm.ownedDecor.length > 0) {
      currentFarm.ownedDecor.forEach(dId => {
        const dObj = FARM_DECORATIONS.find(item => item.id === dId);
        if (dObj) {
          const span = document.createElement('span');
          span.className = "decor-badge";
          span.innerText = dObj.icon;
          span.title = dObj.name;
          terrace.appendChild(span);
        }
      });
    } else {
      terrace.innerHTML = "<span style='font-size:0.68rem; color:#888;'>No decorations yet. Tap 'Decor Shop' above!</span>";
    }
  }

  const now = Date.now();
  currentFarm.plots.forEach((p, idx) => {
    const card = document.getElementById('plot_' + idx);
    const icon = document.getElementById('plotIcon_' + idx);
    const name = document.getElementById('plotName_' + idx);
    const time = document.getElementById('plotTime_' + idx);
    if (!card) return;

    if (!p.cropId) {
      card.className = "plot-card";
      if (icon) icon.innerText = "🕳️";
      if (name) name.innerText = "Empty Plot";
      if (time) time.innerText = "Tap to Plant";
    } else {
      const def = FARM_CROPS[p.cropId];
      const elapsed = (now - p.plantedAt) / 1000;

      if (elapsed >= def.growTimeSec) {
        card.className = "plot-card ready";
        if (icon) icon.innerText = def.icon;
        if (name) name.innerText = def.name;
        if (time) time.innerHTML = "<b style='color:#2e7d32;'>Ready! Tap to Quiz & Harvest</b>";
      } else {
        card.className = "plot-card growing";
        if (icon) icon.innerText = "🌱";
        if (name) name.innerText = def.name;
        const left = Math.round(def.growTimeSec - elapsed);
        if (time) time.innerText = `Growing: ${left}s left`;
      }
    }
  });
}

function openFarmDecorModal() {
  const grid = document.getElementById('decorShopGrid');
  if (!grid) return;
  grid.innerHTML = "";

  FARM_DECORATIONS.forEach(item => {
    const isOwned = currentFarm && currentFarm.ownedDecor && currentFarm.ownedDecor.includes(item.id);

    const card = document.createElement('div');
    card.className = "shop-item-card";
    card.innerHTML = `
      <div class="shop-item-icon">${item.icon}</div>
      <b>${item.name}</b>
      <div style="color:#666; font-size:0.65rem; margin:2px 0;">${item.desc}</div>
      <div style="font-weight:800; color:#f57f17; margin:4px 0;">🪙 ${item.price} Coins</div>
      <button class="btn" style="padding:6px; font-size:0.7rem; margin:0; background:${isOwned ? '#757575' : '#2e7d32'}" onclick="handleDecorBuy('${item.id}', ${item.price})" ${isOwned ? 'disabled' : ''}>
        ${isOwned ? 'Installed ✅' : 'Buy 🪙'}
      </button>
    `;
    grid.appendChild(card);
  });

  const modal = document.getElementById('decorModal');
  if (modal) modal.style.display = "flex";
}

function handleDecorBuy(itemId, price) {
  if (!currentFarm) return;
  if (!currentFarm.ownedDecor) currentFarm.ownedDecor = [];
  if (deductHbCoins(price)) {
    currentFarm.ownedDecor.push(itemId);
    saveFarmData();
    refreshFarmUI();
    openFarmDecorModal();
    alert("🎉 Farm decoration installed!");
  } else {
    alert("❌ Not enough HB Coins! Push House Brand items to earn more coins!");
  }
}
