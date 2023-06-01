import { KeyManagementServiceClient } from '@google-cloud/kms';
import { credentials } from './credentials';
const shouldMock = !!process.env.MOCK_GOOGLE_KMS;
if (shouldMock) {
  console.warn(
    'Warning: MOCK_GOOGLE_KMS flag enabled skipping initialization of google kms'
  );
}

let client: KeyManagementServiceClient;
let key: string;
if (!shouldMock) {
  const projectId = process.env.FIREBASE_PROJECT_ID || '';
  const locationId = process.env.FIREBASE_KMS_LOCATION_ID || '';
  const keyRingId = process.env.FIREBASE_KMS_RING_ID || '';
  const keyId = process.env.FIREBASE_KMS_KEY_ID || '';
  if (!keyId || !keyRingId || !locationId || !projectId) {
    console.warn(
      'secrets: failed to find valid project, location, key ring, or key ids',
      projectId,
      locationId,
      keyRingId,
      keyId
    );
  } else {
    client = new KeyManagementServiceClient(credentials);
    key = client.cryptoKeyPath(projectId, locationId, keyRingId, keyId);
  }
}

async function encryptSymmetric(secret: string): Promise<string> {
  const plaintextBuffer = Buffer.from(secret);
  const [encryptResponse] = await client.encrypt({
    name: key,
    plaintext: plaintextBuffer,
  });
  const ciphertext = encryptResponse.ciphertext as string;
  const text = Buffer.from(ciphertext).toString('base64');
  return text;
}

async function decryptSymmetric(ciphertext: string): Promise<string> {
  const [decryptResponse] = await client.decrypt({
    name: key,
    ciphertext: ciphertext,
  });

  const plaintext = decryptResponse?.plaintext?.toString();
  if (!plaintext) throw new Error('failed to decrypt ciphertext');
  return plaintext;
}

export const secrets = shouldMock
  ? {
      encrypt: async (secret: string) => {
        return secret;
      },
      decrypt: async (ciphertext: string) => {
        return ciphertext;
      },
    }
  : {
      encrypt: encryptSymmetric,
      decrypt: decryptSymmetric,
    };
