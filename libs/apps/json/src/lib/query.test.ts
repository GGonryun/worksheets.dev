import { query } from './query';
describe('query', () => {
  it('should work', () => {
    expect(query).not.toBeUndefined();
  });

  it('formats incoming payloads', async () => {
    const result = await query.call({
      input: {
        selector: 'people[*country=NZ]',
        data: {
          people: [
            { name: 'Matt', country: 'NZ' },
            { name: 'Pete', country: 'AU' },
            { name: 'Mikey', country: 'NZ' },
          ],
        },
      },
    });
    console.log(result);
    expect(result).toEqual([
      { name: 'Matt', country: 'NZ' },
      { name: 'Mikey', country: 'NZ' },
    ]);
  });
});
