import { addMinutesToCurrentTime, addSecondsToCurrentTime } from './time';

describe('addMinutesToCurrentTime', () => {
  test('should add 0 minutes to the current time', () => {
    const currentTime = new Date();
    const updatedTime = addMinutesToCurrentTime(0);
    expect(updatedTime.getTime()).toBe(currentTime.getTime());
  });

  test('should add positive minutes to the current time', () => {
    const currentTime = new Date();
    const minutesToAdd = 30;
    const updatedTime = addMinutesToCurrentTime(minutesToAdd);
    const expectedTime = new Date(currentTime.getTime() + minutesToAdd * 60000);
    expect(updatedTime.getTime()).toBe(expectedTime.getTime());
  });

  test('should subtract negative minutes from the current time', () => {
    const currentTime = new Date();
    const minutesToSubtract = -15;
    const updatedTime = addMinutesToCurrentTime(minutesToSubtract);
    const expectedTime = new Date(
      currentTime.getTime() + minutesToSubtract * 60000
    );
    expect(updatedTime.getTime()).toBe(expectedTime.getTime());
  });

  test('should handle large positive minutes', () => {
    const currentTime = new Date();
    const minutesToAdd = 100000;
    const updatedTime = addMinutesToCurrentTime(minutesToAdd);
    const expectedTime = new Date(currentTime.getTime() + minutesToAdd * 60000);
    expect(updatedTime.getTime()).toBe(expectedTime.getTime());
  });

  test('should handle large negative minutes', () => {
    const currentTime = new Date();
    const minutesToSubtract = -50000;
    const updatedTime = addMinutesToCurrentTime(minutesToSubtract);
    const expectedTime = new Date(
      currentTime.getTime() + minutesToSubtract * 60000
    );
    expect(updatedTime.getTime()).toBe(expectedTime.getTime());
  });
});

describe('addSecondsToCurrentTime', () => {
  test('should add 0 seconds to the current time', () => {
    const currentTime = new Date();
    const updatedTime = addSecondsToCurrentTime(0);
    expect(updatedTime.getTime()).toBe(currentTime.getTime());
  });

  test('should add positive seconds to the current time', () => {
    const currentTime = new Date();
    const secondsToAdd = 30;
    const updatedTime = addSecondsToCurrentTime(secondsToAdd);
    const expectedTime = new Date(currentTime.getTime() + secondsToAdd * 1000);
    expect(updatedTime.getTime()).toBe(expectedTime.getTime());
  });

  test('should handle large positive seconds', () => {
    const currentTime = new Date();
    const secondsToAdd = 100000;
    const updatedTime = addSecondsToCurrentTime(secondsToAdd);
    const expectedTime = new Date(currentTime.getTime() + secondsToAdd * 1000);
    expect(updatedTime.getTime()).toBe(expectedTime.getTime());
  });

  test('should subtract negative seconds from the current time (equivalent to adding positive seconds)', () => {
    const currentTime = new Date();
    const secondsToSubtract = -15;
    const updatedTime = addSecondsToCurrentTime(secondsToSubtract);
    const expectedTime = new Date(
      currentTime.getTime() + secondsToSubtract * 1000
    );
    expect(updatedTime.getTime()).toBe(expectedTime.getTime());
  });

  test('should handle large negative seconds', () => {
    const currentTime = new Date();
    const secondsToSubtract = -50000;
    const updatedTime = addSecondsToCurrentTime(secondsToSubtract);
    const expectedTime = new Date(
      currentTime.getTime() + secondsToSubtract * 1000
    );
    expect(updatedTime.getTime()).toBe(expectedTime.getTime());
  });
});
