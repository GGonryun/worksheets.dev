import { Engine } from './engine';
import { Init } from './instructions/init';
import { Context } from './instructions/framework';
import { Return } from './instructions/return';
import { Parameters } from './instructions/parameters';
import { load } from './util';

function expectFinish(ctx: Context, engine: Engine) {
  while (engine.hasNext()) {
    expect(async () => await engine.iterate()).not.toThrow();
  }
  expect(ctx.instructions.peek()).toBeUndefined();
}

describe('unit', () => {
  const yaml = `
  return: 1
  `;
  it('processes worksheet', () => {
    const def = load(yaml);
    const ctx = new Context();
    ctx.instructions.push(new Init(def));
    const engine = new Engine(ctx);
    expect(ctx.register.output).toBeUndefined();
    expectFinish(ctx, engine);
    expect(ctx.register.output).toBe(1);
  });
});

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

describe('identity', () => {
  const yaml = `
  params: x
  return: \${x}
  `;
  it('processes worksheet', () => {
    const def = load(yaml);
    const init = new Init(def);
    const opts = { input: 'test-string' };
    const ctx = new Context(opts);
    ctx.instructions.push(init);
    const engine = new Engine(ctx);

    expectFinish(ctx, engine);
    expect(ctx.memory.get('x')).toBe(opts.input);
    expect(ctx.register.output).toBe(opts.input);
  });
});

describe('interpolate', () => {
  const yaml = `
  params: x
  return: hello \${x}!
  `;
  it('processes worksheet', () => {
    const def = load(yaml);
    const init = new Init(def);
    const opts = { input: 'user' };
    const ctx = new Context(opts);
    ctx.instructions.push(init);
    const engine = new Engine(ctx);

    expectFinish(ctx, engine);
    expect(ctx.memory.get('x')).toBe(opts.input);
    expect(ctx.register.output).toBe(`hello ${opts.input}!`);
  });
});

describe('assign string', () => {
  const yaml = `
  params:
    - word: hello
  return: \${word} user
  `;
  it.todo('processes worksheet');
});

describe('assign many types', () => {
  const yaml = `
  version: 1
  name: assign
  assign:
    - word: hello
    - count: 13
    - available: true
    - names: [my, name, is, engine]
    - effect:
      earth: 1
      fire: 2
      wind: 3
      water: 4
  output: 
    phrase: \${word} user
    tag: #\${count}
    seen: has been seen? \${available}
  `;
  it.todo('processes worksheet');
});

describe('assign during step', () => {
  const yaml = `
  steps:
    - first:
      assign:
        - word: 'hello'
        - count: 3
        - truth: true
  return:
    str: \${word}
    num: \${count}
    bool: \${truth}
  `;
  it.todo('processes worksheet');
});

describe('steps must specify an output to export their data', () => {
  const yaml = `
  steps:
    - getTime
      call: system.time.now
      output: time
    - return \${time}
  `;
  it.todo('processes worksheet');
});

describe('read parameters for method call inputs', () => {
  const yaml = `
  params: data
  steps:
    - executeStep:
      call: system.math.max
      input: 
        a: \${data.a}
        b: \${data.b}
      output: max
  return: \${max}
  `;
  it.todo('processes worksheet');
});

describe('terminate manually', () => {
  const yaml = `
  params: data
  steps:
    - executeStep:
      call: system.math.max
      input: 
        a: \${data.a}
        b: \${data.b}
      output: max
    - terminateManually: 
      return: \${max}
  `;
  it.todo('processes worksheet');
});

describe('shortcut: nameless method call steps', () => {
  const yaml = `
  steps:
    - call: system.time.now
      output: time
    - return \${time}
  `;
  it.todo('processes worksheet');
});

describe('perform a side effect minimally', () => {
  const yaml = `
  steps:
    - call: system.log
      input:
        data: 
          a: 1
          b: true
          c: "test"
        level: debug
  `;
  it.todo('processes worksheet');
});

describe('execute a step without i/o', () => {
  const yaml = `
  steps:
    - call: system.checkpoint
    - call: system.time.now
      output: time
    - return: \${time}
  `;
  it.todo('processes worksheet');
});

describe('shared memory overrides existing variables', () => {
  const yaml = `
  steps:
    - getTime1:
      call: system.time.now
      output: time
    - call: system.sleep
      input: 1000
    - getTime2:
      call: system.time.now
      output: time
  return: \${time}
  `;
  it.todo('processes worksheet');
});

// TODO: Switch.
// TODO: Loops.
// TODO: Try/Catch.
