const scannedLinks = {};

function createMarker(el, malicious, stats) {
  const marker = document.createElement("span");
  marker.className = "phishing-hover-indicator";
  marker.style.marginLeft = "6px";
  marker.style.fontWeight = "bold";
  marker.style.fontSize = "14px";
  marker.style.cursor = "pointer";
  marker.style.position = "relative";

  if (malicious >= 1) marker.textContent = "🔴";
  else if (stats.suspicious >= 1) marker.textContent = "🟡";
  else marker.textContent = "🟢";

  const tooltip = document.createElement("div");
  tooltip.style.position = "absolute";
  tooltip.style.top = "120%";
  tooltip.style.left = "0";
  tooltip.style.backgroundColor = "#222";
  tooltip.style.color = "#fff";
  tooltip.style.padding = "6px";
  tooltip.style.fontSize = "12px";
  tooltip.style.borderRadius = "4px";
  tooltip.style.whiteSpace = "pre-line";
  tooltip.style.display = "none";
  tooltip.style.zIndex = 9999;

  const total = stats.harmless + stats.malicious + stats.suspicious + stats.undetected;
  tooltip.innerText = `VT Result:
Malicious: ${stats.malicious}
Suspicious: ${stats.suspicious}
Harmless: ${stats.harmless}
Undetected: ${stats.undetected}
Total Engines: ${total}`;

  marker.appendChild(tooltip);

  marker.addEventListener("mouseenter", () => {
    tooltip.style.display = "block";
  });
  marker.addEventListener("mouseleave", () => {
    tooltip.style.display = "none";
  });

  el.insertAdjacentElement("afterend", marker);
}

document.addEventListener("mouseover", (e) => {
  const el = e.target.closest("a[href^='http']");
  if (!el || scannedLinks[el.href]) return;

  scannedLinks[el.href] = "checking";

  const loader = document.createElement("span");
  loader.textContent = "🕐";
  loader.className = "phishing-hover-indicator";
  loader.style.marginLeft = "6px";
  loader.style.fontWeight = "bold";
  loader.style.fontSize = "14px";
  el.insertAdjacentElement("afterend", loader);

  chrome.runtime.sendMessage({ action: "scanLink", link: el.href }, (res) => {
    document.querySelectorAll(".phishing-hover-indicator").forEach(i => {
      if (i.previousSibling === el) i.remove();
    });

    if (res && res.stats) {
      scannedLinks[el.href] = res.stats.malicious;
      createMarker(el, res.stats.malicious, res.stats);
    } else {
      scannedLinks[el.href] = "error";
      const errorMarker = document.createElement("span");
      errorMarker.textContent = "❓";
      errorMarker.style.marginLeft = "6px";
      el.insertAdjacentElement("afterend", errorMarker);
    }
  });
});