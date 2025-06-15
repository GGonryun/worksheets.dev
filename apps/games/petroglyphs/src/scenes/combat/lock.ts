import { TypedEventEmitter } from '@worksheets/phaser/events';

type LockType = 'incremental' | 'boolean';

export class Lock {
  gate: number;
  type: LockType;
  events: TypedEventEmitter<{ lock: []; unlock: [] }>;
  constructor(type: LockType) {
    this.gate = 0;
    this.type = type;
    this.events = new TypedEventEmitter();
  }

  public get locked(): boolean {
    if (this.type === 'incremental') {
      return this.gate > 0;
    } else {
      return this.gate === 1;
    }
  }

  public close(): void {
    if (this.type === 'incremental') {
      this.gate++;
    } else {
      this.gate = 1;
    }
    if (this.locked) {
      this.events.emit('lock');
    }
  }

  public open(): void {
    if (this.type === 'incremental') {
      this.gate = Math.max(0, this.gate - 1);
    } else {
      this.gate = 0;
    }

    if (!this.locked) {
      this.events.emit('unlock');
    }
  }
}
