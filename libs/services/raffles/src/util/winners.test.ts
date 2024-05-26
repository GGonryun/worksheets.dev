import { arrayFromNumber } from '@worksheets/util/arrays';

import { pickWinners, RaffleEntry } from './winners';

const sampleUsers: RaffleEntry['user'][] = arrayFromNumber(10).map((i) => ({
  id: i.toString(),
  email: `email-${i}@example.com`,
}));

jest.retryTimes(3);

describe('pickWinners', () => {
  test('should pick winners', () => {
    const frequency: Record<string, number> = {};
    for (let i = 0; i < 1000; i++) {
      const result = pickWinners(
        1,
        sampleUsers.map((user, i) => ({
          user,
          id: i,
          numEntries: 1,
        }))
      );
      frequency[result[0].user.id] = (frequency[result[0].user.id] || 0) + 1;
      expect(result).toHaveLength(1);
    }
    // every user should have won at least 50 times if we have a good distribution
    // it might be catastrophic if this test fails, but it's not impossible
    // and therefore can be flaky
    expect(Object.keys(frequency)).toHaveLength(10);
    expect(Object.values(frequency).every((v) => v > 50)).toBe(true);
  });
  describe("when there aren't enough unique participants", () => {
    it('cannot pick more winners than participants', () => {
      const result = pickWinners(
        5,
        sampleUsers.slice(0, 3).map((user, i) => ({
          user,
          id: i,
          numEntries: 1,
        }))
      );

      expect(result).toHaveLength(3);
    });
    it("even if there's enough entries", () => {
      const result = pickWinners(
        5,
        sampleUsers.slice(0, 3).map((user, i) => ({
          user,
          id: i,
          numEntries: 5,
        }))
      );

      expect(result).toHaveLength(3);
    });
  });
  it('cannot pick duplicate winners', () => {
    const result = pickWinners(
      3,
      sampleUsers.slice(0, 3).map((user, i) => ({
        user,
        id: i,
        numEntries: 500,
      }))
    );
    const ids = result.map((w) => w.user.id);
    expect(ids).toHaveLength(3);
    expect(ids).toContain('0');
    expect(ids).toContain('1');
    expect(ids).toContain('2');
  });
});
