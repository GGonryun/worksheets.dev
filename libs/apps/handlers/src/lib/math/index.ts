import { ApplicationMethodHandlers } from '@worksheets/apps-registry';

export const math: ApplicationMethodHandlers<'math'> = {
  calc: async function (
    ctx: Pick<
      {
        context: null;
        input: { op: '+' | '-' | '*' | '/' | '^'; x: number; y: number };
        output: number;
      },
      'context' | 'input'
    >
  ): Promise<number> {
    const { op, x, y } = ctx.input;
    let fn: (x: number, y: number) => number;
    switch (op) {
      case '+':
        fn = (x, y) => x + y;
        break;
      case '-':
        fn = (x, y) => x - y;
        break;
      case '*':
        fn = (x, y) => x * y;
        break;
      case '/':
        fn = (x, y) => x / y;
        break;
      case '^':
        fn = (x, y) => Math.pow(x, y);
        break;
    }
    return fn(x, y);
  },
  identity: async function (
    ctx: Pick<
      { context: null; input: number; output: number },
      'context' | 'input'
    >
  ): Promise<number> {
    return ctx.input;
  },
  min: async function (
    ctx: Pick<
      { context: null; input: number[]; output: number },
      'context' | 'input'
    >
  ): Promise<number> {
    return Math.min(...ctx.input);
  },
  max: async function (
    ctx: Pick<
      { context: null; input: number[]; output: number },
      'context' | 'input'
    >
  ): Promise<number> {
    return Math.max(...ctx.input);
  },
  abs: async function (
    ctx: Pick<
      { context: null; input: number; output: number },
      'context' | 'input'
    >
  ): Promise<number> {
    return Math.abs(ctx.input);
  },
  avg: async function (
    ctx: Pick<
      { context: null; input: number[]; output: number },
      'context' | 'input'
    >
  ): Promise<number> {
    return ctx.input.reduce((a, b) => a + b) / ctx.input.length;
  },
};
