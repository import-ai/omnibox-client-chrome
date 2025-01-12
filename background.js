chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "collect") {
    const apiUrl = `${request.baseUrl}/api/v1/tasks`; // Use the new endpoint for HTML tasks
    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${request.apiKey}`
      },
      body: JSON.stringify({
        function: "collect",
        html: request.data,
        url: request.pageUrl, // Include the current page's URL
        title: request.pageTitle, // Include the current page's title
        namespace: request.namespace,
        payload: {
          spaceType: request.spaceType
        }
      })
    })
    .then(response => response.json())
    .then(data => {
      console.log("Response from server:", data);
      sendResponse({ status: "success", data: data });
    })
    .catch(error => {
      console.error("Error:", error);
      sendResponse({ status: "error", error: error });
    });

    return true; // Indicates you wish to send a response asynchronously.
  }
});