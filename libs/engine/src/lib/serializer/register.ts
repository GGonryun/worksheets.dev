import { MethodCallFailure } from '@worksheets/apps/framework';
import { SnapshotEntity } from '@worksheets/data-access/tasks';
import { Register } from '../framework';
import { ChainSerializers } from './chain';
import { Serializer } from './serializer';
import { JSONSerializer } from './json';
import { MethodCallFailureSerializer } from './method-call-failure';
import { SimpleErrorMessage } from './failures';

export class RegisterSerializer
  implements Serializer<Register, SnapshotEntity['register']>
{
  private readonly failure: Serializer<MethodCallFailure, string>;
  private readonly json = new JSONSerializer<unknown>();
  private readonly haltKeyWord = 'true';

  constructor() {
    const errorMessage = new JSONSerializer<SimpleErrorMessage>();
    const methodCallFailure = new MethodCallFailureSerializer();
    this.failure = new ChainSerializers(methodCallFailure, errorMessage);
  }

  serialize({
    name,
    version,
    failure,
    output,
    input,
    yaml,
    halt,
  }: Register): Record<string, string> {
    return {
      name: name ?? '',
      yaml: yaml ?? '',
      version: version ? `${version}` : '',
      failure: failure ? this.failure.serialize(failure) : '',
      output: this.json.serialize(output),
      input: this.json.serialize(input),
      halt: halt ? this.haltKeyWord : 'false',
    };
  }

  deserialize(serialized: Record<string, string>): Register {
    const { failure, name, version, output, input, halt, yaml } = serialized;
    const register = new Register();
    register.failure = failure ? this.failure.deserialize(failure) : undefined;
    register.name = name ? name : undefined;
    register.version = version ? Number(version) : undefined;
    register.input = input ? this.json.deserialize(input) : undefined;
    register.output = output ? this.json.deserialize(output) : undefined;
    register.halt = halt == this.haltKeyWord;
    register.yaml = yaml ? yaml : undefined;
    return register;
  }
}
