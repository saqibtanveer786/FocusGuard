import { setToLocalStorage, getFromLocalStorage } from "./utils.js";

const renderBlockedSites = () => {
  const listOfBlockedSites = getFromLocalStorage("urls");
  const ul = document.querySelector(".blocked-sites-list");
  ul.innerHTML = "";

  if (listOfBlockedSites && listOfBlockedSites.length > 0) {
    // render the list of blocked sites from the localStorage
    listOfBlockedSites.forEach((ele) => {
      const li = document.createElement("li");
      li.innerText = ele.url;
      li.classList.add("blocked-sites-list-item");
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

const addBlockedSite = (e) => {
  e.preventDefault();

  const siteName = document.getElementById("name").value;
  const siteUrl = document.getElementById("url").value;

  if (siteName && siteUrl) {
    setToLocalStorage("urls", { name: siteName, url: siteUrl });
    renderBlockedSites();

    // clear the fiels
    document.getElementById("name").value = "";
    document.getElementById("url").value = "";
  } else {
    alert("fields shouldn't be empty");
  }
};

document.addEventListener("DOMContentLoaded", () => {
  renderBlockedSites();

  const btn = document.getElementById("addBtn");
  btn.addEventListener("click", addBlockedSite);
});
