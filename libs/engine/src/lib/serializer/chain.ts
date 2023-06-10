import { Serializer } from './serializer';
import { reverseArray } from '@worksheets/util/arrays';

export class ChainSerializers<Start, Stop> implements Serializer<Start, Stop> {
  private readonly serializers: Serializer<unknown, unknown>[];
  constructor(...serializers: Serializer<unknown, unknown>[]) {
    this.serializers = serializers;
  }
  // the left most serializer goes first.
  serialize(original: Start): Stop {
    let data: unknown = original;
    for (const serializer of this.serializers) {
      data = serializer.serialize(data);
    }
    return data as Stop;
  }

  // reverse the order for deserializing
  deserialize(serialized: Stop): Start {
    let data: unknown = serialized;
    const reversed = reverseArray(this.serializers);
    for (const deserializer of reversed) {
      data = deserializer.deserialize(data);
    }
    return data as Start;
  }
}
