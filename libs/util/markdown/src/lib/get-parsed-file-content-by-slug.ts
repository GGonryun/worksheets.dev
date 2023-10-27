import { join } from 'path';
import fs from 'fs';
import { MarkdownDocument } from './types';
import matter from 'gray-matter';

export const getParsedFileContentBySlug = (
  slug: string,
  postsPath: string
): MarkdownDocument => {
  const postFilePath = join(postsPath, `${slug}.mdx`);
  const fileContents = fs.readFileSync(postFilePath);
  const { data, content } = matter(fileContents);

  return {
    metadata: {
      title: data['title'],
      excerpt: data['excerpt'],
      coverImage: data['coverImage'],
      date: data['date'],
      author: data['author'],
      ogImage: data['ogImage'],
      tags: data['tags'],
      slug,
    },
    content,
  };
};
