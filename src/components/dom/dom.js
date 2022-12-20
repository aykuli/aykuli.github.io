export default function domElements(getDomElement) {
  return {
    canvas: getDomElement('#canvas'),
    canvasAbove: getDomElement('.canvas--above'),
    tools: getDomElement('.tools__container'),

    primaryColor: getDomElement('.tools__palette--primary'),
    secondaryColor: getDomElement('.tools__palette--secondary'),
    swapColor: getDomElement('.tools__palette--swapper'),

    framesList: getDomElement('.frames__list'),
    frameAddBtn: getDomElement('.frames__btn--add'),

    preview: getDomElement('#preview'),

    fps: getDomElement('#fps'),
    fpsValue: getDomElement('.fps__value'),

    resBtns: getDomElement('.canvas-resolutions__list'),

    mainColumn: getDomElement('.column--main'),

    penSizes: getDomElement('.pen-size__list'),

    clearSessionBtn: getDomElement('.session__clear'),

    fullscreenBtn: getDomElement('.animate__fullscreen'),

    saveBtns: getDomElement('.save'),

    authLoginBtn: getDomElement('.auth__login'),
    authPhoto: getDomElement('.auth__photo'),
    authName: getDomElement('.auth__name'),
    authLogoutBtn: getDomElement('.auth__logout'),

    hotKeyWindowBtn: getDomElement('.hotKeys__btn'),
    hotKeysWindow: getDomElement('.hotKeys__wrap'),
    hotKeysClose: getDomElement('.hotKeys__close'),
    hotKeysList: getDomElement('.hotKeys'),
    pageDarker: getDomElement('.page__darker'),
  };
}
