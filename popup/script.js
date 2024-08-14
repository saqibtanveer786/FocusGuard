import { setToStorage, getFromStorage, getSvg } from "./utils.js";

const renderBlockedSites = async () => {
  const listOfBlockedSites = await getFromStorage("urls");
  const ul = document.querySelector(".blocked-sites-list");
  ul.innerHTML = "";

  if (listOfBlockedSites && listOfBlockedSites.length > 0) {
    // render the list of blocked sites from the localStorage
    listOfBlockedSites.forEach((ele) => {
      // handling li
      const li = document.createElement("li");
      li.innerText = ele.url;
      li.classList.add("blocked-sites-list-item");

      // delete btn
      const btn = document.createElement("button");
      btn.innerHTML = getSvg();
      btn.classList.add("rm-btn");
      btn.addEventListener("click", () => removeBlockedSite(ele.url));

      // appending content
      li.appendChild(btn);
      ul.appendChild(li);
    });
  } else {
    // render a empty message
    const li = document.createElement("li");
    li.innerText = "NO site blocked yet";
    li.classList.add("blocked-sites-list-item");
    ul.appendChild(li);
  }
};

const addBlockedSite = async (e) => {
  e.preventDefault();

  const siteUrl = document.getElementById("url").value;

  if (siteUrl) {
    await setToStorage("urls", { url: siteUrl });
    await renderBlockedSites();

    // clear the field
    document.getElementById("url").value = "";
  } else {
    alert("field shouldn't be empty");
  }
};

const removeBlockedSite = async (url) => {
  const dataFromLocalStorage = await getFromStorage("urls");

  // removing the item
  const filteredData = dataFromLocalStorage.filter((ele) => {
    return ele.url !== url;
  });

  await chrome.storage.local.set({ ["urls"]: filteredData });

  renderBlockedSites();
};

document.addEventListener("DOMContentLoaded", () => {
  renderBlockedSites();

  const btn = document.getElementById("addBtn");
  btn.addEventListener("click", addBlockedSite);
});
