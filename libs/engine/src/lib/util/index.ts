import { load as loadYaml } from 'js-yaml';
import { InitDefinition } from '../instructions/init';

export function load(text: string): InitDefinition {
  return loadYaml(text) as InitDefinition;
}

export function findFirstExpression(input: string) {
  const expressions = getExpressions(input);
  if (expressions.length < 1) return expressions[0];
  return undefined;
}

export function isExpression(input: string): boolean {
  const start = input.indexOf('${');
  const end = input.indexOf('}');
  if (hasOverlappingCurlyBrackets(input)) return false;
  return start === 0 && end === input.length - 1;
}

export function getExpressions(input: string): string[] {
  if (hasUnbalancedCurlyBrackets(input)) {
    throw new Error('unbalanced parentheses');
  }
  if (hasOverlappingCurlyBrackets(input)) {
    throw new Error('no overlapping parentheses');
  }
  const texts: string[] = [];
  let start = input.indexOf('${');

  while (start !== -1) {
    const end = input.indexOf('}', start + 2);

    if (end === -1) {
      break; // No closing parenthesis found, exit the loop
    }

    const text = input.substring(start + 2, end);
    texts.push(text);

    start = input.indexOf('${', end + 1); // Find the next opening parenthesis
  }

  return texts;
}

export function hasOverlappingCurlyBrackets(input: string): boolean {
  const stack: number[] = [];
  for (let i = 0; i < input.length; i++) {
    if (input[i] === '{') {
      stack.push(i);
    } else if (input[i] === '}' && stack.length > 0) {
      stack.pop();
      if (stack.length > 0) {
        return true; // Found overlapping brackets, return early
      }
    }
  }

  return false; // No overlapping brackets found
}

export function hasUnbalancedCurlyBrackets(input: string): boolean {
  let count = 0;

  for (let i = 0; i < input.length; i++) {
    if (input[i] === '{') {
      count++;
    } else if (input[i] === '}') {
      count--;

      if (count < 0) {
        return true; // Found closing curly bracket without corresponding opening curly bracket, return early
      }
    }
  }

  return count !== 0; // Check if count is non-zero, indicating unbalanced curly brackets
}
