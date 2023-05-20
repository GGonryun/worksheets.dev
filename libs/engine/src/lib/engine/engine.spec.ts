import { Engine } from '../engine';
import { Init } from '../instructions/init';
import { load } from '../util';
import { Execution } from '../execution/execution';
import { Context } from '../framework';
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

function expectFinish(ctx: Context, engine: Engine) {
  while (engine.hasNext()) {
    expect(async () => await engine.iterate()).not.toThrow();
  }
  expect(ctx.instructions.peek()).toBeUndefined();
  expect(ctx.register.failure.isEmpty()).toBeTruthy();
}

describe('metadata only', () => {
  const yaml = `
  version: 1
  name: metadata
  `;
  it('processes worksheet', () => {
    const def = load(yaml);
    const ctx = new Context();
    ctx.instructions.push(new Init(def));
    const engine = new Engine(ctx);

    expectFinish(ctx, engine);
    expect(ctx.register.name).toEqual('metadata');
    expect(ctx.register.version).toEqual(1);
  });
});

describe('worksheets', () => {
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
      return: 1
      `,
    },
    {
      name: 'identity',
      input: 'test',
      expectation: 'test',
      yaml: `
      params: x
      return: \${x}
      `,
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
      return: \${count}
      `,
    },
  ];

  testCases.forEach(({ name, yaml, input, expectation }) => {
    it(name, async () => {
      const exe = new Execution(input);
      const result = await exe.run(yaml);
      expect(result).toBe(expectation);
    });
  });
});

// describe('assign many types', () => {
//   const yaml = `
//   version: 1
//   name: assign
//   assign:
//     - word: hello
//     - count: 13
//     - available: true
//     - names: [my, name, is, engine]
//     - effect:
//       earth: 1
//       fire: 2
//       wind: 3
//       water: 4
//   output:
//     phrase: \${word} user
//     tag: #\${count}
//     seen: has been seen? \${available}
//   `;
//   it.todo('processes worksheet');
// });

// describe('assign during step', () => {
//   const yaml = `
//   steps:
//     - first:
//       assign:
//         - word: 'hello'
//         - count: 3
//         - truth: true
//   return:
//     str: \${word}
//     num: \${count}
//     bool: \${truth}
//   `;
//   it.todo('processes worksheet');
// });

// describe('steps must specify an output to export their data', () => {
//   const yaml = `
//   steps:
//     - getTime
//       call: system.time.now
//       output: time
//     - return \${time}
//   `;
//   it.todo('processes worksheet');
// });

// describe('read parameters for method call inputs', () => {
//   const yaml = `
//   params: data
//   steps:
//     - executeStep:
//       call: system.math.max
//       input:
//         a: \${data.a}
//         b: \${data.b}
//       output: max
//   return: \${max}
//   `;
//   it.todo('processes worksheet');
// });

// describe('terminate manually', () => {
//   const yaml = `
//   params: data
//   steps:
//     - executeStep:
//       call: system.math.max
//       input:
//         a: \${data.a}
//         b: \${data.b}
//       output: max
//     - terminateManually:
//       return: \${max}
//   `;
//   it.todo('processes worksheet');
// });

// describe('shortcut: nameless method call steps', () => {
//   const yaml = `
//   steps:
//     - call: system.time.now
//       output: time
//     - return \${time}
//   `;
//   it.todo('processes worksheet');
// });

// describe('perform a side effect minimally', () => {
//   const yaml = `
//   steps:
//     - call: system.log
//       input:
//         data:
//           a: 1
//           b: true
//           c: "test"
//         level: debug
//   `;
//   it.todo('processes worksheet');
// });

// describe('execute a step without i/o', () => {
//   const yaml = `
//   steps:
//     - call: system.checkpoint
//     - call: system.time.now
//       output: time
//     - return: \${time}
//   `;
//   it.todo('processes worksheet');
// });

// describe('shared memory overrides existing variables', () => {
//   const yaml = `
//   steps:
//     - getTime1:
//       call: system.time.now
//       output: time
//     - call: system.sleep
//       input: 1000
//     - getTime2:
//       call: system.time.now
//       output: time
//   return: \${time}
//   `;
//   it.todo('processes worksheet');
// });

// describe('insert and update map values with assign', () => {
//   const yaml = `
//   steps:
//     - update_maps
//       assign:
//       - my_map: {"Key1": "hello"}
//       - key_str: "Key"
//       - my_map.Key1: "Value1"
//       - my_map["Key2"]: "Value2"
//       - my_map[key_str]: "Value3"
//       - my_map[key_str + "4"]: "Value4"
// `;
//   it.todo('processes worksheet');
// });

// describe('insert and update map values with assign', () => {
//   const yaml = `
//   steps:
//     - update_nested_map:
//         assign:
//           - my_map: {}
//           - my_map.NestedMapKey: {"Key1":"Value1"}
//           - my_map.NestedMapKey.Key2: "Value2"
// `;
//   it.todo('processes worksheet');
// });
// describe('dynamic updates in for loop', () => {
//   const yaml = `
//   steps:
//     - update_map_in_loop:
//       assign:
//         - keys: ["key1", "key2"]
//         - my_map: {}
//     - for_loop:
//       for:
//         value: v
//         index: i
//         in: \${keys}
//         steps:
//           - loop_step:
//               assign:
//                 - my_map[v]: \${i}
//     - return_step:
//       return: \${my_map}`;
//   it.todo('processes worksheet');
// });
// // TODO: Switch.
// // TODO: Loops.
// // TODO: Try/Catch.
