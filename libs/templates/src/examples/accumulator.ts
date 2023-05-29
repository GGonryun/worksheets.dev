export const accumulator = `
name: accumulator
assign:
  loop:
    - 'Hello'
    - ' '
    - 'world'
    - '!'
  data: ''

steps:
  - for: loop
    index: i
    value: v
    steps:
      - assign:
        data: \${data + v}

return: \${data}
`;
