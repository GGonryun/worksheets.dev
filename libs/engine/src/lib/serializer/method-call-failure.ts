import { MethodCallFailure } from '@worksheets/apps/framework';
import { FailureSerializer } from './failure';
import { Serializer } from './serializer';
import { JSONSerializer } from './json';
import { SimpleErrorMessage } from './failures';

export class MethodCallFailureSerializer
  implements Serializer<MethodCallFailure, SimpleErrorMessage>
{
  private readonly failures: FailureSerializer;
  private readonly json: JSONSerializer<unknown>;
  constructor() {
    this.failures = new FailureSerializer();
    this.json = new JSONSerializer();
  }
  serialize({
    code,
    cause,
    message,
    data,
    stack,
    name,
  }: MethodCallFailure): SimpleErrorMessage {
    return {
      code,
      cause: this.failures.serialize(cause),
      message,
      data: data ? this.json.serialize(data) : undefined,
      stack,
      name,
    };
  }
  deserialize({
    code,
    cause,
    message,
    data,
    stack,
    name,
  }: SimpleErrorMessage): MethodCallFailure {
    const f = new MethodCallFailure({
      code: Number(code),
      cause: cause ? this.failures.deserialize(cause) : undefined,
      message,
      data: data ? JSON.parse(data) : undefined,
    });
    f.stack = stack;
    f.name = name ?? '';

    return f;
  }
}
