import apngSave from './apngSave';
import { LS_KEYS } from '../../constants';

/* eslint-disable */
describe('function apngSave to exporting images as .apng', () => {
  it('apngSave function should return answer with given mock parameters', () => {
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

    expect(apngSave(canvas, LS_KEYS)).toBe('image saved as .apng');
  });
});
