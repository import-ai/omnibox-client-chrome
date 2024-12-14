document.getElementById('sendHtmlButton').addEventListener('click', () => {
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    if (tabs[0].id) {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        function: extractHtmlAndSend
      });
    }
  });
});

function extractHtmlAndSend() {
  const htmlContent = document.documentElement.outerHTML;

  // Retrieve the stored API base URL
  chrome.storage.sync.get('apiBaseUrl', (data) => {
    const apiBaseUrl = data.apiBaseUrl;
    
    chrome.runtime.sendMessage(
      { action: "sendHTML", data: htmlContent, baseUrl: apiBaseUrl },
      (response) => {
        if (response && response.status === "success") {
          console.log("HTML sent successfully:", response.data);
        } else {
          console.error("Failed to send HTML:", response ? response.error : 'No response');
        }
      }
    );
  });
}