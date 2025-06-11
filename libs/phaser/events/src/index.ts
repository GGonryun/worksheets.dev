/* eslint-disable @typescript-eslint/no-explicit-any */
import { Movement } from '@worksheets/phaser/types';
import * as Phaser from 'phaser';

export class TypedEventEmitter<TEvents extends Record<string, any>> {
  constructor(
    private emitter: Phaser.Events.EventEmitter = new Phaser.Events.EventEmitter()
  ) {}

  emit<TEventName extends keyof TEvents & string>(
    eventName: TEventName,
    ...eventArg: TEvents[TEventName]
  ) {
    this.emitter.emit(eventName, ...(eventArg as []));
  }

  on<TEventName extends keyof TEvents & string>(
    eventName: TEventName,
    handler: (...eventArg: TEvents[TEventName]) => void,
    context?: any
  ) {
    this.emitter.on(eventName, handler, context);
  }

  off<TEventName extends keyof TEvents & string>(
    eventName: TEventName,
    handler: (...eventArg: TEvents[TEventName]) => void,
    context?: any
  ) {
    this.emitter.off(eventName, handler, context);
  }

  shutdown() {
    this.emitter.shutdown();
  }
}

export type MovementEventBus = TypedEventEmitter<{
  movement: [Movement];
  'stop-movement': [];
}>;
