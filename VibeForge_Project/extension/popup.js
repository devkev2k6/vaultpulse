document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("openDashboard");
  if (btn) {
    btn.addEventListener("click", () => {
      chrome.tabs.create({ url: "http://localhost:3000" });
    });
  }
});
