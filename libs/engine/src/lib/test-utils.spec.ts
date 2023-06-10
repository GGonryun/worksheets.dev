import { Library, MethodDefinition } from '@worksheets/apps/framework';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Mock = jest.Mock<any, any, any>;
export class JestApplicationLibrary implements Library {
  private readonly callMock: Mock;
  private readonly listMock: Mock;
  constructor(opts?: { call?: Mock; list?: Mock }) {
    this.callMock = opts?.call ?? jest.fn();
    this.listMock = opts?.list ?? jest.fn();
  }
  list(): MethodDefinition[] {
    throw new Error('Method not implemented.');
  }

  async call(path: string, ...inputs: unknown[]): Promise<unknown> {
    return this.callMock(path, ...inputs);
  }

  mocks() {
    return { call: this.callMock, list: this.listMock };
  }
}

describe('test-utils shared', () => {
  it('ok', () => {
    // silence the warning that every suite needs one test
  });
});
