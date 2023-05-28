import { Clock } from './clock';

describe('Clock', () => {
  let clock: Clock;

  beforeEach(() => {
    clock = new Clock();
  });

  test('should start and stop the clock correctly', () => {
    clock.start();
    expect(clock.getExecutionTime()).toBeGreaterThanOrEqual(0);

    clock.stop();
    expect(clock.getExecutionTime()).not.toBeNull();
    expect(clock.getExecutionTime()).toBeGreaterThanOrEqual(0);
  });

  test('should throw an error when starting the clock multiple times', () => {
    clock.start();

    expect(() => {
      clock.start();
    }).toThrow('failure already-started');
  });

  test('should throw an error when stopping the clock without starting it', () => {
    expect(() => {
      clock.stop();
    }).toThrow('failure not-running');
  });

  test('should restart the clock correctly', () => {
    clock.start();
    clock.stop();

    clock.restart();

    clock.getExecutionTime();

    clock.start();
    clock.stop();
    expect(clock.getExecutionTime()).not.toBeNull();
    expect(clock.getExecutionTime()).toBeGreaterThanOrEqual(0);
  });

  test('should not throw an error when restarting the clock without stopping it', () => {
    clock.start();

    expect(clock.getExecutionTime()).toBeGreaterThanOrEqual(0);

    clock.restart();

    clock.getExecutionTime();
  });

  test('should not throw an error when accessing execution time without stopping the clock', () => {
    clock.start();

    expect(clock.getExecutionTime()).toBeGreaterThanOrEqual(0);
  });
});
