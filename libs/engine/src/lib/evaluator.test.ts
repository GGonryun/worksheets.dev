import {
  ScriptEvaluator,
  ScriptsApplicationBridge,
  evaluateCallPath,
} from './evaluator';
import { when } from 'jest-when';
import { Expression, SimpleCallExpression } from 'estree';
import { JestApplicationLibrary, Mock } from './test-utils.spec';
import { Memory } from './framework';

function newTestProcessor() {
  const mock = jest.fn();
  const memory = new Memory();
  const library = new JestApplicationLibrary({ call: mock });
  const bridge = new ScriptsApplicationBridge(library);
  const processor = new ScriptEvaluator(memory, bridge);
  return { processor, bridge, library, memory, mock };
}

describe('evaluate', () => {
  describe('simple', () => {
    type TestCase = {
      input: string;
      expected: unknown;
      arrange?: (memory: Memory, mock: Mock) => void;
    };
    const testCases: TestCase[] = [
      // empty
      { input: '', expected: '' },
      // numbers
      // ['1', 1],
      { input: '1', expected: 1 },
      // ['-1', -1],
      { input: '-1', expected: -1 },
      // ['4.2', 4.2],
      { input: '4.2', expected: 4.2 },
      // ['0', 0],
      { input: '0', expected: 0 },
      // booleans
      { input: 'true', expected: true },
      { input: 'false', expected: false },
      // strings
      { input: "'string literal!'", expected: 'string literal!' },
      // variables
      {
        input: 'variable',
        expected: 42,
        arrange: (memory) => memory.putData('variable', 42),
      },
      {
        input: 'count',
        expected: 13,
        arrange: (memory) => memory.putData('count', 13),
      },
      {
        input: 'word',
        expected: 'apple',
        arrange: (memory) => memory.putData('word', 'apple'),
      },
      // ['phrase', 'hello world'],
      {
        input: 'phrase',
        expected: 'hello world',
        arrange: (memory) => memory.putData('phrase', 'hello world'),
      },
      // unary operator
      {
        input: '!true',
        expected: false,
      },
      {
        input: '!false',
        expected: true,
      },
      {
        input: '!1',
        expected: false,
      },
      {
        input: '!0',
        expected: true,
      },
      {
        input: '!truthy',
        expected: false,
        arrange: (memory) => memory.putData('truthy', true),
      },
      // binary operations
      {
        input: '3 + 3',
        expected: 6,
      },
      {
        input: '3 - 3',
        expected: 0,
      },
      {
        input: '3 * 3',
        expected: 9,
      },
      {
        input: '3 % 3',
        expected: 0,
      },
      {
        input: '3 / 3',
        expected: 1,
      },
      {
        input: 'word + word',
        expected: 'appleapple',
        arrange: (memory) => memory.putData('word', 'apple'),
      },
      {
        input: '"word" + word',
        expected: 'wordapple',
        arrange: (memory) => memory.putData('word', 'apple'),
      },
      {
        input: "'w' + 'o' + 'r' + 'd'",
        expected: 'word',
      },
      {
        input: "'string of ' + word + 's!'",
        expected: 'string of apples!',
        arrange: (memory) => memory.putData('word', 'apple'),
      },
      // parentheses
      {
        input: '(1 + 2) * (2 + 1)',
        expected: 9,
      },
      // numeric logical operations
      {
        input: '6 > 7',
        expected: false,
      },
      {
        input: '6 < 7',
        expected: true,
      },
      {
        input: '6 <= 6',
        expected: true,
      },
      {
        input: '6 >= 6',
        expected: true,
      },
      // comparison operators
      {
        input: '6 == 7',
        expected: false,
      },
      // ['6 != 7', true],
      {
        input: '6 != 7',
        expected: true,
      },
      // ['count == 13', true],
      {
        input: 'count == 13',
        expected: true,
        arrange: (memory) => memory.putData('count', 13),
      },
      {
        input: 'word == 13',
        expected: false,
        arrange: (memory) => memory.putData('word', 'apple'),
      },
      {
        input: 'word != 13',
        expected: true,
        arrange: (memory) => memory.putData('word', 'apple'),
      },
      // boolean logical operators
      {
        input: 'truthy && true',
        expected: true,
        arrange: (memory) => memory.putData('truthy', true),
      },
      {
        input: 'truthy && false',
        expected: false,
        arrange: (memory) => memory.putData('truthy', true),
      },
      {
        input: 'truthy && truthy',
        expected: true,
        arrange: (memory) => memory.putData('truthy', true),
      },
      {
        input: 'truthy && falsy',
        expected: false,
        arrange: (memory) => {
          memory.putData('truthy', true), memory.putData('falsy', false);
        },
      },
      {
        input: 'truthy || truthy',
        expected: true,
        arrange: (memory) => memory.putData('truthy', true),
      },
      {
        input: 'truthy || falsy',
        expected: true,
        arrange: (memory) => {
          memory.putData('truthy', true), memory.putData('falsy', false);
        },
      },
      {
        input: 'falsy || truthy',
        expected: true,
        arrange: (memory) => {
          memory.putData('truthy', true), memory.putData('falsy', false);
        },
      },
      {
        input: 'falsy || falsy',
        expected: false,
        arrange: (memory) => memory.putData('falsy', false),
      },
      {
        input: 'true ? 1 : 2',
        expected: 1,
      },
      {
        input: 'false ? 1 : 2',
        expected: 2,
      },
      {
        input: 'truthy && truthy ? 1 : 2',
        expected: 1,
        arrange: (memory) => memory.putData('truthy', true),
      },
      // indexing
      {
        input: 'list[1]',
        expected: 2,
        arrange: (memory) => memory.putData('list', [1, 2, 3]),
      },
      {
        input: 'list[2]',
        expected: 3,
        arrange: (memory) => memory.putData('list', [1, 2, 3]),
      },
      {
        input: 'map[a]',
        expected: 1,
        arrange: (memory) => {
          memory.putData('map', { apple: 1 }), memory.putData('a', 'apple');
        },
      },
      {
        input: 'map["a"]',
        expected: 1,
        arrange: (memory) => memory.putData('map', { a: 1 }),
      },
      // access nested keys
      {
        input: 'test',
        expected: { test: -2, sample: 1, apple: 'fruit' },
        arrange: (memory) =>
          memory.putData('test', { test: -2, sample: 1, apple: 'fruit' }),
      },
      {
        input: 'test["test"]',
        expected: -2,
        arrange: (memory) =>
          memory.putData('test', { test: -2, sample: 1, apple: 'fruit' }),
      },
      {
        input: 'test.test',
        expected: -2,
        arrange: (memory) =>
          memory.putData('test', { test: -2, sample: 1, apple: 'fruit' }),
      },
      {
        input: 'nest.nest.nest',
        expected: 'ok',
        arrange: (memory) => memory.putData('nest', { nest: { nest: 'ok' } }),
      },
      {
        input: 'nest.nest',
        expected: { nest: 'ok' },
        arrange: (memory) => memory.putData('nest', { nest: { nest: 'ok' } }),
      },
      {
        input: 'nest["nest"]',
        expected: { nest: 'ok' },
        arrange: (memory) => memory.putData('nest', { nest: { nest: 'ok' } }),
      },
      {
        input: 'nest["nest"].nest',
        expected: 'ok',
        arrange: (memory) => memory.putData('nest', { nest: { nest: 'ok' } }),
      },
      {
        input: 'nest["nest"]["nest"]',
        expected: 'ok',
        arrange: (memory) => memory.putData('nest', { nest: { nest: 'ok' } }),
      },
      {
        input: 'nest["nest"]["nest"].nest',
        expected: 'ok',
        arrange: (memory) =>
          memory.putData('nest', { nest: { nest: { nest: 'ok' } } }),
      },
      {
        input: 'nest',
        expected: { nest: { nest: 'ok' } },
        arrange: (memory) => memory.putData('nest', { nest: { nest: 'ok' } }),
      },
      {
        input: 'test.sample',
        expected: 1,
        arrange: (memory) =>
          memory.putData('test', { test: -2, sample: 1, apple: 'fruit' }),
      },
      {
        input: 'test["sample"]',
        expected: 1,
        arrange: (memory) =>
          memory.putData('test', { test: -2, sample: 1, apple: 'fruit' }),
      },
      {
        input: 'test[word]',
        expected: 'fruit',
        arrange: (memory) => {
          memory.putData('test', { test: -2, sample: 1, apple: 'fruit' }),
            memory.putData('word', 'apple');
        },
      },
      {
        input: '"foo " + nested.map["special!key"]',
        expected: 'foo bar',
        arrange: (memory) =>
          memory.putData('nested', { map: { 'special!key': 'bar' } }),
      },
    ];
    testCases.forEach(({ input, expected, arrange }) => {
      it(`evaluates the expression '${input}'`, async () => {
        const { mock, processor, memory } = newTestProcessor();
        arrange && arrange(memory, mock);
        const result = await processor.evaluate(input);
        expect(result).toEqual(expected);
      });
    });
  });

  describe('complex', () => {
    type TestCase = {
      name: string;
      exp: string;
      arrange?: (memory: Memory, mock: Mock) => void;
      assert?: (result: unknown, mock: Mock) => void;
    };
    const testCases: TestCase[] = [
      {
        name: 'replacing a variable - numeric',
        exp: 'variable',
        arrange(h) {
          h.putData('variable', 42);
        },
        assert(r) {
          expect(r).toEqual(42);
        },
      },
      {
        name: 'replacing a variable - text',
        exp: 'phrase',
        arrange(h) {
          h.putData('phrase', 'text is here');
        },
        assert(r) {
          expect(r).toEqual('text is here');
        },
      },
      {
        name: 'executing method',
        exp: 'sys.test(1)',
        arrange(_, m) {
          when(m).calledWith('sys.test', 1).mockReturnValue('text is here');
        },
        assert(r) {
          expect(r).toEqual('text is here');
        },
      },
      {
        name: 'executing methods',
        exp: 'sys.test(1) + sys.sample(v)',
        arrange(h, m) {
          h.putData('v', true);
          when(m).calledWith('sys.test', 1).mockReturnValue('text ');
          when(m).calledWith('sys.sample', true).mockReturnValue('is here');
        },
        assert(r) {
          expect(r).toEqual('text is here');
        },
      },
      {
        name: 'executing nested methods',
        exp: 'apple(banana(cherry(lemon))) + lime()',
        arrange(h, m) {
          h.putData('lemon', true);
          when(m).calledWith('apple', { a: 1 }).mockReturnValue('text ');
          when(m).calledWith('banana', 'tomato').mockReturnValue({ a: 1 });
          when(m).calledWith('cherry', true).mockReturnValue('tomato');
          when(m).calledWith('lime', undefined).mockReturnValue('is here');
        },
        assert(r) {
          expect(r).toEqual('text is here');
        },
      },
      {
        name: 'executing with multiple arguments',
        exp: 'core_sys.sample(sys.test(map, "a"), "force")',
        arrange(h, m) {
          h.putData('map', [1, 2, 3]);
          when(m)
            .calledWith('sys.test', [1, 2, 3], 'a')
            .mockReturnValue('overwhelming');

          when(m)
            .calledWith('core_sys.sample', 'overwhelming', 'force')
            .mockReturnValue('the sky is the limit');
        },
        assert(r) {
          expect(r).toEqual('the sky is the limit');
        },
      },
      {
        name: 'resolves nested identifiers',
        exp: 'object[fruit]',
        arrange(h) {
          h.putData('fruit', 'apple');
          h.putData('object', { apple: 3 });
        },
        assert(r) {
          expect(r).toEqual(3);
        },
      },
    ];
    testCases.forEach(({ name, exp, arrange, assert }) => {
      it(name, async () => {
        const { mock, processor, memory } = newTestProcessor();
        arrange && arrange(memory, mock);
        const result = await processor.evaluate(exp);
        assert && assert(result, mock);
      });
    });
  });
});

describe('parse text', () => {
  describe('evaluates javascript expressions in text', () => {
    type TestCases = {
      name: string;
      actual: string;
      arrange?: (memory: Memory, mock: Mock) => void;
      assert?: (result: unknown, mock: Mock) => void;
    }[];
    const testCases: TestCases = [
      {
        name: 'empty',
        actual: '',

        assert(result, m) {
          expect(result).toEqual('');
          expect(m).toBeCalledTimes(0);
        },
      },
      {
        name: 'not an expression',
        actual: 'ball',
        arrange(h) {
          h.putData('ball', 'basket');
        },
        assert(result) {
          expect(result).toEqual('ball');
        },
      },
      {
        name: 'single evaluation string',
        actual: '${ball}',
        arrange(h) {
          h.putData('ball', 'basket');
        },
        assert(result) {
          expect(result).toEqual('basket');
        },
      },
      {
        name: 'single evaluation numeric',
        actual: '${ball}',
        arrange(h) {
          h.putData('ball', 32);
        },
        assert(result) {
          expect(result).toEqual(32);
        },
      },
      {
        name: 'single evaluation boolean',
        actual: '${ball}',
        arrange(h) {
          h.putData('ball', false);
        },
        assert(result) {
          expect(result).toEqual(false);
        },
      },
      {
        name: 'single evaluation function',
        actual: '${sports.basket.ball(1,true)}',
        arrange(_, m) {
          when(m)
            .calledWith('sports.basket.ball', 1, true)
            .mockReturnValue({ a: 1, b: true });
        },
        assert(result) {
          expect(result).toEqual({ a: 1, b: true });
        },
      },
      {
        name: 'multiple evaluation',
        actual: '${ball} ${ball}',
        arrange(h) {
          h.putData('ball', 'basket');
        },
        assert(result) {
          expect(result).toEqual('basket basket');
        },
      },
      {
        name: 'without proper delimiter sign',
        actual: 'test {identifier}',

        assert(result) {
          expect(result).toEqual('test {identifier}');
        },
      },
      {
        name: 'dollar $ sign',
        actual: 'dollar $ sign',
        assert(result) {
          expect(result).toEqual('dollar $ sign');
        },
      },
      {
        name: 'multiple complex evaluation',
        actual: 'the ${ball + ball + ball + ball} ${sports.basket()} team',
        arrange(h, m) {
          h.putData('ball', 'basket');
          when(m)
            .calledWith('sports.basket', undefined)
            .mockReturnValue('ball');
        },
        assert(result) {
          expect(result).toEqual('the basketbasketbasketbasket ball team');
        },
      },
    ];
    testCases.forEach(({ name, actual, assert, arrange }) => {
      it(name, async () => {
        const { mock, processor, memory } = newTestProcessor();
        arrange && arrange(memory, mock);
        const result = await processor.parse(actual);
        assert && assert(result, mock);
      });
    });
  });
  describe('error handling', () => {
    type TestCase = {
      name: string;
      phrase: string;
    };
    const testCases: TestCase[] = [
      {
        name: 'close',
        phrase: 'text is missing an opening bracket }',
      },
      {
        name: 'open',
        phrase: 'text ${ is missing a closing bracket',
      },
      {
        name: 'too many',
        phrase: 'text ${is} missing a ${ closing bracket',
      },
      {
        name: 'nested',
        phrase: 'text ${ has nested ${brackets}}',
      },
      {
        name: 'reversed',
        phrase: 'text }${ has bad brackets',
      },
      {
        name: 'regular open curly bracket',
        phrase: 'text { has curly bracket',
      },
    ];

    testCases.forEach(({ name, phrase }) => {
      it(`does not accept unbalanced brackets: ${name}`, async () => {
        const { processor } = newTestProcessor();
        try {
          await processor.parse(phrase);
          fail();
        } catch (error) {
          expect(error).not.toBeUndefined();
          expect(error).toBeInstanceOf(Error);
        }
      });
    });
  });
});

describe('expression evaluator', () => {
  type TestCase = {
    name: string;
    expression: string;
    arrange: (m: Mock) => void;
    assert: (result: unknown, m: Mock) => void;
  };
  const testCases: TestCase[] = [
    {
      name: 'accepts a function',
      expression: 'test(1)',
      arrange(m) {
        when(m).calledWith('test', 1).mockReturnValue('yay!');
      },
      assert(r, m) {
        expect(m).toBeCalledTimes(1);
        expect(r).toEqual('yay!');
      },
    },
    {
      name: 'accepts nested functions',
      expression: 'nay(yay("chain"))',
      arrange(m) {
        when(m).calledWith('yay', 'chain').mockReturnValue('yay');
        when(m).calledWith('nay', 'yay').mockReturnValue('nay');
      },
      assert(r, m) {
        expect(m).toBeCalledTimes(2);
        expect(r).toEqual('nay');
      },
    },
    {
      name: 'accepts adding functions',
      expression: 'yay(1) + nay(1)',
      arrange(m) {
        when(m).calledWith('yay', 1).mockReturnValue(2);
        when(m).calledWith('nay', 1).mockReturnValue(3);
      },
      assert(r, m) {
        expect(m).toBeCalledTimes(2);
        expect(r).toEqual(5);
      },
    },
    {
      name: 'accepts complex function operations as arguments',
      expression: 'calc(example() + sample(test()))',

      arrange(m) {
        when(m).calledWith('test', undefined).mockReturnValue('word');
        when(m).calledWith('sample', 'word').mockReturnValue(2);
        when(m).calledWith('example', undefined).mockReturnValue(2);
        when(m).calledWith('calc', 4).mockReturnValue(['the', 'good', 'word']);
      },
      assert(r, m) {
        expect(m).toBeCalledTimes(4);
        expect(r).toEqual(['the', 'good', 'word']);
      },
    },
    {
      name: 'accepts object notation',
      expression: 'core.test(1)',
      arrange(m) {
        when(m).calledWith('core.test', 1).mockReturnValue('word');
      },
      assert(r, m) {
        expect(m).toBeCalledTimes(1);
        expect(r).toEqual('word');
      },
    },
    {
      name: 'accepts adding object notation',
      expression: 'core.test(1) + core.test(1)',
      arrange(m) {
        when(m).calledWith('core.test', 1).mockReturnValue(['word', 'test']);
      },
      assert(r, m) {
        expect(m).toBeCalledTimes(2);
        expect(r).toEqual('word,testword,test');
      },
    },
    {
      name: 'accepts object notation as variable',
      expression: 'core.twice(core.test(1))',
      arrange(m) {
        when(m).calledWith('core.test', 1).mockReturnValue(['word', 'test']);
        when(m)
          .calledWith('core.twice', ['word', 'test'])
          .mockReturnValue(true);
      },
      assert(r, m) {
        expect(m).toBeCalledTimes(2);
        expect(r).toEqual(true);
      },
    },
    {
      name: 'multiple parameters',
      expression: 'core.test(1, "apple", false)',
      arrange(m) {
        when(m)
          .calledWith('core.test', 1, 'apple', false)
          .mockReturnValue('ok');
      },
      assert(r, m) {
        expect(m).toBeCalledTimes(1);
        expect(r).toEqual('ok');
      },
    },
    {
      name: 'multiple parameters and multipe evaluations',
      expression:
        'core.test(sample.apple("green"),sample.apple("red"),sample.apple("blue"))',
      arrange(m) {
        when(m).calledWith('sample.apple', 'red').mockReturnValue('apple');
        when(m).calledWith('sample.apple', 'green').mockReturnValue(1);
        when(m).calledWith('sample.apple', 'blue').mockReturnValue(false);
        when(m)
          .calledWith('core.test', 1, 'apple', false)
          .mockReturnValue('ok');
      },
      assert(r, m) {
        expect(m).toBeCalledTimes(4);
        expect(r).toEqual('ok');
      },
    },
  ];

  testCases.forEach(({ name, expression, arrange, assert }) => {
    it(name, async () => {
      const { processor, mock, memory } = newTestProcessor();
      memory.putData('w', [1, 2, 3]);
      memory.putData('x', 1);
      memory.putData('y', true);
      memory.putData('z', 'test');
      arrange(mock);
      const result = await processor.evaluate(expression);
      assert(result, mock);
    });
  });
});

describe('evaluateCallPath', () => {
  const isIdenifier: Expression = {
    type: 'Identifier',
    name: 'test',
  };

  const isNested: Expression = {
    type: 'MemberExpression',
    object: {
      type: 'Identifier',
      name: 'test',
    },
    property: {
      type: 'Identifier',
      name: 'test',
    },
    computed: false,
    optional: false,
  };

  const isDeeplyNested: Expression = {
    type: 'MemberExpression',
    object: {
      type: 'MemberExpression',
      object: {
        type: 'Identifier',
        name: 'test',
      },
      property: {
        type: 'Identifier',
        name: 'test',
      },
      computed: false,
      optional: false,
    },
    property: {
      type: 'Identifier',
      name: 'test',
    },
    computed: false,
    optional: false,
  };

  [
    {
      name: 'identifiers',
      expression: isIdenifier,
      expected: 'test',
    },
    {
      name: 'member expressions',
      expression: isNested,
      expected: 'test.test',
    },
    {
      name: 'deeply nested member expressions',
      expression: isDeeplyNested,
      expected: 'test.test.test',
    },
  ].forEach(({ name, expression, expected }) => {
    it(name, () => {
      const result = evaluateCallPath(expression);
      expect(result).toEqual(expected);
    });
  });
});

describe('ScriptsApplicationBridge', () => {
  // expression: test("sample")
  const isSimple: SimpleCallExpression = {
    type: 'CallExpression',
    callee: {
      type: 'Identifier',
      name: 'test',
    },
    arguments: [
      {
        type: 'Literal',
        value: 'sample',
        raw: 'sample',
      },
    ],
    optional: false,
  };
  // expression: test.twice(1)
  const isObject: SimpleCallExpression = {
    type: 'CallExpression',
    callee: {
      type: 'MemberExpression',
      object: {
        type: 'Identifier',
        name: 'test',
      },
      property: {
        type: 'Identifier',
        name: 'twice',
      },
      computed: false,
      optional: false,
    },
    arguments: [
      {
        type: 'Literal',
        value: 1,
        raw: '1',
      },
    ],
    optional: false,
  };
  // expression: test.once(1 + 2)
  const isAdding: SimpleCallExpression = {
    type: 'CallExpression',
    callee: {
      type: 'MemberExpression',
      object: {
        type: 'Identifier',
        name: 'test',
      },
      property: {
        type: 'Identifier',
        name: 'once',
      },
      computed: false,
      optional: false,
    },
    arguments: [
      {
        type: 'BinaryExpression',
        left: {
          type: 'Literal',
          value: 1,
          raw: '1',
        },
        operator: '+',
        right: {
          type: 'Literal',
          value: 2,
          raw: '2',
        },
      },
    ],
    optional: false,
  };
  // expression: test.once(test.twice(1))
  const isNested: SimpleCallExpression = {
    type: 'CallExpression',
    callee: {
      type: 'MemberExpression',
      object: {
        type: 'Identifier',
        name: 'test',
      },
      property: {
        type: 'Identifier',
        name: 'once',
      },
      computed: false,
      optional: false,
    },
    arguments: [
      {
        type: 'CallExpression',
        callee: {
          type: 'MemberExpression',
          object: {
            type: 'Identifier',
            name: 'test',
          },
          property: {
            type: 'Identifier',
            name: 'twice',
          },
          computed: false,
          optional: false,
        },
        arguments: [
          {
            type: 'Literal',
            value: 1,
            raw: '1',
          },
        ],
        optional: false,
      },
    ],
    optional: false,
  };
  // expression: test.test.test(a(), b(), c())
  const hasMultipleInputs: SimpleCallExpression = {
    type: 'CallExpression',
    callee: {
      type: 'MemberExpression',
      object: {
        type: 'MemberExpression',
        object: {
          type: 'Identifier',
          name: 'test',
        },
        property: {
          type: 'Identifier',
          name: 'test',
        },
        computed: false,
        optional: false,
      },
      property: {
        type: 'Identifier',
        name: 'test',
      },
      computed: false,
      optional: false,
    },
    arguments: [
      {
        type: 'CallExpression',
        callee: {
          type: 'Identifier',
          name: 'a',
        },
        arguments: [],
        optional: false,
      },
      {
        type: 'CallExpression',
        callee: {
          type: 'Identifier',
          name: 'b',
        },
        arguments: [],
        optional: false,
      },
      {
        type: 'CallExpression',
        callee: {
          type: 'Identifier',
          name: 'c',
        },
        arguments: [],
        optional: false,
      },
    ],
    optional: false,
  };
  // expression: test(sample("yes") + example, now())
  const hasMixed: SimpleCallExpression = {
    type: 'CallExpression',
    callee: {
      type: 'Identifier',
      name: 'test',
    },
    arguments: [
      {
        type: 'BinaryExpression',
        left: {
          type: 'CallExpression',
          callee: {
            type: 'Identifier',
            name: 'sample',
          },
          arguments: [
            {
              type: 'Literal',
              value: 'yes',
              raw: '"yes"',
            },
          ],
          optional: false,
        },
        operator: '+',
        right: {
          type: 'Identifier',
          name: 'example',
        },
      },
      {
        type: 'CallExpression',
        callee: {
          type: 'Identifier',
          name: 'now',
        },
        arguments: [],
        optional: false,
      },
    ],
    optional: false,
  };

  type TestCase = {
    name: string;
    expression: SimpleCallExpression;
    expected: unknown;
    arrange: (mock: Mock) => void;
  };
  const tcs: TestCase[] = [
    {
      name: 'identifiers',
      expression: isSimple,
      expected: 'yeah buddy',
      arrange(m) {
        when(m).calledWith('test', 'sample').mockReturnValue('yeah buddy');
      },
    },
    {
      name: 'object',
      expression: isObject,
      expected: 2,
      arrange(m) {
        when(m).calledWith('test.twice', 1).mockReturnValue(2);
      },
    },
    {
      name: 'adding',
      expression: isAdding,
      expected: 3,
      arrange(m) {
        when(m).calledWith('test.once', 3).mockReturnValue(3);
      },
    },
    {
      name: 'nested',
      expression: isNested,
      expected: 3,

      arrange(m) {
        when(m).calledWith('test.once', 2).mockReturnValue(3);
        when(m).calledWith('test.twice', 1).mockReturnValue(2);
      },
    },
    {
      name: 'multiple inputs',
      expression: hasMultipleInputs,
      expected: true,

      arrange(m) {
        when(m).calledWith('test.test.test', 1, 2, 3).mockReturnValue(true);
        when(m).calledWith('a', undefined).mockReturnValue(1);
        when(m).calledWith('b', undefined).mockReturnValue(2);
        when(m).calledWith('c', undefined).mockReturnValue(3);
      },
    },
    {
      name: 'mixed',
      expression: hasMixed,
      expected: true,

      arrange(m) {
        when(m).calledWith('test', 'yesundefined', 'yes').mockReturnValue(true);
        when(m).calledWith('sample', 'yes').mockReturnValue('yes');
        when(m).calledWith('now', undefined).mockReturnValue('yes');
      },
    },
  ];
  tcs.forEach(({ name, expression, expected, arrange }) => {
    it(name, async () => {
      const mock = jest.fn();
      const library = new JestApplicationLibrary({ call: mock });
      arrange(mock);
      const memory = new Memory();
      const bridge = new ScriptsApplicationBridge(library);
      const processor = new ScriptEvaluator(memory, bridge);
      const result = await bridge.evaluate(processor, expression);
      expect(result).toEqual(expected);
    });
  });
});
