export const max = `
name: get maximum number
assign:
  list: [1, 2, 3, 4, 5]
steps:
  - call: math.max
    input: \${list}
    output: max
return: \${max}
`;
