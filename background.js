const VIRUSTOTAL_API_KEY = "YOUR_API_KEY";

async function checkUrlWithVirusTotal(url) {
  const urlId = btoa(url).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");

  const headers = {
    "x-apikey": VIRUSTOTAL_API_KEY
  };

  // Try to get cached report
  const reportResponse = await fetch(`https://www.virustotal.com/api/v3/urls/${urlId}`, {
    method: "GET",
    headers
  });

  if (reportResponse.ok) {
    const data = await reportResponse.json();
    const stats = data.data.attributes.last_analysis_stats;
    return stats;
  }

  // Fallback: submit new scan
  const submitResponse = await fetch("https://www.virustotal.com/api/v3/urls", {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: `url=${encodeURIComponent(url)}`
  });

  if (!submitResponse.ok) throw new Error("VirusTotal scan failed");

  const submitData = await submitResponse.json();
  const analysisId = submitData.data.id;

  const result = await fetch(`https://www.virustotal.com/api/v3/analyses/${analysisId}`, {
    method: "GET",
    headers
  });

  if (!result.ok) throw new Error("Analysis fetch failed");

  const analysisData = await result.json();
  return analysisData.data.attributes.stats;
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "scanLink" && request.link) {
    checkUrlWithVirusTotal(request.link)
      .then(stats => sendResponse({ stats }))
      .catch(error => {
        console.error("VT error:", error);
        sendResponse({ error: error.message });
      });
    return true;
  }
});
