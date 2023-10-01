import { isInRect } from './index';

describe('isInRect', () => {
  const sampleRect = {
    left: 57,
    right: 107,
    top: 308.5,
    bottom: 358.5,
  };

  it('inside of square', () => {
    expect(isInRect({ x: 58, y: 340 }, sampleRect)).toBeTruthy();
  });

  it('on line of square', () => {
    expect(isInRect({ x: 57, y: 340 }, sampleRect)).toBeTruthy();
  });

  it('completely out of bounds', () => {
    expect(isInRect({ x: 500, y: 500 }, sampleRect)).toBeFalsy();
  });
});
