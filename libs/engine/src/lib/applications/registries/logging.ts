import { ApplicationExecutionPayload } from '../applications';
import { ApplicationRegistry } from './framework';

export class LoggingRegistry implements ApplicationRegistry {
  async run(opts: ApplicationExecutionPayload<unknown>): Promise<unknown> {
    console.log('executing an application', opts);
    return;
  }
}
