import {
  ApplicationRegistry,
  InferApplicationContext,
} from '@worksheets/apps-registry';
// TODO: how is this unbuildable lib in a buildable lib?
import { BaseOAuthOptions } from '@worksheets/util/oauth/client';
import { ZodTypeAny } from '@worksheets/zod';

export type ConnectionField = TextField | SensitiveField | OAuthField;
// this type is used to hold all the fields for a connection.
export type ConnectionFields = Record<string, ConnectionField>;

// framework
export type ConnectionForms = {
  [K in keyof ApplicationRegistry]: ConnectionForm<K>;
};

export type ConnectionForm<
  K extends keyof ApplicationRegistry = keyof ApplicationRegistry
> = InferApplicationContext<K> extends null | undefined
  ? undefined
  : {
      setupTime: number; // number of minutes
      instructions: string; // markdown
      security: string; // markdown
      tutorialUrl: string;
      fields: {
        [prop in keyof InferApplicationContext<K>]: ConnectionField;
      };
    };

export type TextField = {
  type: 'text';
  title: string;
  helpUrl: string;
  schema: ZodTypeAny;
};

export type SensitiveField = {
  type: 'sensitive';
  title: string;
  helpUrl: string;
  schema: ZodTypeAny;
};

export type OAuthField = {
  type: 'oauth';
  title: string;
  helpUrl: string;
  options: BaseOAuthOptions;
  schema: ZodTypeAny;
};

/**
 * Validation functions and translation functions require better types than this.
 * Having better types would make it easier to implement validation functions at the top level.
 */
export type ConnectionValidationFunctions = {
  [K in keyof ApplicationRegistry]: ConnectionValidationFunction<K>;
};

export type ConnectionValidationFunction<K extends keyof ApplicationRegistry> =
  InferApplicationContext<K> extends null | undefined
    ? undefined
    : (data: {
        // calling clients will always provide us the original connection which is has all of it's properties decrypted but still stringified.
        [prop in keyof InferApplicationContext<K>]: string;
        // errors should map to the keys of the connection properties.
      }) => Promise<{ errors?: object }>;

export type GenericConnectionValidationFunction = (data: object) => Promise<{
  errors?: object;
}>;

export type ConnectionContextTranslationFunctions = {
  [K in keyof ApplicationRegistry]: ConnectionContextTranslationFunction<K>;
};

export type ConnectionContextTranslationFunction<
  K extends keyof ApplicationRegistry
> = InferApplicationContext<K> extends null | undefined
  ? undefined
  : (data: {
      // functions that require a translation always provide the raw stringified connection property. These implementations must perform the appropriate transformations.
      [prop in keyof InferApplicationContext<K>]: string;
    }) => InferApplicationContext<K>;
