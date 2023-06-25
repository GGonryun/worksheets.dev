import { newMethod } from '@worksheets/apps/framework';
import { z } from 'zod';

export const calc = newMethod({
  id: 'calc',
  label: 'Calculate',
  description: 'Executes an operation (+, -, *, /, ^) between X and Y',
  settings: null,
  input: z.object({
    op: z.union([
      z.literal('+'),
      z.literal('-'),
      z.literal('*'),
      z.literal('/'),
      z.literal('^'),
    ]),
    x: z.number(),
    y: z.number(),
  }),
  output: z.number(),
  async call(ctx) {
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
});
