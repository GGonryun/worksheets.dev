// wrappers: apply input/output modifications to the data that's passing through them.
export type Wrapper<I, O = I> = (t: I) => O;

// decorators: uses input data to create a wrapper that decorates the original type somehow.
export type Decorator<T, U> = (data: T) => Wrapper<U>;

// composers: takes an initial element, which you can then apply multiple wrappings to. you can
// use the composer with different sets of wrappings to generate new elements.
export type Composer<T> = (T: T) => Applier<T>;

// appliers: wrap a known initial object with multiple wrappings at once.
export type Applier<T> = (...wrappers: Wrapper<T>[]) => T;

// the first wrapper (from the left) always executes first.
export function compose<T>(element: T): Applier<T> {
  return (...wrappers) => {
    for (const wrapper of wrappers) {
      element = wrapper(element);
    }
    return element;
  };
}

export function combine<TWrapping>(
  ...wrappers: Wrapper<TWrapping>[]
): Wrapper<TWrapping> {
  return function (init: TWrapping) {
    for (const wrapper of wrappers) {
      init = wrapper(init);
    }
    return init;
  };
}
