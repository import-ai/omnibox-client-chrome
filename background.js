chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "sendHTML") {
      // Send HTML data to your web service API
      fetch("http://localhost:8000/api/v1/html", {
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