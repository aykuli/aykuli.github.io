import swapHandler from './swapColors';
import { refreshLocalStorageValue } from '../sessionActions/sessionActions';

/* eslint-disable */
describe('swapHandler function for changing colors', () => {
  it('swapHandler function should mutate given parameters', () => {
    let primaryColor = { value: '#111111' };
    let secondaryColor = { value: '#222222' };
    const ctx = { fillStyle: '#333333' };
    // const refreshLocalStorageValue = (key, value) => {};
    [primaryColor.value, secondaryColor.value] = swapHandler(
      primaryColor,
      secondaryColor,
      ctx,
      refreshLocalStorageValue
    );
    expect(primaryColor).toStrictEqual({ value: '#222222' });
    expect(secondaryColor).toStrictEqual({ value: '#111111' });
    expect(ctx).toStrictEqual({ fillStyle: '#222222' });
  });
});
