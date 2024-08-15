const haveToBlockSite = (urls, userRequestedUrl) => {
  return urls.some((ele) => {
    return userRequestedUrl.includes(ele.url);
  });
};

chrome.webRequest.onBeforeRequest.addListener(
  async (details) => {
    const result = await chrome.storage.local.get(["urls"]);
    if (result["urls"]) {
      if (haveToBlockSite(result["urls"], details.url)) {
        chrome.tabs.update(details.tabId, {
          url: "https://saqibtanveer786.github.io/Todo-List-App/",
        });
      }
    }
  },
  { urls: ["<all_urls>"] }
);
