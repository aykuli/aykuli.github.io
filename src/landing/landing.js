import './landing.scss';
import { drawOnCanvas } from '../components/drawCanvas/drawCanvas';
import { imagesArr } from './modules/dataURIs';
import { animate } from '../components/animation/animate';
import { getLandingElements, renderGalleryItems, galleryItemsHandler } from './modules/landingDom';
import { getDomElement } from '../components/dom/domUtils';
import { LS_KEYS, SELECTORS } from '../constants';

function landing(
  imagesArray,
  getDomElem,
  getLandingDOMElements,
  drawCanvas,
  animation,
  renderGalleryElements,
  galleryElemsHandler,
  keysForLS,
  Selectors
) {
  const [canvasMain, gallery, functionalityPreview] = getLandingDOMElements(getDomElem, Selectors);
  // animate on screenshot of app
  animation({
    draw: i => {
      drawCanvas(canvasMain, imagesArray[0][i]);
    },
    piskelImg: imagesArray[0],
    isForLanding: true,
    keys: keysForLS,
  });

  // animate in functionality list
  animation({
    draw: i => {
      drawCanvas(functionalityPreview, imagesArray[1][i]);
    },
    piskelImg: imagesArray[1],
    isForLanding: true,
    keys: keysForLS,
  });

  // animate in example gallery
  renderGalleryElements(drawCanvas, animation, gallery, imagesArray, keysForLS, Selectors, el =>
    document.createElement(el)
  );

  gallery.addEventListener('click', e => galleryElemsHandler(e, imagesArray, keysForLS));
  return 'landing page created';
}

landing(
  imagesArr,
  getDomElement,
  getLandingElements,
  drawOnCanvas,
  animate,
  renderGalleryItems,
  galleryItemsHandler,
  LS_KEYS,
  SELECTORS
);
