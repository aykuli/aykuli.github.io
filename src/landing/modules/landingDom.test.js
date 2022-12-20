import { getLandingElements, renderGalleryItems, galleryItemsHandler } from './landingDom';
import { imagesArr } from './dataURIs';
import { LS_KEYS, SELECTORS } from '../../constants';

/* eslint-disable */
require('@babel/register');
const jsdom = require('jsdom');
const getType = require('jest-get-type');

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
  <div class="canvas-main"></div>
  <div class="gallery"></div>
  <div class="functionality__preview"></div>
</body>
</html>
`,
  options
).window;

const canvasMain = domVirt.window.document.querySelector('.canvas-main');
const gallery = domVirt.window.document.querySelector('.gallery');
const functionalityPreview = domVirt.window.document.querySelector('.functionality__preview');

describe('landing page functions', () => {
  it('galleryItemsHandler function should set default values to start to edit presented animations', () => {
    const e = { target: { tagName: 'CANVAS', parentNode: { dataset: { count: 3 } } } };

    expect(galleryItemsHandler(e, imagesArr, LS_KEYS)).toBe(3);
    expect(JSON.parse(localStorage.getItem('piskelImg'))).toStrictEqual(imagesArr[3]);
    expect(localStorage.getItem('piskelCounter')).toBe('0');
    expect(localStorage.getItem('piskelFps')).toBe('3');
  });

  it('getLandingElements function should return DOM elements', () => {
    const getDomElement = str => domVirt.window.document.querySelector(str);
    expect(getType(getLandingElements(getDomElement, SELECTORS))).toBe('array');
    expect(getLandingElements(getDomElement, SELECTORS)).toStrictEqual([canvasMain, gallery, functionalityPreview]);
  });

  it('renderGalleryItems function should get elements with acoording dataset.count', () => {
    const drawOnCanvas = (canvas, img) => {};
    const animate = (func, img, bool1, bool2) => {};
    const list = renderGalleryItems(drawOnCanvas, animate, gallery, imagesArr, LS_KEYS, SELECTORS, el =>
      domVirt.window.document.createElement(el)
    );

    expect(list.children[0].dataset.count).toBe('0');
    expect(list.children[3].dataset.count).toBe('3');
  });
});
