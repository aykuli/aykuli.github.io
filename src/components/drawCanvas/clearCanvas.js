export default function clearCanvas(canvas, piskelImg, currentCount, imgsKey) {
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  piskelImg[currentCount] = ''; // eslint-disable-line
  localStorage.removeItem(imgsKey);
  localStorage.setItem(imgsKey, JSON.stringify(piskelImg));
}
