chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "collect") {
    const apiUrl = `${request.baseUrl}/api/v1/tasks/collect`; // Use the new endpoint for HTML tasks
    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${request.apiKey}`
      },
      body: JSON.stringify({
        html: request.data,
        url: request.pageUrl, // Include the current page's URL
        title: request.pageTitle, // Include the current page's title
        namespace: request.namespace,
        spaceType: request.spaceType
      })
    })
    .then(response => response.json())
    .then(data => {
      sendResponse({ status: "success", data: data });
    })
    .catch(error => {
      console.error("Error:", error);
      sendResponse({ status: "error", error: error.toString() });
    });

    return true; // Indicates you wish to send a response asynchronously.
  }
});

// Remove the chrome.action.onClicked listener as it conflicts with the popup
// The popup.js handles the click functionality instead