const add = `
version: 1
steps:
  - assign:
    - sum: \${2 + 2}
output: \${sum}
`;

const accumulator = `
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

output: \${data}
`;

const loops = `
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

output: \${data}
`;

const max = `
assign:
  - list: [1, 2, 3, 4, 5]
steps:
  - call: math.max
    input: \${list}
    output: max
output: \${max}
`;

const http = `
steps:
  - call: http.request
    input:
      url: https://api.sampleapis.com/beers/ale
      method: GET
    output: resp
  - return: \${resp.body}
`;

const idempotence = `
name: idempotent function
version: 1
input: input
output: \${input}
`;

const interpolation = `
assign:
  - x: 2
  - y: 3
  - z: 4
steps:
  - assign:
    - expr: "\${x}%2B\${y}*sqrt(\${z})"
  - call: http.request
    input:
      url: http://api.mathjs.org/v4/?expr=\${expr}
      method: GET
    output: resp
  - return: \${resp.body}
  `;

export const system = {
  add,
  accumulator,
  loops,
  http,
  max,
  idempotence,
  interpolation,
};
