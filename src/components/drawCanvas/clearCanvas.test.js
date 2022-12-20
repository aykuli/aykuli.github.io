import clearCanvas from './clearCanvas';

/* eslint-disable */
describe('clearCanvas function', () => {
  it('clearCanvas should make empty string on place of cleares img in ims array', () => {
    const canvas = {
      getContext: msg => {
        return {
          clearRect: (x0, y0, width, height) => {},
        };
      },
    };
    const piskelImg = ['data0', 'data1', 'data2'];
    let currentCount = 0;
    const imgsKey = 'piskelImg';

    localStorage.setItem(imgsKey, JSON.stringify(piskelImg));

    clearCanvas(canvas, piskelImg, currentCount, imgsKey);
    expect(JSON.parse(localStorage.getItem(imgsKey))).toStrictEqual(['', 'data1', 'data2']);

    currentCount = 2;
    clearCanvas(canvas, piskelImg, currentCount, imgsKey);
    expect(JSON.parse(localStorage.getItem(imgsKey))).toStrictEqual(['', 'data1', '']);
  });
});
