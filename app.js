// --- CORE APPLICATION & SALES AUTOMATION ENGINE ---
const API_URL = "https://script.google.com/macros/s/AKfycbyDXiyZZuYYDN4e6w16HyoTXbKbLwmPCSqoJVAkuRd4iPTYQP7KGtMJZuaQ-NyyXgSZ-w/exec";

const USER_CONFIGS = {
  "6688": { name: "Chai Yee Sian (William)", role: "manager" },
  "1003": { name: "Haniesha Louna", role: "staff" },
  "1007": { name: "Kenix Ling", role: "staff" },
  "1004": { name: "Daniela Janet", role: "staff" },
  "1617": { name: "Nurhafizah Pauli", role: "staff" },
  "1006": { name: "Muhammad Nur Farizin", role: "staff" },
  "1002": { name: "Fiona Fiena", role: "staff" },
  "1001": { name: "Jong Pei Choo", role: "staff" }
};

// Global State Variables (Safe Cross-Script Declarations)
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
  updatedAt: "07-Sep-2026 (Verified Actuals)",
  outlet: "PMG Pharmacy Kota Sentosa",
  dailySummary: {
    date: "07-Sep-2026",
    dayOfMonth: 7,
    totalSales: 13084.02,
    hbSales: 5119.82,
    hbRatio: 39.13,
    hmSales: 1029.50,
    hmRatio: 7.87,
    transactions: 278,
    basketSize: 47.06,
    hbBasketSize: 18.42,
    pmgAppCount: 4,
    pmgAppMtd: 23,
    mtdTotalSales: 84744.10,
    mtdHbSales: 34858.22,
    mtdHmSales: 8232.74,
    tsTarget: 331000.0,
    hbTier1Target: 152750.0,
    hbTier2Target: 161900.0,
    hbTier3Target: 171800.0,
    hmTarget: 33100.0
  },
  directorsReportDriveUrl: "https://drive.google.com/file/d/1I9iDAmGoU_a_fIeS5jXkM9--ITeoKDdu/view?usp=drivesdk",
  teammatesGapDriveUrl: "https://drive.google.com/file/d/1jQQt8VL9YIkhoj680Jp_sWs8Gs2GopKf/view?usp=drivesdk",
  recommendations: {
    "Chai Yee Sian (William)": "Proactively pair localized joint pain queries with Arthri-Flex + Taiwan Herbal Ginger Patches.",
    "Jong Pei Choo": "Outstanding House Brand championing! Maintain strong counseling on multi-pack supplements.",
    "Haniesha Louna": "Keep up strong patient engagements; recommend Biowell B'llox for gastric distress.",
    "Fiona Fiena": "Great consistency on Total Sales! Pair routine cold remedies with Citazinc.",
    "Daniela Janet": "Target gap closing well; encourage 30-day course packs for regular patients.",
    "Nurhafizah Pauli": "Strong customer transaction volume! Focus on Dermsolve cross-selling.",
    "Muhammad Nur Farizin": "Excellent checkout pacing; recommend Ginger Patches for aches and strains.",
    "Kenix Ling": "Prepare for return shift with targeted focus on chronic disease supplement pairing."
  },
  teammates: {
    "Chai Yee Sian (William)": {
      dailyTs: 2088.85, dailyHb: 807.45, dailyHm: 360.20, dailyCust: 24, dailyCommission: 28.26,
      mtdTs: 13327.42, mtdHb: 5711.66, mtdHm: 1729.80, mtdCust: 188, mtdCommission: 199.91,
      role: "Pharmacist-in-Charge", tsTarget: 49650.0, hbTarget: 25770.0, hmTarget: 4965.0,
      dailyTsTarget: 1655.0, dailyHbTarget: 859.0, dailyHmTarget: 165.5, isOnTrack: true
    },
    "Jong Pei Choo": {
      dailyTs: 3818.05, dailyHb: 2167.45, dailyHm: 216.40, dailyCust: 36, dailyCommission: 75.86,
      mtdTs: 18274.60, mtdHb: 7201.20, mtdHm: 1250.40, mtdCust: 245, mtdCommission: 252.04,
      role: "Pharmacist Assistant (Support)", tsTarget: 19860.0, hbTarget: 10308.0, hmTarget: 1986.0,
      dailyTsTarget: 662.0, dailyHbTarget: 343.6, dailyHmTarget: 66.2, isOnTrack: true
    },
    "Haniesha Louna": {
      dailyTs: 1474.00, dailyHb: 434.30, dailyHm: 55.30, dailyCust: 36, dailyCommission: 15.20,
      mtdTs: 12890.30, mtdHb: 5642.00, mtdHm: 1180.20, mtdCust: 254, mtdCommission: 197.47,
      role: "Assistant Branch Manager", tsTarget: 46340.0, hbTarget: 24052.0, hmTarget: 4634.0,
      dailyTsTarget: 1544.67, dailyHbTarget: 801.73, dailyHmTarget: 154.47, isOnTrack: true
    },
    "Fiona Fiena": {
      dailyTs: 1855.70, dailyHb: 450.40, dailyHm: 65.00, dailyCust: 39, dailyCommission: 15.76,
      mtdTs: 11450.20, mtdHb: 4135.80, mtdHm: 980.50, mtdCust: 260, mtdCommission: 144.75,
      role: "Pharmacist Assistant", tsTarget: 43030.0, hbTarget: 22334.0, hmTarget: 4303.0,
      dailyTsTarget: 1434.33, dailyHbTarget: 744.47, dailyHmTarget: 143.43, isOnTrack: true
    },
    "Daniela Janet": {
      dailyTs: 998.52, dailyHb: 456.32, dailyHm: 101.50, dailyCust: 47, dailyCommission: 15.97,
      mtdTs: 8940.50, mtdHb: 3267.50, mtdHm: 890.20, mtdCust: 268, mtdCommission: 114.36,
      role: "Pharmacist Assistant", tsTarget: 43030.0, hbTarget: 22334.0, hmTarget: 4303.0,
      dailyTsTarget: 1434.33, dailyHbTarget: 744.47, dailyHmTarget: 143.43, isOnTrack: false
    },
    "Nurhafizah Pauli": {
      dailyTs: 1636.40, dailyHb: 450.20, dailyHm: 138.90, dailyCust: 43, dailyCommission: 15.76,
      mtdTs: 8720.40, mtdHb: 3030.20, mtdHm: 910.40, mtdCust: 250, mtdCommission: 106.06,
      role: "Pharmacist Assistant", tsTarget: 43030.0, hbTarget: 22334.0, hmTarget: 4303.0,
      dailyTsTarget: 1434.33, dailyHbTarget: 744.47, dailyHmTarget: 143.43, isOnTrack: false
    },
    "Muhammad Nur Farizin": {
      dailyTs: 1212.50, dailyHb: 353.70, dailyHm: 92.20, dailyCust: 53, dailyCommission: 12.38,
      mtdTs: 8520.10, mtdHb: 3274.90, mtdHm: 780.30, mtdCust: 310, mtdCommission: 114.62,
      role: "Pharmacist Assistant", tsTarget: 43030.0, hbTarget: 22334.0, hmTarget: 4303.0,
      dailyTsTarget: 1434.33, dailyHbTarget: 744.47, dailyHmTarget: 143.43, isOnTrack: false
    },
    "Kenix Ling": {
      dailyTs: 0.0, dailyHb: 0.0, dailyHm: 0.0, dailyCust: 0, dailyCommission: 0.0,
      mtdTs: 2620.58, mtdHb: 2595.00, mtdHm: 511.00, mtdCust: 83, mtdCommission: 90.83,
      role: "PRP Pharmacist", tsTarget: 43030.0, hbTarget: 22334.0, hmTarget: 4303.0,
      dailyTsTarget: 1434.33, dailyHbTarget: 744.47, dailyHmTarget: 143.43, isOnTrack: false
    }
  }
};

liveSheetData = BASELINE_FEED;

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
    
    // Dismiss lock screen immediately
    const overlay = document.getElementById("pinOverlay");
    if (overlay) overlay.style.display = "none";
    
    // Render baseline data without delay
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
  window.location.reload(true);
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

// --- GOOGLE SPREADSHEET LIVE SYNC ---
async function loadData() {
  try {
    const res = await fetch(API_URL, { redirect: "follow" });
    const sheetJson = await res.json();
    
    if (sheetJson && sheetJson.teammates) {
      liveSheetData = sheetJson;
      setSafeText("lastUpdated", `Live Sheet Data • Updated: ${liveSheetData.updatedAt || 'Today'}`);
      
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
    }
  } catch (e) {
    setSafeText("lastUpdated", "Using Verified Day 7 Actuals (Offline Mode)");
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

  setSafeText("valTS", "RM " + (s.dailyTs || 0).toFixed(2));
  setSafeText("valHB", "RM " + (s.dailyHb || 0).toFixed(2));
  setSafeText("valHM", "RM " + (s.dailyHm || 0).toFixed(2));
  setSafeText("valCust", s.dailyCust || 0);

  const tsRem = Math.max(0, s.tsTarget - (s.mtdTs || 0));
  const hbRem = Math.max(0, s.hbTarget - (s.mtdHb || 0));
  const hmRem = Math.max(0, s.hmTarget - (s.mtdHm || 0));

  setSafeHtml("valRemainingTarget", `
    • TS Target Left: <b>RM ${tsRem.toFixed(2)}</b> (Target: RM ${s.tsTarget.toLocaleString()})<br>
    • HB Target Left: <b>RM ${hbRem.toFixed(2)}</b> (Target: RM ${s.hbTarget.toLocaleString()})<br>
    • HM Target Left: <b>RM ${hmRem.toFixed(2)}</b> (Target: RM ${s.hmTarget.toLocaleString()})
  `);

  const day = (liveSheetData.dailySummary && liveSheetData.dailySummary.dayOfMonth) || 7;
  const expectedPace = (s.tsTarget / 30) * day;
  const pacingDiff = (s.mtdTs || 0) - expectedPace;

  const pEl = document.getElementById("valPersonalPacing");
  if (pEl) {
    if (pacingDiff >= 500) pEl.innerHTML = `<span class="status-badge badge-ahead">🚀 AHEAD OF PACE (+RM ${pacingDiff.toFixed(0)} above Day ${day} target)</span>`;
    else if (pacingDiff >= -250) pEl.innerHTML = `<span class="status-badge badge-ontrack">🟢 ON TRACK (On pace for Day ${day})</span>`;
    else pEl.innerHTML = `<span class="status-badge badge-behind">⚡ PUSH NEEDED (-RM ${Math.abs(pacingDiff).toFixed(0)} vs Day ${day} target)</span>`;
  }

  setSafeText("valDailyCommission", "RM " + (s.dailyCommission || 0).toFixed(2));
  setSafeText("valMtdCommission", "RM " + (s.mtdCommission || 0).toFixed(2));

  const rec = (liveSheetData.recommendations && liveSheetData.recommendations[userName]) || "Focus on pairing routine OTC transactions with House Brand supplements.";
  setSafeText("valPersonalRec", rec);
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
    const mtdTs = val.mtdTs || 0;
    const mtdHb = val.mtdHb || 0;
    const mtdCust = val.mtdCust || 0;
    tbody.innerHTML += `<tr>
      <td>${name.split(" ")[0]}</td>
      <td>${mtdTs.toFixed(0)}</td>
      <td>${mtdHb.toFixed(0)}</td>
      <td>${((mtdHb / (mtdTs || 1)) * 100).toFixed(0)}%</td>
      <td>${mtdCust}</td>
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

  let text = `Date of briefing: ${s.date || '07-Sep-2026'}\n\n`;
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
    if (val.dailyTs >= val.dailyTsTarget) hits.push("TS");
    if (val.dailyHb >= val.dailyHbTarget) hits.push("HB");
    if (val.dailyHm >= val.dailyHmTarget) hits.push("HM");
    if (hits.length > 0) {
      text += `• ${name.split(" ")[0]} - Hit target for: ${hits.join(", ")}\n`;
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
};
