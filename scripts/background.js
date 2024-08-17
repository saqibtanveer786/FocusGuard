const haveToBlockSite = (urls, userRequestedUrl, workHours) => {
  let inWorkHours = false;
  if (workHours) {
    const { startHour, endHour } = workHours;
    const date = new Date();
    const currentTime = date.toTimeString().substring(0, 5);
    if (startHour <= endHour) {
      if (currentTime >= startHour && currentTime <= endHour) {
        console.log("within the time");
        inWorkHours = true;
      }
    } else {
      if (currentTime >= startHour || currentTime <= endHour) {
        console.log("within the time");
        inWorkHours = true;
      }
    }
  }
  return urls.some(ele => {
    return userRequestedUrl.includes(ele.url) && inWorkHours;
  });
};

chrome.webRequest.onBeforeRequest.addListener(
  async details => {
    const workHours = await chrome.storage.local.get(["workHours"]);
    const result = await chrome.storage.local.get(["urls"]);
    if (result["urls"]) {
      if (
        haveToBlockSite(result["urls"], details.url, workHours["workHours"])
      ) {
        chrome.tabs.update(details.tabId, {
          url: "https://saqibtanveer786.github.io/Todo-List-App/",
        });
      }
    }
  },
  { urls: ["<all_urls>"] }
);
