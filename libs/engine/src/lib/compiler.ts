import { JSON_SCHEMA, load as loadYaml } from 'js-yaml';
import { InitDefinition } from './instructions/init';

export interface Compiler {
  compile(text: string): Promise<InitDefinition>;
}

export class YAMLCompiler implements Compiler {
  async compile(text: string): Promise<InitDefinition> {
    return loadYaml(text, {
      json: true,
      schema: JSON_SCHEMA,
    }) as InitDefinition;
  }
}
