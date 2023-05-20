import { Heap } from '../framework';
import { ScriptProcessor } from './processor';
describe('evaluate expression', () => {
  const handler = jest.fn();

  const memory = new Heap();
  const library = new Heap();
  memory.put('a', 'a');
  memory.put('undef', undefined);
  memory.put('variable', 42);
  memory.put('count', 13);
  memory.put('word', 'apple');
  memory.put('phrase', 'hello world');
  memory.put('truthy', true);
  memory.put('falsy', false);
  memory.put('list', [1, 2, 3]);
  memory.put('map', { a: 1, b: 2, c: 3 });
  memory.put('test', { test: -2 });
  memory.put('nested', { map: { 'special!key': 'bar' } });
  memory.put('sys', { test: 1 });
  library.put('sys', { test: handler });
  library.put('test', handler);
  library.put('sample', handler);

  type TestCases = ([string, unknown, () => void] | [string, unknown])[];
  const testCases: TestCases = [
    // empty
    ['', ''],
    // numbers
    ['1', 1],
    ['-1', -1],
    ['4.2', 4.2],
    ['0', 0],
    // booleans
    ['true', true],
    ['false', false],
    // strings
    ["'string literal!'", 'string literal!'],
    // variables
    ['variable', 42],
    ['count', 13],
    ['word', 'apple'],
    ['phrase', 'hello world'],
    // unary operator
    ['!true', false],
    ['!false', true],
    ['!1', !1],
    ['!9.9', !9.9],
    // binary operations
    ['3 + 3', 6],
    ['3 - 3', 0],
    ['3 * 3', 9],
    ['3 % 3', 0],
    ['3 / 3', 1],
    ['word + word', 'appleapple'],
    ['"word" + word', 'wordapple'],
    ["'w' + 'o' + 'r' + 'd'", 'word'],
    ["'string of ' + word + 's!'", 'string of apples!'],
    // parentheses
    ['(1 + 2) * (2 + 1)', 9],
    // numeric logical operations
    ['6 > 7', false],
    ['6 < 7', true],
    ['6 <= 6', true],
    ['6 >= 6', true],
    // comparison operators
    ['6 == 7', false],
    ['6 != 7', true],
    ['count == 13', true],
    ['word == 13', false],
    ['word != 13', true],
    // boolean logical operators
    ['truthy && true', true],
    ['truthy && false', false],
    ['truthy && truthy', true],
    ['truthy && falsy', false],
    ['truthy || truthy', true],
    ['truthy || falsy', true],
    ['falsy || truthy', true],
    ['falsy || falsy', false],
    ['true ? 1 : 2', 1],
    ['false ? 1 : 2', 2],
    ['truthy && truthy ? 1 : 2', 1],
    // // indexing
    ['list[1]', 2],
    ['list[2]', 3],
    ['map[a]', 1],
    ['map["a"]', 1],
    ['map["c"]', 3],
    // // access nested keys
    ['test', { test: -2 }],
    ['test["test"]', -2],
    ['test.test', -2],
    ['"foo " + nested.map["special!key"]', 'foo bar'],
    // executing methods
    [
      'sys.test(1)',
      'ok',
      () => {
        expect(handler).toBeCalledTimes(1);
        expect(handler).toBeCalledWith(1);
      },
    ],
    [
      'test(test(test(1))) + test(1)',
      'okok',
      () => {
        expect(handler).toBeCalledTimes(4);
        expect(handler).toBeCalledWith(1);
        expect(handler).toBeCalledWith('ok');
      },
    ],
    [
      `sample(sys.test(map, "a"), "Couldn't find key!")`,
      'ok',
      () => {
        expect(handler).toBeCalledTimes(2);
        expect(handler).toBeCalledWith({ a: 1, b: 2, c: 3 }, 'a');
        expect(handler).toBeCalledWith('ok', "Couldn't find key!");
      },
    ],
    [
      'sys.test(sys.test(1))',
      'ok',
      () => {
        expect(handler).toBeCalledTimes(2);
        expect(handler).toBeCalledWith(1);
        expect(handler).toBeCalledWith('ok');
      },
    ],
    [
      'sys.test(1) + sys.test(2)',
      'okok',
      () => {
        expect(handler).toBeCalledTimes(2);
        expect(handler).toBeCalledWith(1);
        expect(handler).toBeCalledWith(2);
      },
    ],
    [
      'sys.test(1, 2, 3)',
      'ok',
      () => {
        expect(handler).toBeCalledTimes(1);
        expect(handler).toBeCalledWith(1, 2, 3);
      },
    ],
    [
      'sys.test(sys.test, sys.test, sys.test) + sys.test',
      'ok1',
      () => {
        expect(handler).toBeCalledTimes(1);
        expect(handler).toBeCalledWith(1, 1, 1);
      },
    ],
  ];
  testCases.forEach(([actual, expected, verify]) => {
    it(`evaluates the expression '${actual}' to: ${expected}`, () => {
      handler.mockReset().mockReturnValue('ok');
      const expression = new ScriptProcessor(memory, library);
      const value = expression.evaluate(actual);
      expect(value).toEqual(expected);
      if (verify) {
        verify();
      }
    });
  });
});

describe('parse text', () => {
  const handler = jest.fn();

  const memory = new Heap();
  const library = new Heap();
  memory.put('ball', 'basket');
  library.put('test', handler);

  describe('evaluates javascript expressions in text', () => {
    type TestCases = {
      name: string;
      actual: string;
      expected: string;
      verify?: () => void;
    }[];
    const testCases: TestCases = [
      {
        name: 'empty',
        actual: '',
        expected: '',
      },
      {
        name: 'no-op',
        actual: 'ball',
        expected: 'ball',
      },
      {
        name: 'single evaluation',
        actual: '${ball}',
        expected: 'basket',
      },
      {
        name: 'multiple evaluation',
        actual: '${ball} ${ball}',
        expected: 'basket basket',
      },
      {
        name: 'without proper delimiter sign',
        actual: 'expression without dollar sign {identifier}',
        expected: 'expression without dollar sign {identifier}',
      },
      {
        name: 'dollar $ sign',
        actual: 'dollar $ sign',
        expected: 'dollar $ sign',
      },
    ];
    testCases.forEach(({ actual, expected, verify }) => {
      it(`parses '${actual}' to: ${expected}`, () => {
        handler.mockReset().mockReturnValue('ok');
        const expression = new ScriptProcessor(memory, library);
        const result = expression.parse(actual);
        expect(result).toEqual(expected);
        if (verify) {
          verify();
        }
      });
    });
  });

  describe('error handling', () => {
    type TestCases = { name: string; test: string }[];
    const testCases: TestCases = [
      {
        name: 'close',
        test: 'text is missing an opening bracket }',
      },
      {
        name: 'open',
        test: 'text ${ is missing a closing bracket',
      },
      {
        name: 'too many',
        test: 'text ${is} missing a ${ closing bracket',
      },
      {
        name: 'nested',
        test: 'text ${ has nested ${brackets}}',
      },
      {
        name: 'reversed',
        test: 'text }${ has bad brackets',
      },
      { name: 'regular open curly bracket', test: 'text { has curly bracket' },
    ];

    testCases.forEach(({ name, test }) => {
      it(`does not accept unbalanced brackets: ${name}`, () => {
        const expression = new ScriptProcessor(memory, library);
        expect(() => expression.parse(test)).toThrow();
      });
    });
  });
});
