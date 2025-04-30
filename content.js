// Content scripts can't access chrome.action directly
// We need to listen for messages from the background script instead
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getHTML') {
    const htmlContent = document.documentElement.innerHTML;
    sendResponse({ status: 'success', data: htmlContent });
  }
  return true; // Keep the message channel open for asynchronous response
});

function ready(callback) {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', callback);
  } else {
    callback();
  }
}

if (location.search === '?from=extension') {
  ready(() => {
    chrome.storage.sync.get('apiKey', (data) => {
      if (data.apiKey) {
        return;
      }
      document.body.setAttribute('data-from-extension', 'true');
      const observer = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
          if (
            mutation.type === 'attributes' &&
            mutation.attributeName === 'data-token'
          ) {
            const token = document.body.getAttribute('data-token');
            if (token) {
              observer.disconnect();
              document.body.removeAttribute('data-from-extension');
              document.body.removeAttribute('data-token');
              chrome.runtime.sendMessage(
                {
                  action: 'saveToken',
                  token,
                },
                () => {
                  alert('已登陆');
                }
              );
            }
          }
        }
      });
      observer.observe(document.body, {
        subtree: false,
        attributes: true,
        attributeFilter: ['data-token'],
      });
    });
  });
}
