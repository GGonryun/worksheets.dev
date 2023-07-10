import * as yml from 'js-yaml';

export type YAMLException = yml.YAMLException;

function readYaml(text: string): Record<string, unknown> {
  return yml.load(text, {
    json: true,
    schema: yml.JSON_SCHEMA,
  }) as Record<string, unknown>;
}

function safeRead(
  text: string
):
  | { success: true; result: unknown }
  | { success: false; error: YAMLException } {
  try {
    return { success: true, result: readYaml(text) };
  } catch (e) {
    if (e instanceof yml.YAMLException) {
      return { success: false, error: e };
    } else {
      return {
        success: false,
        error: new yml.YAMLException('unknown error during evaluation'),
      };
    }
  }
}

export const yaml = {
  read: readYaml,
  safeRead,
};
