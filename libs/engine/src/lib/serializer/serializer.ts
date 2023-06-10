/**
 * The Serializer is responsible for converting executions into objects that we can store in memory and converting those objects back into an execution.
 */
export interface Serializer<Deserialized, Serialized> {
  serialize(original: Deserialized): Serialized;
  deserialize(serialized: Serialized): Deserialized;
}
