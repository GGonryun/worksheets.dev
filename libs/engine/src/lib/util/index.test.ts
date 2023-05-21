import {
  findFirstExpression,
  getExpressions,
  hasOverlappingCurlyBrackets,
  hasUnbalancedCurlyBrackets,
  isExpression,
} from '.';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Mock = jest.Mock<any, any, any>;

describe('hasOverlappingCurlyBrackets', () => {
  it.each([
    'This {text {intersecting} balanced} curly brackets.',
    'This {text {contains {nested} curly brackets}}',
  ])("should return true for '%s'", (input) => {
    const result = hasOverlappingCurlyBrackets(input);
    expect(result).toBe(true);
  });
  it.each([
    'This {text} has {balanced} curly brackets.',
    'This {text}{contains} no overlapping curly brackets.',
    'This {text} {contains no overlapping} {curly brackets}',
    'This text has unbalanced closing curly bracket}',
  ])("should return false for '%s'", (input) => {
    const result = hasOverlappingCurlyBrackets(input);
    expect(result).toBe(false);
  });
});

describe('getExpressions', () => {
  describe('handles text', () => {
    const testCases: [string, string[]][] = [
      ['This text does not have any curly brackets.', []],
      ['This ${is some} text inside curly brackets.', ['is some']],
      [
        'This ${is some} ${text inside} curly brackets.',
        ['is some', 'text inside'],
      ],
      ['${1 === 1}', ['1 === 1']],
    ];

    testCases.forEach(([input, expected]) => {
      it(`should return ${expected} for the input: ${input}`, () => {
        const result = getExpressions(input);
        expect(result).toEqual(expected);
      });
    });
  });

  describe('throws errors', () => {
    const testCases: string[] = [
      'This {is some {unclosed curly brackets.',
      'This {is {some {nested} text} inside} curly brackets.',
    ];

    testCases.forEach((input) => {
      it(`should throw an error for input: ${input}`, () => {
        expect(() => getExpressions(input)).toThrow();
      });
    });
  });
});

describe('hasUnbalancedCurlyBrackets', () => {
  const testCases: [string, boolean][] = [
    ['This text does not have any curly brackets.', false],
    ['This {text} has {balanced} curly brackets.', false],
    ['This {text has unbalanced opening curly bracket.', true],
    ['This text has unbalanced closing curly bracket.}', true],
    ['This {text {contains unbalanced} curly brackets', true],
  ];

  testCases.forEach(([input, expected]) => {
    it(`should return ${expected} for the input: ${input}`, () => {
      const result = hasUnbalancedCurlyBrackets(input);
      expect(result).toBe(expected);
    });
  });
});

describe('isExpression', () => {
  const success: string[] = ['${}', '${test}'];
  const failure: string[] = ['$${}', '${partial', 'partial}', ' ${}', '${{}}'];
  const processor = (conditions: string[], expectation: boolean) =>
    conditions.forEach((v) => {
      it(`isExpression(${v}) === ${expectation}`, () => {
        expect(isExpression(v)).toEqual(expectation);
      });
    });

  processor(success, true);
  processor(failure, false);
});

describe('findFirstExpression', () => {
  [
    ['${test}', 'test'],
    ['', undefined],
    ['${a} ${b}', 'a'],
  ].forEach(([actual, expected]) => {
    it(`expression in '${actual}'`, () => {
      expect(findFirstExpression(actual)).toEqual(expected);
    });
  });
});
