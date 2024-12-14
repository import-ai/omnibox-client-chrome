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
  chrome.runtime.sendMessage(
    { action: "sendHTML", data: htmlContent },
    (response) => {
      if (response && response.status === "success") {
        console.log("HTML sent successfully:", response.data);
      } else {
        console.error("Failed to send HTML:", response ? response.error : 'No response');
      }
    }
  );
}