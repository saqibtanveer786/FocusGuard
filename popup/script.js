import { setToStorage, getFromStorage, getSvg } from "./utils.js";

const renderBlockedSites = async () => {
  const listOfBlockedSites = await getFromStorage("urls");
  const ul = document.querySelector(".blocked-sites-list");
  ul.innerHTML = "";

  if (listOfBlockedSites && listOfBlockedSites.length > 0) {
    // render the list of blocked sites from the localStorage
    listOfBlockedSites.forEach(ele => {
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

const addBlockedSite = async e => {
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

const removeBlockedSite = async url => {
  const dataFromLocalStorage = await getFromStorage("urls");

  // removing the item
  const filteredData = dataFromLocalStorage.filter(ele => {
    return ele.url !== url;
  });

  await chrome.storage.local.set({ ["urls"]: filteredData });

  renderBlockedSites();
};

const renderWorkHours = async () => {
  const workHours = await getFromStorage("workHours");
  const { startHour, endHour } = workHours;
  const workHoursElement = document.getElementById("work-hours");
  workHoursElement.innerText = `From ${startHour} to ${endHour}`;
};

const openDialog = () => {
  const dialog = document.getElementById("setTime");
  dialog.style.display = "flex";
};

const closeDialog = () => {
  const dialog = document.getElementById("setTime");
  dialog.style.display = "none";
};

const saveWorkHours = async () => {
  const startHour = document.getElementById("startHour").value;
  const endHour = document.getElementById("endHour").value;
  const obj = { startHour, endHour };
  await chrome.storage.local.set({
    ["workHours"]: obj,
  });
  closeDialog();
  await renderWorkHours();
};

document.addEventListener("DOMContentLoaded", () => {
  renderBlockedSites();
  renderWorkHours();

  const btn = document.getElementById("addBtn");
  btn.addEventListener("click", addBlockedSite);

  // handling work hours
  const setTimeBtn = document.getElementById("setTimeBtn");
  const cancelBtn = document.getElementById("cancelButton");
  const saveBtn = document.getElementById("saveButton");

  setTimeBtn.addEventListener("click", openDialog);
  cancelBtn.addEventListener("click", closeDialog);
  saveBtn.addEventListener("click", saveWorkHours);
});
