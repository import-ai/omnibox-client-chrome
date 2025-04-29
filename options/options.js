document.getElementById('saveButton').addEventListener('click', () => {
  const apiBaseUrl = document.getElementById('apiBaseUrl').value;
  const namespace = document.getElementById('namespace').value;
  const spaceType = document.getElementById('spaceType').value;
  chrome.storage.sync.set({ apiBaseUrl, namespace, spaceType }, () => {
    alert('Settings saved');
  });
});

// Load the saved settings on options page load
document.addEventListener('DOMContentLoaded', () => {
  chrome.storage.sync.get(['apiBaseUrl', 'namespace', 'spaceType'], (data) => {
    if (data.apiBaseUrl) {
      document.getElementById('apiBaseUrl').value = data.apiBaseUrl;
    }
    if (data.namespace) {
      document.getElementById('namespace').value = data.namespace;
    }
    if (data.spaceType) {
      document.getElementById('spaceType').value = data.spaceType;
    }
  });
});
