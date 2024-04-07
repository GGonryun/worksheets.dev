import { IS_DEVELOPMENT } from './development';

const GCP_CLIENT_EMAIL = process.env['GCP_CLIENT_EMAIL'] ?? '';
const GCP_PRIVATE_KEY = process.env['GCP_PRIVATE_KEY'] ?? '';
const GCP_PROJECT_ID = process.env['GCP_PROJECT_ID'] ?? '';

if (!GCP_PROJECT_ID) {
  throw new Error('Missing GCP_PROJECT_ID');
}

if (!GCP_CLIENT_EMAIL) {
  throw new Error('Missing GCP_CLIENT_EMAIL');
}

if (!GCP_PRIVATE_KEY) {
  throw new Error('Missing GCP_PRIVATE_KEY');
}

const LOCAL_GCP_BUCKET = 'local-game-submissions';
const PROD_GCP_BUCKET = 'game-submissions';

const GCP_SUBMISSION_BUCKET_ID = IS_DEVELOPMENT
  ? LOCAL_GCP_BUCKET
  : PROD_GCP_BUCKET;

const GCP_SUBMISSION_BUCKET_URL = `https://storage.googleapis.com/${GCP_SUBMISSION_BUCKET_ID}`;

const createFileDownloadUrl = (path: string) => {
  return `${GCP_SUBMISSION_BUCKET_URL}/${path}`;
};

export {
  GCP_PROJECT_ID,
  GCP_SUBMISSION_BUCKET_ID,
  GCP_SUBMISSION_BUCKET_URL,
  GCP_CLIENT_EMAIL,
  GCP_PRIVATE_KEY,
  createFileDownloadUrl,
};
