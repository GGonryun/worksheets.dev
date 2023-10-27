import fs from 'fs';
import { MarkdownPath } from './types';

export const getFilePaths = (postsPath: string): MarkdownPath[] => {
  return (
    fs
      .readdirSync(postsPath)
      // Remove file extensions for page paths
      .map((path) => path.replace(/\.mdx?$/, ''))
      // Map the path into the static paths object required by Next.js
      .map((slug) => ({ params: { slug } }))
  );
};
