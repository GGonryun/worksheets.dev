import {
  AlarmController,
  CompositeController,
  Controller,
  HourglassController,
} from './controller';
import { newTestExecutionFactory } from './test-utils.spec';

describe('AlarmController', () => {
  it('should cancel if the alarm time has passed', () => {
    // create a new alarm controller with a 100ms alarm time
    const alarm = new AlarmController(Date.now() + 100);
    // start the alarm controller
    alarm.start();
    // wait 200ms
    setTimeout(() => {
      // check the alarm controller to see if it has been cancelled
      expect(alarm.isCancelled()).toBe(true);
    }, 200);
  });
  it("does not cancel if the alarm time wasn't reached", () => {
    const alarm = new AlarmController(Date.now() + 100);

    alarm.start();
    setTimeout(() => {
      expect(alarm.isCancelled()).toBe(false);
    }, 50);
    alarm.stop();
  });

  it('clears the internal interval when stopped', () => {
    const alarm = new AlarmController(Date.now() + 500);
    alarm.start();

    alarm.stop();
    // alarm shouldnt be active
    expect(alarm.isActive()).toBe(false);
  });
});

describe('HourglassController', () => {
  it('should cancel if the time has passed', () => {
    const hourglass = new HourglassController(100);
    hourglass.start();
    setTimeout(() => {
      expect(hourglass.isCancelled()).toBe(true);
    }, 200);
  });
  it("should not cancel if the time hasn't passed yet", () => {
    const hourglass = new HourglassController(100);
    hourglass.start();
    setTimeout(() => {
      expect(hourglass.isCancelled()).toBe(false);
    }, 50);
    hourglass.stop();
  });
  it('should not be active after the hourglass is stopped', () => {
    const hourglass = new HourglassController(100);
    hourglass.start();
    hourglass.stop();
    expect(hourglass.isActive()).toBe(false);
  });
});

describe('CompositeController', () => {
  it("cancels itself if it's called", () => {
    const composite = new CompositeController();
    composite.cancel();
    expect(composite.isCancelled()).toBe(true);
  });

  it('cancels if any child is cancelled', async () => {
    const composite = new CompositeController();
    const controller1 = new Controller();
    const controller2 = new Controller();
    composite.register(controller1);
    composite.register(controller2);

    controller1.cancel();

    expect(composite.isCancelled()).toBe(true);
    expect(composite.getFailure()).toEqual(controller1.getFailure());
  });

  it("surfaces the child reason for failure if it's cancelled", () => {
    const composite = new CompositeController();
    const controller1 = new HourglassController(100);
    const controller2 = new HourglassController(100);
    composite.register(controller1);
    composite.register(controller2);
    controller1.start();
    controller2.start();
    setTimeout(() => {
      expect(composite.isCancelled()).toBe(true);
      expect(composite.getFailure()).toEqual(controller2.getFailure());
    }, 500);
  });
});

describe('Controller in an Execution', () => {
  const text = `
  steps:
    - call: hello
    - call: world
  `;
  it('controllers can prevent execution processing', async () => {
    const mock = jest.fn();
    const { factory, controller } = newTestExecutionFactory(mock);

    const execution = await factory.create({ text, input: '' });
    controller.cancel();

    await execution.process();
    expect(mock).not.toHaveBeenCalled();
  });

  it('using a controller will stop the execution if the controller is cancelled', async () => {
    const mock = jest.fn(
      () => new Promise((resolve) => setTimeout(resolve, 200))
    );
    const { factory, controller } = newTestExecutionFactory(mock);

    const execution = await factory.create({ text, input: '' });

    // timeout controller after 500 ms
    setTimeout(() => {
      controller.cancel();
    }, 100);
    await execution.process();

    // mock should have been called once
    expect(mock).toHaveBeenCalledTimes(1);
    expect(mock).toHaveBeenCalledWith({ path: 'hello' });
  });
});
