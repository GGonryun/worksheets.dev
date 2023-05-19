import { CodedFailure, CodedFailureOptions } from '@worksheets/util-errors';
import { Program, parseScript } from 'esprima';
import {
  Directive,
  Statement,
  ModuleDeclaration,
  ExpressionStatement,
  SimpleCallExpression,
  Expression,
  MemberExpression,
  LogicalExpression,
  UnaryExpression,
  BinaryExpression,
  ConditionalExpression,
} from 'estree';
import { Heap } from '../instructions/framework';

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
  ];
  testCases.forEach(([actual, expected, verify]) => {
    it(`evaluates the expression '${actual}' to: ${expected}`, () => {
      handler.mockReset().mockReturnValue('ok');
      const expression = new ExpressionProcess(memory, library);
      const value = expression.evaluate(actual);
      expect(value).toEqual(expected);
      if (verify) {
        verify();
      }
    });
  });
});

class ExpressionProcess {
  private readonly memory: Heap;
  private readonly library: Heap;
  useLibrary: boolean;
  useDry: boolean;
  constructor(memory: Heap, library: Heap) {
    this.memory = memory;
    this.library = library;
    this.useLibrary = false;
    this.useDry = false;
  }

  evaluate(text: string) {
    if (!text) return '';
    const program = parseScript(text);
    return this.evaluateProgram(program);
  }

  private evaluateProgram(program: Program) {
    const b = program.body;
    const l = b.length;
    if (!l || l > 1) {
      throw new Error(`must have only one statement ${l}`);
    }
    return this.evaluateBody(b[0]);
  }

  private evaluateBody(body: Directive | Statement | ModuleDeclaration) {
    if (body.type === 'ExpressionStatement') {
      return this.evaluateExpressionStatement(body);
    }

    throw new Error(`evaluateBody: unexpected type: ${body.type}`);
  }

  private evaluateExpressionStatement(statement: ExpressionStatement) {
    const exp = statement.expression;
    return this.evaluateExpression(exp);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private evaluateExpression(exp: Expression): any {
    if (exp.type === 'Literal') {
      return exp.value;
    }
    if (exp.type === 'Identifier') {
      return this.useDry
        ? exp.name
        : this.useLibrary
        ? this.library.get(exp.name)
        : this.memory.get(exp.name);
    }
    if (exp.type === 'CallExpression') {
      return this.evaluateCallExpression(exp);
    }
    if (exp.type === 'UnaryExpression') {
      return this.evaluateUnaryExpression(exp);
    }
    if (exp.type === 'BinaryExpression') {
      return this.evaluateBinaryExpression(exp);
    }
    if (exp.type === 'LogicalExpression') {
      return this.evaluateLogicalExpression(exp);
    }
    if (exp.type === 'ConditionalExpression') {
      return this.evaluateConditionalExpression(exp);
    }
    if (exp.type === 'MemberExpression') {
      return this.evaluateMemberExpression(exp);
    }

    throw new Error(
      `evaluateExpressionStatement: unexpected type: ${exp.type}`
    );
  }

  private evaluateConditionalExpression(exp: ConditionalExpression) {
    return this.evaluateExpression(exp.test)
      ? this.evaluateExpression(exp.consequent)
      : this.evaluateExpression(exp.alternate);
  }

  private evaluateLogicalExpression(exp: LogicalExpression) {
    const left = this.evaluateExpression(exp.left);
    const right = this.evaluateExpression(exp.right);
    switch (exp.operator) {
      case '||':
        return left || right;
      case '&&':
        return left && right;
      case '??':
        return left ?? right;
    }
  }

  private evaluateBinaryExpression(exp: BinaryExpression) {
    const left = this.evaluateExpression(exp.left);
    const right = this.evaluateExpression(exp.right);
    switch (exp.operator) {
      case '+':
        return left + right;
      case '*':
        return left * right;
      case '-':
        return left - right;
      case '/':
        return left / right;
      case '%':
        return left % right;
      case '<':
        return left < right;
      case '<=':
        return left <= right;
      case '>':
        return left > right;
      case '>=':
        return left >= right;
      case '==':
        return left == right;
      case '!=':
        return left != right;
      case '===':
        return left === right;
      case '!==':
        return left !== right;
      case '**':
        return left ** right;
      case '|':
        return left | right;
      case '^':
        return left ^ right;
      case '&':
        return left & right;
      case 'in':
        return left in right;
      case 'instanceof':
        return left instanceof right;
      case '>>>':
        return left >>> right;
      case '<<':
        return left << right;
      case '>>':
        return left >> right;
      default:
        throw new EvaluateExpressionFailure({ code: 'unexpected-operator' });
    }
  }

  private evaluateUnaryExpression(exp: UnaryExpression) {
    const argument = this.evaluateExpression(exp.argument);
    switch (exp.operator) {
      case '-':
        return -argument;
      case '+':
        return +argument;
      case '!':
        return !argument;
      case '~':
        return ~argument;
      case 'typeof':
        return typeof argument;
      case 'void':
        return void argument;
      case 'delete':
    }
    throw new EvaluateExpressionFailure({ code: 'unexpected-type' });
  }

  private evaluateCallExpression(call: SimpleCallExpression) {
    // TODO: do not use this library lock.
    this.useLibrary = true;
    const callee = this.evaluateExpression(call.callee as Expression);
    this.useLibrary = false;
    const args = this.evaluateCallExpressionArguments(
      call.arguments as Expression[]
    );
    return callee(...args);
  }

  private evaluateCallExpressionArguments(args: Expression[]) {
    const results: unknown[] = [];
    for (const arg of args) {
      results.push(this.evaluateExpression(arg));
    }
    return results;
  }

  private evaluateMemberExpression(member: MemberExpression) {
    const obj = this.evaluateExpression(member.object as Expression);
    // TODO: remove global scoped expression locks.
    this.useDry = true;
    const property = this.evaluateExpression(member.property as Expression);
    this.useDry = false;
    return obj[property];
  }
}

type EvaluateExpressionFailureCode =
  | 'unexpected-type'
  | 'unexpected-operator'
  | 'argument-required'
  | 'method-not-in-library';
class EvaluateExpressionFailure extends CodedFailure<EvaluateExpressionFailureCode> {
  constructor(opts: CodedFailureOptions<EvaluateExpressionFailureCode>) {
    super(opts);
  }
}
