import { Failure } from '@worksheets/util/errors';
import { isString, isNumber } from 'lodash';
import { Serializer } from './serializer';
import { SimpleErrorMessage } from './failures';

export class FailureSerializer
  implements Serializer<unknown, SimpleErrorMessage | undefined>
{
  serialize(original: unknown): SimpleErrorMessage | undefined {
    // if we move this into the constructor it would cause a recursive nightmare
    const serializer = new FailureSerializer();
    if (original instanceof Failure) {
      return {
        message: original.message,
        data: JSON.stringify(original.data ?? ''),
        cause: serializer.serialize(original.cause),
        stack: original.stack,
      };
    }

    if (original instanceof Error) {
      return {
        message: original.message,
        name: original.name,
        stack: original.stack,
      };
    }

    if (!original) {
      return;
    }

    if (isString(original) || isNumber(original)) {
      return { message: `${original}` };
    }

    return;
  }

  deserialize({
    message,
    data,
    cause,
    stack,
    name,
  }: SimpleErrorMessage): unknown {
    // if we move this into the constructor it would cause a recursive nightmare
    const ds = new FailureSerializer();
    const f = new Failure({
      cause: cause ? ds.deserialize(cause) : undefined,
      message,
      data: data ? JSON.parse(data) : undefined,
    });
    f.stack = stack;
    f.name = name ?? '';
    return f;
  }
}
