chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'collect') {
    const apiUrl = `${request.baseUrl}/api/v1/wizard/collect`;
    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${request.apiKey}`,
      },
      body: JSON.stringify({
        html: request.data,
        url: request.pageUrl,
        title: request.pageTitle,
        namespaceId: request.namespaceId,
        spaceType: request.spaceType,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        sendResponse({ status: 'success', data: data });
      })
      .catch((error) => {
        console.error('Error:', error);
        sendResponse({ status: 'error', error: error.toString() });
      });
    return true; // Indicates you wish to send a response asynchronously.
  } else if (request.action === 'saveToken') {
    chrome.storage.sync.set({ apiKey: request.token }, () => {
      sendResponse();
      setTimeout(() => {
        chrome.tabs.remove(sender.tab.id);
      }, 2000);
    });
    return true;
  }
});

// Remove the chrome.action.onClicked listener as it conflicts with the popup
// The popup.js handles the click functionality instead
