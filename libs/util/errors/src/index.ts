/**
 * @throws {Error}
 */
export const assertNever = (value: never, message?: string): Error => {
  throw new Error(message ?? `Unhandled value: ${JSON.stringify(value)}`);
};

export const assertNotImplemented = (name: string): Error => {
  throw new Error(`Not implemented: ${name}`);
};

export class AggregateError extends Error {
  constructor(public errors: Error[], message?: string) {
    super(message ?? 'Multiple errors');
    this.name = 'AggregateError';
  }
}
