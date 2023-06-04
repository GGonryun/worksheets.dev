const create_gist = `
name: create github gist
version: 1
steps:
- call: github.gists.create
  input:
    description: "This is a test gist!"
    public: false
    file: README.md
    content: "Hi mom!"
  output: data
- return: \${data}
`;

const create_webhook = `
name: create github repository webhook
version: 1
assign
  owner: YOUR GITHUB USER HERE
  repo: YOUR REPO HERE
  name: YOUR WEBHOOK NAME HERE
  url: YOUR URL HERE
steps:
- call: github.webhooks.create
  input: 
    owner: \${owner}
    repo: \${repo}
    name: \${name}
    active: true
    events:
        - push
        - pull_request
    url: \${url}
  output: result
- return: \${result}
`;

const list_webhook = `
name: list github repository webhooks
version: 1
steps:
- call: github.webhooks.list
  input: 
    owner: YOUR GITHUB USER HERE
    repo: YOUR GITHUB REPO HERE
  output: webhook
- return: \${webhook}
`;

const delete_webhook = `
name: delete github repistory webhook
version: 1
steps:
- call: github.webhooks.delete
  input:
    owner: YOUR GITHUB HERE
    repo: YOUR REPO HERE
    hook_id: YOUR WEBHOOK ID HERE
  output: deleted
- return: \${deleted}`;

const test_webHook = `
steps:
- call: github.webhooks.test
  input: 
    owner: YOUR OWNER HERE
    repo: YOUR REPO HERE
    hook_id: YOUR WEBHOOK ID 
  output: webhook
- return: \${webhook}
`;

export const github = {
  create_gist,
  create_webhook,
  list_webhook,
  delete_webhook,
  test_webHook,
};
