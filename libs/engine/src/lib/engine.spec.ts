import { Engine } from './engine';
import { Init } from './instructions/init';
import { Context } from './instructions/instructions';
import { Terminate } from './instructions/terminate';
import { Parameters } from './instructions/parameters';
import { yaml } from './util';

function expectNext<T>(instance: T, engine: Engine) {
  expect(engine.peek()).toBeInstanceOf(instance);
  expect(engine.hasNext()).toBeTruthy();
  expect(async () => await engine.iterate()).not.toThrow();
}

describe('unit', () => {
  const unit = `
  version: 1
  name: unit
  output: 1
  `;
  it('processes worksheet', () => {
    const def = yaml.from(unit);
    const context = new Context();
    context.stack.push(new Init(def));
    const engine = new Engine(context);

    expectNext(Init, engine);

    expect(context.info.output).toBeUndefined();
    expectNext(Terminate, engine);
    expect(context.info.output).toBe(1);
  });
});

describe('identity', () => {
  const identity = `
  version: v1.0
  name: identity
  input: x
  output: \${x}
  `;
  it('processes worksheet', () => {
    const def = yaml.from(identity);
    const init = new Init(def);
    const opts = { input: 'test-string' };
    const context = new Context(opts);
    context.stack.push(init);
    const engine = new Engine(context);

    expectNext(Init, engine);

    expectNext(Parameters, engine);
    expect(context.heap.get('x')).toBe(opts.input);

    expectNext(Terminate, engine);
    expect(context.info.output).toBe(opts.input);
  });
});

describe('interpolate', () => {
  const interpolate = `
  version: v1.0
  name: identity
  input: x
  output: hello \${x}!
  `;
  it('processes worksheet', () => {
    const def = yaml.from(interpolate);
    const init = new Init(def);
    const opts = { input: 'user' };
    const context = new Context(opts);
    context.stack.push(init);
    const engine = new Engine(context);

    expectNext(Init, engine);

    expectNext(Parameters, engine);
    expect(context.heap.get('x')).toBe(opts.input);

    expectNext(Terminate, engine);
    expect(context.info.output).toBe(`hello ${opts.input}!`);
  });
});
