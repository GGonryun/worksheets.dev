const query_complex_objects_with_jpath = `
assign:
  list: [{ name: "London", "population": 8615246 },{ name: "Berlin", "population": 3517424 },{ name: "Madrid", "population": 3165235 },{ name: "Rome",   "population": 2870528 }]
steps:
- call: json.query
  input:
    data: \${list}
    query: "$..name"
  output: query
- return: \${query}    
`;

export const json = { query_complex_objects_with_jpath };
