export const EXPRESSION_TARGET = 'call:';

export function searchForFunctions(text: string) {
  const regex = /^.*call:.*/gm;
  const matches = text.match(regex);
  if (!matches) return [];
  // always get what's after "call:"
  return matches.map((line) => line.split(EXPRESSION_TARGET)[1].trim());
}

export const FUNCTION_DELIMITER = '/';
export const VERSION_DELIMITER = '@';
export function splitFunctionDeclaration(declaration: string) {
  const [name, version] = declaration.split(VERSION_DELIMITER);
  const [app, method] = name.split(FUNCTION_DELIMITER);
  return { method, app, version };
}

export type FunctionDeclaration = ReturnType<typeof splitFunctionDeclaration>;
