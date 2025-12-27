chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "fetchPage") {
    fetch(request.url)
      .then(response => response.text())
      .then(html => sendResponse({html: html}))
      .catch(err => sendResponse({error: err.message}));
    return true; // Keeps the message channel open for async response
  }
});