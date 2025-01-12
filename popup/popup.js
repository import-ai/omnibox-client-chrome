document.getElementById('collectButton').addEventListener('click', () => {
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    if (tabs[0].id) {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        function: extractHtmlAndSend,
        args: [tabs[0].url, tabs[0].title] // Pass the current page's URL and title
      });
    }
  });
});

function extractHtmlAndSend(pageUrl, pageTitle) {
  const htmlContent = document.documentElement.outerHTML;

  // Retrieve the stored API base URL, API key, namespace, and space type
  chrome.storage.sync.get(['apiBaseUrl', 'apiKey', 'namespace', 'spaceType'], (data) => {
    const { apiBaseUrl, apiKey, namespace, spaceType } = data;
    console.log({ apiBaseUrl, apiKey, namespace, spaceType, pageUrl, pageTitle });

    try {
      const url = new URL(apiBaseUrl);
      if (url.protocol !== "http:" && url.protocol !== "https:") {
        throw new Error("Invalid protocol");
      }
    } catch (e) {
      console.error("Invalid API base URL:", e.message);
      alert("Invalid API base URL. Please check the settings.");
      return;
    }

    chrome.runtime.sendMessage(
      { action: "collect", data: htmlContent, baseUrl: apiBaseUrl, apiKey, namespace, spaceType, pageUrl, pageTitle },
      (response) => {
        if (response && response.status === "success") {
          console.log("HTML sent successfully:", response.data);
        } else {
          const errorMessage = response ? response.error : 'No response';
          console.error("Failed to send HTML:", errorMessage);
          alert(`Failed to send HTML: ${JSON.stringify(errorMessage)}`);
        }
      }
    );
  });
}