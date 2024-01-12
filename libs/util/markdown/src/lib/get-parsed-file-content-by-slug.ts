import fs from 'fs';
import matter from 'gray-matter';
import { join } from 'path';

import { MarkdownDocument } from './types';

export const getParsedFileContentBySlug = (
  slug: string,
  postsPath: string
): MarkdownDocument | undefined => {
  const postFilePath = join(postsPath, `${slug}.mdx`);
  try {
    const fileContents = fs.readFileSync(postFilePath);
    const { data, content } = matter(fileContents);
    return {
      metadata: {
        title: data['title'],
        excerpt: data['excerpt'],
        coverImage: data['coverImage'],
        date: data['date'],
        authorId: data['authorId'],
        ogImage: data['ogImage'],
        tags: data['tags'],
        slug,
      },
      content,
    };
  } catch (error) {
    console.error('Failed to load file contents for page', error);
  }
  return undefined;
};
