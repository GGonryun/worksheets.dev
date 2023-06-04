export const create_qr_code = `
name: create a QR code for a short link
version: 1
assign:
    url: YOUR URL HERE
    group: YOUR GROUP ID HERE
steps:
    - call: bitly.links.create
      input:
        group: \${group}
        url: \${url}
      output: created
    - call: bitly.links.get
      input: \${created.id}
      output: metadata
    - call: bitly.links.qr
      input: \${metadata.id}
      output: data
    - return: \${data.qr_code}
`;
export const bitly = { create_qr_code };
