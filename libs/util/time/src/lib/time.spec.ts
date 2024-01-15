import { createTimestamp, printRelativeDate, waitFor } from './time';

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

describe('printRelativeDate', () => {
  const now = new Date(createTimestamp(2023, 12, 31, 23, 30));
  const dayInMs = 86400000;

  it('process 2 days ago', () => {
    const stamp = new Date(now.getTime() - dayInMs * 2);

    expect(printRelativeDate({ stamp, now })).toBe('2 days ago at 3:30 PM');
  });

  it('process 7 days ago', () => {
    const stamp = new Date(now.getTime() - dayInMs * 7);

    expect(printRelativeDate({ stamp, now })).toBe('Last week at 3:30 PM');
  });

  it('process 8 days ago', () => {
    const stamp = new Date(now.getTime() - dayInMs * 8);

    expect(printRelativeDate({ stamp, now })).toBe('Last week at 3:30 PM');
  });

  it('process 2 weeks ago', () => {
    const stamp = new Date(now.getTime() - dayInMs * 7 * 2);

    expect(printRelativeDate({ stamp, now })).toBe('2 weeks ago at 3:30 PM');
  });

  it('process 29 days ago', () => {
    const stamp = new Date(now.getTime() - dayInMs * 29);

    expect(printRelativeDate({ stamp, now })).toBe('Last month at 3:30 PM');
  });

  it('process 2 months ago', () => {
    const stamp = new Date(now.getTime() - dayInMs * 30 * 2);

    expect(printRelativeDate({ stamp, now })).toBe('2 months ago at 4:30 PM');
  });

  it('process 365 days ago', () => {
    const stamp = new Date(now.getTime() - dayInMs * 365);

    expect(printRelativeDate({ stamp, now })).toBe('Last year at 3:30 PM');
  });
  it('process 3 years ago', () => {
    const stamp = new Date(now.getTime() - dayInMs * 365 * 3);

    expect(printRelativeDate({ stamp, now })).toBe('3 years ago at 3:30 PM');
  });
  it('does not include time for a 3 days ago', () => {
    const stamp = new Date(now.getTime() - dayInMs * 3);

    expect(printRelativeDate({ stamp, now, includeTime: false })).toBe(
      '3 days ago'
    );
  });
  it('does not include time for 3 years ago', () => {
    const stamp = new Date(now.getTime() - dayInMs * 365 * 3);

    expect(printRelativeDate({ stamp, now, includeTime: false })).toBe(
      '3 years ago'
    );
  });
});
