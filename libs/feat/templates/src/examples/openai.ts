const create_image = `
name: create an image from a prompt
steps:
    - call: openai.images.create
      input: 
        prompt: a cup but its being by a modest duck
      output: image
    - return: \${image}
`;

const create_completion = `
name: a dad joke about paper
steps:
    - call: openai.completions.create
      input: 
        model: "text-davinci-003"
        prompt: |
            Tell me a dad joke about paper
        max_tokens: 80
        temperature: 1.5
      output: completion
    - return: \${completion.choices[0].text}
`;

export const openai = { create_image, create_completion };
