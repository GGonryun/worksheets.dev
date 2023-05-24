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
  Super,
  PrivateIdentifier,
} from 'estree';
import { isString, isObject, isArray } from 'lodash';
import { Heap, WriteOnlyHeap } from '@worksheets/util-data-structures';
import { getExpressions, isExpression, isRecord } from './util';
import { ExecutionFailure } from './failures';
import { ApplicationLibrary } from '@worksheets/apps/framework';

export type CallExpressionEvaluator = (
  evaluator: ScriptEvaluator,
  call: SimpleCallExpression
) => unknown;

/**
 * CallExpressionBridge describes how the ScriptProcessor will handle any function invocations as it attempts to evalute them. This bridge allows us to connect call expressions to external sources such as the ApplicationRegistry, or a mock.
 */
export interface CallExpressionBridge {
  evaluate: CallExpressionEvaluator;
}

export interface ExpressionEvaluator {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  parse(phrase: string): Promise<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  evaluate(expression: string): Promise<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  recursiveParse(input: unknown): Promise<any>;
}

export class ScriptEvaluator implements ExpressionEvaluator {
  private readonly memory: WriteOnlyHeap;
  bridge: CallExpressionBridge;
  /**
   * Processes and evaluates scripts. A script is composed of a single javascript expression. For string interpolation use a script in text "Hello, ${strings.uppercase(username)}"
   *
   * This evaluator was built using a JavaScript AST visualizer: https://astexplorer.net/
   *
   * @param memory Contains a key value mapping of variable names and their literal values. If you want to lock access to memory use the `useDry` flag.
   * @param bridge Contains an evaluation function for processing function invocations during expression evaluation.
   */
  constructor(memory: Heap, bridge?: CallExpressionBridge) {
    this.memory = new WriteOnlyHeap(memory);
    this.bridge = bridge ?? new UnimplementedCallExpressionBridge();
  }

  /**
   * Evaluates scripts contained in text.
   * @param phrase a string containing scripts.
   * @returns the original text with all scripts replaced or the output of an expression if only one was provided.
   */
  async parse(phrase: string) {
    try {
      const expressions = getExpressions(phrase);
      if (isExpression(phrase)) {
        return await this.evaluate(expressions[0]);
      }
      let clone = `${phrase}`;
      for (const expression of expressions) {
        const v = await this.evaluate(expression);
        clone = clone.replace(`\${${expression}}`, v);
      }
      return clone;
    } catch (error) {
      throw new ExecutionFailure({
        code: 'invalid-expression',
        message: `failed to evaluate an expression in phrase: '${phrase}'`,
        cause: error,
      });
    }
  }

  /**
   * Evaluates a single javascript expression.
   * @param expression must have content and must be a javascript expression.
   * @returns the evaluated result of the expression.
   */
  async evaluate(expression: string) {
    try {
      if (!expression) return '';
      const program = parseScript(expression);
      return await this.evaluateProgram(program);
    } catch (error) {
      throw new ExecutionFailure({
        code: 'invalid-expression',
        message: `failed to evaluate expression: '${expression}'`,
        cause: error,
      });
    }
  }

  /**
   * Evaluates all javascript expressions on any simple or complex parameter type.
   * @param input evaluates simple types or deeply nested structures like objects or arrays using recursion
   * @returns the same input but with all expressions evaluated
   */
  async recursiveParse(input: unknown) {
    try {
      if (isString(input)) {
        const parsed = await this.parse(input);
        return parsed;
      } else if (isArray(input)) {
        const arr: unknown[] = [];
        for (const item of input) {
          const value = await this.recursiveParse(item);
          arr.push(value);
        }
        return arr;
      } else if (isObject(input) && isRecord(input)) {
        const obj: Record<string, unknown> = {};
        for (const key in input) {
          const raw = input[key];
          const value = await this.recursiveParse(raw);
          obj[key] = value;
        }
        return obj;
      } else {
        return input;
      }
    } catch (error) {
      throw new ExecutionFailure({
        code: 'invalid-expression',
        message: `failed to parse expression: '${JSON.stringify(input)}'`,
        cause: error,
      });
    }
  }

  /**
   * Evaluates a JavaScript Abstract Syntax Tree (AST).
   * @param program the JavaScript AST entry point.
   * @returns the evaluated result.
   */
  private async evaluateProgram(program: Program) {
    const b = program.body;
    const l = b.length;

    if (!l || l > 1) {
      throw new ExecutionFailure({
        code: 'invalid-expression',
        message: 'encountered',
      });
    }
    return await this.evaluateBody(b[0]);
  }

  /**
   * Evaluates a JavaScript AST body statement.
   * @param body the JavaScript AST body entry point.
   * @returns the evaluated result.
   */
  private async evaluateBody(body: Directive | Statement | ModuleDeclaration) {
    if (body.type === 'ExpressionStatement') {
      return await this.evaluateExpressionStatement(body);
    }
    throw new Error('unexpected-type');
  }

  /**
   * Evaluates a JavaScript AST expression statement.
   * @param statement the JavaScript AST expression statement entry point.
   * @returns the evaluated result.
   */
  private async evaluateExpressionStatement(statement: ExpressionStatement) {
    const exp = statement.expression;
    return await this.evaluateExpression(exp);
  }

  /**
   * Evaluates an unknown JavaScript AST expression.
   * @param expression of an unknown type will be type checked and evaluated accordingly.
   * @param dryRun prevents resolving of identifiers from memory. Identifiers will return their names instead.
   * @returns
   */
  private async evaluateExpression(
    expression: Expression,
    dryRun?: boolean
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): Promise<any> {
    if (expression.type === 'Literal') {
      return expression.value;
    }
    if (expression.type === 'Identifier') {
      const name = expression.name;
      return dryRun ? name : this.memory.get(name);
    }
    if (expression.type === 'CallExpression') {
      return await this.evaluateCallExpression(expression);
    }
    if (expression.type === 'UnaryExpression') {
      return await this.evaluateUnaryExpression(expression);
    }
    if (expression.type === 'BinaryExpression') {
      return await this.evaluateBinaryExpression(expression);
    }
    if (expression.type === 'LogicalExpression') {
      return await this.evaluateLogicalExpression(expression);
    }
    if (expression.type === 'ConditionalExpression') {
      return await this.evaluateConditionalExpression(expression);
    }
    if (expression.type === 'MemberExpression') {
      return await this.evaluateMemberExpression(expression);
    }
    throw new Error('unexpected-type');
  }

  /**
   * Evaluates a JavaScript conditional expression
   *
   * Conditional Expressions allow you to perform different actions or evaluations based on a certain test or predicate.
   * @param expression must be a conditional expression.
   * @returns the evaluated result.
   */
  private async evaluateConditionalExpression(
    expression: ConditionalExpression
  ) {
    return (await this.evaluateExpression(expression.test))
      ? await this.evaluateExpression(expression.consequent)
      : await this.evaluateExpression(expression.alternate);
  }

  /**
   * Evaluates a JavaScript logical expression
   *
   * Logical Expressions are statements or combinations of statements that evaluate to either true or false.
   * @param expression must be a logical expression.
   * @returns the evaluated result.
   */
  private async evaluateLogicalExpression(exp: LogicalExpression) {
    const left = await this.evaluateExpression(exp.left);
    const right = await this.evaluateExpression(exp.right);
    switch (exp.operator) {
      case '||':
        return left || right;
      case '&&':
        return left && right;
      case '??':
        return left ?? right;
    }
  }

  /**
   * Evaluates a JavaScript binary expression.
   *
   * Binary Expressions involve two operands or variables and an operator, performing an operation between the two values.
   * @param expression must be a binary expression.
   * @returns the evaluated result.
   */

  private async evaluateBinaryExpression(exp: BinaryExpression) {
    const left = await this.evaluateExpression(exp.left);
    const right = await this.evaluateExpression(exp.right);
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
        throw new Error('unexpected-operator');
    }
  }

  /**
   * Evaluates a JavaScript unary expression
   *
   * Unary Expressions involve a single operand or variable and an operator.
   * @param expression must be a unary expression.
   * @returns the evaluated result.
   */
  private async evaluateUnaryExpression(exp: UnaryExpression) {
    const argument = await this.evaluateExpression(exp.argument);
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
    throw new Error('unexpected-operator');
  }

  /**
   * Evaluates a JavaScript call expression using a bridge. The bridge is responsible for evaluating the simple call expression and responding with data.
   * @param call must be a call expression
   * @returns the evaluation of the function call
   */
  private async evaluateCallExpression(call: SimpleCallExpression) {
    return await this.bridge.evaluate(this, call);
  }

  /**
   * Evaluates a method call's arguments, each argument must be evaluated independently.
   *
   * @param args an n-sized list of unknown expressions to evlauate.
   * @returns the evaluated arguments as a list.
   */
  async evaluateCallExpressionArguments(
    args: Expression[]
  ): Promise<unknown[]> {
    const results: unknown[] = [];
    for (const arg of args) {
      results.push(await this.evaluateExpression(arg));
    }
    return results;
  }

  /**
   * Evaluates a membership expression. These are used to reference the contents of map-like or iterable-like structures.
   *
   * @param member the expression to evaluate membership from.
   * @returns the evaluated expression.
   */
  private async evaluateMemberExpression(member: MemberExpression) {
    const obj = await this.evaluateExpression(member.object as Expression);
    const property = await this.evaluateExpression(
      member.property as Expression,
      !isArray(obj) && !member.computed
    );
    return obj[property];
  }
}

export class UnimplementedCallExpressionBridge implements CallExpressionBridge {
  async evaluate() {
    throw new Error(
      'an application bridge for call expressions has not been configured yet'
    );
  }
}

export class ScriptsApplicationBridge implements CallExpressionBridge {
  private readonly library: ApplicationLibrary;
  constructor(library: ApplicationLibrary) {
    this.library = library;
  }
  async evaluate(
    evaluator: ScriptEvaluator,
    call: SimpleCallExpression
  ): Promise<unknown> {
    const path = evaluateCallPath(call.callee);
    const args = await evaluator.evaluateCallExpressionArguments(
      call.arguments as Expression[]
    );

    try {
      const result = await this.library.call(
        path,
        // work around for passing in empty arguments.
        ...(args.length ? args : [undefined])
      );
      return result;
    } catch (error) {
      throw new ExecutionFailure({
        code: 'invalid-expression',
        message: `failed to execute application ${path}`,
        cause: error,
        data: { args },
      });
    }
  }
}

export function evaluateCallPath(
  call: Expression | Super | PrivateIdentifier
): string {
  if (call.type === 'Identifier') {
    return call.name;
  }
  if (call.type === 'MemberExpression') {
    const object = evaluateCallPath(call.object);
    const property = evaluateCallPath(call.property);
    return `${object}.${property}`;
  }

  throw new ExecutionFailure({
    code: 'invalid-expression',
    message: `invalid or unexpected call type ${call.type}`,
    data: { call },
  });
}
