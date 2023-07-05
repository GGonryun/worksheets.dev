import { TemplateDefinition } from '@worksheets/apps/framework';

export const sendEmail: TemplateDefinition = {
  id: 'b0d6535d-3c25-4d15-a136-c3d62dd74f24',
  description: 'Send yourself an email',
  inputs: [{ name: 'Miguel Campos', email: 'miguel@worksheets.dev' }],
  outputs: [],
  categories: ['email', 'google'],
  text: `
input: [args]

steps:
    - call: google-gmail.get-user-email
      output: user
    - call: google-gmail.send-email
      input:
        to: \${args.email}
        subject: "Hello \${args.name}"
        body: "This is a test message using my current identity as \${user}"
      output: email

return: \${email}
`,
};
