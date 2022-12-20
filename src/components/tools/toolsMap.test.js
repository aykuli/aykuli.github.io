import toolsMap from './toolsMap';

/* eslint-disable */
describe('check tools keyboardShortCuts', () => {
  const keys = ['KeyA', 'KeyB', 'KeyC', 'KeyE', 'KeyP', 'KeyL'];

  keys.forEach(key => {
    it('keyboardShortCuts should exist in toolsMap', () => {
      expect(toolsMap.has(key)).toBe(true);
    });
  });

  it('tool should be pencil', () => {
    expect(toolsMap.get(keys[4])).toBe('pencil');
  });

  it('tool should be bucket', () => {
    expect(toolsMap.get(keys[1])).toBe('bucket');
  });
});
