import { yaml, YAMLException } from '@worksheets/util-yaml';

export function getYamlCodeValidationErrors(
  code: string
): YAMLException | undefined {
  let error: YAMLException | undefined;
  try {
    yaml.read(code);
  } catch (e) {
    error = e as YAMLException;
  }
  return error;
}
