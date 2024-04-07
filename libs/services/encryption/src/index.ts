import { KeyManagementServiceClient } from '@google-cloud/kms';
import {
  GCP_CLIENT_EMAIL,
  GCP_PRIVATE_KEY,
  GCP_PROJECT_ID,
} from '@worksheets/services/environment';

export class CryptographyService implements Crypotgrapher {
  crypotgrapher: Crypotgrapher;
  constructor(crypotgrapher?: Crypotgrapher) {
    this.crypotgrapher = crypotgrapher ?? new GoogleCryptographer();
  }

  async encrypt(decrypted: string): Promise<string> {
    return this.crypotgrapher.encrypt(decrypted);
  }
  async decrypt(encrypted: string): Promise<string> {
    return this.crypotgrapher.decrypt(encrypted);
  }
}

export interface Crypotgrapher {
  encrypt: (decoded: string) => Promise<string>;
  decrypt: (encoded: string) => Promise<string>;
}

export class LocalCrypotgrapher implements Crypotgrapher {
  secret: string;
  constructor(secret: string) {
    this.secret = secret;
  }

  async encrypt(decoded: string) {
    return `${decoded}${this.secret}`;
  }

  async decrypt(encoded: string) {
    return encoded.replace(this.secret, '');
  }
}

export class GoogleCryptographer implements Crypotgrapher {
  client: KeyManagementServiceClient;
  cryptoKeyPath: string;
  encoding = 'base64' as const;

  constructor() {
    this.client = new KeyManagementServiceClient({
      credentials: {
        client_email: GCP_CLIENT_EMAIL,
        private_key: GCP_PRIVATE_KEY,
      },
    });

    this.cryptoKeyPath = this.client.cryptoKeyPath(
      GCP_PROJECT_ID,
      'global',
      'charitygames',
      'raffles'
    );
  }

  async encrypt(decoded: string) {
    const [encrypted] = await this.client.encrypt({
      name: this.cryptoKeyPath,
      plaintext: Buffer.from(decoded),
    });

    const ciphertext = encrypted.ciphertext;
    if (!ciphertext) {
      throw new Error('Failed to encrypt encoded string');
    }

    return Buffer.from(ciphertext).toString('base64');
  }

  async decrypt(encoded: string) {
    const [decrypted] = await this.client.decrypt({
      name: this.cryptoKeyPath,
      ciphertext: Buffer.from(encoded, 'base64'),
    });

    const plaintext = decrypted.plaintext;
    if (!plaintext) {
      throw new Error('Failed to decrypt encoded string');
    }

    return plaintext.toString();
  }
}
