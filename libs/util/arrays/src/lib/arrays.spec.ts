import { checkboxGroup } from './arrays';

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
