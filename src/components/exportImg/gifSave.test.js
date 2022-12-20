import gifSave from './gifSave';
import { LS_KEYS } from '../../constants';

/* eslint-disable */
describe('function gifSave to exporting images as .gif', () => {
  it('gifSave function should return answer with given mock parameters', () => {
    class GIFEncoder {
      constructor() {}
      start() {}
      setRepeat = x => x;
      setDelay = delay => delay;
      finish() {}
      download = msg => msg;
    }
    const canvas = {
      getContext: value => {
        return {
          clearRect: (x0, y0, x1, y1) => 'Rectangle created in context of canvas',
          drawImage: (img, x0, y0, width, height) => 'Rectangle drawn on canvas',
          getImageData: (x0, y0, width, height) => {
            return { data: { buffer: 'someValue' } };
          },
        };
      },
      width: 100,
      height: 100,
    };
    localStorage.setItem('piskelImg', JSON.stringify(['', '']));
    localStorage.setItem('piskelFps', 5);

    expect(gifSave(canvas, GIFEncoder, LS_KEYS)).toBe('image saved as .gif');
  });
});
