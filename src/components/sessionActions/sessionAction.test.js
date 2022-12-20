import { clearSession, saveImgsInLocalStorage, refreshLocalStorageValue } from './sessionActions';

/* eslint-disable */
describe('sessionActions function', () => {
  it("saveImgsInLocalStorage function should update localStorage and return 'data:someImage'", () => {
    const piskelImg = [''];
    const canvas = { toDataURL: () => 'data:someImage' };
    const currentCount = 0;
    expect(saveImgsInLocalStorage(piskelImg, canvas, currentCount)).toBe('data:someImage');
    expect(piskelImg).toStrictEqual(['data:someImage']);
  });

  it('refreshLocalStorageValue function should set key according to value in localStorage', () => {
    expect(refreshLocalStorageValue('keyMockNum1', 1)).toBe('1');
    expect(localStorage.getItem('keyMockNum1')).toBe('1');

    expect(refreshLocalStorageValue('keyMockNum2', 37)).toBe('37');
    expect(localStorage.getItem('keyMockNum2')).toBe('37');
    expect(localStorage.getItem('keyMockNum1')).toBe('1');
  });

  it('clearSession', () => {
    // mock for built-in function location
    location = Object.create(window);
    Object.defineProperty(location, 'reload', {
      value: () => {},
      writable: false,
    });
    refreshLocalStorageValue('key0', ['some image data']);
    refreshLocalStorageValue('key1', ['some data']);
    clearSession();
    expect(localStorage.getItem('key0')).toBe(null);
    expect(localStorage.getItem('key1')).toBe(null);
  });
});
