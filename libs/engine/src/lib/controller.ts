import { Failure } from '@worksheets/util/errors';
import { ExecutionFailure } from './failures';
import { Maybe } from '@worksheets/util/types';

/**
 * @name Controller
 * @description the controller holds status and control data and allows for cancellation of executions
 */
export class Controller {
  // whether or not the controller has been cancelled
  private cancelled = false;
  // the failure that caused the cancellation
  private failure?: ExecutionFailure;
  // a collection of callbacks to be called when the controller is cancelled
  private cancellationCallbacks: Array<(failure?: Failure) => void> = [];

  /**
   * @name cancel
   * @description cancels the controller
   * @param failure the failure that caused the cancellation
   * @returns {void}
   * @throws {ExecutionFailure} if the controller has already been cancelled
   *
   */
  cancel(failure?: ExecutionFailure): void {
    if (this.cancelled) {
      throw new ExecutionFailure({
        code: 'invalid-operation',
        message: 'Controller has already been cancelled.',
      });
    }
    this.cancelled = true;
    this.failure = failure;

    // trigger callbacks
    this.cancellationCallbacks.forEach((callback) => {
      callback(failure);
    });
  }

  /**
   * @name onCancellation
   * @description registers a callback to be called when the controller is cancelled
   * @param callback the callback to be called when the controller is cancelled
   * @returns {void}
   */
  onCancellation(callback: (failure?: Failure) => void): void {
    // register callback
    this.cancellationCallbacks.push(callback);
  }

  /**
   * @name isCancelled
   * @description checks if the controller has been cancelled
   * @returns {boolean} true if the controller has been cancelled, false otherwise
   */
  isCancelled(): boolean {
    return this.cancelled;
  }

  /**
   * @name hasFailure
   * @description checks if the controller has a failure
   * @returns {boolean} true if the controller has a failure, false otherwise
   */
  hasFailure(): boolean {
    return this.failure !== undefined;
  }

  /**
   * @name getFailure
   * @description gets the failure that caused the controller to be cancelled
   * @returns {Failure} the failure that caused the controller to be cancelled
   * @throws {ExecutionFailure} if the controller has not been cancelled
   */
  getFailure(): ExecutionFailure {
    if (!this.cancelled) {
      throw new ExecutionFailure({
        code: 'invalid-operation',
        message: 'Controller has not been cancelled.',
      });
    }
    return this.failure as ExecutionFailure;
  }

  /**
   * @name reset
   * @description resets the controller
   * @returns {void}
   */
  reset(): void {
    this.cancelled = false;
    this.failure = undefined;
  }
}

/**
 * @name HourglassController
 * @description the hourglass is a wrapper for a controller that automatically cancels after a specified amount of time
 * @remarks this is useful for preventing infinite loops
 * @example
 * const hourglass = new Hourglass(1000);
 */
export class HourglassController extends Controller {
  private timeoutId: Maybe<NodeJS.Timeout>;
  constructor(private timeout: number) {
    super();
  }

  /**
   * @name start
   * @description starts the hourglass
   */
  start(): void {
    // save the timeout id so we can cancel it later if needed but start it now
    this.timeoutId = setTimeout(() => {
      this.cancel(
        new ExecutionFailure({
          code: 'retry',
          message: 'Hourglass ran out of time.',
        })
      );
    }, this.timeout);

    // register a callback to cancel the timeout if the controller is cancelled
    this.onCancellation(() => {
      this.stop();
    });
  }

  stop(): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = undefined;
    }
  }

  isActive(): boolean {
    return this.timeoutId !== undefined;
  }
}

/**
 * @name AlarmController
 * @description a wrapper for the controller that cancels if a certain time has passed
 */
export class AlarmController extends Controller {
  private intervalId: Maybe<NodeJS.Timeout>;

  constructor(private alarmTime: number) {
    super();
  }

  // starts the loop that checks if the alarm should go off
  start(): void {
    // register a callback to stop the interval if the controller is cancelled
    this.onCancellation(() => {
      this.stop();
    });

    // create an interval that checks if the alarm should go off every 100ms
    this.intervalId = setInterval(() => {
      // if the alarm should go off, cancel the controller
      if (this.alarmTime <= Date.now()) {
        this.cancel(
          new ExecutionFailure({
            code: 'timeout',
            message: 'Alarm went off.',
          })
        );
      }
    });
  }

  // stops the loop that checks if the alarm should go off
  stop(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = undefined;
    }
  }

  isActive(): boolean {
    return this.intervalId !== undefined;
  }
}

/**
 * @name CompositeController
 * @description a controller that allows for multiple controllers to be registered and if any controller cancels, the composite controller cancels as well
 * @remarks the composite controller does not cancel its children if it is cancelled
 * @example
 * const composite = new CompositeController();
 * const controller1 = new Controller();
 * const controller2 = new Controller();
 * composite.register(controller1);
 * composite.register(controller2);
 * controller1.cancel();
 * composite.isCancelled; // true
 */
export class CompositeController extends Controller {
  /**
   * @name controllers
   * @remarks when any controller fails the composite controller fails too
   * @param controller the controller to register
   */
  register(controller: Controller): void {
    // add child controller cancellation callback
    controller.onCancellation(() => {
      // ignore subsequent cancellations if already cancelled
      if (this.isCancelled()) return;
      this.cancel(controller.getFailure());
    });
  }
}
