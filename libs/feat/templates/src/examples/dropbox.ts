const list_files = `
name: list files in my dropbox
version: 1
steps: 
- call: dropbox.files.list_folder
  input: YOUR_FOLDER_PATH_GOES_HERE
  output: files
- return: \${files}
`;

export const dropbox = { list_files };
