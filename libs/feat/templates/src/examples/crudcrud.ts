export const deep_crud = `
name: create, read, update, and delete something
version: 1
assign:
    resource: shop
    tomato:
        name: tomato
        count: 4
        tags: [red, cool, tasty]
    potato:
        count: 5
        tags: [brown, spud, tasty]
steps:
- name: clean up lists prior to execution
  call: crudcrud.read
  input:
    resource: \${resource}
  output: list
- for: list
  index: i
  value: v
  steps:
    - call: crudcrud.delete
      input:
        resource: \${resource}
        id: \${v._id}
- name: create tomato entity
  call: crudcrud.create
  input:
    resource: \${resource}  
    json: \${json.stringify(tomato)}
  output: resource_id
- name: create potato entity
  call: crudcrud.create
  input:
    resource: \${resource}  
    json: \${json.stringify(potato)}
- call: crudcrud.read
  input:
    resource: \${resource}
  output: before
- call: crudcrud.delete
  input:
    resource: \${resource}
    id: \${resource_id}
- call: crudcrud.read
  input:
    resource: \${resource}
  output: after
- return:
    before: \${before}
    after: \${after}
    count: \${length(before)-length(after)}
`;

export const crud_jsonify = `
name: converts an object into json and saves it in crudcrud
assign:
  obj:
    user: john
    count: 2
steps:
  - call: crudcrud.create
    input:
      resource: test
      json: \${json.stringify(obj)}
    output: obj
  - return: \${obj.id}
`;

export const crud_delete_everything = `
name: clean up all items
version: 1
assign:
    resource: test
steps:
- call: crudcrud.read
  input:
    resource: \${resource}
  output: list
- for: list
  index: i
  value: v
  steps:
    - call: crudcrud.delete
      input:
        resource: \${resource}
        id: \${v._id}
- return: "ok"
`;
export const crudcrud = { deep_crud, crud_jsonify, crud_delete_everything };
