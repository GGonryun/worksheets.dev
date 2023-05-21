import { isEqual } from 'lodash';
import { CustomRegistry } from './custom';

export class MockRegistry extends CustomRegistry {
  constructor(opts: MockRegistryResponses) {
    super(async ({ path, input }) => {
      for (const key in opts) {
        if (path != key) continue;
        const test = opts[key];
        if (!isEqual(input, test.input)) throw new Error('input should match');
        return test.output;
      }
      return undefined;
    });
  }
}

export type MockRegistryResponses = Record<
  string,
  { input: unknown; output: unknown }
>;
