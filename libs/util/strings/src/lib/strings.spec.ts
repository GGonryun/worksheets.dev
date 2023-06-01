import { maskStringExceptLastFive } from './strings';
describe('maskStringExceptLastFive', () => {
  const testCases: [string, string][] = [
    ['Hello World', '******World'],
    ['Testing', '**sting'],
    ['1234567890', '*****67890'],
  ];

  testCases.forEach(([input, expectedOutput]) => {
    test(`should mask "${input}" except the last five characters`, () => {
      expect(maskStringExceptLastFive(input)).toBe(expectedOutput);
    });
  });
});
