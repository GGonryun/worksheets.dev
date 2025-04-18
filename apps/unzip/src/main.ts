import { CloudEvent, cloudEvent } from '@google-cloud/functions-framework';
import { Storage } from '@google-cloud/storage';
import * as unzipper from 'unzipper';

cloudEvent('Unzip', async (cloudEvent: CloudEvent<StorageObjectData>) => {
  // only process zip files
  if (cloudEvent.data.contentType !== 'application/zip') {
    return;
  }

  //split the file name.
  const [folder, file] = cloudEvent.data.name.split('/');

  console.info(`Processing zip file: ${cloudEvent.data.name}`, {
    folder,
    file,
    bucket: process.env.GCP_GAME_SUBMISSION_BUCKET_ID,
  });

  try {
    await unzip({
      bucket: cloudEvent.data.bucket,
      path: cloudEvent.data.name,
      destination: `${folder}/${file.replace('.zip', '')}`,
    });
    console.info(`Unzipping completed for ${cloudEvent.data.name}`);
  } catch (error) {
    console.error(
      `Error during unzip process for ${cloudEvent.data.name}:`,
      error
    );
  }
});

const unzip = (options: {
  bucket: string;
  path: string;
  destination: string;
}) =>
  new Promise((resolve, reject) => {
    const sourceBucket = new Storage().bucket(options.bucket);
    const targetBucket = new Storage().bucket(
      process.env.GCP_GAME_SUBMISSION_BUCKET_ID
    );
    const remotePath = sourceBucket.file(options.path);
    const targetFolder = options.destination;

    remotePath
      .createReadStream()
      .on('error', (err) => reject(err))
      .pipe(unzipper.Parse())
      .on('entry', async (entry: unzipper.Entry) => {
        const fileName = entry.path; // e.g. file.txt
        // Ensure we are only processing files, skip directories or other types
        if (entry.type !== 'File') {
          // skip non-file entries (like directories)
          entry.autodrain(); // ensure the entry is drained to avoid memory leaks
          return;
        }

        // Create a new file in the target folder
        const targetFile = targetBucket.file(`${targetFolder}/${fileName}`);
        entry
          .pipe(targetFile.createWriteStream())
          .on('error', (err) => reject(err))
          .on('finish', () => {
            // Successfully written the file to the target location
          });
      })
      .on('close', () => resolve(true)) // resolve the promise when the stream is closed
      .on('error', (err) => reject(err));
  });
