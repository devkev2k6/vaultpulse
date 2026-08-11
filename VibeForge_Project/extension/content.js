(function () {
  if (document.getElementById("vaultpulse-companion-badge")) return;

  // Create floating widget container
  const container = document.createElement("div");
  container.id = "vaultpulse-companion-badge";
  container.style.position = "fixed";
  container.style.bottom = "20px";
  container.style.right = "20px";
  container.style.zIndex = "999999";
  container.style.backgroundColor = "#101216";
  container.style.border = "1px solid #1F242D";
  container.style.color = "#F0F2F5";
  container.style.padding = "12px 16px";
  container.style.fontFamily = "'JetBrains Mono', monospace, sans-serif";
  container.style.fontSize = "12px";
  container.style.boxShadow = "0 10px 30px rgba(0,0,0,0.5)";
  container.style.display = "flex";
  container.style.alignItems = "center";
  container.style.gap = "12px";
  container.style.cursor = "pointer";

  container.innerHTML = `
    <div style="width: 10px; height: 10px; background-color: #ADFF2F; border-radius: 50%;"></div>
    <div>
      <div style="font-weight: bold; color: #ADFF2F; text-transform: uppercase; font-size: 11px;">VaultPulse AI Shield</div>
      <div style="font-size: 10px; color: #9CA3AF;">Seller Trust: <strong style="color:#ADFF2F">94/100</strong> • Save ₹249</div>
    </div>
  `;

  container.addEventListener("click", () => {
    window.open("http://localhost:3000", "_blank");
  });

  document.body.appendChild(container);
})();
