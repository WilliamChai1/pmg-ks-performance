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

// Instant Verified Baseline Data (Zero Loading Delay)
const BASELINE_FEED = {
  "updatedAt": "14-Sep-2026 (Final Day Close)",
  "outlet": "PMG Pharmacy Kota Sentosa",
  "dailySummary": {
    "date": "14-Sep-2026",
    "dayOfMonth": 14,
    "totalSales": 9649.4,
    "hbSales": 3900.0,
    "hbRatio": 40.42,
    "hmSales": 1320.4,
    "hmRatio": 13.68,
    "transactions": 219,
    "basketSize": 44.06,
    "hbBasketSize": 17.81,
    "pmgAppCount": 3,
    "pmgAppMtd": 46,
    "mtdTotalSales": 163122.49,
    "mtdHbSales": 68141.88,
    "mtdHmSales": 16113.0,
    "tsTarget": 331000.0,
    "hbTier1Target": 152750.0,
    "hbTier2Target": 161900.0,
    "hbTier3Target": 171800.0,
    "hmTarget": 33100.0
  },
  "directorsReportDriveUrl": "https://drive.google.com/file/d/1RiNtLK25mI5an-RvapGo1_Cg-BiZAgb5/view?usp=drivesdk",
  "teammatesGapDriveUrl": "https://drive.google.com/file/d/1vFesfUuWwYpaQaACZ7wGWbsVpkbjMf83/view?usp=drivesdk",
  "recommendations": {
    "Chai Yee Sian (William)": "Superb TRIPLE TARGET HIT today (RM 2.5k TS, RM 1,492 HB, RM 229 HM)! Outstanding URTI and supplement pairings.",
    "Jong Pei Choo": "Outstanding TRIPLE TARGET HIT (RM 2.2k TS, RM 502 HB, RM 329 HM)! Surpassed RM 34.6k MTD (+RM 14.8k above full monthly target)!",
    "Ting Kwang Yu": "Welcome to PMG Kota Sentosa! Solid Day 1 onboarding on duty with 33 patients served (RM 1,054.60 TS, RM 621.10 HB, 58.9% HB ratio).",
    "Muhammad Nur Farizin": "Hit daily TS target (RM 1,556.20 across 38 patients)! Strong chronic counter consultations.",
    "Fiona Fiena": "Hit daily HM target (RM 399.70) with solid RM 1,366.80 TS across 41 patients!",
    "Daniela Janet": "Hit daily HM target (RM 173.00 across 38 patients); continue pairing acute remedies with House Brands.",
    "Haniesha Louna": "Scheduled off today; strong cumulative baseline with RM 19.1k TS and RM 8.3k HB (43.3% ratio).",
    "Nurhafizah Pauli": "Scheduled off today; solid MTD baseline with 498 patients served MTD.",
    "Kenix Ling": "Scheduled off today; strong MTD baseline with RM 14.0k TS and 380 patients served MTD."
  },
  "teammates": {
    "Chai Yee Sian (William)": {
      "dailyTs": 2515.6,
      "dailyHb": 1491.8,
      "dailyHm": 228.8,
      "dailyCust": 26,
      "dailyCommission": 52.21,
      "mtdTs": 27598.23,
      "mtdHb": 14270.53,
      "mtdHm": 3295.5,
      "mtdCust": 298,
      "mtdCommission": 499.47,
      "tsGap": -22051.77,
      "hbGap": -11499.47,
      "hbRatio": 51.7,
      "hmRatio": 11.9,
      "role": "Pharmacist-in-Charge / Partner",
      "tsTarget": 49650.0,
      "hbTarget": 25770.0,
      "hmTarget": 4965.0,
      "dailyTsTarget": 1655.0,
      "dailyHbTarget": 859.0,
      "dailyHmTarget": 165.5,
      "targetHits": [
        "TS",
        "HB",
        "HM"
      ],
      "isOnTrack": true
    },
    "Ting Kwang Yu": {
      "dailyTs": 1054.6,
      "dailyHb": 621.1,
      "dailyHm": 96.9,
      "dailyCust": 33,
      "dailyCommission": 21.74,
      "mtdTs": 1054.6,
      "mtdHb": 621.1,
      "mtdHm": 96.9,
      "mtdCust": 33,
      "mtdCommission": 21.74,
      "tsGap": -45285.4,
      "hbGap": -23430.9,
      "hbRatio": 58.9,
      "hmRatio": 9.2,
      "role": "Branch Manager",
      "tsTarget": 46340.0,
      "hbTarget": 24052.0,
      "hmTarget": 4634.0,
      "dailyTsTarget": 1655.0,
      "dailyHbTarget": 859.0,
      "dailyHmTarget": 165.5,
      "targetHits": [],
      "isOnTrack": false
    },
    "Jong Pei Choo": {
      "dailyTs": 2206.0,
      "dailyHb": 502.1,
      "dailyHm": 329.0,
      "dailyCust": 43,
      "dailyCommission": 17.57,
      "mtdTs": 34669.2,
      "mtdHb": 15168.25,
      "mtdHm": 3447.6,
      "mtdCust": 602,
      "mtdCommission": 530.89,
      "tsGap": 14809.2,
      "hbGap": 4860.25,
      "hbRatio": 43.8,
      "hmRatio": 9.9,
      "role": "Pharmacist Assistant (Support)",
      "tsTarget": 19860.0,
      "hbTarget": 10308.0,
      "hmTarget": 1986.0,
      "dailyTsTarget": 662.0,
      "dailyHbTarget": 343.6,
      "dailyHmTarget": 66.2,
      "targetHits": [
        "TS",
        "HB",
        "HM"
      ],
      "isOnTrack": true
    },
    "Haniesha Louna": {
      "dailyTs": 0.0,
      "dailyHb": 0.0,
      "dailyHm": 0.0,
      "dailyCust": 0,
      "dailyCommission": 0.0,
      "mtdTs": 19068.9,
      "mtdHb": 8251.74,
      "mtdHm": 1382.0,
      "mtdCust": 432,
      "mtdCommission": 288.81,
      "tsGap": -27271.1,
      "hbGap": -15800.26,
      "hbRatio": 43.3,
      "hmRatio": 7.2,
      "role": "Assistant Branch Manager",
      "tsTarget": 46340.0,
      "hbTarget": 24052.0,
      "hmTarget": 4634.0,
      "dailyTsTarget": 1544.67,
      "dailyHbTarget": 801.73,
      "dailyHmTarget": 154.47,
      "targetHits": [],
      "isOnTrack": false
    },
    "Nurhafizah Pauli": {
      "dailyTs": 0.0,
      "dailyHb": 0.0,
      "dailyHm": 0.0,
      "dailyCust": 0,
      "dailyCommission": 0.0,
      "mtdTs": 18051.9,
      "mtdHb": 5834.5,
      "mtdHm": 1358.6,
      "mtdCust": 498,
      "mtdCommission": 204.21,
      "tsGap": -24978.1,
      "hbGap": -16499.5,
      "hbRatio": 32.3,
      "hmRatio": 7.5,
      "role": "Pharmacist Assistant",
      "tsTarget": 43030.0,
      "hbTarget": 22334.0,
      "hmTarget": 4303.0,
      "dailyTsTarget": 1434.33,
      "dailyHbTarget": 744.47,
      "dailyHmTarget": 143.43,
      "targetHits": [],
      "isOnTrack": false
    },
    "Muhammad Nur Farizin": {
      "dailyTs": 1556.2,
      "dailyHb": 559.6,
      "dailyHm": 93.0,
      "dailyCust": 38,
      "dailyCommission": 19.59,
      "mtdTs": 17306.0,
      "mtdHb": 6011.6,
      "mtdHm": 1783.0,
      "mtdCust": 560,
      "mtdCommission": 210.41,
      "tsGap": -25724.0,
      "hbGap": -16322.4,
      "hbRatio": 34.7,
      "hmRatio": 10.3,
      "role": "Pharmacist Assistant",
      "tsTarget": 43030.0,
      "hbTarget": 22334.0,
      "hmTarget": 4303.0,
      "dailyTsTarget": 1434.33,
      "dailyHbTarget": 744.47,
      "dailyHmTarget": 143.43,
      "targetHits": [
        "TS"
      ],
      "isOnTrack": false
    },
    "Fiona Fiena": {
      "dailyTs": 1366.8,
      "dailyHb": 457.7,
      "dailyHm": 399.7,
      "dailyCust": 41,
      "dailyCommission": 16.02,
      "mtdTs": 16223.58,
      "mtdHb": 6424.48,
      "mtdHm": 1858.1,
      "mtdCust": 459,
      "mtdCommission": 224.86,
      "tsGap": -26806.42,
      "hbGap": -15909.52,
      "hbRatio": 39.6,
      "hmRatio": 11.5,
      "role": "Pharmacist Assistant",
      "tsTarget": 43030.0,
      "hbTarget": 22334.0,
      "hmTarget": 4303.0,
      "dailyTsTarget": 1434.33,
      "dailyHbTarget": 744.47,
      "dailyHmTarget": 143.43,
      "targetHits": [
        "HM"
      ],
      "isOnTrack": false
    },
    "Kenix Ling": {
      "dailyTs": 0.0,
      "dailyHb": 0.0,
      "dailyHm": 0.0,
      "dailyCust": 0,
      "dailyCommission": 0.0,
      "mtdTs": 14012.81,
      "mtdHb": 6158.81,
      "mtdHm": 1373.0,
      "mtdCust": 380,
      "mtdCommission": 215.56,
      "tsGap": -29017.19,
      "hbGap": -16175.19,
      "hbRatio": 44.0,
      "hmRatio": 9.8,
      "role": "PRP Pharmacist",
      "tsTarget": 43030.0,
      "hbTarget": 22334.0,
      "hmTarget": 4303.0,
      "dailyTsTarget": 1434.33,
      "dailyHbTarget": 744.47,
      "dailyHmTarget": 143.43,
      "targetHits": [],
      "isOnTrack": false
    },
    "Daniela Janet": {
      "dailyTs": 920.2,
      "dailyHb": 267.7,
      "dailyHm": 173.0,
      "dailyCust": 38,
      "dailyCommission": 9.37,
      "mtdTs": 14401.27,
      "mtdHb": 5400.87,
      "mtdHm": 1518.3,
      "mtdCust": 414,
      "mtdCommission": 189.03,
      "tsGap": -28628.73,
      "hbGap": -16933.13,
      "hbRatio": 37.5,
      "hmRatio": 10.5,
      "role": "Pharmacist Assistant",
      "tsTarget": 43030.0,
      "hbTarget": 22334.0,
      "hmTarget": 4303.0,
      "dailyTsTarget": 1434.33,
      "dailyHbTarget": 744.47,
      "dailyHmTarget": 143.43,
      "targetHits": [
        "HM"
      ],
      "isOnTrack": false
    }
  }
};

// Initialize state with cached live data from Google Sheet if available, else baseline
try {
  const cachedFeed = localStorage.getItem("pmg_live_feed_cache");
  if (cachedFeed) {
    liveSheetData = JSON.parse(cachedFeed);
  }
} catch (e) {
  console.warn("Could not read cached sheet data:", e);
}
if (!liveSheetData) liveSheetData = BASELINE_FEED;

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
    
    // Populate dashboard immediately using baseline
    renderOutletMission();
    renderUserDashboard();
    renderTeammatesTable();
    renderCongratsPreview();
    
    // Initialize games
    try { if (typeof loadPetData === 'function') loadPetData(); } catch(e) {}
    try { if (typeof loadFarmData === 'function') loadFarmData(); } catch(e) {}
    try { startBgm(); } catch(e) {}
    
    // Background query for latest spreadsheet updates
    loadData();
  } else {
    const err = document.getElementById("pinError");
    if (err) err.style.display = "block";
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
  
  // Scrub personal numbers before displaying lock screen
  setSafeText("userNameHeader", "👤 Personal Profile");
  setSafeText("valTS", "RM 0.00");
  setSafeText("valHB", "RM 0.00");
  setSafeText("valHM", "RM 0.00");
  setSafeText("valCust", "0");
  setSafeText("valDailyCommission", "RM 0.00");
  setSafeText("valMtdCommission", "RM 0.00");
  setSafeHtml("valRemainingTarget", "Enter PIN to view");
  setSafeText("valPersonalRec", "Enter PIN to view");

  const pIn = document.getElementById("pinCode"); if (pIn) pIn.value = "";
  const pOv = document.getElementById("pinOverlay"); if (pOv) pOv.style.display = "flex";
  const mP = document.getElementById("managerPanel"); if (mP) mP.style.display = "none";
}

// --- GOOGLE SPREADSHEET LIVE AUTOMATION ENGINE ---
async function refreshLiveData() {
  setSafeHtml("lastUpdated", "🔄 Syncing with Google Sheet...");
  await loadData();
}

async function loadData() {
  if (!API_URL) return;
  try {
    // Cache buster guarantees fresh query directly to Google Sheets API/Apps Script
    const fetchUrl = API_URL + (API_URL.indexOf('?') >= 0 ? '&' : '?') + '_t=' + Date.now();
    const res = await fetch(fetchUrl, { redirect: "follow", cache: "no-store" });
    if (!res.ok) throw new Error("HTTP error " + res.status);
    const sheetJson = await res.json();
    
    if (sheetJson && sheetJson.teammates && sheetJson.dailySummary) {
      // Smart Merge Guard: Prevent incoming zero/blank MTD from wiping valid data
      for (const tmName in sheetJson.teammates) {
        const incoming = sheetJson.teammates[tmName];
        const existing = (liveSheetData && liveSheetData.teammates && liveSheetData.teammates[tmName]) || (BASELINE_FEED.teammates && BASELINE_FEED.teammates[tmName]) || {};
        if (Number(incoming.mtdTs || 0) <= 0 && Number(existing.mtdTs || 0) > 0) {
          incoming.mtdTs = existing.mtdTs;
          incoming.mtdHb = existing.mtdHb;
          incoming.mtdHm = existing.mtdHm;
          incoming.mtdCust = existing.mtdCust;
          incoming.mtdCommission = existing.mtdCommission;
        }
      }
      liveSheetData = sheetJson;
      try {
        localStorage.setItem("pmg_live_feed_cache", JSON.stringify(sheetJson));
      } catch(e) {}
      
      const syncTime = sheetJson.updatedAt || new Date().toLocaleTimeString();
      setSafeHtml("lastUpdated", `🟢 Live Sheet Connected • ${syncTime}`);
      
      const bDir = document.getElementById("btnDlDirector");
      if (bDir && liveSheetData.directorsReportDriveUrl) bDir.href = liveSheetData.directorsReportDriveUrl;
      const bTm = document.getElementById("btnDlTeammate");
      if (bTm && liveSheetData.teammatesGapDriveUrl) bTm.href = liveSheetData.teammatesGapDriveUrl;

      if (liveSheetData.hbQuizBank && liveSheetData.hbQuizBank.length > 0 && typeof sanitizeQuizItem === 'function') {
        HB_QUIZ_BANK = liveSheetData.hbQuizBank.map(sanitizeQuizItem);
      }

      renderOutletMission();
      renderUserDashboard();
      renderTeammatesTable();
      renderCongratsPreview();
      if (typeof checkDailyTargetFeast === 'function') checkDailyTargetFeast();
      refreshAllCoinDisplays();
    } else {
      throw new Error("Invalid response format from Google Sheet");
    }
  } catch (e) {
    console.warn("Live sync status:", e);
    const cachedTime = (liveSheetData && liveSheetData.updatedAt) ? liveSheetData.updatedAt : "Offline Baseline";
    setSafeHtml("lastUpdated", `⚠️ Offline Mode • ${cachedTime} <button onclick="refreshLiveData()" style="background:none;border:none;cursor:pointer;color:var(--primary);text-decoration:underline;">🔄 Retry</button>`);
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

  const day = s.dayOfMonth || 7;
  const expTsPace = (tsTarget / 30) * day;
  const expHbPace = (hbTier3 / 30) * day;
  const tsDiff = mtdTs - expTsPace;
  const hbDiff = mtdHb - expHbPace;

  const pBadge = document.getElementById("outletTsPacingBadge");
  if (pBadge) {
    pBadge.innerHTML = tsDiff >= 0 ? 
      `<span class="status-badge badge-ontrack">🟢 ON TRACK (+RM ${Math.abs(tsDiff).toFixed(0)} ahead of Day ${day} pace)</span>` : 
      `<span class="status-badge badge-behind">⚠️ -RM ${Math.abs(tsDiff).toFixed(0)} vs Day ${day} pace</span>`;
  }

  const hbBadge = document.getElementById("outletHbPacingBadge");
  if (hbBadge) {
    hbBadge.innerHTML = hbDiff >= 0 ? 
      `<span class="status-badge badge-ahead">🚀 AHEAD (+RM ${Math.abs(hbDiff).toFixed(0)} vs Day ${day} Tier 3 pace)</span>` : 
      `<span class="status-badge badge-behind">⚡ PUSH NEEDED (-RM ${Math.abs(hbDiff).toFixed(0)} vs Day ${day} Tier 3 pace)</span>`;
  }

  const statusBanner = document.getElementById("rewardStatusBanner");
  if (statusBanner) {
    if (mtdHb >= hbTier3) {
      statusBanner.innerHTML = "🏆 <b>TIER 3 MAX REWARD UNLOCKED!</b> Full RM 500.00 cash bonus achieved for each teammate!";
    } else if (mtdHb >= hbTier2) {
      const rem = hbTier3 - mtdHb;
      statusBanner.innerHTML = `🎉 <b>TIER 2 UNLOCKED (+RM 375 reward)!</b> RM ${rem.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})} more to unlock <b>TIER 3 (+RM 500 reward)</b>!`;
    } else if (mtdHb >= hbTier1) {
      const rem = hbTier2 - mtdHb;
      statusBanner.innerHTML = `🎉 <b>TIER 1 UNLOCKED (+RM 250 reward)!</b> RM ${rem.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})} more to unlock <b>TIER 2 (+RM 375 reward)</b>!`;
    } else {
      const rem = hbTier1 - mtdHb;
      statusBanner.innerHTML = `🎯 <b>RM ${rem.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})} more in HB</b> to unlock <b>TIER 1 (RM 250 reward per person)</b>!`;
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
  let html = "";
  for (const [name, val] of Object.entries(liveSheetData.teammates)) {
    let hits = [];
    if (val.dailyTs >= val.dailyTsTarget) hits.push("TS");
    if (val.dailyHb >= val.dailyHbTarget) hits.push("HB");
    if (val.dailyHm >= val.dailyHmTarget) hits.push("HM");
    if (hits.length > 0) {
      html += `• <b>${name.split(" ")[0]}</b> - Hit target for: ${hits.join(", ")}<br>`;
    }
  }
  setSafeHtml("congratsPreview", html || "No target hits recorded today.");
}

function renderTeammatesTable() {
  if (!liveSheetData || !liveSheetData.teammates || !currentUser || currentUser.role !== "manager") return;
  const tbody = document.querySelector("#teammatesTable tbody");
  if (!tbody) return;
  tbody.innerHTML = "";
  for (const [name, val] of Object.entries(liveSheetData.teammates)) {
    const todayTsText = (Number(val.dailyTs || 0) > 0) ? `RM ${Number(val.dailyTs).toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}` : `<span style="color:#888;">Off (RM 0)</span>`;
    const todayHbText = (Number(val.dailyHb || 0) > 0) ? `RM ${Number(val.dailyHb).toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}` : `<span style="color:#888;">-</span>`;
    const mtdHbPct = val.mtdTs > 0 ? ((val.mtdHb / val.mtdTs) * 100).toFixed(0) + "%" : "0%";
    
    tbody.innerHTML += `<tr>
      <td><b>${name}</b><br><span style="font-size:0.65rem; color:#666;">${val.role || 'Staff'}</span></td>
      <td>${todayTsText}</td>
      <td>${todayHbText}</td>
      <td style="font-weight:700; color:var(--primary-dark);">RM ${Number(val.mtdTs || 0).toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}</td>
      <td style="font-weight:700; color:#00796b;">RM ${Number(val.mtdHb || 0).toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}<br><span style="font-size:0.65rem; color:#666;">${mtdHbPct}</span></td>
      <td>${val.mtdCust || 0}</td>
    </tr>`;
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

  const day = s.dayOfMonth || 14;
  const expTsPace = (331000 / 30) * day;
  const expHbPace = (171800 / 30) * day;
  const expHmPace = (33100 / 30) * day;

  const tsStatus = mtdTs >= expTsPace ? `ON TRACK 🟢 (+RM ${(mtdTs - expTsPace).toFixed(0)} vs Day ${day} pace)` : `PUSH NEEDED ⚡ (-RM ${(expTsPace - mtdTs).toFixed(0)} vs Day ${day} pace)`;
  const hbStatus = mtdHb >= expHbPace ? `ON TRACK 🚀 (+RM ${(mtdHb - expHbPace).toFixed(0)} vs Day ${day} Tier 3 pace)` : `PUSH NEEDED ⚡ (-RM ${(expHbPace - mtdHb).toFixed(0)} vs Day ${day} Tier 3 pace)`;
  const hmStatus = mtdHm >= expHmPace ? `AHEAD 🚀 (+RM ${(mtdHm - expHmPace).toFixed(0)} vs Day ${day} pace)` : `PUSH NEEDED ⚡ (-RM ${(expHmPace - mtdHm).toFixed(0)} vs Day ${day} pace)`;

  let text = `Date of briefing: ${s.date || '14-Sep-2026'}\n\n`;
  text += `Target achievement:\n`;
  text += `TS: RM ${mtdTs.toFixed(2)} / RM 331,000 (${tsPct}%) - ${tsStatus}\n`;
  text += `HB: RM ${mtdHb.toFixed(2)} / RM 171,800 (${hbPct}%) - ${hbStatus}\n`;
  text += `HM: RM ${mtdHm.toFixed(2)} / RM 33,100 (${hmPct}%) - ${hmStatus}\n\n`;

  text += `Personal target per day:\n`;
  text += `Pharmacist & Assistant BM:\n`;
  text += `TS: RM 1544.67 - 1655.00 | HB: RM 801.73 - 859.00 | HM: RM 154.47 - 165.50\n\n`;

  text += `Pharmacist Assistants:\n`;
  text += `TS: RM 1434.33 | HB: RM 744.47 | HM: RM 143.43\n\n`;

  text += `🏆 Congratulation board (for those who hit personal target)\n`;
  for (const [name, val] of Object.entries(liveSheetData.teammates)) {
    let hits = [];
    if (val.dailyTs >= val.dailyTsTarget) hits.push("TS");
    if (val.dailyHb >= val.dailyHbTarget) hits.push("HB");
    if (val.dailyHm >= val.dailyHmTarget) hits.push("HM");
    if (hits.length > 0) {
      const callName = name.includes("William") ? "William" : (name.includes("Farizin") ? "Farizin" : name.split(" ")[0]);
      text += `• ${callName} - Hit target for: ${hits.join(", ")}\n`;
    }
  }
  text += `\n`;

  text += `🎯 Outlet Strategic Priorities & Action Plans:\n`;
  text += `1. Dual House Brand Pairing: Proactively pair localized joint pain queries with Arthri-Flex + Taiwan Herbal Ginger Patches.\n`;
  text += `2. Sustain HB Basket Size above RM 20.00+ by routinely recommending 30-day course maintenance packs.\n`;
  text += `3. Active Checkout PWP conversion on transactions >RM 30.\n\n`;

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
  // Immediately query Google Sheet on page launch
  loadData();
};

// Continuous Automation: Periodic background polling every 60 seconds
setInterval(() => {
  loadData();
}, 60000);

// Continuous Automation: Auto-fetch when user switches back to this tab
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible") {
    loadData();
  }
});
window.addEventListener("focus", () => {
  loadData();
});
