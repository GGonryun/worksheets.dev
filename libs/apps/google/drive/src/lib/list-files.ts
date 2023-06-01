import { MethodCallFailure, newMethod } from '@worksheets/apps/framework';
import { z } from 'zod';
import { fileSchema, newGoogleDriveClient, File } from './common';

export const listFiles = newMethod({
  path: 'google.drive.list_files',
  label: 'List Files',
  description: 'Returns metadata about a file or folder in your Google Drive',
  settings: null,
  input: null,
  output: z.array(fileSchema),
  async call({ settings: { auth } }) {
    const { accessToken } = auth;
    const drive = newGoogleDriveClient(accessToken);

    let response;
    try {
      response = await drive.files.list({
        fields: 'nextPageToken, files(id, name, trashed)',
      });
    } catch (error) {
      throw new MethodCallFailure({
        code: 500,
        message: 'failed to list files in google drive',
        cause: error,
      });
    }

    const files = response.data.files;
    if (!files) {
      console.warn('failed to locate files on google drive');
      return [];
    }

    const output: File[] = [];
    for (const file of files) {
      const {
        id,
        name,
        thumbnailLink,
        createdTime,
        modifiedTime,
        shared,
        trashed,
      } = file;

      output.push({
        id,
        name,
        thumbnailLink,
        createdTime,
        modifiedTime,
        shared,
        trashed,
      });
    }

    return output;
  },
});
