import { TemplateDefinition } from '@worksheets/apps/framework';

export const createImage: TemplateDefinition = {
  id: 'fd7b3ed2-af85-431b-9b68-d15422bfde4b',
  description: 'Create an Open AI image from a prompt',
  inputs: [{ prompt: 'a small cup being balanced on a ducks head' }],
  outputs: [],
  categories: ['a.i.'],
  text: `
input: [args]

steps:
  - call: open-ai/create-image
    input: 
      prompt: \${args.prompt}
      output: image

return: \${image}
`,
};
