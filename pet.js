// --- KS LIVING BUDDY & AUTONOMOUS ROAMING ENGINE ---

// Master Creature Roster (Anime, Pokemon, Dinosaurs, Animals, Mythic)
const CREATURE_ROSTER = [
  // 1. Anime Champions
  {
    id: "tanjiro",
    category: "Demon Slayer Anime",
    species: "Demon Slayer Tanjiro",
    stages: [
      { minLvl: 4, name: "Tanjiro (Apprentice Swordsman)", sprite: "🦓", subIcon: "🌊", badge: "Water Breathing" },
      { minLvl: 8, name: "Tanjiro (Hinokami Sun Halo)", sprite: "🐎", subIcon: "☀️", badge: "Sun Breathing" },
      { minLvl: 14, name: "Demon Slayer Pillar Legend", sprite: "🏇", subIcon: "⚡", badge: "Hashira Rank" }
    ],
    actionDialogue: "Water Breathing: First Form - Water Surface Slash! 🌊⚔️",
    actionClass: "act-slash"
  },
  {
    id: "nezuko",
    category: "Demon Slayer Anime",
    species: "Nezuko Kamado",
    stages: [
      { minLvl: 4, name: "Chibi Nezuko (Bamboo Muzzle)", sprite: "🐶", subIcon: "🌸", badge: "Demon Girl" },
      { minLvl: 8, name: "Awakened Nezuko (Horn Form)", sprite: "🐩", subIcon: "🔥", badge: "Blood Burst" },
      { minLvl: 14, name: "Sun-Immune Sovereign Nezuko", sprite: "🦮", subIcon: "✨", badge: "Sun Conqueror" }
    ],
    actionDialogue: "Mmm-hmm! Blood Demon Art - Pyrokinesis! 🌸🔥",
    actionClass: "act-fire"
  },
  {
    id: "luffy",
    category: "One Piece Anime",
    species: "Monkey D. Luffy",
    stages: [
      { minLvl: 4, name: "Straw Hat Luffy", sprite: "🐛", subIcon: "🍖", badge: "Rookie Pirate" },
      { minLvl: 8, name: "Gear 2nd Steam Luffy", sprite: "🦋", subIcon: "👊", badge: "Gear Second" },
      { minLvl: 14, name: "Sun God Nika (Gear 5th)", sprite: "🦅", subIcon: "🥁", badge: "Warrior of Liberation" }
    ],
    actionDialogue: "Gomu Gomu no Pistol! 👊💥 I'm gonna be King of the Pirates!",
    actionClass: "act-punch"
  },
  // 2. Electric Pokemon
  {
    id: "pikachu",
    category: "Pokemon",
    species: "Pikachu (Electric Rodent)",
    stages: [
      { minLvl: 4, name: "Baby Pichu Spark", sprite: "⚡🐭", subIcon: "🔋", badge: "Electric Spark" },
      { minLvl: 8, name: "Volt Tackle Pikachu", sprite: "⚡⚡", subIcon: "✨", badge: "Thunderbolt" },
      { minLvl: 14, name: "Gigantamax Raichu Titan", sprite: "🌩️⚡", subIcon: "👑", badge: "Lightning God" }
    ],
    actionDialogue: "Pika-Pika... PIKACHUUU! ⚡⚡ (100,000 Volt Thunderbolt Discharge!)",
    actionClass: "act-shock"
  },
  // 3. Prehistoric Dinosaurs
  {
    id: "trex",
    category: "Prehistoric Dinosaur",
    species: "Tyrannosaurus Rex",
    stages: [
      { minLvl: 4, name: "Juvenile Raptor Rex", sprite: "🦖", subIcon: "🦴", badge: "Carnivore" },
      { minLvl: 8, name: "Apex Hunter T-Rex", sprite: "🦖💥", subIcon: "🌋", badge: "King of Dinosaurs" },
      { minLvl: 14, name: "Mecha Cyber-Godzilla T-Rex", sprite: "🤖🦖", subIcon: "⚡", badge: "Apex Titan" }
    ],
    actionDialogue: "ROOOAAAR! 🦖💥 Heavy Earth Tremor & Crushing Jaw!",
    actionClass: "act-roar"
  },
  {
    id: "raptor",
    category: "Prehistoric Dinosaur",
    species: "Velociraptor",
    stages: [
      { minLvl: 4, name: "Swift Forest Raptor", sprite: "🦕", subIcon: "🐾", badge: "Pack Hunter" },
      { minLvl: 8, name: "Alpha Feathered Raptor", sprite: "🦅🦕", subIcon: "💨", badge: "Supersonic Pounce" },
      { minLvl: 14, name: "Jurassic Shadow Stalker", sprite: "🌪️🦕", subIcon: "⚔️", badge: "Apex Predator" }
    ],
    actionDialogue: "SCREEECH! 🐾 Swift Sprint & High Pounce!",
    actionClass: "act-pounce"
  },
  {
    id: "triceratops",
    category: "Prehistoric Dinosaur",
    species: "Shield Triceratops",
    stages: [
      { minLvl: 4, name: "Baby Horned Calf", sprite: "🦏", subIcon: "🌿", badge: "Herbivore" },
      { minLvl: 8, name: "Iron-Crested Triceratops", sprite: "🛡️🦏", subIcon: "⛰️", badge: "Armored Shield" },
      { minLvl: 14, name: "Earthquake Titan Brontosaurus", sprite: "🦕⛰️", subIcon: "🌋", badge: "Colossus" }
    ],
    actionDialogue: "THUD THUD! 🛡️ Horn Charge & Shield Stance!",
    actionClass: "act-roar"
  },
  // 4. Animals & Mythical Beasts
  {
    id: "shiba",
    category: "Loyal Animal",
    species: "Japanese Shiba Inu",
    stages: [
      { minLvl: 4, name: "Playful Shiba Pup", sprite: "🐕", subIcon: "🎾", badge: "Good Boy" },
      { minLvl: 8, name: "Doge Samurai Guard", sprite: "🐕⚔️", subIcon: "🌸", badge: "Loyal Guardian" },
      { minLvl: 14, name: "Inugami Spirit Wolf", sprite: "🐺✨", subIcon: "🌙", badge: "Divine Wolf" }
    ],
    actionDialogue: "Woof woof! 🐾 Excited tail wag & joyful sprint!",
    actionClass: "act-bounce"
  },
  {
    id: "panda",
    category: "Heroic Animal",
    species: "Giant Panda",
    stages: [
      { minLvl: 4, name: "Bamboo Rolling Panda", sprite: "🐼", subIcon: "🎋", badge: "Fluffy Roll" },
      { minLvl: 8, name: "Kung Fu Panda Warrior", sprite: "🥋🐼", subIcon: "🍜", badge: "Dragon Warrior" },
      { minLvl: 14, name: "Zen Master Chi Panda", sprite: "☯️🐼", subIcon: "✨", badge: "Golden Chi Master" }
    ],
    actionDialogue: "Skadoosh! 🥋 Bamboo Kick & Belly Somersault!",
    actionClass: "act-punch"
  },
  {
    id: "unicorn",
    category: "Mythical Beast",
    species: "Celestial Unicorn",
    stages: [
      { minLvl: 4, name: "Celestial Unicorn", sprite: "🦄", subIcon: "⭐", badge: "Pure Light" },
      { minLvl: 8, name: "Pegasus Storm Horn", sprite: "🪽🦄", subIcon: "🌈", badge: "Sky Gallop" },
      { minLvl: 14, name: "Solaris Astral Alicorn", sprite: "👑🦄", subIcon: "✨", badge: "Cosmic Guardian" }
    ],
    actionDialogue: "Neighhh! 🌈✨ Cascading Rainbow Star Shower!",
    actionClass: "act-magic"
  },
  {
    id: "dragon",
    category: "Mythical Beast",
    species: "Sovereign Jade Dragon",
    stages: [
      { minLvl: 4, name: "Emerald Wyrmling", sprite: "🐲", subIcon: "💨", badge: "Cloud Glide" },
      { minLvl: 8, name: "Azure Sky Dragon", sprite: "🐉🔥", subIcon: "⚡", badge: "Thunder Breath" },
      { minLvl: 14, name: "Golden Shenron Emperor", sprite: "👑🐉", subIcon: "🔮", badge: "Wish Granting" }
    ],
    actionDialogue: "FSSSHHH! 🔥🐲 Sacred Jade Dragon Flame Breath!",
    actionClass: "act-fire"
  }
];

// Wearable Accessories Shop
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
var petRoamInterval = null;
var petCurrentPosX = 50;

function getPetStorageKey() {
  const name = (typeof currentUser !== "undefined" && currentUser) ? currentUser.name : "guest";
  return "ks_pet_" + name.replace(/[^a-zA-Z0-9]/g, "_");
}

function createNewPetEgg() {
  const now = Date.now();
  const surprise = CREATURE_ROSTER[Math.floor(Math.random() * CREATURE_ROSTER.length)];
  return {
    name: ((typeof currentUser !== "undefined" && currentUser) ? currentUser.name.split(" ")[0] : "My") + "'s Buddy",
    creatureId: surprise.id,
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

function loadPetData() {
  try {
    const key = getPetStorageKey();
    const saved = localStorage.getItem(key);
    const now = Date.now();

    if (saved) {
      try { currentPet = JSON.parse(saved); } catch(e) { currentPet = null; }
    }

    if (!currentPet) {
      currentPet = createNewPetEgg();
    } else if (!currentPet.creatureId) {
      // Backward compatibility: map previous session realm to species
      if (currentPet.realm === "mythic") currentPet.creatureId = "unicorn";
      else if (currentPet.realm === "anime") currentPet.creatureId = "tanjiro";
      else if (currentPet.realm === "dino") currentPet.creatureId = "trex";
      else if (currentPet.realm === "movie") currentPet.creatureId = "panda";
      else currentPet.creatureId = "unicorn";
    }

    // Decay over time
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
    startPetRoaming();
  } catch (err) {
    console.warn("loadPetData shielded:", err);
  }
}

function savePetData() {
  if (!currentPet) return;
  try { localStorage.setItem(getPetStorageKey(), JSON.stringify(currentPet)); } catch(e) {}
}

function getActiveCreatureData(creatureId, level) {
  if (level < 4) {
    let eggSprite = "🥚";
    if (level === 2) eggSprite = "🥚✨";
    if (level === 3) eggSprite = "🐣🥚";
    return {
      category: "Mystery Egg",
      species: "Pulsating Mystery Egg",
      name: `Mystery Egg (Lv ${level})`,
      sprite: eggSprite,
      subIcon: "✨",
      badge: "Hatching Soon",
      actionDialogue: "Wiggle wiggle... The egg is warm and about to hatch! 🥚✨",
      actionClass: "act-egg"
    };
  }

  const creature = CREATURE_ROSTER.find(c => c.id === creatureId) || CREATURE_ROSTER[0];
  let currentStage = creature.stages[0];
  for (let s of creature.stages) {
    if (level >= s.minLvl) currentStage = s;
  }

  return {
    category: creature.category,
    species: creature.species,
    name: currentStage.name,
    sprite: currentStage.sprite,
    subIcon: currentStage.subIcon,
    badge: currentStage.badge,
    actionDialogue: creature.actionDialogue,
    actionClass: creature.actionClass
  };
}

// Autonomous Roaming: Walking smoothly back and forth across the habitat
function startPetRoaming() {
  if (petRoamInterval) clearInterval(petRoamInterval);

  petRoamInterval = setInterval(() => {
    if (!currentPet || currentPet.isSleeping) return;

    const actor = document.getElementById("petActor");
    const figure = document.getElementById("petAvatar") || document.getElementById("petFigure");
    if (!actor || !figure) return;

    // Move to random spot between 12% and 82%
    const targetX = Math.floor(Math.random() * 70) + 12;
    const isMovingRight = targetX >= petCurrentPosX;

    // Flip horizontally to face walking direction
    actor.style.transform = isMovingRight ? "scaleX(1)" : "scaleX(-1)";
    figure.classList.add("walking-bob");

    actor.style.left = targetX + "%";
    petCurrentPosX = targetX;

    setTimeout(() => {
      figure.classList.remove("walking-bob");
    }, 2200);

  }, 4500);
}

// Signature Action Trigger
function triggerSignatureAction() {
  if (!currentPet) return;
  const actor = document.getElementById("petActor");
  const figure = document.getElementById("petAvatar") || document.getElementById("petFigure");
  const effectBadge = document.getElementById("petActionEffect");
  if (!actor || !figure) return;

  const data = getActiveCreatureData(currentPet.creatureId, currentPet.level);

  figure.classList.add(data.actionClass);
  if (effectBadge) {
    effectBadge.innerText = data.subIcon;
    effectBadge.style.display = "block";
    effectBadge.classList.add("effect-pop");
  }

  showPetSpeech(data.actionDialogue);

  setTimeout(() => {
    figure.classList.remove(data.actionClass);
    if (effectBadge) {
      effectBadge.style.display = "none";
      effectBadge.classList.remove("effect-pop");
    }
  }, 1400);
}

// TAPPING DIRECTLY ON PET = PLAY WITH IT!
function handlePetDirectTap() {
  if (!currentPet) return;
  if (currentPet.isSleeping) {
    showPetSpeech("Shh... I'm sleeping! Tap Wake Up first! 💤");
    return;
  }
  
  // If Level 1-3 Egg, tap to pet and wobble
  if (currentPet.level < 4) {
    triggerSignatureAction();
    showPetSpeech("🥚 Wiggle! The egg is warm and happy! Feed & care to hatch!");
    currentPet.happiness = Math.min(100, currentPet.happiness + 8);
    savePetData();
    refreshPetUI();
  } else {
    // Hatched buddy: tapping directly opens Play & Quiz!
    triggerPetCare('play');
  }
}

function addPetExp(pts) {
  if (!currentPet) return;
  currentPet.exp += pts;
  const reqExp = currentPet.level * 50;

  if (currentPet.exp >= reqExp) {
    currentPet.level++;
    currentPet.exp -= reqExp;

    const data = getActiveCreatureData(currentPet.creatureId, currentPet.level);
    if (currentPet.level === 4) {
      showPetSpeech(`🎉 SURPRISE HATCH! Your egg hatched into ${data.species}! 🌟`);
    } else {
      showPetSpeech(`🎉 EVOLUTION! Leveled up to Lv ${currentPet.level}: ${data.name}! 🌟`);
    }
    triggerSignatureAction();
  }
  savePetData();
  refreshPetUI();
}

function refreshPetUI() {
  if (!currentPet) return;
  if (typeof refreshAllCoinDisplays === 'function') refreshAllCoinDisplays();

  const data = getActiveCreatureData(currentPet.creatureId, currentPet.level);

  setSafeText('petNameTitle', currentPet.name);
  setSafeText('petStageBadge', data.name);
  setSafeText('petLevelText', `Level ${currentPet.level}`);

  const reqExp = currentPet.level * 50;
  setSafeText('petExpText', `EXP: ${currentPet.exp} / ${reqExp}`);
  const expBar = document.getElementById('petExpBar');
  if (expBar) expBar.style.width = Math.min(100, (currentPet.exp / reqExp) * 100) + "%";

  const figureEl = document.getElementById('petAvatar') || document.getElementById('petFigure');
  const sleepBtn = document.getElementById('btnSleep');
  if (figureEl) {
    figureEl.innerText = currentPet.isSleeping ? "💤" : data.sprite;
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
  el.style.transform = "scale(1.08)";
  setTimeout(() => el.style.transform = "scale(1)", 250);
}

function sleepPet() {
  if (!currentPet) return;
  currentPet.isSleeping = !currentPet.isSleeping;
  showPetSpeech(currentPet.isSleeping ? "Shh... Sleeping peacefully to restore vitality... 💤" : "Good morning! Ready for today's health consultations! ☀️");
  savePetData();
  refreshPetUI();
}

function resetPetToEgg() {
  if (confirm("Reset your buddy back into a Mystery Egg? It will hatch into a surprise new creature as you care for it!")) {
    currentPet = createNewPetEgg();
    savePetData();
    refreshPetUI();
    showPetSpeech("🥚 A brand-new Mystery Egg has arrived! Feed, play, and care for it to hatch!");
  }
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
  showPetSpeech("🏆 Target Feast claimed! Fully energized with clinical power! (+50 Bonus EXP) 🌟");
  addPetExp(50);
  triggerSignatureAction();
  refreshPetUI();
}

function triggerPetCare(actionType) {
  if (!currentPet) return;

  if (actionType === 'feed') {
    if (currentPet.hunger >= 100) {
      showPetSpeech("I'm completely full! Let's play or roam instead! 🎾");
      return;
    }
    openQuizModal("Feed Pet Snack", () => {
      currentPet.hunger = Math.min(100, currentPet.hunger + 25);
      showPetSpeech("Yum! That nutrient snack was delicious! 🍎 (+15 EXP)");
      addPetExp(15);
      triggerSignatureAction();
    });
  } else if (actionType === 'play') {
    if (currentPet.isSleeping) {
      showPetSpeech("Shh... I'm sleeping! Tap Wake Up first! 💤");
      return;
    }
    openQuizModal("Play with Pet", () => {
      currentPet.happiness = Math.min(100, currentPet.happiness + 20);
      currentPet.hunger = Math.max(5, currentPet.hunger - 6);
      showPetSpeech("Yay! Playing together is so much fun! ⭐ (+10 EXP)");
      addPetExp(10);
      triggerSignatureAction();
    });
  } else if (actionType === 'clean') {
    if (!currentPet.hasPoop) {
      showPetSpeech("The habitat is sparkling clean! ✨");
      return;
    }
    openQuizModal("Clean Up Room", () => {
      currentPet.hasPoop = false;
      currentPet.cleanliness = 100;
      showPetSpeech("Thank you! Sparkling clean and fresh! 🧹 (+20 EXP)");
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

function closeShopModals() {
  const m1 = document.getElementById('wardrobeModal'); if (m1) m1.style.display = "none";
  const m2 = document.getElementById('decorModal'); if (m2) m2.style.display = "none";
}
