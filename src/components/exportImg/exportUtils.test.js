import saveHandler from './exportUtils';

/* eslint-disable */
describe('function attends to exporting images', () => {
  it('saveHandler function should return answer', () => {
    let e = { target: { dataset: { save: 'gif' } } };
    let canvas = 'image saved as .gif';
    class GIFEncoder {
      constructor() {}
      start() {}
      setRepeat = x => x;
      setDelay = delay => delay;
      finish() {}
      download = msg => msg;
    }

    const gifSave = (canvas, GIFEncoder) => canvas;
    const apngSave = canvas => canvas;
    expect(saveHandler(e, canvas, gifSave, apngSave)).toBe('image saved as .gif');

    e = { target: { dataset: { save: 'apng' } } };
    canvas = 'image saved as .apng';
    expect(saveHandler(e, canvas, gifSave, apngSave)).toBe('image saved as .apng');

    e = { target: { dataset: { save: 'piskel' } } };
    expect(saveHandler(e, canvas, gifSave, apngSave)).toBe("image haven't saved");
  });
});
