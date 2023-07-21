import { ZodTypeAny } from 'zod';
import zodToJsonSchema from 'zod-to-json-schema';

type GenericSchemaType = ReturnType<typeof zodToJsonSchema>;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const printSchema = ({ ...props }: GenericSchemaType) => {
  // cleansing schema.
  return JSON.stringify({ ...props }, null, 2);
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const printZodSchema = (input: ZodTypeAny) => {
  // cleansing schema.
  return printSchema(zodToJsonSchema(input));
};

export const convertZodSchemaToJsonSchema = (input: ZodTypeAny) => {
  return zodToJsonSchema(input);
};
