import { newMethod } from './definitions';

describe('newMethod', () => {
  it('creates a method definition', () => {
    const method = newMethod({
      path: '',
      label: '',
      description: '',
      input: null,
      output: null,
      async call() {
        throw new Error('Function not implemented.');
      },
    });

    expect(method).not.toBeUndefined();
  });
});
