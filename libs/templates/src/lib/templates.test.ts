import { templates } from './templates';
describe('templates', () => {
  it('has several', () => {
    const list = Object.keys(templates());
    expect(list.length > 1).toBe(true);
  });
});
