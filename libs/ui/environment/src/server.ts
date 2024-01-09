const { GCP_CLIENT_EMAIL, GCP_PRIVATE_KEY } = process.env;

if (!GCP_CLIENT_EMAIL) {
  throw new Error('Missing GCP_CLIENT_EMAIL');
}

if (!GCP_PRIVATE_KEY) {
  throw new Error('Missing GCP_PRIVATE_KEY');
}

const GCP_SUBMISSION_BUCKET_ID = 'game-submissions';
const GCP_SUBMISSION_BUCKET_URL = `https://storage.googleapis.com/${GCP_SUBMISSION_BUCKET_ID}`;

const createFileDownloadUrl = (path: string) => {
  return `${GCP_SUBMISSION_BUCKET_URL}/${path}`;
};

export {
  GCP_SUBMISSION_BUCKET_ID,
  GCP_SUBMISSION_BUCKET_URL,
  GCP_CLIENT_EMAIL,
  GCP_PRIVATE_KEY,
  createFileDownloadUrl,
};
