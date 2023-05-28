import { CodedFailure } from '@worksheets/util/errors';

export class Clock {
  private startTime: number | null;
  private endTime: number | null;

  constructor() {
    this.startTime = null;
    this.endTime = null;
  }

  start(): Clock {
    if (this.startTime !== null) {
      throw new ClockFailure({ code: 'already-started' });
    }
    this.startTime = Date.now();
    return this;
  }

  stop(): Clock {
    if (this.startTime === null) {
      throw new ClockFailure({ code: 'not-running' });
    }
    if (this.endTime !== null) {
      throw new ClockFailure({ code: 'already-stopped' });
    }

    this.endTime = Date.now();
    return this;
  }

  restart(): Clock {
    this.startTime = null;
    this.endTime = null;
    return this;
  }

  getExecutionTime(): number {
    const now = Date.now();
    const endTime = this.endTime ?? now;
    const startTime = this.startTime ?? now;
    return endTime - startTime;
  }
}

export type ClockFailures =
  | 'not-running'
  | 'already-stopped'
  | 'already-started';
export class ClockFailure extends CodedFailure<ClockFailures> {}
