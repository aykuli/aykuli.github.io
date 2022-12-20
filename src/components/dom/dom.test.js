import domElements from './dom';

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
  it('dom element should correspond to app.html elements', () => {
    const getDomElement = selector => domVirt.window.document.querySelector(selector);
    const dom = domElements(getDomElement);

    expect(dom.canvas).toBeDefined();
    expect(dom.canvasAbove).toBeDefined();
    expect(dom.tools).toBeDefined();
    expect(dom.primaryColor).toBeDefined();
    expect(dom.secondaryColor).toBeDefined();
    expect(dom.swapColor).toBeDefined();
    expect(dom.framesList).toBeDefined();
    expect(dom.frameAddBtn).toBeDefined();
    expect(dom.preview).toBeDefined();
    expect(dom.fps).toBeDefined();
    expect(dom.fpsValue).toBeDefined();
    expect(dom.resBtns).toBeDefined();
    expect(dom.mainColumn).toBeDefined();
    expect(dom.penSizes).toBeDefined();
    expect(dom.clearSessionBtn).toBeDefined();
    expect(dom.fullscreenBtn).toBeDefined();
    expect(dom.saveBtns).toBeDefined();
    expect(dom.authLoginBtn).toBeDefined();
    expect(dom.authPhoto).toBeDefined();
    expect(dom.authName).toBeDefined();
    expect(dom.authLogoutBtn).toBeDefined();

    expect(dom.canvas.tagName);
    expect(dom.canvasAbove.tagName).toBe('CANVAS');
    expect(dom.tools.tagName).toBe('UL');
    expect(dom.primaryColor.tagName).toBe('INPUT');
    expect(dom.secondaryColor.tagName).toBe('INPUT');
    expect(dom.swapColor.tagName).toBe('BUTTON');
    expect(dom.framesList.tagName).toBe('UL');
    expect(dom.frameAddBtn.tagName).toBe('BUTTON');
    expect(dom.preview.tagName).toBe('CANVAS');
    expect(dom.fps.tagName).toBe('INPUT');
    expect(dom.fpsValue.tagName).toBe('P');
    expect(dom.resBtns.tagName).toBe('DIV');
    expect(dom.mainColumn.tagName).toBe('DIV');
    expect(dom.penSizes.tagName).toBe('UL');
    expect(dom.clearSessionBtn.tagName).toBe('BUTTON');
    expect(dom.fullscreenBtn.tagName).toBe('BUTTON');
    expect(dom.saveBtns.tagName).toBe('DIV');
    expect(dom.authLoginBtn.tagName).toBe('BUTTON');
    expect(dom.authPhoto.tagName).toBe('IMG');
    expect(dom.authName.tagName).toBe('SPAN');
    expect(dom.authLogoutBtn.tagName).toBe('BUTTON');

    expect(dom.tools.className).toBe('tools__container');
    expect(dom.fullscreenBtn.className).toBe('animate__fullscreen');
    expect(dom.clearSessionBtn.className).toBe('btn session__clear');
  });
});
