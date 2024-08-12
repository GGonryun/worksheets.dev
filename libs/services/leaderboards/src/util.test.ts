import { LeaderboardFrequency } from '@worksheets/util/types';

import { getPayoutDates } from './util';
describe('getPayoutDates', () => {
  it.each([
    [
      'WEEKLY',
      new Date('2021-01-01T00:00:00Z'),
      new Date('2020-12-20T00:00:00Z'),
      new Date('2020-12-26T23:59:59.999Z'),
    ],
    [
      'WEEKLY',
      new Date('2020-12-27T00:00:00Z'),
      new Date('2020-12-20T00:00:00Z'),
      new Date('2020-12-26T23:59:59.999Z'),
    ],
  ])(
    `should return the correct dates for %s frequency`,
    (frequency, now, expectedStarting, expectedEnding) => {
      const { starting, ending } = getPayoutDates(
        frequency as LeaderboardFrequency,
        now
      );
      expect(starting).toEqual(expectedStarting);
      expect(ending).toEqual(expectedEnding);
    }
  );
});
