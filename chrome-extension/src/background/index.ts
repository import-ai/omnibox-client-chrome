import 'webextension-polyfill';
import axios from '@extension/shared/lib/utils/axios';

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'collect') {
    axios(`${request.baseUrl}/api/v1/wizard/collect`, {
      apiKey: request.apiKey,
      data: {
        html: request.data,
        url: request.pageUrl,
        title: request.pageTitle,
        space_type: request.spaceType,
        namespace_id: request.namespaceId,
      },
    })
      .then(data => {
        sendResponse({ data: data });
      })
      .catch(error => {
        sendResponse({ error: error.toString() });
      });
    return true;
  } else if (request.action === 'saveToken') {
    chrome.storage.sync.set({ apiKey: request.token }, () => {
      sendResponse();
      if (sender.tab && sender.tab.id) {
        chrome.tabs.remove(sender.tab.id);
      }
    });
    return true;
  }
  return;
});
