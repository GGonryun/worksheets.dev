import { TemplateDefinition } from '@worksheets/apps/framework';

export const createCompletion: TemplateDefinition = {
  id: '8286fba4-c331-4df5-97cb-1f4a03dc42e9',
  description: 'Create an Open AI completion from a prompt',
  inputs: [{ prompt: 'Tell me a dad joke about paper' }],
  outputs: [],
  categories: ['a.i.'],
  text: `
input: [args]

steps:
  - call: open_ai.create_completion
    input: 
      model: "text-davinci-003"
      prompt: \${args.prompt}
      max_tokens: 80
      temperature: 1.5
    output: completion

return: \${completion.choices[0].text}
`,
};
