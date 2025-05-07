import { ready } from '@src/utils/ready';

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  // 保存内容
  if (request.action === 'save') {
    const { apiBaseUrl, apiKey, namespaceId, spaceType } = request.option;
    chrome.runtime.sendMessage(
      {
        apiKey,
        spaceType,
        namespaceId,
        action: 'collect',
        baseUrl: apiBaseUrl,
        pageUrl: document.URL,
        pageTitle: document.title,
        data: document.documentElement.outerHTML,
      },
      sendResponse,
    );
  }
  return true;
});

// 登录页面
if (location.search === '?from=extension') {
  ready(() => {
    chrome.storage.sync.get('apiKey', data => {
      if (data.apiKey) {
        return;
      }
      document.body.setAttribute('data-from-extension', 'true');
      const observer = new MutationObserver(mutations => {
        for (const mutation of mutations) {
          if (mutation.type === 'attributes' && mutation.attributeName === 'data-token') {
            const token = document.body.getAttribute('data-token');
            if (token) {
              observer.disconnect();
              document.body.removeAttribute('data-from-extension');
              document.body.removeAttribute('data-token');
              chrome.runtime.sendMessage({
                action: 'saveToken',
                token,
              });
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
