const upload_text_message = `
steps:
- call: google.buckets.upload
  input:
    file: message-to-mom.txt
    bucket: samplebuckety31287469817
    data: data:text/text;base64,\${base64("hi mom!")}
- return: true
`;

const read_buckets = `
steps:
    - call: google.buckets.read
      output: buckets
    - return: \${buckets}
`;

const read_bucket_contents = `
steps:
    - call: google.buckets.read
      input: BUCKET_NAME
      output: file
    - return: \${file}
`;

const download_files = `
steps:
- call: google.buckets.download
  input:
    file: TwitterQuakes-badge.png
    bucket: samplebuckety31287469817
- return: true
`;

export const google_cloud_storage = {
  upload_text_message,
  read_bucket_contents,
  read_buckets,
  download_files,
};
