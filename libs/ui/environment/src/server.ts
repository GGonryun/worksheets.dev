const { GCP_CLIENT_EMAIL, GCP_PRIVATE_KEY, VERCEL_ENV } = process.env;

if (!GCP_CLIENT_EMAIL) {
  throw new Error('Missing GCP_CLIENT_EMAIL');
}

if (!GCP_PRIVATE_KEY) {
  throw new Error('Missing GCP_PRIVATE_KEY');
}

const IS_DEVELOPMENT = VERCEL_ENV === 'development';

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
  IS_DEVELOPMENT,
  GCP_SUBMISSION_BUCKET_ID,
  GCP_SUBMISSION_BUCKET_URL,
  GCP_CLIENT_EMAIL,
  GCP_PRIVATE_KEY,
  createFileDownloadUrl,
};
