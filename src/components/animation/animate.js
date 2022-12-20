import './animation.scss';

function animate({ draw, piskelImg, fpsWatch = () => {}, keys = {}, isForLanding = false }) {
  if (!piskelImg.length) return;

  const start = performance.now();
  let i = 0;
  let timeFraction = 0;

  function animateFrame(time) {
    // const fps = isForLanding ? 3 : localStorage.getItem('piskelFps');
    const fps = isForLanding ? 3 : localStorage.getItem(keys.fps);

    const duration = 1000 / fps;
    const prev = timeFraction;
    timeFraction = Math.abs(Math.floor((time - start) / duration));
    if (timeFraction !== prev) {
      draw(i); // draw frame
      i += 1;
      i %= piskelImg.length;

      if (!+fps) {
        const currentCount = localStorage.getItem(keys.counter);
        draw(currentCount);
      }
    }
    if (timeFraction >= 0) {
      requestAnimationFrame(animateFrame);
    }
  }

  fpsWatch(animateFrame);
  requestAnimationFrame(animateFrame);
}

function animationFullscreen(fullscreenBtn, previewCanvas) {
  fullscreenBtn.addEventListener('click', () => {
    previewCanvas.requestFullscreen();
  });
}
// fpsHandler for fps input changing
function fpsHandler(input, animateFrame, key) {
  input.parentNode.children[0].innerText = input.value; // eslint-disable-line

  localStorage.removeItem(key);
  localStorage.setItem(key, input.value);

  if (+input.value) {
    requestAnimationFrame(animateFrame);
  }
}

export { animate, animationFullscreen, fpsHandler };
