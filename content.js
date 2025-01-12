chrome.action.onClicked.addListener((tab) => {
    const htmlContent = document.documentElement.innerHTML;
    chrome.runtime.sendMessage(
      { action: "collect", data: htmlContent },
      (response) => {
        if (response.status === "success") {
          console.log("HTML sent successfully:", response.data);
        } else {
          console.error("Failed to send HTML:", response.error);
        }
      }
    );
  });