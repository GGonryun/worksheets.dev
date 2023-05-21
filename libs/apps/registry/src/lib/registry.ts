import {
  ApplicationExecutionPayload,
  ApplicationRegistry,
} from '@worksheets/engine';
import { Library } from './framework';
import { OfficialLibrary } from './library';
/**
 * Connects to the official application library for the worksheets.dev
 */
export class OfficialRegistry implements ApplicationRegistry {
  public readonly library: Library;
  constructor() {
    this.library = new OfficialLibrary();
  }
  async run(opts: ApplicationExecutionPayload<unknown>): Promise<unknown> {
    return await this.library.run(opts.path, opts.input[0]);
  }
}
