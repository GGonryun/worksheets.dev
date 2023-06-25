export interface Clock {
  time: number;
  start(): void;
  stop(): void;
}
