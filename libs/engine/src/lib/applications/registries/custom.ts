import {
  ApplicationExecutor,
  ApplicationExecutionPayload,
} from '../applications';
import { ApplicationRegistry } from './framework';

export class CustomRegistry implements ApplicationRegistry {
  runFn: ApplicationExecutor<unknown, unknown>;
  constructor(fn: ApplicationExecutor<unknown, unknown>) {
    this.runFn = fn;
  }
  async run(opts: ApplicationExecutionPayload<unknown>): Promise<unknown> {
    return await this.runFn(opts);
  }
}
