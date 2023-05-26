import { CodedFailure } from '@worksheets/util/errors';

export type UserAccessFailures =
  | 'unauthorized'
  | 'invalid-input'
  | 'unexpected'
  | 'service-unavailable';
export class UserAccessFailure extends CodedFailure<UserAccessFailures> {}
