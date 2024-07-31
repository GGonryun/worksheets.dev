import { cloneDeep } from 'lodash';

import { checkboxGroup, frequency, shuffle } from './arrays';

describe('checkboxGroup', () => {
  // does not modify original array.
  const group = ['a', 'b', 'c'];

  it('should add a value to a group when the checkbox is checked', () => {
    const expectedOutput = ['a', 'b', 'c', 'd'];

    const result = checkboxGroup(group, 'd', true);

    expect(result).toEqual(expectedOutput);
  });
  it('should remove a value from a group when the checkbox is unchecked', () => {
    const expectedOutput = ['a', 'b'];

    const result = checkboxGroup(group, 'c', false);

    expect(result).toEqual(expectedOutput);
  });
  it('should not add a value to a group if it is already present', () => {
    const expectedOutput = ['a', 'b', 'c'];

    const result = checkboxGroup(group, 'a', true);

    expect(result).toEqual(expectedOutput);
  });
  it('should not remove a value from a group if it is not present', () => {
    const expectedOutput = ['a', 'b', 'c'];

    const result = checkboxGroup(group, 'd', false);

    expect(result).toEqual(expectedOutput);
  });
});

describe('shuffle', () => {
  it.skip('should shuffle an array', () => {
    const original = [1, 2, 3, 4, 5];
    const shuffled = shuffle(original);

    expect(shuffled).not.toEqual(original);
  });
  it.skip('should create a near average distribution', () => {
    const original = [1, 2, 3, 4, 5];

    const results = Array.from({ length: 1000000 }, () =>
      shuffle(cloneDeep(original))
    );
    const first = results.map((r) => r[0]);
    const firstFrequency = frequency(first);

    console.log('firstFrequency', firstFrequency);
    expect(Object.keys(firstFrequency).length).toEqual(5);
  });
});
