import { CloudEvent, cloudEvent } from '@google-cloud/functions-framework';
import { Storage } from '@google-cloud/storage';
import * as unzipper from 'unzipper';

cloudEvent('Unzip', async (cloudEvent: CloudEvent<StorageObjectData>) => {
  // only process zip files
  if (cloudEvent.data.contentType !== 'application/zip') {
    // console.log(
    //   `The file ${cloudEvent.data.name} is not a zip file. Skipping processing.`
    // );
    return;
  }

  //split the file name.
  const [submissionId, file] = cloudEvent.data.name.split('/');

  console.log(`Processing zip file: ${cloudEvent.data.name}`, {
    submissionId,
    file,
  });

  try {
    await unzip({
      bucket: cloudEvent.data.bucket,
      file: cloudEvent.data.name,
      folder: `_submissions/${submissionId}`,
    });
    console.log(`Unzipping completed for ${cloudEvent.data.name}`);
  } catch (error) {
    console.error(
      `Error during unzip process for ${cloudEvent.data.name}:`,
      error
    );
  }
});

const unzip = (options: { bucket: string; file: string; folder: string }) =>
  new Promise((resolve, reject) => {
    const storageBucket = new Storage().bucket(options.bucket);
    const targetBucket = new Storage().bucket('charity-games');
    const remoteFile = storageBucket.file(options.file); // e.g. 1234/submission.zip
    const targetFolder = options.folder; // e.g. submissions/1234

    remoteFile
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
