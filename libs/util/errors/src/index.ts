/**
 * @throws {Error}
 */
export const assertNever = (value: never): Error => {
  throw new Error(`Unhandled value: ${JSON.stringify(value)}`);
};

export const assertNotImplemented = (name: string): Error => {
  throw new Error(`Not implemented: ${name}`);
};
