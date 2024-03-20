import {
  ENCRYPTION_SECRET,
  IS_DEVELOPMENT,
} from '@worksheets/services/environment';

export class CryptographyService implements Crypotgrapher {
  crypotgrapher: Crypotgrapher;
  constructor() {
    // TODO: create a real encryption service that connects to GCP KMS
    if (IS_DEVELOPMENT) {
      this.crypotgrapher = new LocalCrypotgrapher(ENCRYPTION_SECRET);
    } else {
      throw new Error(`EncryptionService is not enabled on production`);
    }
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

class LocalCrypotgrapher implements Crypotgrapher {
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
