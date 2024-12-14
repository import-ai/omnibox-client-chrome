document.getElementById('saveButton').addEventListener('click', () => {
    const apiBaseUrl = document.getElementById('apiBaseUrl').value;
    chrome.storage.sync.set({ apiBaseUrl: apiBaseUrl }, () => {
      console.log('API base URL saved:', apiBaseUrl);
      alert('Settings saved');
    });
  });
  
  // Load the saved API base URL on options page load
  document.addEventListener('DOMContentLoaded', () => {
    chrome.storage.sync.get('apiBaseUrl', (data) => {
      if (data.apiBaseUrl) {
        document.getElementById('apiBaseUrl').value = data.apiBaseUrl;
      }
    });
  });