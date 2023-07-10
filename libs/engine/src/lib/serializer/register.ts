import { MethodCallFailure } from '@worksheets/apps/framework';
import { Register } from '../framework';
import { ChainSerializers } from './chain';
import { Serializer } from './serializer';
import { JSONSerializer } from './json';
import { MethodCallFailureSerializer } from './method-call-failure';
import { SimpleErrorMessage } from './failures';
import { TaskSnapshotEntity } from '@worksheets/schemas-executions';

export class RegisterSerializer
  implements Serializer<Register, TaskSnapshotEntity['register']>
{
  private readonly failure: Serializer<MethodCallFailure, string>;
  private readonly json = new JSONSerializer<unknown>();

  constructor() {
    const errorMessage = new JSONSerializer<SimpleErrorMessage>();
    const methodCallFailure = new MethodCallFailureSerializer();
    this.failure = new ChainSerializers(methodCallFailure, errorMessage);
  }

  serialize({
    failure,
    output,
    input,
    duration,
  }: Register): Record<string, string> {
    return {
      duration: `${duration ?? 0}`,
      failure: failure ? this.failure.serialize(failure) : '',
      output: this.json.serialize(output),
      input: this.json.serialize(input),
    };
  }

  deserialize(serialized: Record<string, string>): Register {
    const { failure, output, input, duration } = serialized;
    const register = new Register();
    register.failure = failure ? this.failure.deserialize(failure) : undefined;
    register.input = input ? this.json.deserialize(input) : undefined;
    register.output = output ? this.json.deserialize(output) : undefined;
    register.duration = duration ? parseInt(duration) : 0;
    return register;
  }
}
