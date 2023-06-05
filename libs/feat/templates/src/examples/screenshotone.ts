const take_screenshot = `
name: take a screenshot of a website and return blob
version: 1
steps:
    - call: screenshotone.take
      input: 
        url: https://worksheets.dev/
      output: screenshot
    - return: \${screenshot}
`;

export const screenshotone = { take_screenshot };
