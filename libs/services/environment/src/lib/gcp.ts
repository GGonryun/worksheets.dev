import { IS_DEVELOPMENT } from './development';

const {
  GCP_CLIENT_EMAIL: GCP_CLIENT_EMAIL_RAW,
  GCP_PRIVATE_KEY: GCP_PRIVATE_KEY_RAW,
} = process.env;

if (!GCP_CLIENT_EMAIL_RAW) {
  throw new Error('Missing GCP_CLIENT_EMAIL');
}

if (!GCP_PRIVATE_KEY_RAW) {
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

const GCP_CLIENT_EMAIL: string = GCP_CLIENT_EMAIL_RAW;
const GCP_PRIVATE_KEY: string = GCP_PRIVATE_KEY_RAW;

export {
  GCP_SUBMISSION_BUCKET_ID,
  GCP_SUBMISSION_BUCKET_URL,
  GCP_CLIENT_EMAIL,
  GCP_PRIVATE_KEY,
  createFileDownloadUrl,
};
