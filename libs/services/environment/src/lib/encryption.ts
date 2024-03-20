const ENCRYPTION_SECRET = process.env['ENCRYPTION_SECRET'] ?? '';

if (!ENCRYPTION_SECRET) {
  throw new Error('ENCRYPTION_SERVICE is not defined');
}

export { ENCRYPTION_SECRET };
