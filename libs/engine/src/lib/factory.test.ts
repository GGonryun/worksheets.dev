import { MethodCallFailure } from '@worksheets/apps/framework';
import { StatusCodes } from 'http-status-codes';
import { Execution } from './execution';
import { ExecutionFactory } from './factory';
import { Mock, JestApplicationLibrary } from './test-utils.spec';
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
        expect(e.ctx.register.halt).toEqual(false);
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
  ];

  testCases.forEach(async ({ name, yaml, input, arrange, assert }) => {
    it(name, async () => {
      const mock = jest.fn();
      const library = new JestApplicationLibrary({ call: mock });
      const factory = new ExecutionFactory({ library });

      arrange && arrange(mock);

      const exe = await factory.create({ yaml, input });
      await exe.process();
      expect(exe.ctx.register.halt).toBeTruthy();
      const serialized = factory.save(exe);
      /*
       * in real use-cases, something happens in between these two steps.
       */
      const deserialized = factory.load(serialized);
      await deserialized.process({ force: true });
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
      name: 'halts when instruction is seen in step',
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
  ];

  testCases.forEach(async ({ name, yaml, input, arrange, assert }) => {
    it(name, async () => {
      const mock = jest.fn();
      const library = new JestApplicationLibrary({ call: mock });
      const factory = new ExecutionFactory({ library });

      arrange && arrange(mock);

      const exe = await factory.create({ yaml, input });
      const serialized = factory.save(exe);
      /*
       * in real use-cases, we'll immediately serialize an execution before it gets picked up by a processor.
       */
      const deserialized = factory.load(serialized);
      await deserialized.process({ force: false }); // no need to force, we never halted to begin with.
      assert && assert(mock, deserialized);
    });
  });
});
