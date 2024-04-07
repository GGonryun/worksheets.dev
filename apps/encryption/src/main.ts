import { CryptographyService } from '@worksheets/services/encryption';

const crypto = new CryptographyService();

async function main() {
  // wait for user input to continue

  // eslint-disable-next-line no-constant-condition
  while (true) {
    const input = normalize(cleanse(await getInput()));
    if (input === normalize('Q')) {
      console.debug('Terminating');
      return;
    }
    if (input === '') {
      continue;
    }

    const encrypted = await crypto.encrypt(input);
    console.info(`Encrypted-${encrypted}`);
    const decrypted = await crypto.decrypt(encrypted);
    console.info(`Decrypted-${decrypted}`);
  }
}

const normalize = (string: string) => {
  return string.toLowerCase();
};

const cleanse = (string: string) => {
  return string.replace(/\n/g, '').trim();
};

const getInput = async () => {
  const data: Buffer = await new Promise((resolve) => {
    // ask the user to press enter to continue
    console.info(
      'Paste the data that you would like to encrypt and press enter'
    );
    process.stdin.resume();
    process.stdin.on('data', resolve);
  });

  return data.toString();
};

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(() => {
    process.exit();
  });
