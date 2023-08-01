import { ApplicationExecutors } from '../framework';
import * as jp from 'jsonpath';

export const json: ApplicationExecutors<'json'> = {
  async parse(opts) {
    return JSON.parse(opts.input);
  },
  async query(opts) {
    return jp.query(opts.input.data, opts.input.query);
  },
  async stringify(opts) {
    return JSON.stringify(opts.input);
  },
};
