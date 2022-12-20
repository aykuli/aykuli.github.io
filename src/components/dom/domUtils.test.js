import { setCanvasWrapSize, renderFrames, renderFrameActive, highlightTarget, createPopup } from './domUtils';
import { SELECTORS } from '../../constants';

require('@babel/register');
const jsdom = require('jsdom');

const { JSDOM } = jsdom;

const options = {
  contentType: 'text/html',
  includeNodeLocations: true,
  storageQuota: 10000000,
  runScripts: 'outside-only',
};

// создаем виртуальный DOM в Node.js
const domVirt = new JSDOM(
  `<!DOCTYPE html>
<html lang="en">
<body>
<div class="page__wrap">    
<header class='header'>
    <h1 class='header__title'><a href="./index.html" class="header__landing">Piskel</a></h1>
    <p class='header__text'>New piskel*</p>
    <nav class="nav">
        <div class="nav__user" title ="">
            <img src="#" alt="" class="auth__photo" width="28" height="28">
            <span class="auth__name"></span>
        </div>
        <button class="btn auth__login">Sign in</button>
        <button class="btn auth__logout" style='display: none'>Sign out</button>
    </nav>
</header>
<main class='main'>
    <div class="column frames">
        <ul class="frames__list"></ul>
        <button class="frames__btn--add">Add new frame</button>
    </div>
    <div class="column--main">
        <div class="canvas__wrap">
            <canvas id="canvas" width="128" height="128" class="canvas">Your browser doesn't support canvas</canvas>
            <canvas width="128" height="128" class="canvas--above">Your browser doesn't support canvas</canvas>
            <!-- TODO: pixel that tracks the cursor -->
            <!-- <div class="cursor"></div> -->
        </div>
    </div>
    <div class="column column--right">
        <div class="animate__wrap">
            <canvas id="preview" class="animate__canvas" width="200" height="200">Your browser doesn't support canvas</canvas>                        
            <button class="animate__fullscreen"></button>
            <div class="fps__wrap">
                <p class="fps__value">
                    <span></span>
                    <span>FPS</span>
                </p>
                <input class="fps__input" type="range" id="fps" name="fps-input" min="0" max="24">
                <label class="visually-hidden" for="fps-input">Set FPS for drawn animation</label>
            </div>
        </div>                
        <div class="canvas-resolutions">
            <h3 class="btns__title">Resize</h3>
            <div class="btns__container canvas-resolutions__list">
                <button class="btn resolution__btn--active resolution--res32" data-size="32">32x32</button>
                <button class="btn resolution--res64" data-size="64">64x64</button>
                <button class="btn resolution--res128" data-size="128">128x128</button>
            </div>
        </div>
        <div class="btns__container"><button class="btn session__clear">Clear user session</button></div>
        <div class="save">
            <p class="btns__title">Save as</p>
            <div class="btns__container save">
                <button class="btn save--apng" data-save="apng">.apng</button>
                <button class="btn save--gif" data-save="gif">.gif</button>
            </div>
        </div>
    </div>
</main>
<aside>
    <div class="tools">            
        <h2 class="visually-hidden">Tools for paint</h2>
        <ul class="pen-size__list tip"  data-tooltip="Pen size from 1 to 4">
            <li class="pen-size pen-size--active" data-size="1"></li>
            <li class="pen-size" data-size="2"></li>
            <li class="pen-size" data-size="3"></li>
            <li class="pen-size" data-size="4"></li>
        </ul>
        <ul class="tools__container">
            <li id='pencil' class="tool tool--pen tool--active tip" data-tooltip="Pen tool(P)"><span class="visually-hidden">Pencil tool</span></li>
            <li id='stroke' class="tool tool--stroke tip" data-tooltip="Line tool(L)"><span class="visually-hidden">Line tool</span></li>
            <li id='bucket' class="tool tool--bucket tip" data-tooltip="Bucket tool(B)"><span class="visually-hidden">Bucket tool</span></li>
            <li id='bucketSamePixel' class="tool tool--bucket-same-pixel tip" data-tooltip="Paint all pixels of the same color tool(A)"><span class="visually-hidden">Paint all pixels of the same color tool</span></li>
            <li id='eraser' class="tool tool--eraser tip" data-tooltip="Eraser tool(E)"><span class="visually-hidden">Eraser tool</span></li>
            <li id='picker' class="tool tool--picker tip" data-tooltip="Picker tool(C)"><span class="visually-hidden">Picker tool</span></li>
            <li id='empty' class="tool tool--empty tip" data-tooltip="Clear canvas(Z)"><span class="visually-hidden">Clear canvas</span></li>
        </ul>
        <div class="tools__palette--wrap">
            <label for="color-switch-secondary" class="visually-hidden">Secondary color</label>
            <input class="tools__palette--secondary" type="color" name="color-switch-secondary" value="#ffbb44">
            <label for="color-switch-primary" class="visually-hidden">Primary color</label>
            <input class="tools__palette--primary" type="color"name="color-switch-primary" value="#ff0000">
            <button class="tools__palette--swapper tip" data-tooltip="Swap color(X)"><span class="visually-hidden">Swap color</span></button>
        </div>
    </div>
</aside>
</div>
<div class="popup visually-hidden"></div>
</body>
</html>
`,
  options
).window;

/* eslint-disable */
describe('domElements Object', () => {
  it('renderFrameActive function should make children elmement LI for framesList and push empty string in piskelImg', () => {
    const i = 0;
    const piskelImg = [''];
    const framesList = domVirt.window.document.querySelector('.frames__list');

    const res = renderFrameActive(i, piskelImg, framesList);

    expect(res.className).toBe('frame__item frame__active');
    expect(res.children[0].tagName).toBe('CANVAS');
    expect(res.children[0].className).toBe('frame');
    expect(piskelImg.length).toBe(2);
    expect(piskelImg[i + 1]).toBe('');
  });

  it('highlightTarget should remove activeClassName from current active eleemnt and set it to target', () => {
    const target = domVirt.window.document.querySelector('.tool--bucket');
    const activeClassName = 'tool--active';
    const getDomElement = selector => domVirt.window.document.querySelector(selector);

    const activeTool = domVirt.window.document.querySelector('.tool--active');
    expect(activeTool.classList.contains('tool--pen')).toBeTruthy();

    const res = highlightTarget(target, activeClassName, getDomElement);

    const newActiveTool = domVirt.window.document.querySelector('.tool--active');
    expect(newActiveTool.classList.contains('tool--bucket')).toBeTruthy();
    expect(res.classList.contains('tool--active')).toBeTruthy();
    expect(res).toBe(newActiveTool);
    expect(activeTool.classList.contains('tool--active')).toBeFalsy();
  });

  it('setCanvasWrapSize should change canvas sizes', () => {
    const mainColumn = { offsetWidth: 400, offsetHeight: 600 };
    const canvas = {
      parentNode: {
        style: { width: '100px', height: '200px' },
      },
    };
    expect(canvas.parentNode.style.width).toBe('100px');
    expect(canvas.parentNode.style.height).toBe('200px');

    setCanvasWrapSize(mainColumn, canvas);

    expect(canvas.parentNode.style.width).toBe('400px');
    expect(canvas.parentNode.style.height).toBe('400px');
  });

  it('renderFrames should make children for framesList', () => {
    const currentCount = 2;
    const piskelImg = ['', '', '', ''];
    const framesList = domVirt.window.document.querySelector('.frames__list');

    const result = renderFrames(piskelImg, currentCount, framesList, SELECTORS);
    expect(result.children).toBeDefined();
    expect(piskelImg).toStrictEqual(['', '', '', '']);
  });

  it('createPopup should remove "visually-hidden" class from popup element', () => {
    const getDomElement = selector => domVirt.window.document.querySelector(selector);
    const popup = domVirt.window.document.querySelector('.popup');

    expect(popup.classList).toContain('visually-hidden');

    createPopup('Hello, Russia', getDomElement, SELECTORS);

    expect(popup.classList.contains('visually-hidden')).toBeFalsy();
  });
});
