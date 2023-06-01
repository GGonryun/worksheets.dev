import { newMethod } from '@worksheets/apps/framework';
import { z } from 'zod';
import { fileSchema, newGoogleDriveClient } from './common';

export const getFile = newMethod({
  path: 'google.drive.get_file',
  label: 'Get File',
  description: 'Returns metadata about a file or folder in your Google Drive',
  settings: null,
  input: z.string().describe('file id'),
  output: fileSchema,
  async call({ input, settings: { auth } }) {
    const { accessToken } = auth;
    const drive = newGoogleDriveClient(accessToken);

    const file = await drive.files.get({ fileId: input, fields: '*' });

    const {
      id,
      name,
      thumbnailLink,
      createdTime,
      modifiedTime,
      shared,
      trashed,
    } = file.data;

    return {
      id,
      name,
      thumbnailLink,
      createdTime,
      modifiedTime,
      shared,
      trashed,
    };
  },
});
