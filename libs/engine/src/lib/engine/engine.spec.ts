import { Engine } from '../engine';
import { Init } from '../instructions/init';
import { load } from '../util';
import { Execution } from '../execution/execution';
import { Context } from '../framework';
import { JestRegistry } from '../applications/applications.test';
import { Mock } from '../util/index.test';
import { when } from 'jest-when';
import { Heap } from '../structures';
import { DomainFailure } from '../failures';

const CONSTANT_NOW = 1684563401;
describe('parsing visualizer', () => {
  it('visualizes yaml', () => {
    const yaml = `
    steps:
      - call: system.time.now
        output: time
      - try: 
          steps:
            - call: system.time.now
              output: time
        handle: error
        catch:
          steps:
            - call: system.time.now
              output: time
      - if:
        - case: \${time > system.time.now() - 5000}
          steps:
            - call: system.time.now
              output: time
            - call: system.time.now
              output: time
        - case: \${time > system.time.now() - 2000}
          steps:
            - call: system.time.now
              output: time
            - call: system.time.now
              output: time
      - loop: \${list}
        index: index_name
        value: value_name
        steps: 
          - call: system.console.log
            input:
              data: \${index_name} 
          - call: system.console.log
            input:
              data: \${value_name} 
      - return: \${time}

    `;
    const def = load(yaml);
    expect(def).not.toBeUndefined();
  });
});

describe('metadata only', () => {
  const yaml = `
  version: 1
  name: metadata
  `;
  it('processes worksheet', async () => {
    const def = load(yaml);
    const ctx = new Context();
    ctx.instructions.push(new Init(def));
    const engine = new Engine(ctx);

    await engine.iterate();
    expect(ctx.register.name).toEqual('metadata');
    expect(ctx.register.version).toEqual(1);
  });
});

describe('worksheets', () => {
  describe('simple', () => {
    type TestCases = {
      name: string;
      yaml: string;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      input?: any;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expectation: any;
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
      return: hello \${x}!
      `,
      },
      {
        name: 'assign string',
        expectation: 'hello test!',
        yaml: `
      assign:
        word: hello
      return: \${word} test!
      `,
      },
      {
        name: 'assign multiple',
        expectation: 'hello test!',
        yaml: `
      assign:
        word: hello
        name: test
      return: \${word} \${name}!
      `,
      },
      {
        name: 'returns number type',
        expectation: 3,
        yaml: `
        assign:
          count: 3
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
          word: hello
          count: 13
          available: true
          names: [my, name, is, engine]
          effect:
            earth: 1
            fire: 2
            wind: 3
            water: 4
        return:
          phrase: \${word} user
          tag: \${count}
          seen: has been seen? \${available}`,
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
          word: 'hello'
          count: 3
          truth: true
      return:
        str: \${word}
        num: \${count}
        bool: \${truth}`,
      },
    ];

    testCases.forEach(async ({ name, yaml, input, expectation }) => {
      it(name, async () => {
        const exe = new Execution({ input });
        const result = await exe.run(yaml);
        expect(result).toEqual(expectation);
      });
    });
  });

  describe('complex cases', () => {
    type TestCases = {
      name: string;
      yaml: string;
      input?: unknown;
      arrange?: (mock: Mock, heap: Heap) => void;
      assert?: (result: unknown, mock: Mock) => void;
    };

    const testCases: TestCases[] = [
      {
        name: 'list indexing',
        yaml: `
        assign:
          list: ["apple", "banana", "cherry", "data"]
        steps:
          - call: test
            input: \${list[3]} 
        
        `,
        assert(_, m) {
          expect(m).toBeCalledWith('test', ['data']);
          expect(m).toBeCalledTimes(1);
        },
      },
      {
        name: 'object indexing',
        yaml: `
        assign:
          fruit: "apple"
          object: {"apple": 3}
        steps:
          - call: test
            input: \${object.apple} 
          - call: sample
            input: \${object["apple"]}
          - call: verify
            input: \${object[fruit]}
        
        `,
        assert(_, m) {
          expect(m).toBeCalledWith('test', [3]);
          expect(m).toBeCalledWith('sample', [3]);
          expect(m).toBeCalledWith('verify', [3]);
        },
      },
      {
        name: 'map indexing',
        yaml: `
        assign:
          fruit: "apple"
          object: 
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
          expect(m).toBeCalledWith('test', [3]);
          expect(m).toBeCalledWith('sample', [3]);
          expect(m).toBeCalledWith('verify', [3]);
        },
      },
      {
        name: 'must specify output',
        yaml: `
        steps:
          - call: core.time.now
            output: time
          - return: \${time}
        `,
        arrange(m) {
          when(m).calledWith('core.time.now', []).mockReturnValue(CONSTANT_NOW);
        },
        assert(result) {
          expect(result).toEqual(CONSTANT_NOW);
        },
      },
      {
        name: 'returns expression evaluations immediately',
        yaml: `
        steps:
          - return: \${core.time.now()}
        `,
        arrange(m) {
          when(m).calledWith('core.time.now', []).mockReturnValue(100);
        },
        assert(result, m) {
          expect(result).toEqual(100);
          expect(m).toBeCalledTimes(1);
        },
      },
      {
        name: 'executes applications using expressions',
        yaml: `
        steps:
          - assign:
            val: \${core.time.now()}
          - return: \${val}
        `,
        arrange(m) {
          when(m).calledWith('core.time.now', []).mockReturnValue(CONSTANT_NOW);
        },
        assert(result, m) {
          expect(result).toEqual(1684563401);
          expect(m).toBeCalledTimes(1);
        },
      },
      {
        name: 'executes the same application in both contexts',
        yaml: `
        steps:
          - assign:
            val: \${core.time.now()}
          - call: core.time.now
            output: time
          - return:
              val: \${val}
              time: \${time}
        `,
        arrange(m) {
          when(m).calledWith('core.time.now', []).mockReturnValue(CONSTANT_NOW);
        },
        assert(result, m) {
          expect(result).toEqual({ time: 1684563401, val: 1684563401 });
          expect(m).toBeCalledTimes(2);
        },
      },
      {
        name: 'executes the same application in both contexts',
        yaml: `
        steps:
          - assign:
            val: \${core.test.many(1, 2)}
          - call: core.test.many
            input:
              first: 1
              second: 2
            output: time
          - return:
              val: \${val}
              time: \${time}
        `,
        arrange(m) {
          when(m).calledWith('core.test.many', [1, 2]).mockReturnValue('apple');
          when(m)
            .calledWith('core.test.many', [{ first: 1, second: 2 }])
            .mockReturnValue('banana');
        },
        assert(result, m) {
          expect(result).toEqual({ time: 'banana', val: 'apple' });
          expect(m).toBeCalledTimes(2);
        },
      },
      {
        name: 'condense execution into one object before calling library functions',
        input: 'miguel',
        yaml: `
        params: x
        steps:
          - assign:
            data:
              name: \${x}
              seen: true
              time: \${core.time.now()}
          - assign:
            primary_output: \${core.test.many(data)}
          - call: core.test.many
            input:
              name: \${data.name}
              seen: \${data.seen}
              time: \${data.time}
            output: secondary_output
          - return: 
              a: \${primary_output}
              b: \${secondary_output}
        `,
        arrange(m) {
          when(m).calledWith('core.time.now', []).mockReturnValue(100);
          when(m)
            .calledWith('core.test.many', [
              { name: 'miguel', seen: true, time: 100 },
            ])
            .mockReturnValue('apple');
        },
        assert(result, m) {
          expect(m).toBeCalledTimes(3);
          expect(result).toEqual({ a: 'apple', b: 'apple' });
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
            .calledWith('core.math.max', [{ a: 1, b: 2 }])
            .mockReturnValue(2);
        },
        assert(result, m) {
          expect(result).toEqual(2);
          expect(m).toBeCalledTimes(1);
        },
      },
      {
        name: 'executes a method without io',
        yaml: `
        steps:
          - call: core.system.checkpoint`,
        arrange(m) {
          when(m).calledWith('core.system.checkpoint', []).mockReturnValue(2);
        },
        assert(result, m) {
          expect(result).toEqual(undefined);
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
          when(m).calledWith('core.time.now', []).mockReturnValue(100);
          when(m).calledWith('core.system.sleep', [1000]).mockReturnValue(true);
          when(m)
            .calledWith('core.math.add', [{ a: 100, b: 1000 }])
            .mockReturnValue(1100);
        },
        assert(result, m) {
          expect(result).toEqual(1100);
          expect(m).toBeCalledTimes(3);
        },
      },
      {
        name: 'shared memory overrides existing variables (in assign)',
        yaml: `
        steps:
          - assign:
            sum: 10
          - call: core.math.add
            input:
              a: \${sum}
              b: 1000
            output: sum
          - return: \${sum}
        `,
        arrange(m) {
          when(m)
            .calledWith('core.math.add', [{ a: 10, b: 1000 }])
            .mockReturnValue(1010);
        },
        assert(result, m) {
          expect(result).toEqual(1010);
          expect(m).toBeCalledTimes(1);
        },
      },
      {
        name: 'shared memory overrides existing variables (in assign 2)',
        yaml: `
        assign:
          sum: 10
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
            .calledWith('core.math.add', [{ a: 10, b: 1000 }])
            .mockReturnValue(1010);
        },
        assert(result, m) {
          expect(result).toEqual(1010);
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
            .calledWith('core.math.add', [{ a: 50, b: 5000 }])
            .mockReturnValue(5050);
        },
        assert(result, m) {
          expect(result).toEqual(5050);
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
          when(m).calledWith('core.time.now', []).mockReturnValue(100);
        },
        assert(result, m) {
          expect(result).toEqual(100);
          expect(m).toBeCalledTimes(1);
        },
      },
      {
        name: 'evaluating multiple paths',
        yaml: `
        steps:
          - assign:
            a: 1
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
          when(m).calledWith('core.test.first', []).mockReturnValue(100);
          when(m).calledWith('core.test.second', []).mockReturnValue(1);
        },
        assert(result, m) {
          expect(result).toEqual(1);
          expect(m).toBeCalledTimes(1);
        },
      },
      {
        name: 'failing all conditions',
        yaml: `
        steps:
          - assign:
            a: 3
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
          when(m).calledWith('core.test.first', []).mockReturnValue(100);
          when(m).calledWith('core.test.second', []).mockReturnValue(1);
        },
        assert(result, m) {
          expect(result).toEqual(undefined);
          expect(m).toBeCalledTimes(0);
        },
      },
      {
        name: 'expressions with functions',
        yaml: `
        steps:
          - assign:
            a: 3
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
          when(m).calledWith('bool', [0]).mockReturnValue(false);
          when(m).calledWith('bool', [1]).mockReturnValue(true);
          when(m).calledWith('core.test.second', []).mockReturnValue('yes');
        },
        assert(result, m) {
          expect(result).toEqual('yes');
          expect(m).toBeCalledTimes(3);
        },
      },
      {
        name: 'switch statement requires external scope',
        yaml: `
        steps:
          - assign:
            outerScope: possibly
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
                  innerScope: yes
                  outerScope: no
        return:
          inner: \${innerScope}
          outer: \${outerScope}

        `,
        arrange(m) {
          when(m).calledWith('bool', [0]).mockReturnValue(false);
          when(m).calledWith('bool', [1]).mockReturnValue(true);
          when(m).calledWith('core.test.second', []).mockReturnValue('yes');
        },
        assert(result, m) {
          expect(result).toEqual({ inner: undefined, outer: 'no' });
          expect(m).toBeCalledTimes(1);
        },
      },
      {
        name: 'exporting data from switch statement',
        input: 50,
        yaml: `
        steps:
          - assign:
            outerScope: possibly
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
                  innerScope: yes
                  outerScope: no
        return:
          inner: \${innerScope}
          outer: \${outerScope}
        `,
        arrange(m) {
          when(m).calledWith('bool', [0]).mockReturnValue(false);
          when(m).calledWith('bool', [1]).mockReturnValue(true);
          when(m).calledWith('core.test.second', []).mockReturnValue('yes');
        },
        assert(result, m) {
          expect(result).toEqual({ inner: undefined, outer: 'no' });
          expect(m).toBeCalledTimes(1);
        },
      },
      // FOR
      {
        name: 'iterates over all items',
        yaml: `
        steps:
          - assign:
            list: ["apple", "banana", "cherry"]
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
          expect(m).toBeCalledWith('core.test.second', ['apple']);
          expect(m).toBeCalledWith('core.test.first', [0]);
          expect(m).toBeCalledWith('core.test.second', ['banana']);
          expect(m).toBeCalledWith('core.test.second', ['cherry']);
          expect(m).toBeCalledWith('core.test.first', [1]);
          expect(m).toBeCalledWith('core.test.first', [2]);
        },
      },
      {
        name: 'nested loops of big items',
        yaml: `
        steps:
          - assign:
            list: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49]
          - assign:
            listTwo: \${list}
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
            list: [0,1,2,3,4,5,6,7,8,9]
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
            list: [0,1,2,3,4,5,6,7,8,9]
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
            index: 0
            list: [0,1,2,3,4,5,6,7,8,9]
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
          value: 0
          list: [0,1,2,3,4,5,6,7,8,"okay"]
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
          expect(m).toBeCalledWith('core.test.first', [0]);
          expect(m).toBeCalledWith('core.test.first', [1]);
          expect(m).toBeCalledWith('core.test.first', [2]);
          expect(m).toBeCalledWith('core.test.first', [3]);
          expect(m).toBeCalledWith('core.test.first', [4]);
          expect(m).toBeCalledWith('core.test.first', [5]);
          expect(m).toBeCalledWith('core.test.first', [6]);
          expect(m).toBeCalledWith('core.test.first', [7]);
          expect(m).toBeCalledWith('core.test.first', [8]);
          expect(m).toBeCalledWith('core.test.first', ['okay']);
          expect(r).toEqual('okay');
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
        name: 'handles errors if method does fail',
        yaml: `
        steps:
          - try:
              steps:
                - call: throws
            catch:
              steps:
                - call: test`,
        arrange(m, r) {
          when(m).calledWith('throws', []).mockRejectedValue('bad');
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
        arrange(m, _) {
          when(m).calledWith('throws', []).mockRejectedValue('bad');
        },
        assert(_, m) {
          expect(m).toBeCalledTimes(4);
          expect(m).toBeCalledWith('handle', [1]);
          expect(m).toBeCalledWith('read', [
            'method execution failed unexpectedly',
          ]);
          expect(m).toBeCalledWith('print', [
            new DomainFailure({
              code: 1,
              message: 'method execution failed unexpectedly',
            }),
          ]);
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
                  - if: \${error.code == 0}
                    steps:
                      - call: wrong
                  - if: \${error.code == 1}
                    steps:
                      - call: right
                        input: \${error.message}`,
        arrange(m) {
          when(m).calledWith('throws', []).mockRejectedValue('bad');
          when(m).calledWith('wrong', []).mockRejectedValue(false);
          when(m).calledWith('right', []).mockResolvedValue(true);
        },
        assert(_, m) {
          expect(m).toBeCalledTimes(2);
          expect(m).toBeCalledWith('right', [
            'method execution failed unexpectedly',
          ]);
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
                  test: \${ignore()}
            catch:
              steps:
                - call: test`,
        arrange(m) {
          when(m).calledWith('throws', []).mockRejectedValue('bad');
        },
        assert(_, m) {
          expect(m).toBeCalledTimes(2);
          expect(m).not.toHaveBeenCalledWith('ignore', []);
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
          when(m).calledWith('throws', []).mockRejectedValue('bad');
        },
        assert(_, m) {
          expect(m).toBeCalledTimes(3);
          expect(m).not.toHaveBeenCalledWith('ignore', []);
          expect(m).toHaveBeenCalledWith('test', []);
          expect(m).toHaveBeenCalledWith('ends', []);
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
          expect(m).not.toHaveBeenCalledWith('test', []);
          expect(m).toHaveBeenCalledWith('does.nothing', []);
          expect(m).toHaveBeenCalledWith('ends', []);
        },
      },
      {
        name: 'try block creates scope',
        yaml: `
        steps:
          - try:
              steps:
                - assign:
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
          when(m).calledWith('time.now', []).mockReturnValue(100);
        },
        assert(r, m) {
          expect(r).toEqual(undefined);
          expect(m).toBeCalledTimes(3);
          expect(m).toBeCalledWith('local', [100]);
          expect(m).toBeCalledWith('ends', [100]);
        },
      },
    ];

    testCases.forEach(async ({ name, yaml, input, arrange, assert }) => {
      it(name, async () => {
        const mock = jest.fn();
        const registry = new JestRegistry(mock);
        const memory = new Heap();
        arrange && arrange(mock, memory);
        const exe = new Execution({ input, registry, memory });
        const result = await exe.run(yaml);
        assert && assert(result, mock);
      });
    });
  });
});
