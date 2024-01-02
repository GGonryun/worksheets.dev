import {
  addDurationToCurrentTime,
  addHoursToCurrentTime,
  addMinutesToCurrentTime,
  addSecondsToCurrentTime,
  createTimestamp,
  formatTimestamp,
  formatTimestampLong,
  printRelativeDate,
  secondsRemaining,
  waitFor,
  withinMinutes,
} from './time';

describe('addMinutesToCurrentTime', () => {
  test('should add 0 minutes to the current time', () => {
    const currentTime = new Date();
    const updatedTime = addMinutesToCurrentTime(0, currentTime);
    expect(updatedTime.getTime()).toBe(currentTime.getTime());
  });

  test('should add positive minutes to the current time', () => {
    const currentTime = new Date();
    const minutesToAdd = 30;
    const updatedTime = addMinutesToCurrentTime(minutesToAdd, currentTime);
    const expectedTime = new Date(currentTime.getTime() + minutesToAdd * 60000);
    expect(updatedTime.getTime()).toBe(expectedTime.getTime());
  });

  test('should subtract negative minutes from the current time', () => {
    const currentTime = new Date();
    const minutesToSubtract = -15;
    const updatedTime = addMinutesToCurrentTime(minutesToSubtract, currentTime);
    const expectedTime = new Date(
      currentTime.getTime() + minutesToSubtract * 60000
    );
    expect(updatedTime.getTime()).toBe(expectedTime.getTime());
  });

  test('should handle large positive minutes', () => {
    const currentTime = new Date();
    const minutesToAdd = 100000;
    const updatedTime = addMinutesToCurrentTime(minutesToAdd, currentTime);
    const expectedTime = new Date(currentTime.getTime() + minutesToAdd * 60000);
    expect(updatedTime.getTime()).toBe(expectedTime.getTime());
  });

  test('should handle large negative minutes', () => {
    const currentTime = new Date();
    const minutesToSubtract = -50000;
    const updatedTime = addMinutesToCurrentTime(minutesToSubtract, currentTime);
    const expectedTime = new Date(
      currentTime.getTime() + minutesToSubtract * 60000
    );
    expect(updatedTime.getTime()).toBe(expectedTime.getTime());
  });
});

describe('addSecondsToCurrentTime', () => {
  test('should add 0 seconds to the current time', () => {
    const currentTime = new Date();
    const updatedTime = addSecondsToCurrentTime(0, currentTime);
    expect(updatedTime.getTime()).toBe(currentTime.getTime());
  });

  test('should add positive seconds to the current time', () => {
    const currentTime = new Date();
    const secondsToAdd = 30;
    const updatedTime = addSecondsToCurrentTime(secondsToAdd, currentTime);
    const expectedTime = new Date(currentTime.getTime() + secondsToAdd * 1000);
    expect(updatedTime.getTime()).toBe(expectedTime.getTime());
  });

  test('should handle large positive seconds', () => {
    const currentTime = new Date();
    const secondsToAdd = 100000;
    const updatedTime = addSecondsToCurrentTime(secondsToAdd, currentTime);
    const expectedTime = new Date(currentTime.getTime() + secondsToAdd * 1000);
    expect(updatedTime.getTime()).toBe(expectedTime.getTime());
  });

  test('should subtract negative seconds from the current time (equivalent to adding positive seconds)', () => {
    const currentTime = new Date();
    const secondsToSubtract = -15;
    const updatedTime = addSecondsToCurrentTime(secondsToSubtract, currentTime);
    const expectedTime = new Date(
      currentTime.getTime() + secondsToSubtract * 1000
    );
    expect(updatedTime.getTime()).toBe(expectedTime.getTime());
  });

  test('should handle large negative seconds', () => {
    const currentTime = new Date();
    const secondsToSubtract = -50000;
    const updatedTime = addSecondsToCurrentTime(secondsToSubtract, currentTime);
    const expectedTime = new Date(
      currentTime.getTime() + secondsToSubtract * 1000
    );
    expect(updatedTime.getTime()).toBe(expectedTime.getTime());
  });
});

describe('waitFor', () => {
  it('delays for the specified amount of time', async () => {
    const waitTime = 1000;
    const startTime = new Date().getTime();
    await waitFor(waitTime);
    const endTime = new Date().getTime();
    const timeDifference = endTime - startTime;
    expect(timeDifference).toBeGreaterThanOrEqual(waitTime);
  });
});

describe('withinMinutes', () => {
  it('should return true if the current time is within the specified minutes', () => {
    const now = new Date();
    const timestamp = addMinutesToCurrentTime(3, now).getTime();

    expect(withinMinutes(timestamp, 5)).toBeTruthy();
  });
  it("should return false if the current time isn't within the specified minutes", () => {
    const now = new Date();
    const timestamp = addMinutesToCurrentTime(7, now).getTime();

    expect(withinMinutes(timestamp, 5, now)).toBeFalsy();
  });
});

describe('secondsRemaining', () => {
  [1, 2, 3, 62, 0, 42589, -5].forEach((seconds) => {
    it(`should return the number of seconds remaining: ${seconds}`, () => {
      const now = new Date();
      const timestamp = addSecondsToCurrentTime(seconds, now).getTime();
      expect(secondsRemaining(timestamp, now)).toBe(seconds);
    });
  });
});

describe('durationRemaining', () => {
  it('calculates seconds remaining', () => {
    const now = new Date();
    const timestamp = addSecondsToCurrentTime(5, now).getTime();
    expect(secondsRemaining(timestamp, now)).toBe(5);
  });

  it('calculates minutes remaining', () => {
    const now = new Date();
    const timestamp = addMinutesToCurrentTime(5, now).getTime();
    expect(secondsRemaining(timestamp, now)).toBe(300);
  });

  it('calculates hours remaining', () => {
    const now = new Date();
    const timestamp = addHoursToCurrentTime(3, now).getTime();
    expect(secondsRemaining(timestamp, now)).toBe(10800);
  });

  it('calculates duration remaining', () => {
    const now = new Date();
    const timestamp = addDurationToCurrentTime(
      { days: 0, hours: 3, minutes: 5, seconds: 5 },
      now
    ).getTime();
    expect(secondsRemaining(timestamp, now)).toBe(11105);
  });
});

describe('formatTimestamp', () => {
  it('should format a timestamp', () => {
    const timestamp = 1614739200000;
    expect(formatTimestamp(timestamp)).toBe('3/2/21, 6:40 PM');
  });
  it("should return 'Invalid Date' if the timestamp is invalid", () => {
    const timestamp = 1214491200000;
    expect(formatTimestamp(timestamp)).toBe('6/26/8, 7:40 AM');
  });
  it('should return current time if the timestamp is invalid', () => {
    const timestamp = 1687067691891;
    expect(formatTimestamp(timestamp)).toBe('6/17/23, 10:54 PM');
  });
});

describe('formatTimestampLong', () => {
  it('should format a timestamp: Mar 2, 2021', () => {
    const timestamp = 1614739200000;
    expect(formatTimestampLong(timestamp)).toBe('Mar 2, 2021, 6:40:00 PM');
  });
  it('should format a timestamp: Jun 26, 2008', () => {
    const timestamp = 1214491200000;
    expect(formatTimestampLong(timestamp)).toBe('Jun 26, 2008, 7:40:00 AM');
  });
  it("should return 'Invalid Date' if the timestamp is invalid", () => {
    const timestamp = undefined;
    expect(formatTimestampLong(timestamp)).toBe('Invalid Date');
  });
});

describe('printRelativeDate', () => {
  const now = new Date(createTimestamp(2023, 12, 31, 23, 30));
  const dayInMs = 86400000;

  it('process 2 days ago', () => {
    const timestamp = new Date(now.getTime() - dayInMs * 2);

    expect(printRelativeDate(timestamp, 'en-US', now)).toBe(
      '2 days ago at 3:30 PM'
    );
  });

  it('process 7 days ago', () => {
    const timestamp = new Date(now.getTime() - dayInMs * 7);

    expect(printRelativeDate(timestamp, 'en-US', now)).toBe(
      'Last week at 3:30 PM'
    );
  });

  it('process 8 days ago', () => {
    const timestamp = new Date(now.getTime() - dayInMs * 8);

    expect(printRelativeDate(timestamp, 'en-US', now)).toBe(
      'Last week at 3:30 PM'
    );
  });

  it('process 2 weeks ago', () => {
    const timestamp = new Date(now.getTime() - dayInMs * 7 * 2);

    expect(printRelativeDate(timestamp, 'en-US', now)).toBe(
      '2 weeks ago at 3:30 PM'
    );
  });

  it('process 29 days ago', () => {
    const timestamp = new Date(now.getTime() - dayInMs * 29);

    expect(printRelativeDate(timestamp, 'en-US', now)).toBe(
      'Last month at 3:30 PM'
    );
  });

  it('process 2 months ago', () => {
    const timestamp = new Date(now.getTime() - dayInMs * 30 * 2);

    expect(printRelativeDate(timestamp, 'en-US', now)).toBe(
      '2 months ago at 4:30 PM'
    );
  });

  it('process 365 days ago', () => {
    const timestamp = new Date(now.getTime() - dayInMs * 365);

    expect(printRelativeDate(timestamp, 'en-US', now)).toBe(
      'Last year at 3:30 PM'
    );
  });
  it('process 3 years ago ago', () => {
    const timestamp = new Date(now.getTime() - dayInMs * 365 * 3);

    expect(printRelativeDate(timestamp, 'en-US', now)).toBe(
      '3 years ago at 3:30 PM'
    );
  });
});
