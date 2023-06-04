import { newMethod } from '@worksheets/apps/framework';
import { z } from 'zod';
import { Dropbox } from 'dropbox';
import { auth } from './common';
import {
  dropboxFolderSchema,
  dropboxFileSchema,
  DropboxFile,
  DropboxFolder,
} from './schema';
import { handleDropboxError } from './failures';

export const listFiles = newMethod({
  path: 'dropbox.files.list_folder',
  label: 'List Files in Folder',
  description:
    'Starts returning the contents of a folder. Does not include deleted files.',
  settings: { auth },
  input: z.string().default('/'),
  output: z.array(z.union([dropboxFolderSchema, dropboxFileSchema])),
  async call({ settings, input }) {
    const dbx = new Dropbox({ accessToken: settings.auth.accessToken });
    let response;
    try {
      response = await dbx.filesListFolder({
        path: input,
        limit: 1000,
        include_deleted: false,
        recursive: false,
      });
    } catch (error) {
      handleDropboxError(error, input);
      throw error;
    }

    console.info(
      `dropbox found ${response.result.entries.length} files in folder resources`
    );

    const entries: (DropboxFile | DropboxFolder)[] = [];
    for (const entry of response.result.entries) {
      if (entry['.tag'] === 'file') {
        entries.push({
          tag: 'file',
          name: entry.name,
          id: entry.id,
          size: entry.size,
          path_lower: entry.path_lower ?? '',
          content_hash: entry.content_hash ?? '',
          is_downloadable: entry.is_downloadable ?? false,
        });
      } else if (entry['.tag'] === 'folder') {
        entries.push({
          tag: 'folder',
          name: entry.name,
          path_lower: entry.path_lower ?? '',
          id: entry.id,
        });
      } else {
        console.warn(
          `dropbox found unrecognized entry tag`,
          entry['.tag'],
          entry.name
        );
      }
    }

    return entries;
  },
});
