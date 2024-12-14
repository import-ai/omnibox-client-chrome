chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "sendHTML") {
    const apiUrl = `${request.baseUrl}/html`; // Use the user-defined base URL
    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ html: request.data })
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