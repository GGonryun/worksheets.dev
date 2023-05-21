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
import { getExpressions, isExpression, isRecord } from '../util';
import { EvaluateExpressionFailure } from '../failures';
import { isString, isObject, isArray } from 'lodash';
import { WriteOnlyHeap, Heap } from '../structures';
import { UnimplementedCallExpressionBridge } from '../applications';
import { object } from 'zod';

export type CallExpressionEvaluator = (
  processor: ScriptProcessor,
  call: SimpleCallExpression
) => unknown;
/**
 * CallExpressionBridge describes how the ScriptProcessor will handle any function invocations as it attempts to evalute them. This bridge allows us to connect call expressions to external sources such as the ApplicationRegistry, or a mock.
 */
export interface CallExpressionBridge {
  evaluate: CallExpressionEvaluator;
}

export class ScriptProcessor {
  private readonly memory: WriteOnlyHeap;
  useDry: boolean;
  bridge: CallExpressionBridge;
  /**
   * Processes and evaluates scripts. A script is composed of a single javascript expression. For string interpolation use a script in text "Hello, ${strings.uppercase(username)}"
   *
   * This processor was built using a JavaScript AST visualizer: https://astexplorer.net/
   *
   * @param memory Contains a key value mapping of variable names and their literal values. If you want to lock access to memory use the `useDry` flag.
   * @param bridge Contains an evaluation function for processing function invocations during expression evaluation.
   */
  constructor(memory: Heap, bridge?: CallExpressionBridge) {
    this.memory = new WriteOnlyHeap(memory);
    this.bridge = bridge ?? new UnimplementedCallExpressionBridge();
    // Prevents access to external data sources.
    this.useDry = false;
  }

  /**
   * Evaluates scripts contained in text.
   * @param phrase a string containing scripts.
   * @returns the original text with all scripts replaced or the output of an expression if only one was provided.
   */
  async parse(phrase: string) {
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
  }

  /**
   * Evaluates a single javascript expression.
   * @param expression must have content and must be a javascript expression.
   * @returns the evaluated result of the expression.
   */
  async evaluate(expression: string) {
    if (!expression) return '';
    const program = parseScript(expression);
    return await this.evaluateProgram(program);
  }

  /** iterates over all fields, if the input is an object and evaluates strings that have expressions in them */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async recursiveParse(input: unknown) {
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
  }

  private async evaluateProgram(program: Program) {
    const b = program.body;
    const l = b.length;

    if (!l || l > 1) {
      throw new EvaluateExpressionFailure({ code: 'too-many-statements' });
    }
    return await this.evaluateBody(b[0]);
  }

  private async evaluateBody(body: Directive | Statement | ModuleDeclaration) {
    if (body.type === 'ExpressionStatement') {
      return await this.evaluateExpressionStatement(body);
    }
    throw new EvaluateExpressionFailure({ code: 'unexpected-type' });
  }

  private async evaluateExpressionStatement(statement: ExpressionStatement) {
    const exp = statement.expression;
    return await this.evaluateExpression(exp);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private async evaluateExpression(
    exp: Expression,
    dryRun?: boolean
  ): Promise<any> {
    if (exp.type === 'Literal') {
      return exp.value;
    }
    if (exp.type === 'Identifier') {
      const name = exp.name;
      return dryRun ? name : this.memory.get(name);
    }
    if (exp.type === 'CallExpression') {
      return await this.evaluateCallExpression(exp);
    }
    if (exp.type === 'UnaryExpression') {
      return await this.evaluateUnaryExpression(exp);
    }
    if (exp.type === 'BinaryExpression') {
      return await this.evaluateBinaryExpression(exp);
    }
    if (exp.type === 'LogicalExpression') {
      return await this.evaluateLogicalExpression(exp);
    }
    if (exp.type === 'ConditionalExpression') {
      return await this.evaluateConditionalExpression(exp);
    }
    if (exp.type === 'MemberExpression') {
      return await this.evaluateMemberExpression(exp);
    }
    throw new EvaluateExpressionFailure({ code: 'unexpected-type' });
  }

  private async evaluateConditionalExpression(exp: ConditionalExpression) {
    return (await this.evaluateExpression(exp.test))
      ? await this.evaluateExpression(exp.consequent)
      : await this.evaluateExpression(exp.alternate);
  }

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
        throw new EvaluateExpressionFailure({ code: 'unexpected-operator' });
    }
  }

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
    throw new EvaluateExpressionFailure({ code: 'unexpected-type' });
  }

  private async evaluateCallExpression(call: SimpleCallExpression) {
    return await this.bridge.evaluate(this, call);
  }

  async evaluateCallExpressionArguments(args: Expression[]) {
    const results: unknown[] = [];
    for (const arg of args) {
      results.push(await this.evaluateExpression(arg));
    }
    return results;
  }

  private async evaluateMemberExpression(member: MemberExpression) {
    const obj = await this.evaluateExpression(member.object as Expression);
    const property = await this.evaluateExpression(
      member.property as Expression,
      !isArray(obj) && !member.computed
    );
    return obj[property];
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
  throw new Error('failed to evaluate call path, unrecognized type');
}
