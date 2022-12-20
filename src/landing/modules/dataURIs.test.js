import { imagesArr } from './dataURIs';

/* eslint-disable */
describe('const with images to show on landing page', () => {
  it('imagesArr should contain elements with image data started with "data:image/png;base64,"', () => {
    expect(imagesArr.length).toBeGreaterThan(0);

    imagesArr.forEach(elem => {
      expect(elem.length).toBeGreaterThan(0);
      expect(elem[0].includes('data:image/png;base64,')).toBe(true);
    });
  });
});
