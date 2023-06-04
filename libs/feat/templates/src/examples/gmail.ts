const send_email = `
name: send yourself an email
version: 1
assign:
    name: YOUR_NAME_HERE
    email: YOUR_EMAIL_HERE
steps:
    - call: google.gmail.get_user_email
      output: user
    - call: google.gmail.send_email
      input:
        to: \${email}
        subject: "Hello \${name}"
        body: "This is a test message using my current identity as \${user}"
      output: email
    - return: \${email}
`;

export const gmail = { send_email };
