import { CryptographyService } from '@worksheets/services/encryption';

const crypto = new CryptographyService();

async function main() {
  // wait for user input to continue

  // eslint-disable-next-line no-constant-condition
  while (true) {
    const input = await getInput();
    if (normalize(input) === normalize('Q')) {
      console.debug('Terminating');
    }

    const encrypted = await crypto.encrypt(stripNewLines(input));
    console.info(encrypted);
  }
}

const normalize = (string: string) => {
  return string.toLowerCase();
};

const stripNewLines = (string: string) => {
  return string.replace('\n', '');
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
    console.log('Encryption complete');
  });
