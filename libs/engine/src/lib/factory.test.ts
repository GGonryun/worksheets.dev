import { MethodCallFailure } from '@worksheets/apps/framework';
import { StatusCodes } from 'http-status-codes';
import { Execution } from './execution';
import { Mock, newTestExecutionFactory } from './test-utils.spec';
import { when } from 'jest-when';

describe('execution factory serialization through explicit halting', () => {
  type TestCases = {
    name: string;
    yaml: string;
    input?: unknown;
    arrange?: (mock: Mock) => void;
    assert?: (mock: Mock, execution: Execution) => void;
  };

  const testCases: TestCases[] = [
    {
      name: 'halts when instruction is seen in step',
      yaml: `
      steps:
        - call: read
        - jump: halt
        - call: read
        - call: read`,
      assert(m, e) {
        expect(e.ctx.controller.isCancelled()).toEqual(false);
        expect(e.ctx.instructions.size()).toEqual(0);
        expect(m).toBeCalledTimes(3);
      },
    },
    {
      name: 'transfers assigned variables',
      yaml: `
      assign:
        - word: telephone
      steps:
        - jump: halt
        - call: receives.input
          input: \${word}`,
      assert(m) {
        expect(m).toBeCalledWith('receives.input', 'telephone');
        expect(m).toBeCalledTimes(1);
      },
    },
    {
      name: 'serializes numbers back to their correct data types',
      yaml: `
      steps:
        - call: test.output
          output: num
        - jump: halt
        - call: test.input
          input: \${num}`,
      arrange(m) {
        when(m).calledWith('test.output', undefined).mockReturnValue(314);
      },
      assert(m) {
        expect(m).toBeCalledWith('test.input', 314);
        expect(m).toBeCalledTimes(2);
      },
    },
    {
      name: 'serializes variables back to their correct data types',
      yaml: `
      steps:
        - assign: 
          - num: 32
          - name: pablo
          - obj: {a: 1, b: "hello"}
          - list: [true, false, "33"]
        - jump: halt
        - return: 
            num: \${num}`,
      assert(_, e) {
        expect(e.ctx.register.output).toEqual({ num: 32 });
      },
    },
    {
      name: 'serializes part way through a for loop',
      yaml: `
      assign:
        - list: ["a","b","c","d","e"]
        - sum: "" # initialize with empty string
      steps:
        - for: list
          index: i
          value: v
          steps:
            - switch: 
              - if: \${i == 3}
                steps:
                  - jump: halt
            - call: test.input
              input: \${v}
            - assign: 
              - sum: \${sum + v}
        - return: \${sum}
              `,
      assert(m, e) {
        expect(m).toBeCalledWith('test.input', 'a');
        expect(m).toBeCalledWith('test.input', 'b');
        expect(m).toBeCalledWith('test.input', 'c');
        expect(m).toBeCalledWith('test.input', 'd');
        expect(m).toBeCalledWith('test.input', 'e');
        expect(m).toBeCalledTimes(5);
        expect(e.ctx.register.output).toEqual('abcde');
      },
    },
    {
      name: 'serialized handled failures',
      yaml: `
      assign:
        - list: ["a","b","c","d","e"]
        - sum: "" # initialize with empty string
      steps:
        - try:
            steps:
              - call: throws
              - call: ignore
          catch:
            assign: err
            steps:
              - jump: halt
          finally:
            steps:
              - call: handle
                input: \${err.code}
              - call: read
                input: \${err.message}
              - call: print
                input: \${err}
              `,
      arrange(m) {
        when(m)
          .calledWith('throws', undefined)
          .mockRejectedValue(
            new MethodCallFailure({
              code: StatusCodes.INTERNAL_SERVER_ERROR,
              message: 'method execution failed unexpectedly',
              data: { a: 'test' },
            })
          );
      },
      assert(m) {
        expect(m).not.toBeCalledWith('ignore', undefined);
        expect(m).toBeCalledWith('handle', 500);
        expect(m).toBeCalledWith(
          'read',
          'method execution failed unexpectedly'
        );
        expect(m).toBeCalledWith('print', {
          code: 500,
          message: 'method execution failed unexpectedly',
          data: {
            a: 'test',
          },
        });
      },
    },
    {
      name: 'serializing a worksheet during subexecution',
      yaml: `
      main:
        assign:
          - num: 5
        steps:
          - worksheet: specific_number
          - worksheet: override_number
          - worksheet: override_word
          - call: override
            input: \${num}
          - return: \${num}

      specific_number:
        assign:
          - num: 7
        steps:
          - call: specific
            input: \${num}

      override_number:
        assign:
          - num: 4
        steps:
          - jump: halt
          - call: number
            input: \${num}

      override_word:
        assign:
          - num: word
        steps:
          - call: word
            input: \${num}
      `,
      assert(m, e) {
        expect(m).toBeCalledWith('override', 5);
        expect(m).toBeCalledWith('specific', 7);
        expect(m).toBeCalledWith('number', 4);
        expect(m).toBeCalledWith('word', 'word');
        expect(e.ctx.register.output).toBe(5);
      },
    },
    {
      name: 'serializing a worksheet during main execution',
      yaml: `
      main:
        assign:
          - num: 5
        steps:
          - worksheet: specific_number
          - worksheet: override_number
          - jump: halt
          - call: override
            input: \${num}
          - worksheet: override_word
          - return: \${num}

      specific_number:
        assign:
          - num: 7
        steps:
          - call: specific
            input: \${num}

      override_number:
        assign:
          - num: 4
        steps:
          - call: number
            input: \${num}

      override_word:
        assign:
          - num: word
        steps:
          - call: word
            input: \${num}
      `,
      assert(m, e) {
        expect(m).toBeCalledWith('override', 5);
        expect(m).toBeCalledWith('specific', 7);
        expect(m).toBeCalledWith('number', 4);
        expect(m).toBeCalledWith('word', 'word');
        expect(e.ctx.register.output).toBe(5);
      },
    },
  ];

  testCases.forEach(async ({ name, yaml, input, arrange, assert }) => {
    it(name, async () => {
      const mock = jest.fn();

      arrange && arrange(mock);

      const { factory, controller } = newTestExecutionFactory(mock);

      const exe = await factory.create({ text: yaml, input });
      await exe.process();
      expect(exe.ctx.controller.isCancelled()).toBeTruthy();
      const serialized = factory.serialize(exe);
      /*
       * in real use-cases, something happens in between these two steps.
       */
      controller.reset();
      const deserialized = factory.deserialize(serialized);
      await deserialized.process();
      assert && assert(mock, deserialized);
    });
  });
});

describe('initializing and running serialized executions ', () => {
  type TestCases = {
    name: string;
    yaml: string;
    input?: unknown;
    arrange?: (mock: Mock) => void;
    assert?: (mock: Mock, execution: Execution) => void;
  };

  const testCases: TestCases[] = [
    {
      name: 'still executes multiple calls',
      yaml: `
      steps:
        - call: read
        - call: read
        - call: read`,
      assert(m) {
        expect(m).toBeCalledTimes(3);
      },
    },
    {
      name: 'still processes a loop',
      yaml: `
      assign:
        - list: ["a","b","c","d","e"]
        - sum: "" # initialize with empty string
      steps:
        - for: list
          index: i
          value: v
          steps:
            - call: test.input
              input: \${v}
            - assign: 
              - sum: \${sum + v}
        - return: \${sum}
              `,
      assert(m, e) {
        expect(m).toBeCalledWith('test.input', 'a');
        expect(m).toBeCalledWith('test.input', 'b');
        expect(m).toBeCalledWith('test.input', 'c');
        expect(m).toBeCalledWith('test.input', 'd');
        expect(m).toBeCalledWith('test.input', 'e');
        expect(m).toBeCalledTimes(5);
        expect(e.ctx.register.output).toEqual('abcde');
      },
    },
    {
      name: 'multiple worksheets in a single worksheet',
      yaml: `
          main:
            assign:
              - result: 5
            steps:
              - worksheet: multiply_by_three
                input: \${result}
                output: result
              - worksheet: multiply_by_two
                input: \${result}
                output: result
              - return: \${result}
  
          multiply_by_three:
            params: x
            steps:
              - worksheet: multiply_by_two
                input: \${x}
                output: data
              - return: \${data * 3}
  
          multiply_by_two:
            params: y
            steps:
              - return: \${y * 2}
          `,
      assert(_, e) {
        expect(e.ctx.controller.hasFailure()).toBe(false);
        expect(e.ctx.register.output).toBe(60);
      },
    },
  ];

  testCases.forEach(async ({ name, yaml, input, arrange, assert }) => {
    it(name, async () => {
      const mock = jest.fn();
      const { factory } = newTestExecutionFactory(mock);
      arrange && arrange(mock);

      const exe = await factory.create({ text: yaml, input });
      const serialized = factory.serialize(exe);
      /*
       * in real use-cases, we'll immediately serialize an execution before it gets picked up by a processor.
       */
      const deserialized = factory.deserialize(serialized);
      await deserialized.process();
      assert && assert(mock, deserialized);
    });
  });
});
