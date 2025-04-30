document.getElementById('saveButton').addEventListener('click', () => {
  const apiBaseUrl = document.getElementById('apiBaseUrl').value;
  const namespaceId = document.getElementById('namespaceId').value;
  const spaceType = document.getElementById('spaceType').value;
  chrome.storage.sync.set({ apiBaseUrl, namespaceId, spaceType }, () => {
    alert('Settings saved');
  });
});

// Load the saved settings on options page load
document.addEventListener('DOMContentLoaded', () => {
  chrome.storage.sync.get(['apiBaseUrl', 'namespaceId', 'spaceType'], (data) => {
    if (data.apiBaseUrl) {
      document.getElementById('apiBaseUrl').value = data.apiBaseUrl;
    }
    if (data.namespaceId) {
      document.getElementById('namespaceId').value = data.namespaceId;
    }
    if (data.spaceType) {
      document.getElementById('spaceType').value = data.spaceType;
    }
  });
});
