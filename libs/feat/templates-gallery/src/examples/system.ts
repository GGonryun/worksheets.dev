const add = `
name: add
version: 1
steps:
  - assign:
    - sum: \${2 + 2}
return: \${sum}
`;

const accumulator = `
name: accumulator
assign:
  - loop:
    - 'Hello'
    - ' '
    - 'world'
    - '!'
  - data: ''

steps:
  - for: loop
    index: i
    value: v
    steps:
      - assign:
        - data: \${data + v}

return: \${data}
`;

const loops = `
name: iterating loops
assign:
  - loop: [1, 2, 3, 4, apple]
  - data:

steps:
  - for: loop
    index: i
    value: v
    steps:
      - assign:
        - data: \${v}

return: \${data}
`;

const max = `
name: get maximum number
assign:
  - list: [1, 2, 3, 4, 5]
steps:
  - call: math.max
    input: \${list}
    output: max
return: \${max}
`;

const http = `
name: html execution
steps:
  - call: http
    input:
      url: https://api.sampleapis.com/beers/ale
      method: GET
    output: resp
  - return: \${resp.body}
`;

const idempotence = `
name: idempotent function
version: 1
params: input
return: \${input}
`;

const interpolation = `
name: mathjs string interpolation
assign:
  - x: 2
  - y: 3
  - z: 4
steps:
  - assign:
    - expr: "\${x}%2B\${y}*sqrt(\${z})"
  - call: http
    input:
      url: http://api.mathjs.org/v4/?expr=\${expr}
      method: GET
    output: resp
  - return: \${resp.body}`;

export const system = {
  add,
  accumulator,
  loops,
  http,
  max,
  idempotence,
  interpolation,
};
