import './drawCanvas.scss';

function drawOnCanvas(canvas, dataURI) {
  const ctx = canvas.getContext('2d');
  const img = new Image();
  if (dataURI === '') ctx.clearRect(0, 0, canvas.width, canvas.height);
  img.src = dataURI;
  img.addEventListener('load', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  });
  return ctx; // eslint-disable-line
}

function canvasResolutionHandler(
  e,
  pixelSize,
  canvas,
  currentCount,
  drawOnCanvasFunc,
  highlightTarget,
  getDomElement,
  pixelSizeKey,
  imgsKey,
  SELECTORS
) {
  if (e.target.tagName === 'BUTTON') {
    pixelSize = canvas.width / e.target.dataset.size; // eslint-disable-line
    highlightTarget(e.target, SELECTORS.BUTTON_RESOLUTION_ACTIVE, getDomElement);
    localStorage.removeItem(pixelSizeKey);
    localStorage.setItem(pixelSizeKey, pixelSize);
    const piskelImg = JSON.parse(localStorage.getItem(imgsKey));
    drawOnCanvasFunc(canvas, piskelImg[currentCount]);
  }
  return pixelSize;
}

export { drawOnCanvas, canvasResolutionHandler };
