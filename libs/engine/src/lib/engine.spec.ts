import { Execution } from './execution';
import { when } from 'jest-when';
import { Heap } from '@worksheets/util/data-structures';
import { MethodCallFailure } from '@worksheets/apps/framework';
import { StatusCodes } from 'http-status-codes';
import { Register } from './framework';
import { JestApplicationLibrary, Mock } from './test-utils.spec';

const CONSTANT_NOW = 1684563401;

describe('worksheets', () => {
  describe('simple', () => {
    type TestCases = {
      name: string;
      yaml: string;
      input?: unknown;
      expectation: unknown;
      print?: boolean;
    };

    const testCases: TestCases[] = [
      {
        name: 'unit',
        expectation: 1,
        yaml: `
        return: 1`,
      },
      {
        name: 'identity',
        input: 'test',
        expectation: 'test',
        yaml: `
        params: x
        return: \${x}`,
      },
      {
        name: 'interpolate',
        input: 'test',
        expectation: 'hello test!',
        yaml: `
        params: x
        return: hello \${x}!`,
      },
      {
        name: 'assign string',
        expectation: 'hello test!',
        yaml: `
        assign:
        - word: hello
        return: \${word} test!`,
      },
      {
        name: 'assign multiple',
        expectation: 'hello test!',
        yaml: `
        assign:
        - word: hello
        - name: test
        return: \${word} \${name}!`,
      },
      {
        name: 'returns number type',
        expectation: 3,
        yaml: `
        assign:
        - count: 3
        return: \${count}`,
      },
      {
        name: 'assigns many types',
        expectation: {
          phrase: 'hello user',
          tag: 13,
          seen: 'has been seen? true',
        },
        yaml: `
        assign:
          - word: hello
          - count: 13
          - available: true
          - names: [my, name, is, engine]
          - effect:
              - earth: 1
              - fire: 2
              - wind: 3
              - water: 4
        return:
          - phrase: \${word} user
          - tag: \${count}
          - seen: has been seen? \${available}`,
      },
      {
        name: 'assign during step',
        expectation: {
          str: 'hello',
          num: 3,
          bool: true,
        },
        yaml: `    
        steps:
          - assign:
            - word: 'hello'
            - count: 3
            - truth: true
        return:
          - str: \${word}
          - num: \${count}
          - bool: \${truth}`,
      },
      {
        name: 'complex assignment',
        expectation: {
          obj: {
            name: 'test',
            count: 57,
          },
          list: [1, 2, 3],
          alt: ['a', 'b', 'c'],
        },
        yaml: `    
        assign:
          - obj:
              name: test
              count: 57
          - list: [1, 2, 3]
          - alt:
            - a
            - b
            - c
        return:
          - obj: \${obj}
          - list: \${list}
          - alt: \${alt}`,
      },
    ];

    testCases.forEach(async ({ name, yaml, input, expectation }) => {
      it(name, async () => {
        const library = new JestApplicationLibrary();
        const exe = new Execution({ library });
        const result = await exe.run(yaml, input);
        expect(result.output).toEqual(expectation);
      });
    });
  });

  describe('complex cases', () => {
    type TestCases = {
      name: string;
      yaml: string;
      input?: unknown;
      arrange?: (mock: Mock) => void;
      assert?: (result: Register, mock: Mock) => void;
    };

    const testCases: TestCases[] = [
      // LISTS
      {
        name: 'reads unquoted loop parameters as strings',
        yaml: `
        assign:
          - list: [1,2,x,3,4]
        steps:
          - call: read
            input: \${list}
        `,
        assert(_, m) {
          expect(m).toBeCalledWith('read', [1, 2, 'x', 3, 4]);
        },
      },
      {
        name: 'list indexing',
        yaml: `
        assign:
          - list: ["apple", "banana", "cherry", "data"]
        steps:
          - call: test
            input: \${list[3]} 
        
        `,
        assert(_, m) {
          expect(m).toBeCalledWith('test', 'data');
          expect(m).toBeCalledTimes(1);
        },
      },
      // MAPS
      {
        name: 'object indexing',
        yaml: `
        assign:
          - fruit: "apple"
          - object: {"apple": 3}
        steps:
          - call: test
            input: \${object.apple} 
          - call: sample
            input: \${object["apple"]}
          - call: verify
            input: \${object[fruit]}
        
        `,
        assert(_, m) {
          expect(m).toBeCalledWith('test', 3);
          expect(m).toBeCalledWith('sample', 3);
          expect(m).toBeCalledWith('verify', 3);
        },
      },
      {
        name: 'map indexing',
        yaml: `
        assign:
          - fruit: "apple"
          - object: 
              apple: 3
        steps:
          - call: test
            input: \${object.apple} 
          - call: sample
            input: \${object["apple"]}
          - call: verify
            input: \${object[fruit]}
        
        `,
        assert(_, m) {
          expect(m).toBeCalledWith('test', 3);
          expect(m).toBeCalledWith('sample', 3);
          expect(m).toBeCalledWith('verify', 3);
        },
      },
      // CALL
      {
        name: 'must specify output',
        yaml: `
        steps:
          - call: core.time.now
            output: time
          - return: \${time}
        `,
        arrange(m) {
          when(m)
            .calledWith('core.time.now', undefined)
            .mockReturnValue(CONSTANT_NOW);
        },
        assert(r) {
          expect(r.output).toEqual(CONSTANT_NOW);
        },
      },
      {
        name: 'returns expression evaluations immediately',
        yaml: `
        steps:
          - return: \${core.time.now()}
        `,
        arrange(m) {
          when(m).calledWith('core.time.now', undefined).mockReturnValue(100);
        },
        assert(r, m) {
          expect(r.output).toEqual(100);
          expect(m).toBeCalledTimes(1);
        },
      },
      {
        name: 'executes applications using expressions',
        yaml: `
        steps:
          - assign:
            - val: \${core.time.now()}
          - return: \${val}
        `,
        arrange(m) {
          when(m)
            .calledWith('core.time.now', undefined)
            .mockReturnValue(CONSTANT_NOW);
        },
        assert(r, m) {
          expect(r.output).toEqual(1684563401);
          expect(m).toBeCalledTimes(1);
        },
      },
      {
        name: 'executes the same application in both contexts - no inputs',
        yaml: `
        steps:
          - assign:
            - val: \${core.time.now()}
          - call: core.time.now
            output: time
          - return:
            - val: \${val}
            - time: \${time}
        `,
        arrange(m) {
          when(m)
            .calledWith('core.time.now', undefined)
            .mockReturnValue(CONSTANT_NOW);
        },
        assert(r, m) {
          expect(m).toBeCalledTimes(2);
          expect(r.output).toEqual({ time: CONSTANT_NOW, val: CONSTANT_NOW });
        },
      },
      {
        name: 'executes the same application in both contexts - multi input',
        yaml: `
        steps:
          - assign:
            - val: \${core.test.many(1, 2)}
          - call: core.test.many
            input:
              first: 1
              second: 2
            output: time
          - return:
            - val: \${val}
            - time: \${time}
        `,
        arrange(m) {
          when(m).calledWith('core.test.many', 1, 2).mockReturnValue('apple');
          when(m)
            .calledWith('core.test.many', { first: 1, second: 2 })
            .mockReturnValue('banana');
        },
        assert(r, m) {
          expect(m).toBeCalledWith('core.test.many', { first: 1, second: 2 });
          expect(m).toBeCalledWith('core.test.many', 1, 2);
          expect(m).toBeCalledTimes(2);
          expect(r.output).toEqual({ time: 'banana', val: 'apple' });
        },
      },
      {
        name: 'condense execution into one object before calling library functions',
        input: 'miguel',
        yaml: `
        params: x
        steps:
          - assign:
            - data:
                name: \${x}
                seen: true
                time: \${core.time.now()}
          - assign:
            - primary_output: \${core.test.many(data)}
          - call: core.test.many
            input:
              name: \${data.name}
              seen: \${data.seen}
              time: \${data.time}
            output: secondary_output
          - return: 
            - a: \${primary_output}
            - b: \${secondary_output}
        `,
        arrange(m) {
          when(m).calledWith('core.time.now', undefined).mockReturnValue(100);
          when(m)
            .calledWith('core.test.many', {
              name: 'miguel',
              seen: true,
              time: 100,
            })
            .mockReturnValue('apple');
        },
        assert(r, m) {
          expect(m).toBeCalledTimes(3);
          expect(r.output).toEqual({ a: 'apple', b: 'apple' });
        },
      },
      {
        name: 'read parameters for method call',
        input: { a: 1, b: 2 },
        yaml: `
        params: data
        steps:
          - call: core.math.max
            input:
              a: \${data.a}
              b: \${data.b}
            output: max
        return: \${max}`,
        arrange(m) {
          when(m)
            .calledWith('core.math.max', { a: 1, b: 2 })
            .mockReturnValue(2);
        },
        assert(r, m) {
          expect(r.output).toEqual(2);
          expect(m).toBeCalledTimes(1);
        },
      },
      {
        name: 'executes a method without io',
        yaml: `
        steps:
          - call: core.system.checkpoint`,
        arrange(m) {
          when(m)
            .calledWith('core.system.checkpoint', undefined)
            .mockReturnValue(2);
        },
        assert(r, m) {
          expect(r.output).toEqual(undefined);
          expect(m).toBeCalledTimes(1);
        },
      },
      {
        name: 'shared memory overrides existing variables (in steps)',
        yaml: `
        steps:
          - call: core.time.now
            output: time
          - call: core.system.sleep
            input: 1000
          - call: core.math.add
            input:
              a: \${time}
              b: 1000
            output: time
          - return: \${time}
        `,
        arrange(m) {
          when(m).calledWith('core.time.now', undefined).mockReturnValue(100);
          when(m).calledWith('core.system.sleep', 1000).mockReturnValue(true);
          when(m)
            .calledWith('core.math.add', { a: 100, b: 1000 })
            .mockReturnValue(1100);
        },
        assert(r, m) {
          expect(r.output).toEqual(1100);
          expect(m).toBeCalledTimes(3);
        },
      },
      {
        name: 'shared memory overrides existing variables (in assign)',
        yaml: `
        steps:
          - assign:
            - sum: 10
          - call: core.math.add
            input:
              a: \${sum}
              b: 1000
            output: sum
          - return: \${sum}
        `,
        arrange(m) {
          when(m)
            .calledWith('core.math.add', { a: 10, b: 1000 })
            .mockReturnValue(1010);
        },
        assert(r, m) {
          expect(r.output).toEqual(1010);
          expect(m).toBeCalledTimes(1);
        },
      },
      {
        name: 'shared memory overrides existing variables (in assign 2)',
        yaml: `
        assign:
          - sum: 10
        steps:
          - call: core.math.add
            input:
              a: \${sum}
              b: 1000
            output: sum
          - return: \${sum}
        `,
        arrange(m) {
          when(m)
            .calledWith('core.math.add', { a: 10, b: 1000 })
            .mockReturnValue(1010);
        },
        assert(r, m) {
          expect(r.output).toEqual(1010);
          expect(m).toBeCalledTimes(1);
        },
      },
      {
        name: 'shared memory overrides existing variables (in params)',
        input: 50,
        yaml: `
        params: sum
        steps:
          - call: core.math.add
            input:
              a: \${sum}
              b: 5000
            output: sum
          - return: \${sum}
        `,
        arrange(m) {
          when(m)
            .calledWith('core.math.add', { a: 50, b: 5000 })
            .mockReturnValue(5050);
        },
        assert(r, m) {
          expect(r.output).toEqual(5050);
          expect(m).toBeCalledTimes(1);
        },
      },
      // IF
      {
        name: 'single conditional that always evaluates',
        yaml: `
        steps:
          - switch: 
            - if: \${1 === 1}
              steps:
                - call: core.time.now
                  output: time
                - return: \${time}
          
        `,
        arrange(m) {
          when(m).calledWith('core.time.now', undefined).mockReturnValue(100);
        },
        assert(r, m) {
          expect(r.output).toEqual(100);
          expect(m).toBeCalledTimes(1);
        },
      },
      {
        name: 'evaluating multiple paths',
        yaml: `
        steps:
          - assign:
            - a: 1
          - switch: 
            - if: \${a === 2}
              steps:
                - call: core.test.first
                  output: first
                - return: \${first}
            - if: \${a === 1}
              steps:
                - call: core.test.second
                  output: second
                - return: \${second}
        `,
        arrange(m) {
          when(m).calledWith('core.test.first', undefined).mockReturnValue(100);
          when(m).calledWith('core.test.second', undefined).mockReturnValue(1);
        },
        assert(r, m) {
          expect(r.output).toEqual(1);
          expect(m).toBeCalledTimes(1);
        },
      },
      {
        name: 'failing all conditions',
        yaml: `
        steps:
          - assign:
            - a: 3
          - switch: 
            - if: \${a === 2}
              steps:
                - call: core.test.first
                  output: first
                - return: \${first}
            - if: \${a === 1}
              steps:
                - call: core.test.second
                  output: second
                - return: \${second}
        `,
        arrange(m) {
          when(m).calledWith('core.test.first', undefined).mockReturnValue(100);
          when(m).calledWith('core.test.second', undefined).mockReturnValue(1);
        },
        assert(r, m) {
          expect(r.output).toEqual(undefined);
          expect(m).toBeCalledTimes(0);
        },
      },
      {
        name: 'expressions with functions',
        yaml: `
        steps:
          - assign:
            - a: 3
          - switch: 
            - if: \${bool(0)}
              steps:
                - call: core.test.first
                  output: first
                - return: \${first}
            - if: \${bool(1)}
              steps:
                - call: core.test.second
                  output: second
                - return: \${second}
        `,
        arrange(m) {
          when(m).calledWith('bool', 0).mockReturnValue(false);
          when(m).calledWith('bool', 1).mockReturnValue(true);
          when(m)
            .calledWith('core.test.second', undefined)
            .mockReturnValue('yes');
        },
        assert(r, m) {
          expect(r.output).toEqual('yes');
          expect(m).toBeCalledTimes(3);
        },
      },
      {
        name: 'switch statement requires external scope',
        yaml: `
        steps:
          - assign:
            - outerScope: possibly
          - switch:
            - if: \${false}
              steps:
                - call: core.test.first
                  output: first
                - return: \${first}
            - if: \${true}
              steps:
                - call: core.test.second
                  output: second
                - assign:
                  - innerScope: yes
                  - outerScope: no
        return:
          inner: \${innerScope}
          outer: \${outerScope}

        `,
        arrange(m) {
          when(m).calledWith('bool', 0).mockReturnValue(false);
          when(m).calledWith('bool', 1).mockReturnValue(true);
          when(m)
            .calledWith('core.test.second', undefined)
            .mockReturnValue('yes');
        },
        assert(r, m) {
          expect(r.output).toEqual({ inner: undefined, outer: 'no' });
          expect(m).toBeCalledTimes(1);
        },
      },
      {
        name: 'exporting data from switch statement',
        input: 50,
        yaml: `
        steps:
          - assign:
            - outerScope: possibly
          - switch:
            - if: \${false}
              steps:
                - call: core.test.first
                  output: first
                - return: \${first}
            - if: \${true}
              steps:
                - call: core.test.second
                  output: second
                - assign:
                  - innerScope: yes
                  - outerScope: no
        return:
          inner: \${innerScope}
          outer: \${outerScope}
        `,
        arrange(m) {
          when(m).calledWith('bool', [0]).mockReturnValue(false);
          when(m).calledWith('bool', [1]).mockReturnValue(true);
          when(m)
            .calledWith('core.test.second', undefined)
            .mockReturnValue('yes');
        },
        assert(r, m) {
          expect(r.output).toEqual({ inner: undefined, outer: 'no' });
          expect(m).toBeCalledTimes(1);
        },
      },
      // FOR
      {
        name: 'iterates over all items',
        yaml: `
        steps:
          - assign:
            - list: ["apple", "banana", "cherry"]
          - for: list
            index: index
            value: value
            steps:
              - call: core.test.first
                input: \${index}
              - call: core.test.second
                input: \${value}
        `,
        assert(_, m) {
          expect(m).toBeCalledTimes(6);
          expect(m).toBeCalledWith('core.test.second', 'apple');
          expect(m).toBeCalledWith('core.test.first', 0);
          expect(m).toBeCalledWith('core.test.second', 'banana');
          expect(m).toBeCalledWith('core.test.second', 'cherry');
          expect(m).toBeCalledWith('core.test.first', 1);
          expect(m).toBeCalledWith('core.test.first', 2);
        },
      },
      {
        name: 'use a switch statement to break a loop',
        yaml: `
        steps:
          - assign:
            - list: ["apple", "banana", "cherry"]
          - for: list
            index: index
            value: value
            steps:
              - switch:
                - if: \${index == 2}
                  next: break
              - call: core.test.first
                input: \${index}
              - call: core.test.second
                input: \${value}
              `,
        assert(_, m) {
          expect(m).toBeCalledWith('core.test.first', 0);
          expect(m).toBeCalledWith('core.test.first', 1);
          expect(m).not.toBeCalledWith('core.test.first', 2);
          expect(m).toBeCalledWith('core.test.second', 'apple');
          expect(m).toBeCalledWith('core.test.second', 'banana');
          expect(m).not.toBeCalledWith('core.test.second', 'cherry');
          expect(m).toBeCalledTimes(4);
        },
      },
      {
        name: 'skips an item using continue',
        yaml: `
        steps:
          - assign:
            - list: ["apple", "banana", "cherry"]
          - for: list
            index: index
            value: value
            steps:
              - switch:
                - if: \${index == 0}
                  next: continue
              - call: core.test.first
                input: \${index}
              - call: core.test.second
                input: \${value}
        `,
        assert(_, m) {
          expect(m).not.toBeCalledWith('core.test.first', 0);
          expect(m).toBeCalledWith('core.test.first', 1);
          expect(m).toBeCalledWith('core.test.first', 2);
          expect(m).not.toBeCalledWith('core.test.second', 'apple');
          expect(m).toBeCalledWith('core.test.second', 'banana');
          expect(m).toBeCalledWith('core.test.second', 'cherry');
          expect(m).toBeCalledTimes(4);
        },
      },
      {
        name: 'nested loops of big items',
        yaml: `
        steps:
          - assign:
            - list: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49]
          - assign:
            - listTwo: \${list}
          - for: list
            index: index
            value: value
            steps:
            - for: listTwo
              index: index2
              value: value2
              steps:
                - call: core.test.first
                  input: \${index2}
                - call: core.test.second
                  input: \${value2}
        `,
        assert(_, m) {
          expect(m).toBeCalledTimes(5000);
        },
      },
      {
        name: 'deep loops',
        yaml: `
        steps:
          - assign:
            - list: [0,1,2,3,4,5,6,7,8,9]
          - for: list
            index: index
            value: value
            steps:
            - for: list
              index: index2
              value: value2
              steps:
                - for: list
                  index: index3
                  value: value3
                  steps:
                    - for: list
                      index: index4
                      value: value4
                      steps:
                        - call: core.test.first
                          input: \${index4}
                        - call: core.test.second
                          input: \${value4}
        `,
        assert(_, m) {
          expect(m).toBeCalledTimes(20000);
        },
      },
      {
        name: 'overlapping index value (bad idea to share index variable)',
        yaml: `
        steps:
          - assign:
            - list: [0,1,2,3,4,5,6,7,8,9]
          - for: list
            index: index
            value: value
            steps:
            - for: list
              index: index
              value: value
              steps:
                - for: list
                  index: index
                  value: value
                  steps:
                    - for: list
                      index: index
                      value: value
                      steps:
                        - call: core.test.first
                        - call: core.test.second
        `,
        assert(_, m) {
          expect(m).toBeCalledTimes(14);
        },
      },
      {
        name: 'sharing preassigned index value (bad idea to share index variable)',
        yaml: `
        steps:
          - assign:
            - index: 0
            - list: [0,1,2,3,4,5,6,7,8,9]
          - for: list
            index: index
            value: value
            steps:
            - for: list
              index: index
              value: value
              steps:
                - for: list
                  index: index
                  value: value
                  steps:
                    - for: list
                      index: index
                      value: value
                      steps:
                        - call: core.test.first
                        - call: core.test.second
        `,
        assert(_, m) {
          expect(m).toBeCalledTimes(12);
        },
      },
      {
        name: 'sharing loop output',
        yaml: `
        steps:
        - assign:
          - value: 0
          - list: [0,1,2,3,4,5,6,7,8,"okay"]
        - for: list
          index: index
          value: value
          steps:
          - call: core.test.first
            input: \${value}
            output: \${value}
        return: \${value}
        `,
        assert(r, m) {
          expect(m).toBeCalledTimes(10);
          expect(m).toBeCalledWith('core.test.first', 0);
          expect(m).toBeCalledWith('core.test.first', 1);
          expect(m).toBeCalledWith('core.test.first', 2);
          expect(m).toBeCalledWith('core.test.first', 3);
          expect(m).toBeCalledWith('core.test.first', 4);
          expect(m).toBeCalledWith('core.test.first', 5);
          expect(m).toBeCalledWith('core.test.first', 6);
          expect(m).toBeCalledWith('core.test.first', 7);
          expect(m).toBeCalledWith('core.test.first', 8);
          expect(m).toBeCalledWith('core.test.first', 'okay');
          expect(r.output).toEqual('okay');
        },
      },
      // TRY
      {
        name: 'try a method',
        yaml: `
        steps:
          - try:
              steps:
                - call: test
        `,
        assert(_, m) {
          expect(m).toBeCalledTimes(1);
        },
      },
      {
        name: 'skips errors if method does not fail',
        yaml: `
        steps:
          - try:
              steps:
                - call: test
            catch:
              steps:
                - call: test`,
        assert(_, m) {
          expect(m).toBeCalledTimes(1);
        },
      },
      {
        name: 'handles errors if method fails due to a known error',
        yaml: `
        steps:
          - try:
              steps:
                - call: throws
            catch:
              steps:
                - call: test`,
        arrange(m) {
          when(m)
            .calledWith('throws', undefined)
            .mockRejectedValue(
              new MethodCallFailure({
                code: StatusCodes.INTERNAL_SERVER_ERROR,
                message: 'method execution failed unexpectedly',
              })
            );
        },
        assert(_, m) {
          expect(m).toBeCalledTimes(2);
        },
      },
      {
        name: 'assigns error for easy access on failure',
        yaml: `
        steps:
          - try:
              steps:
                - call: throws
            catch:
              assign: error
              steps:
                - call: handle
                  input: \${error.code}
                - call: read
                  input: \${error.message}
                - call: print
                  input: \${error}
        `,
        arrange(m) {
          when(m)
            .calledWith('throws', undefined)
            .mockRejectedValue(
              new MethodCallFailure({
                code: StatusCodes.INTERNAL_SERVER_ERROR,
                message: 'method execution failed unexpectedly',
              })
            );
        },
        assert(_, m) {
          expect(m).toBeCalledTimes(4);
          expect(m).toBeCalledWith('handle', 500);
          expect(m).toBeCalledWith(
            'read',
            'method execution failed unexpectedly'
          );
          expect(m).toBeCalledWith('print', {
            code: 500,
            message: 'method execution failed unexpectedly',
            data: undefined,
          });
        },
      },
      {
        name: 'error handling with a switch',
        yaml: `
        steps:
          - try:
              steps:
                - call: throws
            catch:
              assign: error
              steps:
                - switch:
                  - if: \${error.code == 503}
                    steps:
                      - call: wrong
                  - if: \${error.code == 500}
                    steps:
                      - call: right
                        input: \${error.message}`,
        arrange(m) {
          when(m)
            .calledWith('throws', undefined)
            .mockRejectedValue(
              new MethodCallFailure({
                code: 500,
                message: 'method execution failed unexpectedly',
              })
            );
          when(m).calledWith('wrong', undefined).mockRejectedValue(false);
          when(m).calledWith('right', undefined).mockResolvedValue(true);
        },
        assert(_, m) {
          expect(m).toBeCalledTimes(2);
          expect(m).toBeCalledWith(
            'right',
            'method execution failed unexpectedly'
          );
        },
      },
      {
        name: 'skips calls if an error occurs',
        yaml: `
        steps:
          - try:
              steps:
                - call: throws
                - call: ignore
                - call: ignore
                - assign:
                  - test: \${ignore()}
            catch:
              steps:
                - call: test`,
        arrange(m) {
          when(m)
            .calledWith('throws', undefined)
            .mockRejectedValue(new MethodCallFailure({ code: 500 }));
        },
        assert(_, m) {
          expect(m).toBeCalledTimes(2);
          expect(m).not.toHaveBeenCalledWith('ignore', undefined);
        },
      },
      {
        name: 'handles errors in a finally step',
        yaml: `
        steps:
          - try:
              steps:
                - call: throws
                - call: ignore
            catch:
              steps:
                - call: test
            finally:
              steps:
                - call: ends`,
        arrange(m) {
          when(m)
            .calledWith('throws', undefined)
            .mockRejectedValue(new MethodCallFailure({ code: 500 }));
        },
        assert(_, m) {
          expect(m).toBeCalledTimes(3);
          expect(m).not.toHaveBeenCalledWith('ignore', undefined);
          expect(m).toHaveBeenCalledWith('test', undefined);
          expect(m).toHaveBeenCalledWith('ends', undefined);
        },
      },
      {
        name: 'calls finally even if the try block succeeds',
        yaml: `
        steps:
          - try:
              steps:
                - call: does.nothing
            catch:
              steps:
                - call: test
            finally:
              steps:
                - call: ends`,
        assert(_, m) {
          expect(m).toBeCalledTimes(2);
          expect(m).not.toHaveBeenCalledWith('test', undefined);
          expect(m).toHaveBeenCalledWith('does.nothing', undefined);
          expect(m).toHaveBeenCalledWith('ends', undefined);
        },
      },
      {
        name: 'try block creates scope',
        yaml: `
        steps:
          - try:
              steps:
                - call: time.now
                  output: now
                - call: local
                  input: \${now}

            finally:
              steps:
                - call: ends
                  input: \${now}
          - return: \${now}`,
        arrange(m) {
          when(m).calledWith('time.now', undefined).mockReturnValue(100);
        },
        assert(r, m) {
          expect(r.output).toEqual(undefined);
          expect(m).toBeCalledTimes(3);
          expect(m).toBeCalledWith('local', 100);
          expect(m).toBeCalledWith('ends', 100);
        },
      },
      // STEPS
      {
        name: 'nested steps are useful if you want to reduce your average call stack size or group common operations with a name',
        yaml: `
        steps:
          - run_sample:
            steps:
            - call: sample
          - eat_apple:
            steps:
            - call: apple
          - go_vroom:
            steps:
            - call: vroom
            - return: yes
        `,
        assert(r, m) {
          expect(r.output).toEqual('yes');
          expect(m).toBeCalledWith('sample', undefined);
          expect(m).toBeCalledWith('apple', undefined);
          expect(m).toBeCalledWith('vroom', undefined);
        },
      },
      {
        name: 'deeply nested steps',
        yaml: `
        steps:
          - steps:
            - call: sample
            - steps:
              - call: apple
              - steps:
                - call: vroom
                - steps:
                  - call: wow
                  - return: true
        `,
        assert(r, m) {
          expect(r.output).toEqual(true);
          expect(m).toBeCalledWith('sample', undefined);
          expect(m).toBeCalledWith('apple', undefined);
          expect(m).toBeCalledWith('vroom', undefined);
          expect(m).toBeCalledWith('wow', undefined);
        },
      },
      // RETURN
      {
        name: 'only the first return statement matters',
        yaml: `
        steps:
          - call: sample
          - return: true
          - call: apple
          - return: false
        `,
        assert(r, m) {
          expect(m).not.toBeCalledWith('apple', undefined);
          expect(m).toBeCalledTimes(1);
          expect(m).toBeCalledWith('sample', undefined);
          expect(r.output).toEqual(true);
        },
      },
      {
        name: 'returns during a loop',
        yaml: `
        assign:
          - list: [1,2,x,3,4]
        steps:
          - for: list
            index: i
            value: v
            steps:
              - switch:
                - if: \${v === "x"}
                  steps:
                    - return: \${i}
            
        `,
        assert(r) {
          expect(r.output).toEqual(2);
        },
      },
      {
        name: 'returns during a loop (shortcut return statement)',
        yaml: `
        assign:
          - list: [1,2,x,3,4]
        steps:
          - for: list
            index: i
            value: v
            steps:
              - switch:
                - if: \${v === "x"}
                  return: \${i}
            
        `,
        assert(r) {
          expect(r.output).toEqual(2);
        },
      },
    ];

    testCases.forEach(async ({ name, yaml, input, arrange, assert }) => {
      it(name, async () => {
        const mock = jest.fn();
        const library = new JestApplicationLibrary({ call: mock });
        const memory = new Heap();
        arrange && arrange(mock);
        const exe = new Execution({ library, memory });
        const result = await exe.run(yaml, input);
        assert && assert(result, mock);
      });
    });
  });

  describe('halting', () => {
    type TestCases = {
      name: string;
      yaml: string;
      input?: unknown;
      arrange?: (mock: Mock, heap: Heap) => void;
      assert?: (mock: Mock, exe: Execution) => void;
    };

    const testCases: TestCases[] = [
      {
        name: 'halts when instruction is seen in step',
        yaml: `
        assign:
          - name: abc
        steps:
          - call: read
          - jump: halt
          - call: read
          - call: read
        `,
        assert(m, e) {
          expect(e.ctx.register.halt).toEqual(true);
          expect(e.ctx.instructions.size()).toEqual(2);
          expect(m).toBeCalledTimes(1);
        },
      },
    ];

    testCases.forEach(async ({ name, yaml, input, arrange, assert }) => {
      it(name, async () => {
        const mock = jest.fn();
        const library = new JestApplicationLibrary({ call: mock });
        const memory = new Heap();
        arrange && arrange(mock, memory);
        const exe = new Execution({ library, memory });
        await exe.run(yaml, input);
        assert && assert(mock, exe);
      });
    });
  });
  // describe('failure cases', () => {});
});

// const testCases: TestCases[] = [
//   // invalid-syntax (found during compile time, yaml could not be parsed)
//   {
//     name: 'missing mapping element',
//     yaml: `
//     name: bad syntax
//     version 1
//   `,
//     assert(err) {
//       expect(err.code).toEqual('compilation-failure');
//       expect(err.message).toEqual(
//         'Invalid syntax detected on line 2: "version 1"'
//       );
//       expect(err.line).toEqual(1);
//     },
//   },
//   {
//     name: 'bad indentation',
//     yaml: `
//     steps:
//       - test
//     - test:
//   `,
//     assert(err) {
//       const e = coerce(err, ExecutionFailure);
//       expect(err.code).toEqual('compilation-failure');
//       expect(err.message).toEqual(
//         'Invalid syntax detected on line 5: "test: "'
//       );
//       expect(err.line).toEqual(1);
//     },
//   },
//   {
//     name: 'unexpected identifier',
//     yaml: `
//     steps: test
//       - call: test
//       - call: test
//   `,
//     assert(err) {
//       const e = coerce(err, ExecutionFailure);
//       expect(err.code).toEqual('compilation-failure');
//       expect(err.message).toEqual(
//         'Invalid instruction detected on line 1: "steps: test"'
//       );
//       expect(err.line).toEqual(1);
//     },
//   },
//   {
//     name: 'unexpected identifier',
//     yaml: `
//     steps: test
//       - call: test
//       - call: test
//   `,
//     assert(err) {
//       const e = coerce(err, ExecutionFailure);
//       expect(err.code).toEqual('compilation-failure');
//       expect(err.message).toEqual(
//         'Invalid instruction detected on line 1: "steps: test"'
//       );
//       expect(err.line).toEqual(1);
//     },
//   },
//   // invaid-instruction (unregonized instruction, or missing a required system instruction, or engine refused to process it for some reason)
//   {
//     name: 'unknown instruction',
//     yaml: `
//     steps:
//       - call: test
//       - unknown: test
//   `,
//     assert(err) {
//       const e = coerce(err, ExecutionFailure);
//       expect(err.code).toEqual('invalid-instruction');
//       expect(err.message).toEqual(
//         'Cannot process unknown instruction: "unknown"'
//       );
//       expect(err.line).toEqual(1);
//     },
//   },
//   {
//     name: 'missing required parameter "if"',
//     yaml: `
//     steps:
//       - switch:
//         - steps:
//           - call: test
//           - call: test
//   `,
//     assert(err) {
//       const e = coerce(err, ExecutionFailure);
//       expect(err.code).toEqual('invalid-instruction');
//       expect(err.message).toEqual(
//         'Instruction "switch" is missing a required parameter: "if"'
//       );
//       expect(err.line).toEqual(1);
//     },
//   },
//   {
//     name: 'cannot use expressions in parameter names',
//     yaml: `
//     assign:
//       sample: \${call}
//     steps:
//       - call: test
//       - \${sample}: test`,
//     assert(err) {
//       const e = coerce(err, ExecutionFailure);
//       expect(err.code).toEqual('invalid-instruction');
//       expect(err.message).toEqual(
//         'Instruction "switch" is missing a required parameter: "if"'
//       );
//       expect(err.line).toEqual(1);
//     },
//   },
//   // application-failure (for call step it could be that the method was not found or http error)
//   {
//     name: 'application fails --  method not found',
//     yaml: `
//     steps:
//       - call: test.test
//         output: \${test}
//   `,
//     assert(err) {
//       const e = coerce(err, ExecutionFailure);
//       expect(err.code).toEqual('application-failure');
//       expect(err.message).toEqual(
//         'Failed to call "test.test" -- it does not exist in the application registry'
//       );
//       expect(err.line).toEqual(1);
//     },
//   },
//   {
//     name: 'application fails -- service unavailable',
//     yaml: `
//     steps:
//       - call: test.test
//         output: \${test}
//   `,
//     assert(err) {
//       const e = coerce(err, ExecutionFailure);
//       expect(err.code).toEqual('application-failure');
//       expect(err.message).toEqual(
//         'Failed to call "test.test" -- the application registry was unable to process your request'
//       );
//       expect(err.status).toEqual(503);
//     },
//   },
//   {
//     name: 'application fails -- missing property',
//     yaml: `
//     steps:
//       - call: test.test
//         input:
//           a: sample
//   `,
//     assert(err) {
//       const e = coerce(err, ExecutionFailure);
//       expect(err.code).toEqual('application-failure');
//       expect(err.message).toEqual(
//         'Failed to call "test.test" -- input does not satisfy expected schema -- missing property "b"'
//       );
//       expect(err.status).toEqual(503);
//     },
//   },
//   {
//     name: 'application call fails -- invalid type',
//     yaml: `
//     steps:
//       - call: test.test
//         input:
//           a: 1
//   `,
//     assert(err) {
//       const e = coerce(err, ExecutionFailure);
//       expect(err.code).toEqual('application-failure');
//       expect(err.message).toEqual(
//         'Failed to call "test.test" -- input does not satisfy expected schema -- invalid type on property "a"'
//       );
//       expect(err.status).toEqual(503);
//     },
//   },
//   {
//     name: 'application call fails -- http responds with 400 error',
//     yaml: `
//     steps:
//       - call: test.test
//         input:
//           a: 1
//   `,
//     assert(err) {
//       const e = coerce(err, ExecutionFailure);
//       expect(err.code).toEqual('application-failure');
//       expect(err.message).toEqual(
//         'Failed to call "test.test" -- input does not satisfy expected schema -- invalid type on property "a"'
//       );
//       expect(err.status).toEqual(503);
//     },
//   },
//   {
//     name: 'application call fails -- http responds with 500 error',
//     yaml: `
//     steps:
//       - call: test.test
//         input:
//           a: 1
//   `,
//     assert(err) {
//       const e = coerce(err, ExecutionFailure);
//       expect(err.code).toEqual('application-failure');
//       expect(err.message).toEqual(
//         'Failed to call "test.test" -- input does not satisfy expected schema -- invalid type on property "a"'
//       );
//       expect(err.status).toEqual(503);
//     },
//   },
//   {
//     name: 'expression fails method does not exist',
//     yaml: `
//     steps:
//       - assign:
//         value \${test.test()}
//           a: 1
//   `,
//     assert(err) {
//       const e = coerce(err, ExecutionFailure);
//       expect(err.code).toEqual('expression-failure');
//       expect(err.message).toEqual(
//         'Failed to evaluate expression "test.test()" -- method does not exist in application registry'
//       );
//       expect(err.status).toEqual(503);
//     },
//   },
//   {
//     name: 'expression fails accessing an undefined object',
//     yaml: `
//     steps:
//       - assign:
//           value: \${apple.banana}
//           a: 1
//   `,
//     assert(err) {
//       const e = coerce(err, ExecutionFailure);
//       expect(err.code).toEqual('expression-failure');
//       expect(err.message).toEqual(
//         'Failed to evaluate expression "test.test" -- "apple" property does not exist'
//       );
//       expect(err.status).toEqual(503);
//     },
//   },
//   {
//     name: 'maximum call stack exceeded',
//     yaml: `
//     assign:
//       list: [0,1,2,3,4,5,6,7,9,10,11,12,13,14,15,16,17,18,19]
//     steps:
//       - for: list
//         index: index
//         value: value
//         steps:
//           - for: list
//             index: index2
//             value: value2
//             steps:
//               - for: list
//                 index: index3
//                 value: value3
//                 steps:
//                   - call: test
//   `,
//     assert(err) {
//       const e = coerce(err, ExecutionFailure);
//       expect(err.code).toEqual('system-failure');
//       expect(err.message).toEqual(
//         'Maximum call stack exceeded -- reduce recursion or step count.'
//       );
//       expect(err.status).toEqual(503);
//     },
//   },
//   {
//     name: 'maximum heap size exceeded',
//     yaml: `
//     assign:
//       list: \${newMassiveList()}
//     steps:
//       - for: list
//         index: index
//         value: value
//         steps:
//           - assign:
//             test: \${}
//             sample: b
//           - call: test
//   `,
//     assert(err) {
//       const e = coerce(err, ExecutionFailure);
//       expect(err.code).toEqual('system-failure');
//       expect(err.message).toEqual(
//         'Maximum call stack exceeded -- reduce recursion or step count.'
//       );
//       expect(err.status).toEqual(503);
//     },
//   },
// ];
