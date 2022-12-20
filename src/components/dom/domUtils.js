function renderFrameActive(i, piskelImg, framesList) {
  const newFrame = document.createElement('LI');
  newFrame.className = 'frame__item frame__active';
  newFrame.innerHTML = `<canvas class="frame" data-count="${i}" width="100" height="100" draggable="true"></canvas><button class="frame__btn frame__btn--delete tip" data-tooltip="Delete this frame"><button class="frame__btn frame__btn--copy tip" data-tooltip="Copy this frame"><span class="visually-hidden">Copy this canvas</span></button><span class="visually-hidden">Delete this canvas</span></button><span class="frame__number">${i +
    1}</span>`;
  framesList.append(newFrame);
  piskelImg.push('');
  return newFrame;
}

function highlightTarget(target, activeClassName, getDomEl) {
  const activeElement = getDomEl(`.${activeClassName}`);
  activeElement.classList.remove(activeClassName);
  target.classList.add(activeClassName);
  return target;
}

function setCanvasWrapSize(mainColumn, canvas) {
  const canvasWrapHeight = mainColumn.offsetHeight;
  const canvasWrapWidth = mainColumn.offsetWidth;
  const size = canvasWrapWidth < canvasWrapHeight ? canvasWrapWidth : canvasWrapHeight;
  canvas.parentNode.style.width = `${size}px`; // eslint-disable-line
  canvas.parentNode.style.height = `${size}px`; // eslint-disable-line
}

function renderFrames(piskelImg, currentCount, framesList, SELECTORS) {
  const len = piskelImg.length;
  for (let i = 0; i < len; i += 1) {
    const newFrame = document.createElement('LI');
    newFrame.innerHTML = `<canvas class="frame" data-count="${i}" width="100" height="100" draggable="true"></canvas><button class="frame__btn frame__btn--delete tip" data-tooltip="Delete this frame"><button class="frame__btn frame__btn--copy tip" data-tooltip="Copy this frame"><span class="visually-hidden">Copy this canvas</span></button><span class="visually-hidden">Delete this canvas</span></button><span class="frame__number">${i +
      1}</span>`;
    // prettier-ignore
    newFrame.className = (i === +currentCount) ? `${SELECTORS.FRAME_ITEM} ${SELECTORS.FRAME_ACTIVE}` : SELECTORS.FRAME_ITEM;
    framesList.append(newFrame);
  }
  return framesList;
}

function createPopup(msg, getDomEl, SELECTORS) {
  const popup = getDomEl(`.${SELECTORS.POPUP}`);
  popup.classList.remove(SELECTORS.VISUALLY_HIDDEN);
  popup.innerText = msg;
  setTimeout(() => popup.classList.add(SELECTORS.VISUALLY_HIDDEN), 2500);
}

function getDomElement(selector) {
  return document.querySelector(selector);
}

function getDomElementsList(selector) {
  return document.querySelectorAll(selector);
}

export {
  setCanvasWrapSize,
  renderFrames,
  renderFrameActive,
  highlightTarget,
  createPopup,
  getDomElement,
  getDomElementsList,
};
