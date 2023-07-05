import { zodToJsonSchema } from 'zod-to-json-schema';
import {
  MethodDefinition,
  applicationMetadata,
} from '@worksheets/apps/framework';
import { JsonSchema7ObjectType } from 'zod-to-json-schema/src/parsers/object';
import {
  convertApplicationDefinition,
  newApplicationsDatabase,
} from '@worksheets/data-access/applications';
import { TypeOf, z } from 'zod';
const db = newApplicationsDatabase();

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
  lines.push(`  - call: ${appId}/${method.id}`);

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

export const listApplicationsRequestSchema = z.object({
  ...applicationMetadata.partial().shape,
  customizable: z.boolean().default(false),
});

export const listApplications = ({
  customizable,
  public: publicallyAvailable,
  enabled,
  gallery,
  external,
}: TypeOf<typeof listApplicationsRequestSchema>) => {
  let all = db.list();

  if (customizable) {
    all = all.filter((app) => Boolean(app.settings));
  }

  if (publicallyAvailable != null) {
    all = all.filter((app) => app.meta.public === publicallyAvailable);
  }

  if (enabled != null) {
    all = all.filter((app) => app.meta.enabled === enabled);
  }

  if (gallery != null) {
    all = all.filter((app) => app.meta.gallery === gallery);
  }

  if (external != null) {
    all = all.filter((app) => app.meta.external === external);
  }

  return all.map(convertApplicationDefinition);
};
