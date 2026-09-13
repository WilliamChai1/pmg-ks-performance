
// KS Pulse Portal app.js
const SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vS2p3I4_vR6oH4F_K-t_J9Z8lC/pub?output=csv";
const POLL_INTERVAL = 30000; // 30 seconds
 
async function fetchData() {
  try {
    // Cache busting with timestamp
    const response = await fetch(`${SHEET_URL}&t=${new Date().getTime()}`);
    const data = await response.text();
    processData(data);
  } catch (error) {
    console.error("Automation error:", error);
  }
}
 
function startAutoPolling() {
  fetchData();
  setInterval(fetchData, POLL_INTERVAL);
}
 
window.onload = startAutoPolling;

