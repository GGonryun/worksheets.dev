import { parseExpression } from 'cron-parser';

/**
 * @name verifyCronSchedule
 * @description Verify that a cron schedule is valid
 * @param {string} cronSchedule
 * @returns {boolean}
 */
export function validateCronSchedule(cronSchedule: string): boolean {
  // // validate the cron schedule
  // const cronRegex =
  //   /^((\*(\/\d+)?|(\d+(-\d+)?|L)(,\d+(-\d+)?|,L)*)?([/-]\d+)?\s+){4}(\*(\/\d+)?|(\d+(-\d+)?|L)(,\d+(-\d+)?|,L)*)?([/-]\d+)?$/;

  // if (!cronRegex.test(cronSchedule)) {
  //   return false;
  // }

  try {
    return Boolean(parseExpression(cronSchedule));
  } catch {
    return false;
  }
}

type CronScheduleError = {
  ok: false;
  error: string;
};
type CronScheduleSuccess = {
  ok: true;
  error: never;
};
/**
 * @name safelyParseCronSchedule
 * @description Safely parse a cron schedule and returns a user friendly string error if the schedule is invalid
 * @param {string} cronSchedule
 * @returns {CronScheduleError | CronScheduleSuccess}
 */
export function safelyParseCronSchedule(
  cronSchedule: string
): CronScheduleError | CronScheduleSuccess {
  try {
    return {
      ok: Boolean(parseExpression(cronSchedule)),
    } as CronScheduleSuccess;
  } catch (error) {
    if (error instanceof Error) {
      return {
        ok: false,
        error: error.message,
      };
    } else {
      return {
        ok: false,
        error: 'Unexpected value in cron schedule',
      };
    }
  }
}
