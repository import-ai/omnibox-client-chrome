document.getElementById('saveButton').addEventListener('click', () => {
  const apiBaseUrl = document.getElementById('apiBaseUrl').value;
  const apiKey = document.getElementById('apiKey').value;
  const namespace = document.getElementById('namespace').value;
  const spaceType = document.getElementById('spaceType').value;
  chrome.storage.sync.set({ apiBaseUrl, apiKey, namespace, spaceType }, () => {
    alert('Settings saved');
  });
});

// Load the saved settings on options page load
document.addEventListener('DOMContentLoaded', () => {
  chrome.storage.sync.get(['apiBaseUrl', 'apiKey', 'namespace', 'spaceType'], (data) => {
    if (data.apiBaseUrl) {
      document.getElementById('apiBaseUrl').value = data.apiBaseUrl;
    }
    if (data.apiKey) {
      document.getElementById('apiKey').value = data.apiKey;
    }
    if (data.namespace) {
      document.getElementById('namespace').value = data.namespace;
    }
    if (data.spaceType) {
      document.getElementById('spaceType').value = data.spaceType;
    }
  });
});