// --- TAMAGOTCHI VIRTUAL PET ENGINE ---
const PET_REALMS = {
  anime: {
    name: "Anime Legends",
    stages: [
      { minLvl: 1, name: "Chibi Mystery Egg", avatar: "🥚" },
      { minLvl: 4, name: "Baby Thunder Spark (Pikachu)", avatar: "⚡" },
      { minLvl: 8, name: "Demon Slayer Swordsman (Tanjiro)", avatar: "⚔️" },
      { minLvl: 12, name: "Nine-Tails Fox (Kurama)", avatar: "🦊" },
      { minLvl: 20, name: "Super Saiyan Dragon", avatar: "🐲" }
    ]
  },
  dino: {
    name: "Dinosaur Titans",
    stages: [
      { minLvl: 1, name: "Prehistoric Fossil Egg", avatar: "🥚" },
      { minLvl: 4, name: "Swift Raptor", avatar: "🦖" },
      { minLvl: 8, name: "Armored Triceratops", avatar: "🦏" },
      { minLvl: 12, name: "Apex T-Rex King", avatar: "🦕" },
      { minLvl: 20, name: "Mecha-Godzilla Titan", avatar: "🤖" }
    ]
  },
  movie: {
    name: "Movie & Heroes",
    stages: [
      { minLvl: 1, name: "Heroic Cosmic Pod", avatar: "🥚" },
      { minLvl: 4, name: "Kung Fu Panda", avatar: "🐼" },
      { minLvl: 8, name: "Hogwarts Sorcerer", avatar: "🧙‍♂️" },
      { minLvl: 12, name: "Gotham Knight", avatar: "🦇" },
      { minLvl: 20, name: "Galaxy Avenger", avatar: "🦸" }
    ]
  },
  mythic: {
    name: "Mythical Beasts",
    stages: [
      { minLvl: 1, name: "Enchanted Starlight Egg", avatar: "🥚" },
      { minLvl: 4, name: "Celestial Unicorn", avatar: "🦄" },
      { minLvl: 8, name: "Royal Storm Griffin", avatar: "🦅" },
      { minLvl: 12, name: "Immortal Phoenix", avatar: "🦚" },
      { minLvl: 20, name: "Sovereign Jade Dragon", avatar: "🐉" }
    ]
  }
};

const PET_ACCESSORIES = [
  { id: "ds_haori", name: "Tanjiro Haori", icon: "👘", price: 250, desc: "Demon Slayer robe" },
  { id: "ds_sword", name: "Nichirin Blade", icon: "⚔️", price: 300, desc: "Water breathing sword" },
  { id: "nezuko_bamboo", name: "Nezuko Bamboo", icon: "🎋", price: 200, desc: "Protective charm" },
  { id: "luffy_hat", name: "Luffy Straw Hat", icon: "👒", price: 250, desc: "Pirate king hat" },
  { id: "ninja_band", name: "Ninja Headband", icon: "🥷", price: 200, desc: "Leaf village metal band" },
  { id: "gold_crown", name: "Imperial Crown", icon: "👑", price: 400, desc: "For top HB sellers" },
  { id: "hero_cape", name: "Dark Knight Cape", icon: "🦇", price: 300, desc: "Vigilante cape" },
  { id: "wizard_wand", name: "Magic Wand", icon: "🪄", price: 250, desc: "Pure wizardry power" }
];

var currentPet = (typeof currentPet !== "undefined" && currentPet) ? currentPet : null;

function getPetStorageKey() {
  const name = (typeof currentUser !== "undefined" && currentUser) ? currentUser.name : "guest";
  return "ks_pet_" + name.replace(/[^a-zA-Z0-9]/g, "_");
}

function loadPetData() {
  try {
    const key = getPetStorageKey();
    const saved = localStorage.getItem(key);
    const now = Date.now();

    if (saved) {
      try { currentPet = JSON.parse(saved); } catch(e) { currentPet = null; }
    }

    if (!currentPet) {
      currentPet = {
        name: ((typeof currentUser !== "undefined" && currentUser) ? currentUser.name.split(" ")[0] : "My") + "'s Buddy",
        realm: "anime",
        level: 1,
        exp: 0,
        hunger: 80,
        happiness: 80,
        cleanliness: 100,
        hasPoop: false,
        isSleeping: false,
        spentCoins: 0,
        ownedAccessories: [],
        equippedAccessory: null,
        lastUpdated: now,
        lastFeastDate: ""
      };
    }

    const elapsedHours = (now - (currentPet.lastUpdated || now)) / (1000 * 60 * 60);
    if (elapsedHours > 0.5) {
      const decaySteps = Math.floor(elapsedHours / 2);
      if (decaySteps > 0) {
        currentPet.hunger = Math.max(10, currentPet.hunger - decaySteps * 12);
        currentPet.happiness = Math.max(10, currentPet.happiness - decaySteps * 10);
        if (decaySteps >= 2) currentPet.hasPoop = true;
        currentPet.lastUpdated = now;
      }
    }
    savePetData();
    refreshPetUI();
  } catch (err) {
    console.warn("loadPetData shielded:", err);
  }
}

function savePetData() {
  if (!currentPet) return;
  try { localStorage.setItem(getPetStorageKey(), JSON.stringify(currentPet)); } catch(e) {}
}

function getPetStageData(realmId, level) {
  const rKey = (realmId && PET_REALMS[realmId]) ? realmId : 'anime';
  const realm = PET_REALMS[rKey];
  let stage = realm.stages[0];
  for (let s of realm.stages) {
    if (level >= s.minLvl) stage = s;
  }
  return stage;
}

function addPetExp(pts) {
  if (!currentPet) return;
  currentPet.exp += pts;
  const reqExp = currentPet.level * 50;
  if (currentPet.exp >= reqExp) {
    currentPet.level++;
    currentPet.exp -= reqExp;
    const newStage = getPetStageData(currentPet.realm || 'anime', currentPet.level);
    showPetSpeech(`🎉 EVOLUTION! Now Level ${currentPet.level}: ${newStage.name}!`);
  }
  savePetData();
  refreshPetUI();
}

function refreshPetUI() {
  if (!currentPet) return;
  if (typeof refreshAllCoinDisplays === 'function') refreshAllCoinDisplays();

  const stage = getPetStageData(currentPet.realm || 'anime', currentPet.level);

  setSafeText('petNameTitle', currentPet.name);
  setSafeText('petStageBadge', stage.name);
  setSafeText('petLevelText', `Level ${currentPet.level}`);

  const reqExp = currentPet.level * 50;
  setSafeText('petExpText', `EXP: ${currentPet.exp} / ${reqExp}`);
  const expBar = document.getElementById('petExpBar');
  if (expBar) expBar.style.width = Math.min(100, (currentPet.exp / reqExp) * 100) + "%";

  const avatarEl = document.getElementById('petAvatar');
  const sleepBtn = document.getElementById('btnSleep');
  if (avatarEl) {
    avatarEl.innerText = currentPet.isSleeping ? "💤" : stage.avatar;
  }
  if (sleepBtn) {
    sleepBtn.innerHTML = currentPet.isSleeping ? "☀️<br>Wake Up<br><span style='font-size:0.6rem; color:#888;'>Active</span>" : "💤<br>Sleep / Rest<br><span style='font-size:0.6rem; color:#888;'>Energy</span>";
  }

  const accBadge = document.getElementById('petEquippedAccessory');
  if (accBadge) {
    if (currentPet.equippedAccessory) {
      const itemObj = PET_ACCESSORIES.find(i => i.id === currentPet.equippedAccessory);
      accBadge.innerText = itemObj ? itemObj.icon : "";
      accBadge.style.display = "block";
    } else {
      accBadge.style.display = "none";
    }
  }

  const poopEl = document.getElementById('poopElement');
  if (poopEl) poopEl.style.display = currentPet.hasPoop ? "block" : "none";

  const mH = document.getElementById('meterHunger'); if (mH) mH.style.width = currentPet.hunger + "%";
  setSafeText('textHunger', Math.round(currentPet.hunger) + "%");
  const mHa = document.getElementById('meterHappy'); if (mHa) mHa.style.width = currentPet.happiness + "%";
  setSafeText('textHappy', Math.round(currentPet.happiness) + "%");
  const mC = document.getElementById('meterClean'); if (mC) mC.style.width = (currentPet.hasPoop ? 30 : 100) + "%";
  setSafeText('textClean', currentPet.hasPoop ? "30%" : "100%");

  checkDailyTargetFeast();
}

function showPetSpeech(msg) {
  const el = document.getElementById('petSpeechBubble');
  if (!el) return;
  el.innerText = msg;
  el.style.transform = "scale(1.1)";
  setTimeout(() => el.style.transform = "scale(1)", 200);
}

function sleepPet() {
  if (!currentPet) return;
  currentPet.isSleeping = !currentPet.isSleeping;
  showPetSpeech(currentPet.isSleeping ? "Good night! Sweet dreams... 💤" : "Good morning! Ready for a great day! ☀️");
  savePetData();
  refreshPetUI();
}

function checkDailyTargetFeast() {
  if (!currentPet || (typeof currentUser === 'undefined' || !currentUser) || !liveSheetData || !liveSheetData.teammates) return;
  const todayDate = (liveSheetData.dailySummary && liveSheetData.dailySummary.date) || "Today";
  const s = liveSheetData.teammates[currentUser.name];
  const btn = document.getElementById('btnClaimFeast');
  if (!s || !btn) return;

  const hitAny = (s.dailyTs >= s.dailyTsTarget) || (s.dailyHb >= s.dailyHbTarget) || (s.dailyHm >= s.dailyHmTarget);

  if (currentPet.lastFeastDate === todayDate) {
    btn.innerText = "Claimed ✅"; btn.disabled = true; btn.style.background = "#757575";
  } else if (hitAny) {
    btn.innerText = "Claim 🎁"; btn.disabled = false; btn.style.background = "#2e7d32";
  } else {
    btn.innerText = "Locked 🔒"; btn.disabled = true; btn.style.background = "#9e9e9e";
  }
}

function claimTargetFeast() {
  if (!currentPet || !liveSheetData) return;
  const todayDate = (liveSheetData.dailySummary && liveSheetData.dailySummary.date) || "Today";
  currentPet.lastFeastDate = todayDate;
  currentPet.hunger = 100;
  currentPet.happiness = 100;
  showPetSpeech("🏆 Target Feast claimed! Fully energized! (+50 Bonus EXP) 🌟");
  addPetExp(50);
  refreshPetUI();
}

function triggerPetCare(actionType) {
  if (!currentPet) return;

  if (actionType === 'feed') {
    if (currentPet.hunger >= 100) {
      showPetSpeech("I'm completely full! Let's play instead! 🎾");
      return;
    }
    openQuizModal("Feed Pet Snack", () => {
      currentPet.hunger = Math.min(100, currentPet.hunger + 25);
      showPetSpeech("Yum! That vitamin snack was delicious! 🍎 (+15 EXP)");
      const av = document.getElementById('petAvatar');
      if (av) {
        av.className = "pet-avatar pet-eating";
        setTimeout(() => av.className = "pet-avatar pet-bounce", 1200);
      }
      addPetExp(15);
    });
  } else if (actionType === 'play') {
    if (currentPet.isSleeping) {
      showPetSpeech("Shh... I'm sleeping! Wake me up first! 💤");
      return;
    }
    openQuizModal("Play with Pet", () => {
      currentPet.happiness = Math.min(100, currentPet.happiness + 20);
      currentPet.hunger = Math.max(5, currentPet.hunger - 6);
      showPetSpeech("Yay! Playing catch is so much fun! ⭐ (+10 EXP)");
      addPetExp(10);
    });
  } else if (actionType === 'clean') {
    if (!currentPet.hasPoop) {
      showPetSpeech("The room is sparkling clean already! ✨");
      return;
    }
    openQuizModal("Clean Up Room", () => {
      currentPet.hasPoop = false;
      currentPet.cleanliness = 100;
      showPetSpeech("Thank you for cleaning! All fresh and tidy! 🧹 (+20 EXP)");
      addPetExp(20);
    });
  }
}

function openPetWardrobeModal() {
  const grid = document.getElementById('wardrobeShopGrid');
  if (!grid) return;
  grid.innerHTML = "";

  PET_ACCESSORIES.forEach(item => {
    const isOwned = currentPet && currentPet.ownedAccessories && currentPet.ownedAccessories.includes(item.id);
    const isEquipped = currentPet && currentPet.equippedAccessory === item.id;

    const card = document.createElement('div');
    card.className = "shop-item-card";
    card.innerHTML = `
      <div class="shop-item-icon">${item.icon}</div>
      <b>${item.name}</b>
      <div style="color:#666; font-size:0.65rem; margin:2px 0;">${item.desc}</div>
      <div style="font-weight:800; color:#f57f17; margin:4px 0;">🪙 ${item.price} Coins</div>
      <button class="btn" style="padding:6px; font-size:0.7rem; margin:0; background:${isEquipped ? '#c62828' : (isOwned ? '#00796b' : 'var(--primary-gradient)')}" onclick="handleWardrobeClick('${item.id}', ${item.price})">
        ${isEquipped ? 'Unequip ✕' : (isOwned ? 'Equip 👘' : 'Buy 🪙')}
      </button>
    `;
    grid.appendChild(card);
  });

  const modal = document.getElementById('wardrobeModal');
  if (modal) modal.style.display = "flex";
}

function handleWardrobeClick(itemId, price) {
  if (!currentPet) return;
  if (!currentPet.ownedAccessories) currentPet.ownedAccessories = [];
  const isOwned = currentPet.ownedAccessories.includes(itemId);

  if (isOwned) {
    currentPet.equippedAccessory = (currentPet.equippedAccessory === itemId) ? null : itemId;
    savePetData();
    refreshPetUI();
    openPetWardrobeModal();
  } else {
    if (deductHbCoins(price)) {
      currentPet.ownedAccessories.push(itemId);
      currentPet.equippedAccessory = itemId;
      savePetData();
      refreshPetUI();
      openPetWardrobeModal();
      alert("🎉 Purchased & Equipped!");
    } else {
      alert("❌ Not enough HB Coins! Sell more House Brand items to earn commission coins!");
    }
  }
}

function openRealmSelectModal() {
  const modal = document.getElementById('realmModal');
  if (modal) modal.style.display = "flex";
}

function setPetRealm(realmId) {
  if (!currentPet) return;
  currentPet.realm = realmId;
  savePetData();
  refreshPetUI();
  closeShopModals();
  showPetSpeech(`✨ Switched to ${PET_REALMS[realmId].name}! Ready to evolve!`);
}

function closeShopModals() {
  const m1 = document.getElementById('wardrobeModal'); if (m1) m1.style.display = "none";
  const m2 = document.getElementById('decorModal'); if (m2) m2.style.display = "none";
  const m3 = document.getElementById('realmModal'); if (m3) m3.style.display = "none";
}
