import { zodToJsonSchema } from 'zod-to-json-schema';
import { MethodDefinition } from '@worksheets/apps/framework';
import { JsonSchema7ObjectType } from 'zod-to-json-schema/src/parsers/object';

// create an yaml example for the method
export const createExample = (appId: string, method: MethodDefinition) => {
  const lines: string[] = [];
  lines.push('');
  lines.push('# 👋 replace type declarations with variables');
  lines.push('# {"type": "string"} => "Hello Mom!"');
  lines.push('# {"type": "number"} => 42');
  lines.push('# {"type": "bool"} => true');
  lines.push('# {"type": "object"} => {"a": 1, "b": 2}');
  lines.push(`steps:`);
  lines.push(`  - call: ${appId}/${method.id}@v1`);

  if (method.input != null) {
    const schema = zodToJsonSchema(method.input);

    lines.push(`  # example method call:`);

    if (isJsonObject(schema)) {
      lines.push(`    input:`);
      const props = schema.properties;
      for (const key in props) {
        const value = props[key];
        lines.push(`        ${key}: ${printSchema(value)}`);
      }
    } else {
      lines.push(`    input: ${printSchema(schema)}`);
    }
  }

  if (method.output) {
    // if a method has outputs assign the step.
    lines.push(`    output: result`);
    const schema = zodToJsonSchema(method.output);
    lines.push(`  # using method outputs`);

    if (isJsonObject(schema)) {
      lines.push(`  - assign:`);
      const props = schema.properties;
      let i = 0;
      for (const key in props) {
        const value = props[key];
        lines.push(`    # ${printSchema(value)}`);
        lines.push(`    - prop_${i++}: \${result.${key}}`);
      }
    } else {
      lines.push(`  - assign: ${printSchema(schema)}`);
    }
  }

  return lines.join('\n');
};

const isJsonObject = (schema: unknown): schema is JsonSchema7ObjectType => {
  return (
    typeof schema === 'object' &&
    schema != null &&
    'type' in schema &&
    schema.type === 'object'
  );
};

type GenericSchemaType = ReturnType<typeof zodToJsonSchema>;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const printSchema = ({ $schema, ...props }: GenericSchemaType) => {
  // cleansing schema.
  return JSON.stringify({ ...props });
};