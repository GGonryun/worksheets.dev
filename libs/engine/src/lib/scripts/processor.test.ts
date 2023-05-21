import { Heap } from '../structures';
import { ScriptProcessor, evaluateCallPath } from './processor';
import { ScriptsApplicationBridge } from '../applications';
import { Expression } from 'estree';
import { when } from 'jest-when';
import { JestRegistry } from '../applications/applications.test';
import { Mock } from '../util/index.test';

function newTestProcessor() {
  const mock = jest.fn();
  const memory = new Heap();
  const registry = new JestRegistry(mock);
  const bridge = new ScriptsApplicationBridge(registry);
  const processor = new ScriptProcessor(memory, bridge);
  return { processor, bridge, registry, memory, mock };
}

describe('evaluate', () => {
  describe('simple', () => {
    // static set of memory for all tests
    const variables = {
      a: 'a',
      undef: undefined,
      variable: 42,
      count: 13,
      word: 'apple',
      phrase: 'hello world',
      truthy: true,
      falsy: false,
      list: [1, 2, 3],
      map: { a: 1, b: 2, c: 3 },
      test: { test: -2, sample: 1, apple: 'fruit' },
      nested: { map: { 'special!key': 'bar' } },
      nest: { nest: { nest: 'ok' } },
      sys: { test: 1 },
    };
    type TestCase = [string, unknown];
    const testCases: TestCase[] = [
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
      // // strings
      ["'string literal!'", 'string literal!'],
      // // variables
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
      // indexing
      ['list[1]', 2],
      ['list[2]', 3],
      ['map[a]', 1],
      ['map["a"]', 1],
      ['map["c"]', 3],
      // access nested keys
      ['test', { test: -2, sample: 1, apple: 'fruit' }],
      ['test["test"]', -2],
      ['test.test', -2],
      ['nest.nest.nest', 'ok'],
      ['nest.nest', { nest: 'ok' }],
      ['nest["nest"]', { nest: 'ok' }],
      ['nest["nest"].nest', 'ok'],
      ['nest["nest"]["nest"]', 'ok'],
      ['nest', { nest: { nest: 'ok' } }],
      ['test.sample', 1],
      ['test["sample"]', 1],
      ['test[word]', 'fruit'],
      ['"foo " + nested.map["special!key"]', 'foo bar'],
    ];
    testCases.forEach(([actual, expected]) => {
      it(`evaluates the expression '${actual}'`, async () => {
        const { processor, memory } = newTestProcessor();
        memory.putMulti(variables);
        const result = await processor.evaluate(actual);
        expect(result).toEqual(expected);
      });
    });
  });

  describe('complex', () => {
    type TestCase = {
      name: string;
      exp: string;
      arrange?: (heap: Heap, mock: Mock) => void;
      assert?: (result: unknown, mock: Mock) => void;
    };
    const testCases: TestCase[] = [
      {
        name: 'replacing a variable - numeric',
        exp: 'variable',
        arrange(h) {
          h.put('variable', 42);
        },
        assert(r) {
          expect(r).toEqual(42);
        },
      },
      {
        name: 'replacing a variable - text',
        exp: 'phrase',
        arrange(h) {
          h.put('phrase', 'text is here');
        },
        assert(r) {
          expect(r).toEqual('text is here');
        },
      },
      {
        name: 'executing method',
        exp: 'sys.test(1)',
        arrange(_, m) {
          when(m).calledWith('sys.test', [1]).mockReturnValue('text is here');
        },
        assert(r) {
          expect(r).toEqual('text is here');
        },
      },
      {
        name: 'executing methods',
        exp: 'sys.test(1) + sys.sample(v)',
        arrange(h, m) {
          h.put('v', true);
          when(m).calledWith('sys.test', [1]).mockReturnValue('text ');
          when(m).calledWith('sys.sample', [true]).mockReturnValue('is here');
        },
        assert(r) {
          expect(r).toEqual('text is here');
        },
      },
      {
        name: 'executing nested methods',
        exp: 'apple(banana(cherry(lemon))) + lime()',
        arrange(h, m) {
          h.put('lemon', true);
          when(m)
            .calledWith('apple', [{ a: 1 }])
            .mockReturnValue('text ');
          when(m).calledWith('banana', ['tomato']).mockReturnValue({ a: 1 });
          when(m).calledWith('cherry', [true]).mockReturnValue('tomato');
          when(m).calledWith('lime', []).mockReturnValue('is here');
        },
        assert(r) {
          expect(r).toEqual('text is here');
        },
      },
      {
        name: 'executing with multiple arguments',
        exp: 'core.sys.sample(sys.test(map, "a"), "force")',
        arrange(h, m) {
          h.put('map', [1, 2, 3]);
          when(m)
            .calledWith('sys.test', [[1, 2, 3], 'a'])
            .mockReturnValue('overwhelming');

          when(m)
            .calledWith('core.sys.sample', ['overwhelming', 'force'])
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
          h.putMulti({ fruit: 'apple', object: { apple: 3 } });
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
      arrange?: (memory: Heap, mock: Mock) => void;
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
          h.put('ball', 'basket');
        },
        assert(result) {
          expect(result).toEqual('ball');
        },
      },
      {
        name: 'single evaluation string',
        actual: '${ball}',
        arrange(h) {
          h.put('ball', 'basket');
        },
        assert(result) {
          expect(result).toEqual('basket');
        },
      },
      {
        name: 'single evaluation numeric',
        actual: '${ball}',
        arrange(h) {
          h.put('ball', 32);
        },
        assert(result) {
          expect(result).toEqual(32);
        },
      },
      {
        name: 'single evaluation boolean',
        actual: '${ball}',
        arrange(h) {
          h.put('ball', false);
        },
        assert(result) {
          expect(result).toEqual(false);
        },
      },
      {
        name: 'single evaluation function',
        actual: '${sports.basket.ball(1,true)}',
        arrange(h, m) {
          when(m)
            .calledWith('sports.basket.ball', [1, true])
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
          h.put('ball', 'basket');
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
          h.put('ball', 'basket');
          when(m).calledWith('sports.basket', []).mockReturnValue('ball');
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
        when(m).calledWith('test', [1]).mockReturnValue('yay!');
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
        when(m).calledWith('yay', ['chain']).mockReturnValue('yay');
        when(m).calledWith('nay', ['yay']).mockReturnValue('nay');
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
        when(m).calledWith('yay', [1]).mockReturnValue(2);
        when(m).calledWith('nay', [1]).mockReturnValue(3);
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
        when(m).calledWith('test', []).mockReturnValue('word');
        when(m).calledWith('sample', ['word']).mockReturnValue(2);
        when(m).calledWith('example', []).mockReturnValue(2);
        when(m)
          .calledWith('calc', [4])
          .mockReturnValue(['the', 'good', 'word']);
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
        when(m).calledWith('core.test', [1]).mockReturnValue('word');
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
        when(m).calledWith('core.test', [1]).mockReturnValue(['word', 'test']);
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
        when(m).calledWith('core.test', [1]).mockReturnValue(['word', 'test']);
        when(m)
          .calledWith('core.twice', [['word', 'test']])
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
          .calledWith('core.test', [1, 'apple', false])
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
        when(m).calledWith('sample.apple', ['red']).mockReturnValue('apple');
        when(m).calledWith('sample.apple', ['green']).mockReturnValue(1);
        when(m).calledWith('sample.apple', ['blue']).mockReturnValue(false);
        when(m)
          .calledWith('core.test', [1, 'apple', false])
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
      memory.putMulti({
        w: [1, 2, 3],
        x: 1,
        y: true,
        z: 'test',
      });
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
