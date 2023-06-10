import { Serializer } from './serializer';

export class JSONSerializer<T = unknown> implements Serializer<T, string> {
  serialize(original: T): string {
    return JSON.stringify(original);
  }
  deserialize(serialized: string): T {
    return JSON.parse(serialized) as T;
  }
}
