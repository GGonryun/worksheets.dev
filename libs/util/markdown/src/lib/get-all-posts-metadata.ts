import { getFilePaths } from './get-file-paths';
import { getParsedFileContentBySlug } from './get-parsed-file-content-by-slug';
import { MarkdownMetadata } from './types';

export const getAllPostsMetadata = (postsPath: string): MarkdownMetadata[] => {
  const files = getFilePaths(postsPath);

  // for each file path, read the parsed file content.
  const metadatas = files
    .map(
      (file) =>
        getParsedFileContentBySlug(file.params.slug, postsPath)?.metadata
    )
    .filter((metadata) => metadata != null) as MarkdownMetadata[];

  // sort the posts by date
  return metadatas.sort((a, b) => {
    if (new Date(a.date).getTime() < new Date(b.date).getTime()) {
      return 1;
    }
    return -1;
  });
};
