import './frames.scss';

function frameDraw(piskelImg, currentCount, frameClassName, getDomElementsList) {
  const frames = getDomElementsList(frameClassName);

  if (!piskelImg.length) return;
  const frameCtx = frames[currentCount].getContext('2d');
  const img = new Image();
  const dataURI = piskelImg[currentCount];
  // prettier-ignore
  const frameHandleOnload = (img) => { // eslint-disable-line
    let [currentWidth, currentHeight] = [frames[currentCount].width, frames[currentCount].height];

    currentWidth = frames[currentCount].width;
    currentHeight = frames[currentCount].height;
    frameCtx.drawImage(img, 0, 0, currentWidth, currentHeight);
  };

  if (dataURI === null || dataURI === '') {
    frameCtx.clearRect(0, 0, frames[currentCount].width, frames[currentCount].height);
  } else {
    img.src = piskelImg[currentCount];
    img.addEventListener('load', () => frameHandleOnload(img, currentCount));
  }
}

function frameHandler(e, canvas, piskelImg, drawOnCanvas, preview, fps, highlightActive, SELECTORS, getDomEl) {
  // highlighting current frame
  if (e.target.classList.contains(SELECTORS.FRAME))
    highlightActive(e.target.parentNode, SELECTORS.FRAME_ACTIVE, getDomEl);

  const { count } = e.target.dataset;
  if (piskelImg[count] !== undefined) {
    drawOnCanvas(canvas, piskelImg[count]);
    if (+fps === 0) drawOnCanvas(preview, piskelImg[count]);
  }
  return count;
}

function frameDndHandler(
  canvas,
  preview,
  piskelImg,
  framesList,
  frameDataCountSet,
  drawOnCanvas,
  LS_KEYS,
  SELECTORS,
  framePreview
) {
  let dragged;
  framesList.addEventListener('dragstart', e => {
    dragged = e.target; // store a ref. on the dragged elem
    if (e.target.className.includes(SELECTORS.FRAME)) {
      dragged = e.target.parentNode;
      dragged.style.opacity = 0.3; // make darker dragged frame
    }
  });
  // back dragged canvas opacity to 1 (by removing this style)
  framesList.addEventListener('dragend', e => {
    dragged.style.opacity = '';
    e.target.style.border = '';
    localStorage.removeItem(LS_KEYS.piskelImg);
    localStorage.setItem(LS_KEYS.piskelImg, JSON.stringify(piskelImg));
  });

  // events fired on the drop targets. Prevent default to allow drop
  framesList.addEventListener('dragover', e => {
    e.preventDefault();
  });

  framesList.addEventListener('dragenter', e => {
    // highlight potential drop target when the draggable element enters it
    if (e.target.tagName.includes('CANVAS')) {
      e.target.parentNode.classList.add(SELECTORS.FRAME_BELOW);
    }
  });

  framesList.addEventListener('dragleave', e => {
    // reset background of potential drop target when the draggable element leaves it
    if (e.target.tagName.includes('CANVAS')) {
      const framesLeaved = document.querySelectorAll(`.${SELECTORS.FRAME_BELOW}`);
      if (framesLeaved === null) return;
      framesLeaved.forEach(frame => frame.classList.remove(SELECTORS.FRAME_BELOW));
    }
  });

  framesList.addEventListener('drop', e => {
    // prettier-ignore
    if ((e.target.className === SELECTORS.FRAME) && (e.target.parentNode !== dragged)) {
        // main drag and drop logic
        const targetNumb =  e.target.dataset.count;
        const sourceNumb = dragged.children[0].dataset.count;

        e.target.parentNode.style.border = '';
        dragged.remove();

        if (targetNumb > sourceNumb) {
          e.target.parentNode.after(dragged);
        } else {
          e.target.parentNode.before(dragged);
        }

        // highlight dragged frame
        const frameActive = document.querySelector(`.${SELECTORS.FRAME_ACTIVE}`);
        frameActive.classList.remove(SELECTORS.FRAME_ACTIVE);
        dragged.classList.add(SELECTORS.FRAME_ACTIVE);
        dragged.style.border = '';

        // remove dotted style of leaved frame
        const frameLeaved = document.querySelector(`.${SELECTORS.FRAME_BELOW}`);
        if (frameLeaved === null) return;
        frameLeaved.classList.remove(SELECTORS.FRAME_BELOW);

        // get image from Local Storage if exists
        if (localStorage.getItem(LS_KEYS.piskelImg) !== null) {
          // replace dragged frame in target place
          const removed = piskelImg.splice(sourceNumb, 1);
          piskelImg.splice(targetNumb, 0, removed);

          // draw in main canvas target frame, that will be active after drag and drop
          drawOnCanvas(canvas, piskelImg[targetNumb]);
          
          // make dataset.count and visual count text of frames consecutive          
          frameDataCountSet(SELECTORS);
          localStorage.removeItem(LS_KEYS.counter);
          localStorage.setItem(LS_KEYS.counter, targetNumb);
          
          framePreview(LS_KEYS.fps, preview, piskelImg, targetNumb, drawOnCanvas);
        }
      }
  });
}

function frameAdd(renderFrameActive, framesList, canvas, piskelImg, SELECTORS) {
  const ctx = canvas.getContext('2d');
  const len = framesList.children.length;
  const frameActive = document.querySelector(`.${SELECTORS.FRAME_ACTIVE}`);

  frameActive.classList.remove(SELECTORS.FRAME_ACTIVE);

  renderFrameActive(len, piskelImg, framesList);

  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function frameCopy(
  target,
  piskelImg,
  canvas,
  highlightTarget,
  frameDataCountSet,
  drawOnCanvas,
  getDomElement,
  SELECTORS
) {
  // get the count of copied frame
  const countFrom = +target.parentNode.children[0].dataset.count;

  // render new  frame right after copied frame
  const newFrame = document.createElement('LI');
  newFrame.className = SELECTORS.FRAME_ITEM;
  newFrame.innerHTML = `<canvas class="frame" data-count="${countFrom +
    1}" width="100" height="100" draggable="true"></canvas><button class="frame__btn frame__btn--delete tip" data-tooltip="Delete this frame"><button class="frame__btn frame__btn--copy tip" data-tooltip="Copy this frame"><span class="visually-hidden">Copy this canvas</span></button><span class="visually-hidden">Delete this canvas</span></button><span class="frame__number">${countFrom +
    2}</span>`;
  target.parentNode.after(newFrame);

  // highlightTarget new frame and set it as active
  highlightTarget(newFrame, SELECTORS.FRAME_ACTIVE, getDomElement);

  // set dataset.count and visual count text of frames consecutive
  frameDataCountSet(SELECTORS);

  // draw on main canvas this.piskelImg[countFrom]
  drawOnCanvas(newFrame.children[0], piskelImg[countFrom]);

  // splice piskelImg to add new frame in frame appropriate place
  piskelImg.splice(countFrom, 0, piskelImg[countFrom]);

  // clear main canvas and draw current active frame
  drawOnCanvas(canvas, piskelImg[countFrom]);

  // return new currentCount
  return countFrom + 1;
}

function frameDel(
  target,
  piskelImg,
  canvas,
  framesList,
  drawOnCanvas,
  frameDataCountSet,
  SELECTORS,
  refreshLocalStorageValue,
  LS_KEYS
) {
  if (framesList.children.length === 1) return 0;
  let { count } = target.parentNode.children[0].dataset;

  // remove LI of deleted frame and all of it's children
  target.parentNode.remove();

  // remove correspond img data in piskelImg array and refresh localStorage
  piskelImg.splice(count, 1);
  refreshLocalStorageValue(LS_KEYS.piskelImg, JSON.stringify(piskelImg));

  // refresh frames count
  frameDataCountSet(SELECTORS);

  // set active frame if it was deleted
  const frameActive = document.querySelector(`.${SELECTORS.FRAME_ACTIVE}`);
  if (frameActive === null) {
    drawOnCanvas(canvas, piskelImg[0]);
    framesList.children[0].classList.add(SELECTORS.FRAME_ACTIVE);
    refreshLocalStorageValue(LS_KEYS.counter, 0);
    count = 1;
  } else {
    count = localStorage.getItem(LS_KEYS.counter);
    refreshLocalStorageValue(LS_KEYS.counter, count - 1);
  }

  return count === 0 ? 0 : count - 1; // eslint-disable-line
}

// make dataset.count and visual count text of frames consecutive
function frameDatasetCountSet(SELECTORS) {
  // const framesList = document.querySelector('.frames__list');
  const framesList = document.querySelector(`.${SELECTORS.FRAMES_LIST}`);
  const len = framesList.children.length;
  for (let i = 0; i < len; i += 1) {
    framesList.children[i].children[0].dataset.count = i;
    framesList.children[i].lastChild.innerText = i + 1;
  }
}

function framePreviewDraw(fpsKey, canvas, imgArr, count, drawCanvas) {
  const fps = +localStorage.getItem(fpsKey);
  if (fps === 0) drawCanvas(canvas, imgArr[count]);
}

export {
  frameDraw,
  frameHandler,
  frameDndHandler,
  frameAdd,
  frameDatasetCountSet,
  frameCopy,
  frameDel,
  framePreviewDraw,
};
