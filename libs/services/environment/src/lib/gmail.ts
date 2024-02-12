const GMAIL_USER = process.env['GMAIL_USER'] ?? '';
const GMAIL_PASS = process.env['GMAIL_PASS'] ?? '';

if (!GMAIL_USER) {
  throw new Error('GMAIL_USER is not defined');
}

if (!GMAIL_PASS) {
  throw new Error('GMAIL_PASS is not defined');
}

export { GMAIL_USER, GMAIL_PASS };
