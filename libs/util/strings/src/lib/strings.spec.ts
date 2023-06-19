import { capitalizeFirstLetter, maskStringExceptLastFive } from './strings';
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

describe('capitalizeFirstLetter', () => {
  it('should capitalize the first letter of a string', () => {
    expect(capitalizeFirstLetter('hello')).toBe('Hello');
  });
  it('should not change the string if the first letter is already capitalized', () => {
    expect(capitalizeFirstLetter('Hello')).toBe('Hello');
  });
});
