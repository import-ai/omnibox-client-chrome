chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "sendHTML") {
    const apiUrl = `${request.baseUrl}/tasks/html`; // Use the new endpoint for HTML tasks
    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ 
        html: request.data,
        namespace_id: request.namespace_id,
        user_id: request.user_id
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