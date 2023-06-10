import { CodedFailure } from '@worksheets/util/errors';

export class SerializerFailure extends CodedFailure<'unrecognized-instruction'> {}

// serialization will lose deeply nested method call failures, we should avoid such structures.
export type SimpleErrorMessage = {
  code?: unknown;
  cause?: SimpleErrorMessage;
  message?: string;
  data?: string;
  stack?: string;
  name?: string;
};
