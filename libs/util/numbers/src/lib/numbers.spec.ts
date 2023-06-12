import { randomBetween } from './numbers';

describe('randomBetween', () => {
  for (let i = 0; i < 10; i++) {
    it(`should work random test #${i}`, () => {
      const result = randomBetween(1, i + 10);

      expect(result).toBeGreaterThanOrEqual(1);
      expect(result).toBeLessThanOrEqual(i + 10);
    });
  }
});
