function extractHtmlAndSend(pageUrl, pageTitle) {
  const htmlContent = document.documentElement.outerHTML;

  // Retrieve the stored API base URL, API key, namespaceId, and space type
  chrome.storage.sync.get(
    ['apiBaseUrl', 'apiKey', 'namespaceId', 'spaceType'],
    (data) => {
      const { apiBaseUrl, apiKey, namespaceId, spaceType } = data;

      try {
        const url = new URL(apiBaseUrl);
        if (url.protocol !== 'http:' && url.protocol !== 'https:') {
          throw new Error('Invalid protocol');
        }
      } catch (e) {
        console.error('Invalid API base URL:', e.message);
        alert('Invalid API base URL. Please check the settings.');
        return;
      }

      chrome.runtime.sendMessage(
        {
          action: 'collect',
          data: htmlContent,
          baseUrl: apiBaseUrl,
          apiKey,
          namespaceId,
          spaceType,
          pageUrl,
          pageTitle,
        },
        (response) => {
          if (response && response.status === 'success') {
            alert('HTML sent successfully.');
          } else {
            const errorMessage = response ? response.error : 'No response';
            console.error('Failed to send HTML:', errorMessage);
            alert(`Failed to send HTML: ${JSON.stringify(errorMessage)}`);
          }
        }
      );
    }
  );
}

const collectFN = () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs[0].id) {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        function: extractHtmlAndSend,
        args: [tabs[0].url, tabs[0].title], // Pass the current page's URL and title
      });
    }
  });
};
const loginFN = () => {
  chrome.storage.sync.get('apiBaseUrl', (data) => {
    chrome.tabs.create({
      url: `${data.apiBaseUrl}/user/login?from=extension`,
    });
  });
};
const optionFn = () => {
  chrome.runtime.openOptionsPage();
};

const option = document.getElementById('optionButton');
const login = document.getElementById('loginButton');
const collect = document.getElementById('collectButton');
if (collect && login && option) {
  collect.addEventListener('click', collectFN);
  login.addEventListener('click', loginFN);
  option.addEventListener('click', optionFn);
  chrome.storage.sync.get(['apiKey', 'apiBaseUrl'], (data) => {
    if (!data.apiBaseUrl) {
      collect.style.display = 'none';
      option.style.display = 'block';
      return;
    }
    if (!data.apiKey) {
      collect.style.display = 'none';
      login.style.display = 'block';
    }
  });
}
