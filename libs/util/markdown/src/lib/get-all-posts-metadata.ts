import { getFilePaths } from './get-file-paths';
import { getParsedFileContentBySlug } from './get-parsed-file-content-by-slug';
import { MarkdownMetadata } from './types';

export const getAllPostsMetadata = (postsPath: string): MarkdownMetadata[] => {
  const files = getFilePaths(postsPath);

  // for each file path, read the parsed file content.
  const metadatas = files.map((file) => {
    return getParsedFileContentBySlug(file.params.slug, postsPath).metadata;
  });

  // sort the posts by date
  return metadatas.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    }
    return -1;
  });
};
