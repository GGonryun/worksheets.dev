export const FUNCTION_DELIMITER = '.';
export const EXPRESSION_TARGET = 'call:';
export const VERSION_DELIMITER = '@';

export function searchForFunctions(text: string) {
  const regex = /^.*call:.*/gm;
  const matches = text.match(regex);
  if (!matches) return [];
  // always get what's after "call:"
  return matches.map((line) => line.split(EXPRESSION_TARGET)[1].trim());
}

export function splitFunctionDeclaration(declaration: string) {
  const [name, version] = declaration.split(VERSION_DELIMITER);
  const [app, method] = name.split(FUNCTION_DELIMITER);
  return { method, app, version };
}

export type FunctionDeclaration = ReturnType<typeof splitFunctionDeclaration>;

export const DEFAULT_SAMPLE_TEMPLATE = `
name: http request evaluates math expression

input: data

assign:
  - x: 2
  - y: 3
  - z: 4
  - expr: "\${x}%2B\${y}*sqrt(\${z})"

steps:
  - log: 📝 Crafted expression \${expr}
  - wait: 10000 # wait for 10 seconds
  - call: http.request
    input:
      url: http://api.mathjs.org/v4/?expr=\${expr}
      method: GET
    output: resp
  - log: 💡 Data received \${json.stringify(resp.body)}.

output: \${data}
`.trim();
