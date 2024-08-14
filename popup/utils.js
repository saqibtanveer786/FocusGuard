export const setToLocalStorage = (key, content) => {
  try {
    let dataFromLocalStorage = getFromLocalStorage(key);
    dataFromLocalStorage.push(content);
    localStorage.setItem(key, JSON.stringify(dataFromLocalStorage));
  } catch (err) {
    alert("error occured while setting the item", err);
  }
};

export const getFromLocalStorage = (key) => {
  try {
    const dataFromLocalStorage = localStorage.getItem(key);
    return dataFromLocalStorage ? JSON.parse(dataFromLocalStorage) : [];
  } catch (err) {
    alert("error occured while getting the items");
    return [];
  }
};
