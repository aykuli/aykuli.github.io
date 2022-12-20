function clearSession() {
  localStorage.clear();
  location.reload(); // eslint-disable-line
}

function saveImgsInLocalStorage(piskelImg, canvas, currentCount) {
  const dataURI = canvas.toDataURL();
  piskelImg[currentCount] = dataURI; // eslint-disable-line
  return piskelImg[currentCount];
}

function refreshLocalStorageValue(key, value) {
  localStorage.removeItem(key);
  localStorage.setItem(key, value);
  return localStorage.getItem(key);
}

function refreshLocalStorageMap(key, map) {
  localStorage.myMap = JSON.stringify(Array.from(map.entries()));
  localStorage.removeItem(key);
  localStorage.setItem(key, localStorage.myMap);
}

export { clearSession, saveImgsInLocalStorage, refreshLocalStorageValue, refreshLocalStorageMap };
