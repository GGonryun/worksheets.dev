// returns data volume in bytes, convert to KB by dividing by 1000
export const calculateDataVolume = (obj: unknown) => {
  if (!obj) return 0;
  return new TextEncoder().encode(JSON.stringify(obj)).length;
};

// https://cloud.google.com/datastore/docs/concepts/limits
export const FIRESTORE_LIMIT = 1048487;
