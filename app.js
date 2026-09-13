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
      mtdTs: 14012.81, mtdHb: 6158.81, mtdHm: 1373.00, mtdCust
