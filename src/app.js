// TODO^ make scroller for the frames when frames list number become a lot
// TODO: pixel that tracks the cursor
// TODO: https://firebase.google.com/docs/auth/admin/manage-sessions Firebase user session storage

// auth
// Firebase App (the core Firebase SDK) for google authentification
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { loginGoogleAccount, logoutGoogleAccount } from './components/authentification/firebaseFromGoogle';

// constantas
import { LS_KEYS, SELECTORS } from './constants';

// DOM elements changing functions
import {
  setCanvasWrapSize,
  renderFrames,
  renderFrameActive,
  highlightTarget,
  createPopup,
  getDomElement,
  getDomElementsList,
} from './components/dom/domUtils';

// canvas draw function
import { drawOnCanvas, canvasResolutionHandler } from './components/drawCanvas/drawCanvas';
import clearCanvas from './components/drawCanvas/clearCanvas';

// tools
import Tools from './components/tools/tools';
import toolsMap from './components/tools/toolsMap';
import swapHandler from './components/tools/swapColors';
import { penSizeHandler } from './components/tools/toolsUtils';

// work with frames
import {
  frameDraw,
  frameHandler,
  frameDndHandler,
  frameAdd,
  frameDatasetCountSet,
  frameCopy,
  frameDel,
  framePreviewDraw,
} from './components/frames/frame';

// animation functions
import { animate, animationFullscreen, fpsHandler } from './components/animation/animate';

// export pictures
import gifSave from './components/exportImg/gifSave';
import apngSave from './components/exportImg/apngSave';
import saveHandler from './components/exportImg/exportUtils';

// session
import {
  clearSession,
  saveImgsInLocalStorage,
  refreshLocalStorageValue,
  refreshLocalStorageMap,
} from './components/sessionActions/sessionActions';

// hotkeys
import {
  classToggler,
  setExistKeyInMap,
  setKeyToolsMap,
  manageStyleToolToChange,
  highlightUnsettedTool,
} from './components/hotKeys/hotKeys';

export default class App {
  constructor(dom, { authConfig, ...rest } = {}) {
    const { pixelSize = 1, currentCount = 0, fps = 0, penSize = 1, piskelImg = [] } = rest;
    this.pixelSize = pixelSize;
    this.currentCount = currentCount;
    this.fps = fps;
    this.penSize = penSize;
    this.piskelImg = piskelImg;

    this.dom = dom(getDomElement);
    this.ctx = this.dom.canvas.getContext('2d');
    this.firebaseConfig = authConfig;
    this.tools = new Tools(this.dom.canvas, this.ctx, this.dom.primaryColor, this.pixelSize, LS_KEYS);
    this.isHotKeyOpen = false;
  }

  run() {
    this.init();

    this.paintTools(); // tools eventListener
    this.keyboardShortCutHandler(); // keyboard eventListener
    this.frameWatch(); // frame active eventListener
    this.penSizes(); // pen size eventListener
    frameDndHandler(
      this.dom.canvas,
      this.dom.preview,
      this.piskelImg,
      this.dom.framesList,
      frameDatasetCountSet,
      drawOnCanvas,
      LS_KEYS,
      SELECTORS,
      framePreviewDraw
    ); // frame drag and drop listener

    animate({
      draw: i => {
        drawOnCanvas(this.dom.preview, this.piskelImg[i]);
      },
      piskelImg: this.piskelImg,
      fpsWatch: this.fpsWatch,
      keys: LS_KEYS,
    });

    animationFullscreen(this.dom.fullscreenBtn, this.dom.preview);

    this.eventListeners();
    this.hotKeysChanger();
  }

  init() {
    // init for authentification
    firebase.initializeApp(this.firebaseConfig);

    // get current number of active frame
    if (localStorage.getItem(LS_KEYS.counter) === null) {
      this.currentCount = 0;
      refreshLocalStorageValue(LS_KEYS.counter, this.currentCount);
    } else {
      this.currentCount = localStorage.getItem(LS_KEYS.counter);
    }

    // get image from Local Storage if exists and draw accordingly frames
    if (localStorage.getItem(LS_KEYS.piskelImg) !== null) {
      this.piskelImg = JSON.parse(localStorage.getItem(LS_KEYS.piskelImg));
      renderFrames(this.piskelImg, this.currentCount, this.dom.framesList, SELECTORS);

      for (let i = 0; i < this.piskelImg.length; i += 1) {
        const frame = this.dom.framesList.children[i].children[0];
        drawOnCanvas(frame, this.piskelImg[i]);
      }
      drawOnCanvas(this.dom.canvas, this.piskelImg[this.currentCount]);
    } else {
      // if there is no image render one empty frame
      renderFrameActive(0, this.piskelImg, this.dom.framesList);
    }

    // get user fps from localStorage
    if (localStorage.getItem(LS_KEYS.fps) !== null) {
      this.fps = localStorage.getItem(LS_KEYS.fps);
      this.dom.fps.value = +localStorage.getItem(LS_KEYS.fps);
    } else {
      this.dom.fps.value = this.fps;
      localStorage.setItem(LS_KEYS.fps, this.fps);
    }
    this.dom.fpsValue.innerText = localStorage.getItem(LS_KEYS.fps);
    if (!+this.fps || this.piskelImg.length) {
      drawOnCanvas(this.dom.preview, this.piskelImg[this.currentCount]);
    } else {
      animate({
        draw: i => {
          drawOnCanvas(this.dom.preview, this.piskelImg[i]);
        },
        piskelImg: this.piskelImg,
        fpsWatch: this.fpsWatch,
        keys: LS_KEYS,
      });
    }

    // set pixel size at app page loading
    if (localStorage.getItem(LS_KEYS.pixelSize) !== null) {
      this.pixelSize = Number(localStorage.getItem(LS_KEYS.pixelSize));
      const target = document.querySelector(`.${SELECTORS.CANVAS_RESOLUTION}${this.dom.canvas.width / this.pixelSize}`);
      highlightTarget(target, SELECTORS.BUTTON_RESOLUTION_ACTIVE, getDomElement);
    } else refreshLocalStorageValue(LS_KEYS.pixelSize, this.pixelSize);

    setCanvasWrapSize(this.dom.mainColumn, this.dom.canvas);

    // set swaper color at app loading or
    // get user colors from Local Storage if exists
    if (localStorage.getItem(LS_KEYS.primaryColor) !== null) {
      this.dom.primaryColor.value = localStorage.getItem(LS_KEYS.primaryColor);
    } else {
      localStorage.setItem(LS_KEYS.primaryColor, this.dom.primaryColor.value);
    }
    if (localStorage.getItem(LS_KEYS.secondaryColor) !== null) {
      this.dom.secondaryColor.value = localStorage.getItem(LS_KEYS.secondaryColor);
    } else {
      localStorage.setItem(LS_KEYS.secondaryColor, this.dom.secondaryColor.value);
    }
  }

  eventListeners() {
    // HEADER
    // AUTHORIZATION
    const authElements = [this.dom.authName, this.dom.authPhoto, this.dom.authLoginBtn, this.dom.authLogoutBtn];
    // Button "Login"
    this.dom.authLoginBtn.addEventListener('click', () => {
      loginGoogleAccount(firebase, authElements, createPopup, getDomElement, SELECTORS);
    });

    // Button "Logout"
    this.dom.authLogoutBtn.addEventListener('click', () => {
      logoutGoogleAccount(firebase, authElements);
    });

    // LEFT SIDE COLUMN
    // PEN SIZE
    this.dom.penSizes.addEventListener('click', e => {
      this.penSize = penSizeHandler(e, this.penSize, highlightTarget, getDomElement);
      refreshLocalStorageValue(LS_KEYS.penSize, this.penSize);
    });

    // COLOR SWAPER
    this.dom.swapColor.addEventListener('click', () => {
      swapHandler(this.dom.primaryColor, this.dom.secondaryColor, this.ctx);

      refreshLocalStorageValue(LS_KEYS.primaryColor, this.dom.primaryColor.value);
      refreshLocalStorageValue(LS_KEYS.secondaryColor, this.dom.secondaryColor.value);
    });

    this.dom.primaryColor.addEventListener('change', () => {
      refreshLocalStorageValue(LS_KEYS.primaryColor, this.dom.primaryColor.value);
    });

    this.dom.secondaryColor.addEventListener('change', () => {
      refreshLocalStorageValue(LS_KEYS.secondaryColor, this.dom.secondaryColor.value);
    });

    // MAIN COLUMN
    // MAIN CANVAS SIZES when window resizing
    window.addEventListener('resize', () => {
      setCanvasWrapSize(this.dom.mainColumn, this.dom.canvas);
    });

    // RIGHT SIDE COLUMN
    // RESOLUTION CHANGING
    this.dom.resBtns.addEventListener('click', e => {
      this.pixelSize = canvasResolutionHandler(
        e,
        this.pixelSize,
        this.dom.canvas,
        this.currentCount,
        drawOnCanvas,
        highlightTarget,
        getDomElement,
        LS_KEYS.pixelSize,
        LS_KEYS.piskelImg,
        SELECTORS
      );
    });

    // BUTTON "Clear user session"
    this.dom.clearSessionBtn.addEventListener('click', () => clearSession());

    // EXPORT IMAGE
    this.dom.saveBtns.addEventListener(
      'click',
      e => saveHandler(e, this.dom.canvasAbove, gifSave, apngSave, GIFEncoder, LS_KEYS) // eslint-disable-line
    );

    // KEYBOARD SHORTCUTS WINDOW OPENER
    this.dom.hotKeyWindowBtn.addEventListener('click', () => {
      this.isHotKeyOpen = classToggler(
        SELECTORS.VISUALLY_HIDDEN,
        this.isHotKeyOpen,
        this.dom.hotKeysWindow,
        this.dom.pageDarker
      );
    });
  }

  fpsWatch = animateFrame => {
    this.dom.fps.addEventListener('input', e => fpsHandler(e.target, animateFrame, LS_KEYS.fps));
  };

  frameWatch() {
    this.dom.framesList.addEventListener('click', e => {
      if (e.target.className.includes(SELECTORS.BUTTON_FRAME_DELETE)) {
        this.currentCount = frameDel(
          e.target,
          this.piskelImg,
          this.dom.canvas,
          this.dom.framesList,
          drawOnCanvas,
          frameDatasetCountSet,
          SELECTORS,
          refreshLocalStorageValue,
          LS_KEYS
        );
      } else if (e.target.className.includes(SELECTORS.BUTTON_FRAME_COPY)) {
        this.currentCount = frameCopy(
          e.target,
          this.piskelImg,
          this.dom.canvas,
          highlightTarget,
          frameDatasetCountSet,
          drawOnCanvas,
          getDomElement,
          SELECTORS
        );
      } else {
        this.currentCount = frameHandler(
          e,
          this.dom.canvas,
          this.piskelImg,
          drawOnCanvas,
          this.dom.preview,
          this.fps,
          highlightTarget,
          SELECTORS,
          getDomElement
        );
      }
      refreshLocalStorageValue(LS_KEYS.piskelImg, JSON.stringify(this.piskelImg));
      refreshLocalStorageValue(LS_KEYS.counter, this.currentCount);

      framePreviewDraw(LS_KEYS.fps, this.dom.preview, this.piskelImg, this.currentCount, drawOnCanvas);
    });

    this.dom.frameAddBtn.addEventListener('click', () => {
      frameAdd(renderFrameActive, this.dom.framesList, this.dom.canvas, this.piskelImg, SELECTORS);

      this.currentCount = this.dom.framesList.children.length - 1;

      refreshLocalStorageValue(LS_KEYS.piskelImg, JSON.stringify(this.piskelImg));
      refreshLocalStorageValue(LS_KEYS.counter, this.currentCount);

      framePreviewDraw(LS_KEYS.fps, this.dom.preview, this.piskelImg, this.currentCount, drawOnCanvas);
    });

    this.dom.canvas.addEventListener('mouseup', () => {
      this.currentCount = localStorage.getItem(LS_KEYS.counter);
      saveImgsInLocalStorage(this.piskelImg, this.dom.canvas, this.currentCount);
      refreshLocalStorageValue(LS_KEYS.piskelImg, JSON.stringify(this.piskelImg));
      frameDraw(this.piskelImg, this.currentCount, `.${SELECTORS.FRAME}`, getDomElementsList);

      framePreviewDraw(LS_KEYS.fps, this.dom.preview, this.piskelImg, this.currentCount, drawOnCanvas);
    });
  }

  paintTools() {
    // get drawing tool from Local Storage if exists
    if (localStorage.getItem(LS_KEYS.tool) === null) {
      this.targetTool = 'pencil';
      this.tools.pencilTool(this.targetTool);
      localStorage.setItem(LS_KEYS.tool, this.targetTool);
    } else {
      this.targetTool = localStorage.getItem(LS_KEYS.tool);
      highlightTarget(document.querySelector(`#${this.targetTool}`), SELECTORS.TOOL_ACTIVE, getDomElement);
      this.tools.toolHandler(
        this.targetTool,
        frameDraw,
        `.${SELECTORS.FRAME}`,
        getDomElementsList,
        framePreviewDraw,
        this.dom.preview,
        drawOnCanvas
      );
    }

    this.dom.tools.addEventListener('click', e => {
      const targetToolEl = e.target.closest('li');
      if (targetToolEl === null) return;
      this.targetTool = targetToolEl.id;

      switch (this.targetTool) {
        case 'cleanCanvas':
          clearCanvas(this.dom.canvas, this.piskelImg, this.currentCount, LS_KEYS.piskelImg);
          frameDraw(this.piskelImg, this.currentCount, `.${SELECTORS.FRAME}`, getDomElementsList);
          framePreviewDraw(LS_KEYS.fps, this.dom.preview, this.piskelImg, this.currentCount, drawOnCanvas);
          break;
        default:
          highlightTarget(document.querySelector(`#${this.targetTool}`), SELECTORS.TOOL_ACTIVE, getDomElement);
          this.tools.toolHandler(
            this.targetTool,
            frameDraw,
            `.${SELECTORS.FRAME}`,
            getDomElementsList,
            framePreviewDraw,
            this.dom.preview,
            drawOnCanvas
          );
      }
    });
  }

  penSizes() {
    // get pen size from localStorage when app loaded
    if (localStorage.getItem(LS_KEYS.penSize) !== null) {
      this.pixelSize = Number(localStorage.getItem(LS_KEYS.penSize));
      this.penSize = localStorage.getItem(LS_KEYS.penSize);
      for (let i = 0; i < this.dom.penSizes.children.length; i += 1) {
        if (this.dom.penSizes.children[i].dataset.size === this.penSize) {
          highlightTarget(this.dom.penSizes.children[i], SELECTORS.PEN_SIZE_ACTIVE, getDomElement);
        }
      }
    } else localStorage.setItem(LS_KEYS.penSize, this.penSize);
  }

  keyboardShortCutHandler() {
    // prettier-ignore
    this.toolsMap = (localStorage.getItem(LS_KEYS.hotKeys) === null) ? toolsMap : new Map(JSON.parse(localStorage.getItem(LS_KEYS.hotKeys)));
    // make array of list items of dom Elements
    const arr = Array.from(this.dom.hotKeysList.children);

    // go through map and write to tools ecode text according key value
    this.toolsMap.forEach((value, key) => {
      arr.forEach(el => {
        if (el.dataset.tool === value) {
          // eslint-disable-next-line no-param-reassign
          el.children[1].innerText = key.slice(3);
        }
      });
    });

    // tool that don't have key will show "???"
    arr.forEach(el => {
      if (el.children[1].innerText === '') {
        el.children[1].innerText = '???'; // eslint-disable-line
        el.children[1].classList.add(SELECTORS.HOTKEY_UNSETTED); // eslint-disable-line
      }
    });

    document.addEventListener('keydown', e => {
      if (this.isHotKeyOpen && e.code === 'Escape') {
        this.isHotKeyOpen = classToggler(
          SELECTORS.VISUALLY_HIDDEN,
          this.isHotKeyOpen,
          this.dom.hotKeysWindow,
          this.dom.pageDarker
        );
      }

      if (e.code === 'KeyX') {
        e.preventDefault();
        swapHandler(this.dom.primaryColor, this.dom.secondaryColor, this.ctx, refreshLocalStorageValue);
      }

      if (this.isToSetToolKey) {
        this.isToSetToolKey = false;
        clearTimeout(this.timerId);

        refreshLocalStorageMap(LS_KEYS.hotKeys, this.toolsMap);
        setKeyToolsMap(
          e.code,
          this.toolsMap,
          this.toolToChange,
          getDomElement,
          setExistKeyInMap,
          refreshLocalStorageMap,
          manageStyleToolToChange,
          highlightUnsettedTool,
          LS_KEYS.hotKeys,
          SELECTORS
        );
      } else {
        this.targetTool = this.toolsMap.has(e.code) ? this.toolsMap.get(e.code) : this.targetTool;

        switch (this.targetTool) {
          case 'cleanCanvas':
            this.currentCount = localStorage.getItem(LS_KEYS.counter);
            clearCanvas(this.dom.canvas, this.piskelImg, this.currentCount, LS_KEYS.piskelImg);
            frameDraw(this.piskelImg, this.currentCount, `.${SELECTORS.FRAME}`, getDomElementsList);
            framePreviewDraw(LS_KEYS.fps, this.dom.preview, this.piskelImg, this.currentCount, drawOnCanvas);
            break;
          default:
            highlightTarget(document.querySelector(`#${this.targetTool}`), SELECTORS.TOOL_ACTIVE, getDomElement);
            this.tools.toolHandler(
              this.targetTool,
              frameDraw,
              `.${SELECTORS.FRAME}`,
              getDomElementsList,
              framePreviewDraw,
              this.dom.preview,
              drawOnCanvas
            );
        }
      }
    });
  }

  hotKeysChanger() {
    this.dom.hotKeysWindow.addEventListener('click', e => {
      // close window
      if (e.target === this.dom.hotKeysClose) {
        classToggler(SELECTORS.VISUALLY_HIDDEN, this.isHotKeyOpen, this.dom.hotKeysWindow, this.dom.pageDarker);
        return;
      }

      if (
        [SELECTORS.HOTKEY_ITEM, SELECTORS.HOTKEY_ICON, SELECTORS.HOTKEY_ECODE, SELECTORS.HOTKEY_TOOL].includes(
          e.target.className
        )
      ) {
        const item = e.target.closest('LI');
        this.isToSetToolKey = true;
        this.toolToChange = item.dataset.tool;

        // delete blinking of previous chosen element if it exists
        clearTimeout(this.timerId);

        // if there exist highlighted element, make it common
        const highlighted = getDomElement(`.${SELECTORS.HOTKEY_HIGHLIGHT}`);
        if (highlighted !== null) highlighted.classList.remove(SELECTORS.HOTKEY_HIGHLIGHT);

        // set blinking of chosen element
        this.timerId = setInterval(() => {
          item.children[1].classList.toggle(SELECTORS.HOTKEY_HIGHLIGHT);
        }, 300);
        return;
      }
      this.isToSetToolKey = false;
      clearTimeout(this.timerId);
      // if there exist highlighted element, make it common
      const highlighted = getDomElement(`.${SELECTORS.HOTKEY_HIGHLIGHT}`);
      if (highlighted !== null) highlighted.classList.remove(SELECTORS.HOTKEY_HIGHLIGHT);
    });
  }
}
