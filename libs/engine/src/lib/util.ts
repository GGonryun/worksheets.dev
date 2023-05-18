import { load as loadYaml } from 'js-yaml';
import { InitDefinition } from './instructions/init';

export function load(text: string): InitDefinition {
  return loadYaml(text) as InitDefinition;
}

const START_WITH = '${';
const END_WITH = '}';
export function getTextBetweenReferenceBrackets(input: string) {
  const result = [];
  let startIndex = input.indexOf(START_WITH);

  while (startIndex !== -1) {
    const endIndex = input.indexOf(END_WITH, startIndex + 1);

    if (endIndex !== -1) {
      const textBetween = input.substring(startIndex + 2, endIndex);
      if (textBetween) {
        result.push(textBetween);
      }
      startIndex = input.indexOf(START_WITH, endIndex + 1);
    } else {
      break;
    }
  }

  return result;
}
