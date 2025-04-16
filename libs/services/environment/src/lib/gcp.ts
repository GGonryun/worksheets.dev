const GCP_CLIENT_EMAIL = process.env['GCP_CLIENT_EMAIL'] ?? '';
const GCP_PRIVATE_KEY = process.env['GCP_PRIVATE_KEY'] ?? '';
const GCP_PROJECT_ID = process.env['GCP_PROJECT_ID'] ?? '';
const GCP_CDN_URL = process.env['GCP_CDN_URL'] ?? '';
const GCP_BUCKET_ID = process.env['GCP_BUCKET_ID'] ?? '';

if (!GCP_PROJECT_ID) {
  throw new Error('Missing GCP_PROJECT_ID');
}

if (!GCP_CLIENT_EMAIL) {
  throw new Error('Missing GCP_CLIENT_EMAIL');
}

if (!GCP_PRIVATE_KEY) {
  throw new Error('Missing GCP_PRIVATE_KEY');
}

if (!GCP_CDN_URL) {
  throw new Error('Missing GCP_CDN_URL');
}

if (!GCP_BUCKET_ID) {
  throw new Error('Missing GCP_BUCKET_ID');
}

const GCP_BUCKET_URL = `https://storage.googleapis.com/${GCP_BUCKET_ID}`;
export {
  GCP_PROJECT_ID,
  GCP_BUCKET_ID,
  GCP_BUCKET_URL,
  GCP_CLIENT_EMAIL,
  GCP_PRIVATE_KEY,
  GCP_CDN_URL,
};
