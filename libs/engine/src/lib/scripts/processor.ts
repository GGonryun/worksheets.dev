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
import { getExpressions, isExpression } from '../util';
import { EvaluateExpressionFailure } from '../failures';
import { Heap, WriteOnlyHeap } from '../framework';

export class ScriptProcessor {
  private readonly memory: WriteOnlyHeap;
  private readonly library: WriteOnlyHeap;

  useLibrary: boolean;
  useDry: boolean;
  /**
   * Processes and evaluates scripts. A script is composed of a single javascript expression. For string interpolation use a script in text "Hello, ${strings.uppercase(username)}"
   *
   * This processor was built using a JavaScript AST visualizer: https://astexplorer.net/
   *
   * @param memory Contains a key value mapping of variable names and their literal values. If you want to lock access to memory use the `useDry` flag.
   * @param library Contains references to executable functions. Scripts can access library functions using a function call `${sys.sleep(500)}` or `${wait(500)}`.
   */
  constructor(memory: Heap, library: Heap) {
    this.memory = new WriteOnlyHeap(memory);
    this.library = new WriteOnlyHeap(library);
    // Switches the current active memory location. Used to evaluate method expressions that reference a function during evaluation. This helps prevent naming collisions between functions and memory variables.
    this.useLibrary = false;
    // Prevents access to external data sources.
    this.useDry = false;
  }

  /**
   * Evaluates scripts contained in text.
   * @param phrase a string containing scripts.
   * @returns the original text with all scripts replaced or the output of an expression if only one was provided.
   */
  parse(phrase: string) {
    const expressions = getExpressions(phrase);
    if (isExpression(phrase)) {
      return this.evaluate(expressions[0]);
    }
    let clone = `${phrase}`;
    for (const expression of expressions) {
      const v = this.evaluate(expression);
      clone = clone.replace(`\${${expression}}`, v);
    }
    return clone;
  }

  /**
   * Evaluates a single javascript expression.
   * @param expression must have content and must be a javascript expression.
   * @returns the evaluated result of the expression.
   */
  evaluate(expression: string) {
    if (!expression) return '';
    const program = parseScript(expression);
    return this.evaluateProgram(program);
  }

  private evaluateProgram(program: Program) {
    const b = program.body;
    const l = b.length;
    if (!l || l > 1) {
      throw new EvaluateExpressionFailure({ code: 'too-many-statements' });
    }
    return this.evaluateBody(b[0]);
  }

  private evaluateBody(body: Directive | Statement | ModuleDeclaration) {
    if (body.type === 'ExpressionStatement') {
      return this.evaluateExpressionStatement(body);
    }
    throw new EvaluateExpressionFailure({ code: 'unexpected-type' });
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
    throw new EvaluateExpressionFailure({ code: 'unexpected-type' });
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
