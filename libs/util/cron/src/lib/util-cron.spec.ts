import { safelyParseCronSchedule, validateCronSchedule } from './util-cron';

describe('validateCronSchedule', () => {
  [
    '0 0 * * *',
    '0 0 * * 0',
    '0 0 * * 1-5',
    '0 0 * * 0-6',
    '0 0 * * 1,2,3,4,5',
    // Run a task every 5 minutes from 9 AM to 5 PM on weekdays:
    '*/5 9-17 * * 1-5',
    // Run a task every hour on the last day of the month
    '0 * L * *',
    // Run a task every 15 minutes on the first and last day of the month
    '*/15 * 1,L * *',
    // Run a task at 12 PM (noon) every Monday and Wednesday
    '0 12 * * 1,3',
    // Run a task every 30 seconds on Monday, Wednesday, and Friday, but only in January and February
    '*/30 * * 1,2 1,3,5',
    '0/10 0-23 * * *',
    // Run a task every 5 seconds from Monday to Friday, but only during the first 15 days of the month
    '*/5 * 1-15 * 1-5',
  ].forEach((cronSchedule) => {
    it(`should return true for schedule: ${cronSchedule}`, () => {
      expect(validateCronSchedule(cronSchedule)).toBe(true);
    });
  });

  ['30 3 * * 6,7,8'].forEach((cronSchedule) => {
    it(`should return false for schedule: ${cronSchedule}`, () => {
      expect(validateCronSchedule(cronSchedule)).toBe(false);
    });
  });
});

describe('safelyParseCronSchedule', () => {
  it('should report an out of bounds error', () => {
    expect(safelyParseCronSchedule('0 0 * * 8')).toEqual({
      ok: false,
      error: 'Constraint error, got value 8 expected range 0-7',
    });
  });

  it('should report missing property error', () => {
    expect(safelyParseCronSchedule('0 0 * *')).toEqual({
      ok: false,
      error: 'Constraint error, got value 0 expected range 1-31',
    });
  });
});
