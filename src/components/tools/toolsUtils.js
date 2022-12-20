function RGBToHex(data) {
  let dataHex = '#';
  for (let i = 0; i < 3; i += 1) {
    const color = data[i];
    const letter = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
    const firstLetter = letter[Math.floor(color / 16)];
    const secondLetter = letter[color % 16];
    dataHex = dataHex + firstLetter + secondLetter;
  }
  return dataHex;
}

function penSizeHandler(e, penSize, highlightTarget, getDomElement, penSelector) {
  if (e.target.tagName === 'LI') {
    // highlightTarget(e.target, 'pen-size--active', getDomElement);
    highlightTarget(e.target, penSelector, getDomElement);
    penSize = e.target.dataset.size; // eslint-disable-line
  }
  return penSize;
}

export { RGBToHex, penSizeHandler };
