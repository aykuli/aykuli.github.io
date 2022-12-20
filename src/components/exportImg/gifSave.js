export default function gifSave(canvas, GIFEncoder, LS_KEYS) {
  const fps = localStorage.getItem(LS_KEYS.fps);
  const framesData = JSON.parse(localStorage.getItem(LS_KEYS.piskelImg));
  const ctx = canvas.getContext('2d');

  const scale = localStorage.getItem(LS_KEYS.pixelSize);

  const encoder = new GIFEncoder();
  encoder.setRepeat(0);
  encoder.setDelay(1000 / fps);
  encoder.start();

  framesData.forEach((frame, index) => {
    const img = new Image();
    img.src = frame;
    img.addEventListener('load', () => {
      ctx.drawImage(img, 0, 0, canvas.width / scale, canvas.height / scale);
      const imageData = ctx.getImageData(0, 0, canvas.width / scale, canvas.width / scale);
      encoder.setSize(canvas.width / scale, canvas.height / scale);
      encoder.addFrame(imageData.data, true);

      if (index === framesData.length - 1) {
        encoder.finish();
        encoder.download('download.gif');
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    });
  });
  return 'image saved as .gif';
}
