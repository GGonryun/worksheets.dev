import { ScriptProcessor } from '../scripts/processor';
import { Heap } from '../structures';
import {
  CustomRegistry,
  MockRegistry,
  MockRegistryResponses,
} from './applications';
import { SimpleCallExpression } from 'estree';
import { ScriptsApplicationBridge } from './bridges';

export class JestRegistry extends CustomRegistry {
  constructor(fn: jest.Mock<any, any, any>) {
    super(async ({ path, input }) => {
      const result = fn(path, input);
      return result;
    });
  }
}
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
    results: MockRegistryResponses;
  };
  const tcs: TestCase[] = [
    {
      name: 'identifiers',
      expression: isSimple,
      expected: 'yeah buddy',
      results: { test: { input: ['sample'], output: 'yeah buddy' } },
    },
    {
      name: 'object',
      expression: isObject,
      expected: 2,
      results: { 'test.twice': { input: [1], output: 2 } },
    },
    {
      name: 'adding',
      expression: isAdding,
      expected: 3,
      results: { 'test.once': { input: [3], output: 3 } },
    },
    {
      name: 'nested',
      expression: isNested,
      expected: 3,
      results: {
        'test.once': { input: [2], output: 3 },
        'test.twice': { input: [1], output: 2 },
      },
    },
    {
      name: 'multiple inputs',
      expression: hasMultipleInputs,
      expected: true,
      results: {
        'test.test.test': { input: [1, 2, 3], output: true },
        a: { input: [], output: 1 },
        b: { input: [], output: 2 },
        c: { input: [], output: 3 },
      },
    },
    {
      name: 'mixed',
      expression: hasMixed,
      expected: true,
      results: {
        test: { input: ['yesundefined', 'yes'], output: true },
        sample: { input: ['yes'], output: 'yes' },
        now: { input: [], output: 'yes' },
      },
    },
  ];
  tcs.forEach(({ name, expression, expected, results }) => {
    it(name, async () => {
      const memory = new Heap();
      const registry = new MockRegistry(results);
      const bridge = new ScriptsApplicationBridge(registry);
      const processor = new ScriptProcessor(memory, bridge);
      const result = await bridge.evaluate(processor, expression);
      expect(result).toEqual(expected);
    });
  });
});
