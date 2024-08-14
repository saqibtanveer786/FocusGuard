chrome.webRequest.onBeforeRequest.addListener(
  (details) => {
    // console.log(details);
    chrome.storage.local.get(["urls"], (result) => {
      // console.log(result["urls"]);
      result["urls"].forEach((url) => {
        if (details.url.includes(url.url)) console.log("working");
        console.log(url.url);
        console.log(details.url);
      });
    });
  },
  { urls: ["<all_urls>"] }
);
