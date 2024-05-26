import { ValidationOptions } from '../task';
import { parseTaskPollData, parseTaskPollState } from './parse';

export const validatePollSubmission = (opts: ValidationOptions) => {
  const data = parseTaskPollData(opts.data);
  parseTaskPollState(data, opts.state);
};
