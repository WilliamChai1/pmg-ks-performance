// --- CORE APPLICATION & SALES AUTOMATION ENGINE ---
const API_URL = "https://script.google.com/macros/s/AKfycbyDXiyZZuYYDN4e6w16HyoTXbKbLwmPCSqoJVAkuRd4iPTYQP7KGtMJZuaQ-NyyXgSZ-w/exec";

const USER_CONFIGS = {
  "6688": { name: "Chai Yee Sian (William)", role: "manager" },
  "8899": { name: "Ting Kwang Yu", role: "manager" },
  "1003": { name: "Haniesha Louna", role: "staff" },
  "1007": { name: "Kenix Ling", role: "staff" },
  "1004": { name: "Daniela Janet", role: "staff" },
  "1617": { name: "Nurhafizah Pauli", role: "staff" },
  "1006": { name: "Muhammad Nur Farizin", role: "staff" },
  "1002": { name: "Fiona Fiena", role: "staff" },
  "1001": { name: "Jong Pei Choo", role: "staff" }
};

// Global State Variables
var currentUser = null;
var liveSheetData = null;
var currentPet = null;
var currentFarm = null;

// Safe DOM Setters
function setSafeText(id, text) {
  const el = document.getElementById(id);
  if (el) el.innerText = text;
}
function setSafeHtml(id, html) {
  const el = document.getElementById(id);
  if (el) el.innerHTML = html;
}

// Fallback Baseline (Overridden automatically by localStorage & Live Sheet)
const BASELINE_FEED = {
  updatedAt: "13-Sep-2026 (Live Verified)",
  outlet: "PMG Pharmacy Kota Sentosa",
  dailySummary: {
    date: "13-Sep-2026",
    dayOfMonth: 13,
    totalSales: 8936.50,
    hbSales: 3195.35,
    hbRatio: 35.76,
    hmSales: 1263.50,
    hmRatio: 14.14,
    transactions: 262,
    basketSize: 34.11,
    hbBasketSize: 12.20,
    pmgAppCount: 3,
    pmgAppMtd: 43,
    mtdTotalSales: 153473.09,
    mtdHbSales: 64241.88,
    mtdHmSales: 14792.60,
    tsTarget: 331000.0,
    hbTier1Target: 152750.0,
    hbTier2Target: 161900.0,
    hbTier3Target: 171800.0,
    hmTarget: 33100.0
  },
  directorsReportDriveUrl: "https://drive.google.com/file/d/1alsC_x48Utgf08wULdSPdMUDK6qfErcD/view?usp=drivesdk",
  teammatesGapDriveUrl: "https://drive.google.com/file/d/1iaCPp3BJ5z9obrEsPMaW_4rIZAgWPoS-/view?usp=drivesdk",
  recommendations: {
    "Ting Kwang Yu": "Welcome to PMG Kota Sentosa! Joining today (14-Sep-2026) as Branch Manager to lead operational and clinical excellence.",
    "Daniela Janet": "Outstanding Sunday performance with a Triple Target Hit (RM 1.9k TS, RM 797 HB, RM 263 HM across 59 patients)! Superb counseling.",
    "Jong Pei Choo": "Triple Target Hit with RM 2.4k TS, RM 619 HB, RM 502 HM! Surpassed RM 32.4k MTD TS (+RM 12.6k above full monthly target).",
    "Muhammad Nur Farizin": "Double Target Hit for TS (RM 1.6k) and HM (RM 232 across 58 patients)! Outstanding customer volume.",
    "Haniesha Louna": "Superb 65.9% HB ratio (RM 756 HB across 20 patients); strong focus on high-value chronic add-ons.",
    "Nurhafizah Pauli": "Consistent engagement with 31 patients; continue active OTC pairing at checkout.",
    "Kenix Ling": "Strong 51.0% HB ratio (RM 377 HB across 33 patients); maintain acute pain add-on recommendations.",
    "Chai Yee Sian (William)": "Strong cumulative baseline with RM 25.1k TS and RM 12.8k HB (50.9% ratio).",
    "Fiona Fiena": "Solid MTD baseline with 418 patients served MTD."
  },
  teammates: {
    "Ting Kwang Yu": {
      dailyTs: 0.00, dailyHb: 0.00, dailyHm: 0.00, dailyCust: 0, dailyCommission: 0.00,
      mtdTs: 0.00, mtdHb: 0.00, mtdHm: 0.00, mtdCust: 0, mtdCommission: 0.00,
      role: "Branch Manager", tsTarget: 46340.0, hbTarget: 24052.0, hmTarget: 4634.0,
      dailyTsTarget: 1655.0, dailyHbTarget: 859.0, dailyHmTarget: 165.5, isOnTrack: true
    },
    "Jong Pei Choo": {
      dailyTs: 2357.95, dailyHb: 618.70, dailyHm: 501.90, dailyCust: 61, dailyCommission: 21.65,
      mtdTs: 32463.20, mtdHb: 14666.15, mtdHm: 3118.60, mtdCust: 559, mtdCommission: 513.32,
      role: "Pharmacist Assistant (Support)", tsTarget: 19860.0, hbTarget: 10308.0, hmTarget: 1986.0,
      dailyTsTarget: 662.0, dailyHbTarget: 343.6, dailyHmTarget: 66.2, isOnTrack: true
    },
    "Chai Yee Sian (William)": {
      dailyTs: 0.00, dailyHb: 0.00, dailyHm: 0.00, dailyCust: 0, dailyCommission: 0.00,
      mtdTs: 25082.63, mtdHb: 12778.73, mtdHm: 3066.70, mtdCust: 272, mtdCommission: 447.26,
      role: "Pharmacist-in-Charge", tsTarget: 49650.0, hbTarget: 25770.0, hmTarget: 4965.0,
      dailyTsTarget: 1655.0, dailyHbTarget: 859.0, dailyHmTarget: 165.5, isOnTrack: true
    },
    "Haniesha Louna": {
      dailyTs: 1146.20, dailyHb: 755.50, dailyHm: 114.00, dailyCust: 20, dailyCommission: 26.44,
      mtdTs: 19068.90, mtdHb: 8251.74, mtdHm: 1382.00, mtdCust: 432, mtdCommission: 288.81,
      role: "Assistant Branch Manager", tsTarget: 46340.0, hbTarget: 24052.0, hmTarget: 4634.0,
      dailyTsTarget: 1544.67, dailyHbTarget: 801.73, dailyHmTarget: 154.47, isOnTrack: true
    },
    "Nurhafizah Pauli": {
      dailyTs: 1169.90, dailyHb: 307.40, dailyHm: 84.50, dailyCust: 31, dailyCommission: 10.76,
      mtdTs: 18051.90, mtdHb: 5834.50, mtdHm: 1358.60, mtdCust: 498, mtdCommission: 204.21,
      role: "Pharmacist Assistant", tsTarget: 43030.0, hbTarget: 22334.0, hmTarget: 4303.0,
      dailyTsTarget: 1434.33, dailyHbTarget: 744.47, dailyHmTarget: 143.43, isOnTrack: true
    },
    "Muhammad Nur Farizin": {
      dailyTs: 1616.10, dailyHb: 340.50, dailyHm: 232.30, dailyCust: 58, dailyCommission: 11.92,
      mtdTs: 15749.80, mtdHb: 5452.00, mtdHm: 1690.00, mtdCust: 522, mtdCommission: 190.82,
      role: "Pharmacist Assistant", tsTarget: 43030.0, hbTarget: 22334.0, hmTarget: 4303.0,
      dailyTsTarget: 1434.33, dailyHbTarget: 744.47, dailyHmTarget: 143.43, isOnTrack: true
    },
    "Fiona Fiena": {
      dailyTs: 0.00, dailyHb: 0.00, dailyHm: 0.00, dailyCust: 0, dailyCommission: 0.00,
      mtdTs: 14856.78, mtdHb: 5966.78, mtdHm: 1458.40, mtdCust: 418, mtdCommission: 208.84,
      role: "Pharmacist Assistant", tsTarget: 43030.0, hbTarget: 22334.0, hmTarget: 4303.0,
      dailyTsTarget: 1434.33, dailyHbTarget: 744.47, dailyHmTarget: 143.43, isOnTrack: true
    },
    "Kenix Ling": {
      dailyTs: 739.20, dailyHb: 376.70, dailyHm: 68.00, dailyCust: 33, dailyCommission: 13.18,
      mtdTs: 14012.81, mtdHb: 6158.81, mtdHm: 1373.00, mtdCust: 380, mtdCommission: 215.56,
      role: "PRP Pharmacist", tsTarget: 43030.0, hbTarget: 22334.0, hmTarget: 4303.0,
      dailyTsTarget: 1434.33, dailyHbTarget: 744.47, dailyHmTarget: 143.43, isOnTrack: false
    },
    "Daniela Janet": {
      dailyTs: 1907.15, dailyHb: 796.55, dailyHm: 262.80, dailyCust: 59, dailyCommission: 27.88,
      mtdTs: 13481.07, mtdHb: 5133.17, mtdHm: 1345.30, mtdCust: 376, mtdCommission: 179.66,
      role: "Pharmacist Assistant", tsTarget: 43030.0, hbTarget: 22334.0, hmTarget: 4303.0,
      dailyTsTarget: 1434.33, dailyHbTarget: 744.47, dailyHmTarget: 143.43, isOnTrack: false
    }
  }
};

// Smart Caching Engine: Load last successful fetch from localStorage
try {
  const cachedFeed = localStorage.getItem("ks_last_live_feed");
  if (cachedFeed) {
    liveSheetData = JSON.parse(cachedFeed);
  } else {
    liveSheetData = BASELINE_FEED;
  }
} catch (e) {
  liveSheetData = BASELINE_FEED;
}

// --- TAB SWITCHER ENGINE ---
function switchAppTab(tab) {
  const views = { 
    perf: document.getElementById('performanceView'), 
    pet: document.getElementById('petView'), 
    farm: document.getElementById('farmView') 
  };
  const tabs = { 
    perf: document.getElementById('tabNavPerf'), 
    pet: document.getElementById('tabNavPet'), 
    farm: document.getElementById('tabNavFarm') 
  };

  for (let k in views) {
    if (views[k]) views[k].style.display = (k === tab) ? 'block' : 'none';
    if (tabs[k]) tabs[k].className = (k === tab) ? 'nav-tab active' : 'nav-tab';
  }
  if (tab === 'pet' && typeof refreshPetUI === 'function') refreshPetUI();
  if (tab === 'farm' && typeof refreshFarmUI === 'function') refreshFarmUI();
}

// --- COIN SYSTEM ---
function getAvailableHbCoins() {
  if (!currentUser || !liveSheetData || !liveSheetData.teammates) return 0;
  const s = liveSheetData.teammates[currentUser.name] || {};
  const commissionCoins = Math.floor((s.mtdCommission || 0) * 10);
  const farmObj = (typeof currentFarm !== 'undefined' && currentFarm) ? currentFarm : null;
  const petObj = (typeof currentPet !== 'undefined' && currentPet) ? currentPet : null;
  const bonusCoins = farmObj ? (farmObj.bonusCoins || 0) : 0;
  const spent = petObj ? (petObj.spentCoins || 0) : 0;
  return Math.max(0, commissionCoins + bonusCoins - spent);
}

function deductHbCoins(amount) {
  if (getAvailableHbCoins() < amount) return false;
  if (!currentPet) return false;
  if (!currentPet.spentCoins) currentPet.spentCoins = 0;
  currentPet.spentCoins += amount;
  if (typeof savePetData === 'function') savePetData();
  refreshAllCoinDisplays();
  return true;
}

function refreshAllCoinDisplays() {
  const coins = getAvailableHbCoins();
  setSafeText('globalHbCoinsText', coins.toLocaleString());
  setSafeText('farmGoldText', coins.toLocaleString());
}

// --- LOGIN & AUTHENTICATION ---
function executeLogin(pin) {
  if (USER_CONFIGS[pin]) {
    currentUser = USER_CONFIGS[pin];
    try { localStorage.setItem("pmg_auth_pin", pin); } catch(e) {}
    
    // Hide lock screen
    const overlay = document.getElementById("pinOverlay");
    if (overlay) overlay.style.display = "none";
    
    // Populate dashboard immediately using cached/baseline data
    renderOutletMission();
    renderUserDashboard();
    renderTeammatesTable();
    renderCongratsPreview();
    
    // Wire up download button URLs directly
    const bDir = document.getElementById("btnDlDirector");
    if (bDir) bDir.href = (liveSheetData && liveSheetData.directorsReportDriveUrl) || "https://drive.google.com/file/d/1alsC_x48Utgf08wULdSPdMUDK6qfErcD/view?usp=drivesdk";
    const bTm = document.getElementById("btnDlTeammate");
    if (bTm) bTm.href = (liveSheetData && liveSheetData.teammatesGapDriveUrl) || "https://drive.google.com/file/d/1iaCPp3BJ5z9obrEsPMaW_4rIZAgWPoS-/view?usp=drivesdk";

    // Initialize games
    try { if (typeof loadPetData === 'function') loadPetData(); } catch(e) {}
    try { if (typeof loadFarmData === 'function') loadFarmData(); } catch(e) {}
    try { startBgm(); } catch(e) {}
    
    // Load live updates directly from Google Sheet in background
    loadData();
  } else {
    const err = document.getElementById("pinError");
    if (err) err.style.display = "block";
    const pIn = document.getElementById("pinCode");
    if (pIn) { pIn.value = ""; pIn.focus(); }
  }
}

function verifyPin() {
  const pinInput = document.getElementById("pinCode");
  const pin = pinInput ? pinInput.value.trim() : "";
  executeLogin(pin);
}

function clearAppCache() {
  try { localStorage.clear(); } catch(e) {}
  if ('caches' in window) {
    caches.keys().then(names => {
      for (let name of names) caches.delete(name);
    });
  }
  window.location.href = window.location.pathname + '?t=' + Date.now();
}

function logout() {
  stopMusic();
  try { localStorage.removeItem("pmg_auth_pin"); } catch(e) {}
  currentUser = null;
  
  setSafeText("userNameHeader", "👤 Personal Profile");
  setSafeText("valTS", "RM 0.00");
  setSafeText("valHB", "RM 0.00");
  setSafeText("valHM", "RM 0.00");
  setSafeText("valCust", "0");
  setSafeText("valMtdTS", "RM 0.00");
  setSafeText("valMtdHB", "RM 0.00");
  setSafeText("valMtdHM", "RM 0.00");
  setSafeText("valMtdCust", "0");
  setSafeText("valDailyCommission", "RM 0.00");
  setSafeText("valMtdCommission", "RM 0.00");
  setSafeHtml("valRemainingTarget", "Enter PIN to view");
  setSafeText("valPersonalRec", "Enter PIN to view");

  const pIn = document.getElementById("pinCode"); if (pIn) pIn.value = "";
  const pOv = document.getElementById("pinOverlay"); if (pOv) pOv.style.display = "flex";
  const mP = document.getElementById("managerPanel"); if (mP) mP.style.display = "none";
}

// --- GOOGLE SPREADSHEET LIVE SYNC ---
async function loadData() {
  try {
    const res = await fetch(API_URL, { redirect: "follow" });
    const sheetJson = await res.json();
    
    if (sheetJson && sheetJson.teammates) {
      if (!liveSheetData) liveSheetData = BASELINE_FEED;
      
      // Merge live data from Google Sheet
      liveSheetData.teammates = sheetJson.teammates;
      if (sheetJson.dailySummary) {
        liveSheetData.dailySummary = Object.assign({}, liveSheetData.dailySummary || {}, sheetJson.dailySummary);
      }
      if (sheetJson.updatedAt) liveSheetData.updatedAt = sheetJson.updatedAt;
      
      // Save to localStorage so it opens immediately with these numbers next time
      try { localStorage.setItem("ks_last_live_feed", JSON.stringify(liveSheetData)); } catch(e) {}
      
      setSafeText("lastUpdated", `Live Sheet Data • Updated: ${liveSheetData.updatedAt || 'Today'}`);
      
      const bDir = document.getElementById("btnDlDirector");
      if (bDir) bDir.href = (liveSheetData && liveSheetData.directorsReportDriveUrl) || "https://drive.google.com/file/d/1alsC_x48Utgf08wULdSPdMUDK6qfErcD/view?usp=drivesdk";
      const bTm = document.getElementById("btnDlTeammate");
      if (bTm) bTm.href = (liveSheetData && liveSheetData.teammatesGapDriveUrl) || "https://drive.google.com/file/d/1iaCPp3BJ5z9obrEsPMaW_4rIZAgWPoS-/view?usp=drivesdk";

      if (liveSheetData.hbQuizBank && liveSheetData.hbQuizBank.length > 0 && typeof sanitizeQuizItem === 'function') {
        HB_QUIZ_BANK = liveSheetData.hbQuizBank.map(sanitizeQuizItem);
      }

      renderOutletMission();
      renderUserDashboard();
      renderTeammatesTable();
      renderCongratsPreview();
      if (typeof checkDailyTargetFeast === 'function') checkDailyTargetFeast();
      refreshAllCoinDisplays();
    }
  } catch (e) {
    console.warn("Using cached sheet data:", e);
  }
}

function renderOutletMission() {
  if (!liveSheetData) return;
  const s = liveSheetData.dailySummary || {};

  let mtdTs = s.mtdTotalSales || 0;
  let mtdHb = s.mtdHbSales || 0;

  if (mtdTs <= 0 && liveSheetData.teammates) {
    mtdTs = Object.values(liveSheetData.teammates).reduce((acc, tm) => acc + (tm.mtdTs || 0), 0);
  }
  if (mtdHb <= 0 && liveSheetData.teammates) {
    mtdHb = Object.values(liveSheetData.teammates).reduce((acc, tm) => acc + (tm.mtdHb || 0), 0);
  }

  const tsTarget = s.tsTarget || 331000.0;
  const hbTier3 = s.hbTier3Target || 171800.0;
  const hbTier2 = s.hbTier2Target || 161900.0;
  const hbTier1 = s.hbTier1Target || 152750.0;

  const tsPct = Math.min(100, (mtdTs / tsTarget) * 100);
  const hbPct = Math.min(100, (mtdHb / hbTier3) * 100);

  setSafeText("outletTsProgressText", `RM ${mtdTs.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})} / RM ${tsTarget.toLocaleString()} (${tsPct.toFixed(1)}%)`);
  const bTs = document.getElementById("outletTsBar"); if (bTs) bTs.style.width = tsPct + "%";

  setSafeText("outletHbProgressText", `RM ${mtdHb.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})} / RM ${hbTier3.toLocaleString()} (${hbPct.toFixed(1)}%)`);
  const bHb = document.getElementById("outletHbBar"); if (bHb) bHb.style.width = hbPct + "%";

  const day = s.dayOfMonth || 13;
  const expTsPace = (tsTarget / 30) * day;
  const expHbPace = (hbTier3 / 30) * day;
  const tsDiff = mtdTs - expTsPace;
  const hbDiff = mtdHb - expHbPace;

  const bTsPace = document.getElementById("outletTsPacingBadge");
  if (bTsPace) {
    if (tsDiff >= 0) {
      bTsPace.innerHTML = `<span class="status-badge badge-ahead">🟢 ON TRACK (+RM ${Math.round(tsDiff)} ahead of Day ${day} pace)</span>`;
    } else {
      bTsPace.innerHTML = `<span class="status-badge badge-behind">⚠️ BEHIND PACE (-RM ${Math.round(Math.abs(tsDiff))} vs Day ${day} pace)</span>`;
    }
  }

  const bHbPace = document.getElementById("outletHbPacingBadge");
  if (bHbPace) {
    if (hbDiff >= 0) {
      bHbPace.innerHTML = `<span class="status-badge badge-ahead">🟢 ON TRACK (+RM ${Math.round(hbDiff)} ahead of Day ${day} Tier 3 pace)</span>`;
    } else {
      bHbPace.innerHTML = `<span class="status-badge badge-behind">⚡ PUSH NEEDED (-RM ${Math.round(Math.abs(hbDiff))} vs Day ${day} Tier 3 pace)</span>`;
    }
  }

  const t1 = document.getElementById("tier1Badge");
  const t2 = document.getElementById("tier2Badge");
  const t3 = document.getElementById("tier3Badge");
  const b1 = document.getElementById("tier1Box");
  const b2 = document.getElementById("tier2Box");
  const b3 = document.getElementById("tier3Box");

  if (mtdHb >= hbTier1) {
    if (t1) { t1.className = "tier-badge badge-unlocked"; t1.innerText = "UNLOCKED 🏆"; }
    if (b1) b1.className = "tier-box unlocked";
  }
  if (mtdHb >= hbTier2) {
    if (t2) { t2.className = "tier-badge badge-unlocked"; t2.innerText = "UNLOCKED 🏆"; }
    if (b2) b2.className = "tier-box unlocked";
  }
  if (mtdHb >= hbTier3) {
    if (t3) { t3.className = "tier-badge badge-unlocked"; t3.innerText = "UNLOCKED 🏆"; }
    if (b3) b3.className = "tier-box unlocked";
  }

  const rsb = document.getElementById("rewardStatusBanner");
  if (rsb) {
    if (mtdHb < hbTier1) {
      rsb.innerHTML = `🎯 <b>RM ${(hbTier1 - mtdHb).toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}</b> more in HB to unlock <b>TIER 1 (RM 250 reward per person)</b>!`;
    } else if (mtdHb < hbTier2) {
      rsb.innerHTML = `🏆 <b>TIER 1 UNLOCKED!</b> Earn <b>RM ${(hbTier2 - mtdHb).toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}</b> more in HB to reach <b>TIER 2 (RM 375 reward per person)</b>!`;
    } else if (mtdHb < hbTier3) {
      rsb.innerHTML = `🏆 <b>TIER 2 UNLOCKED!</b> Earn <b>RM ${(hbTier3 - mtdHb).toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}</b> more in HB to hit <b>MAX TIER 3 (RM 500 reward per person)</b>!`;
    } else {
      rsb.innerHTML = `🎉 <b>CONGRATULATIONS! MAX TIER 3 UNLOCKED (RM 500 reward per person)!</b> Maintain strong momentum!`;
    }
  }
}

function renderUserDashboard() {
  if (!currentUser || !liveSheetData || !liveSheetData.teammates) return;
  const userName = currentUser.name;
  setSafeText("userNameHeader", `👤 ${userName}`);

  const mP = document.getElementById("managerPanel");
  if (mP) mP.style.display = (currentUser.role === "manager") ? "block" : "none";

  const s = liveSheetData.teammates[userName] || { dailyTs: 0, dailyHb: 0, dailyHm: 0, dailyCust: 0, dailyCommission: 0, mtdTs: 0, mtdHb: 0, mtdHm: 0, mtdCust: 0, mtdCommission: 0, tsTarget: 43030, hbTarget: 22334, hmTarget: 4303 };

  // 1. Daily Performance Grid
  const isOffToday = (Number(s.dailyTs || 0) === 0 && Number(s.dailyCust || 0) === 0);
  setSafeText("dailyLabelText", isOffToday ? "📅 TODAY'S PERFORMANCE (OFF / REST DAY):" : "📅 TODAY'S PERFORMANCE (DAILY):");
  setSafeText("valTS", "RM " + Number(s.dailyTs || 0).toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2}));
  setSafeText("valHB", "RM " + Number(s.dailyHb || 0).toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2}));
  setSafeText("valHM", "RM " + Number(s.dailyHm || 0).toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2}));
  setSafeText("valCust", String(s.dailyCust || 0));

  // 2. MTD Accumulated Performance Grid (Always Visible!)
  setSafeText("valMtdTS", "RM " + Number(s.mtdTs || 0).toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2}));
  const mtdHbPct = s.mtdTs > 0 ? ((s.mtdHb / s.mtdTs) * 100).toFixed(1) : "0.0";
  setSafeText("valMtdHB", "RM " + Number(s.mtdHb || 0).toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2}) + ` (${mtdHbPct}%)`);
  setSafeText("valMtdHM", "RM " + Number(s.mtdHm || 0).toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2}));
  setSafeText("valMtdCust", String(s.mtdCust || 0));

  // 3. Targets Remaining & Pacing
  const tsRem = Math.max(0, s.tsTarget - (s.mtdTs || 0));
  const hbRem = Math.max(0, s.hbTarget - (s.mtdHb || 0));
  const hmRem = Math.max(0, s.hmTarget - (s.mtdHm || 0));

  setSafeHtml("valRemainingTarget", `
    • TS Target Left: <b>RM ${tsRem.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}</b> (Target: RM ${Number(s.tsTarget || 0).toLocaleString()})<br>
    • HB Target Left: <b>RM ${hbRem.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}</b> (Target: RM ${Number(s.hbTarget || 0).toLocaleString()})<br>
    • HM Target Left: <b>RM ${hmRem.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}</b> (Target: RM ${Number(s.hmTarget || 0).toLocaleString()})
  `);

  const day = (liveSheetData.dailySummary && liveSheetData.dailySummary.dayOfMonth) || 13;
  const expectedPace = (s.tsTarget / 30) * day;
  const pacingDiff = (s.mtdTs || 0) - expectedPace;

  const pEl = document.getElementById("valPersonalPacing");
  if (pEl) {
    if (pacingDiff >= 500) pEl.innerHTML = `<span class="status-badge badge-ahead">🚀 AHEAD OF PACE (+RM ${Math.round(pacingDiff)} above Day ${day} target)</span>`;
    else if (pacingDiff >= -250) pEl.innerHTML = `<span class="status-badge badge-ontrack">🟢 ON TRACK (On pace for Day ${day})</span>`;
    else pEl.innerHTML = `<span class="status-badge badge-behind">⚡ PUSH NEEDED (-RM ${Math.round(Math.abs(pacingDiff))} vs Day ${day} target)</span>`;
  }

  setSafeText("valDailyCommission", "RM " + Number(s.dailyCommission || 0).toFixed(2));
  setSafeText("valMtdCommission", "RM " + Number(s.mtdCommission || 0).toFixed(2));

  const rec = (liveSheetData.recommendations && liveSheetData.recommendations[userName]) || "Focus on pairing routine OTC transactions with House Brand supplements.";
  setSafeText("valPersonalRec", rec);

  // 4. Always ensure download buttons point to the latest Ultra-HD reports
  const bDir = document.getElementById("btnDlDirector");
  if (bDir) bDir.href = (liveSheetData && liveSheetData.directorsReportDriveUrl) || "https://drive.google.com/file/d/1alsC_x48Utgf08wULdSPdMUDK6qfErcD/view?usp=drivesdk";
  const bTm = document.getElementById("btnDlTeammate");
  if (bTm) bTm.href = (liveSheetData && liveSheetData.teammatesGapDriveUrl) || "https://drive.google.com/file/d/1iaCPp3BJ5z9obrEsPMaW_4rIZAgWPoS-/view?usp=drivesdk";
}

function renderCongratsPreview() {
  if (!liveSheetData || !liveSheetData.teammates) return;
  const container = document.getElementById("congratsPreview");
  if (!container) return;

  const achievers = [];
  for (const [name, val] of Object.entries(liveSheetData.teammates)) {
    const hits = [];
    if (val.dailyTs >= (val.dailyTsTarget || 1434.33) && val.dailyTs > 0) hits.push("TS");
    if (val.dailyHb >= (val.dailyHbTarget || 744.47) && val.dailyHb > 0) hits.push("HB");
    if (val.dailyHm >= (val.dailyHmTarget || 143.43) && val.dailyHm > 0) hits.push("HM");

    if (hits.length > 0) {
      achievers.push(`<b>${name.split(" ")[0]}</b>: Hit target for <b>${hits.join(", ")}</b>! 🌟`);
    }
  }

  container.innerHTML = achievers.length > 0 ? achievers.join("<br>") : "Keep pushing! Targets are within reach today. ⚡";
}

function renderTeammatesTable() {
  if (!liveSheetData || !liveSheetData.teammates || !currentUser || currentUser.role !== "manager") return;
  const panel = document.getElementById("managerPanel");
  if (panel) panel.style.display = "block";

  const tbody = document.querySelector("#teammatesTable tbody");
  if (!tbody) return;
  tbody.innerHTML = "";

  for (const [name, val] of Object.entries(liveSheetData.teammates)) {
    const todayTsText = (Number(val.dailyTs || 0) > 0) ? `RM ${Number(val.dailyTs).toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}` : `<span style="color:#888;">Off (RM 0)</span>`;
    const todayHbText = (Number(val.dailyHb || 0) > 0) ? `RM ${Number(val.dailyHb).toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}` : `<span style="color:#888;">-</span>`;
    const mtdHbPct = val.mtdTs > 0 ? ((val.mtdHb / val.mtdTs) * 100).toFixed(0) + "%" : "0%";
    
    const row = document.createElement("tr");
    row.innerHTML = `
      <td><b>${name}</b><br><span style="font-size:0.65rem; color:#666;">${val.role || 'Staff'}</span></td>
      <td>${todayTsText}</td>
      <td>${todayHbText}</td>
      <td style="font-weight:700; color:var(--primary-dark);">RM ${Number(val.mtdTs || 0).toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}</td>
      <td style="font-weight:700; color:#00796b;">RM ${Number(val.mtdHb || 0).toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}<br><span style="font-size:0.65rem; color:#666;">${mtdHbPct}</span></td>
      <td>${val.mtdCust || 0}</td>
    `;
    tbody.appendChild(row);
  }
}

function copyWhatsAppBriefing() {
  if (!liveSheetData) return;
  const s = liveSheetData.dailySummary || {};
  let mtdTs = s.mtdTotalSales || 0;
  let mtdHb = s.mtdHbSales || 0;
  let mtdHm = s.mtdHmSales || 0;

  if (mtdTs <= 0 && liveSheetData.teammates) {
    mtdTs = Object.values(liveSheetData.teammates).reduce((acc, tm) => acc + (tm.mtdTs || 0), 0);
  }
  if (mtdHb <= 0 && liveSheetData.teammates) {
    mtdHb = Object.values(liveSheetData.teammates).reduce((acc, tm) => acc + (tm.mtdHb || 0), 0);
  }
  if (mtdHm <= 0 && liveSheetData.teammates) {
    mtdHm = Object.values(liveSheetData.teammates).reduce((acc, tm) => acc + (tm.mtdHm || 0), 0);
  }

  const tsPct = ((mtdTs / 331000) * 100).toFixed(1);
  const hbPct = ((mtdHb / 171800) * 100).toFixed(1);
  const hmPct = ((mtdHm / 33100) * 100).toFixed(1);

  let text = `Date of briefing: ${s.date || '13-Sep-2026'}\n\n`;
  text += `Target achievement:\n`;
  text += `TS: RM ${mtdTs.toFixed(2)} / RM 331,000 (${tsPct}%) - ON TRACK 🟢\n`;
  text += `HB: RM ${mtdHb.toFixed(2)} / RM 171,800 (${hbPct}%) - ON TRACK 🟢\n`;
  text += `HM: RM ${mtdHm.toFixed(2)} / RM 33,100 (${hmPct}%) - AHEAD OF TRACK 🚀\n\n`;

  text += `Personal target per day:\n`;
  text += `Pharmacist & Assistant BM:\n`;
  text += `TS: RM 1544.67 - 1655.00 | HB: RM 801.73 - 859.00 | HM: RM 154.47 - 165.50\n\n`;

  text += `Pharmacist Assistants:\n`;
  text += `TS: RM 1434.33 | HB: RM 744.47 | HM: RM 143.43\n\n`;

  text += `🏆 Congratulation board (for those who hit personal target)\n`;
  for (const [name, val] of Object.entries(liveSheetData.teammates)) {
    let hits = [];
    if (val.dailyTs >= (val.dailyTsTarget || 1434.33) && val.dailyTs > 0) hits.push("TS");
    if (val.dailyHb >= (val.dailyHbTarget || 744.47) && val.dailyHb > 0) hits.push("HB");
    if (val.dailyHm >= (val.dailyHmTarget || 143.43) && val.dailyHm > 0) hits.push("HM");
    if (hits.length > 0) {
      text += `• ${name.split(" ")[0]} - Hit target for: ${hits.join(", ")}\n`;
    }
  }
  text += `\n`;

  text += `🎯 Outlet Strategic Priorities & Action Plans:\n`;
  text += `1. Welcoming Branch Manager Ting Kwang Yu (14.09.2026): Operational onboarding and shift leadership transition.\n`;
  text += `2. Dual House Brand Pairing: When dispensing for acute cough, cold, respiratory, or pain complaints, routinely pair with Suppflora, Citazinc, or Taiwan Herbal Ginger Patches.\n`;
  text += `3. Checkout PWP Conversion: Offer daily high-margin essentials on transactions exceeding RM 30.\n\n`;

  navigator.clipboard.writeText(text);
  alert("WhatsApp Daily Briefing copied to clipboard!");
}

// --- BGM CONTROLLER ---
function startBgm() {
  const audio = document.getElementById('bgmAudio');
  if (!audio) return;
  audio.play().then(() => updateMusicButtonUI()).catch(e => updateMusicButtonUI());
}

function stopMusic() {
  const audio = document.getElementById('bgmAudio');
  if (audio) { audio.pause(); audio.currentTime = 0; }
  updateMusicButtonUI();
}

function toggleMusic() {
  const audio = document.getElementById('bgmAudio');
  if (!audio) return;
  if (audio.paused) startBgm();
  else { audio.pause(); updateMusicButtonUI(); }
}

function updateMusicButtonUI() {
  const btn = document.getElementById('musicToggleBtn');
  const audio = document.getElementById('bgmAudio');
  if (!btn) return;
  btn.innerHTML = (audio && !audio.paused) ? '🎵 BGM: ON' : '🔇 BGM: OFF';
}

window.onload = () => {
  try {
    const savedPin = localStorage.getItem("pmg_auth_pin");
    if (savedPin && USER_CONFIGS[savedPin]) {
      executeLogin(savedPin);
    }
  } catch (err) {
    console.warn("Auto-login bypassed:", err);
  }
};
