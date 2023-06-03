import { listTemplates } from './templates';
describe('templates', () => {
  it('has several', () => {
    const list = Object.keys(listTemplates());
    expect(list.length > 1).toBe(true);
  });
});
