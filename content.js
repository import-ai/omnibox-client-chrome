// Content scripts can't access chrome.action directly
// We need to listen for messages from the background script instead
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getHTML") {
    const htmlContent = document.documentElement.innerHTML;
    sendResponse({ status: "success", data: htmlContent });
  }
  return true; // Keep the message channel open for asynchronous response
});