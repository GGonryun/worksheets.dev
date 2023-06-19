import * as yaml from 'js-yaml';

export function getYamlCodeValidationErrors(
  code: string
): yaml.YAMLException | undefined {
  let error: yaml.YAMLException | undefined;
  try {
    yaml.load(code);
  } catch (e) {
    error = e as yaml.YAMLException;
  }
  return error;
}
