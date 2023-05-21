import { Expression } from 'estree';
import { evaluateCallPath } from './scripts';
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
