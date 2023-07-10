import { yaml } from '@worksheets/util-yaml';
import { InitDefinition } from './instructions/init';

export interface Compiler {
  compile(text: string): Promise<InitDefinition>;
}

export class YAMLCompiler implements Compiler {
  async compile(text: string): Promise<InitDefinition> {
    return yaml.read(text) as InitDefinition;
  }
}
