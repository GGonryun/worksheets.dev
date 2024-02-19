import { blogRoutes } from '@worksheets/ui/routes';
import { formatAmericanDate } from '@worksheets/util/time';
import { getAllPostsMetadata } from '@worksheets/util-markdown';
import { NextApiHandler } from 'next';
import path from 'path';

const LAST_UPDATE_DATE = `2024-01-16`;

const addHomePage = () => {
  return `<url>
        <loc>${blogRoutes.baseUrl}</loc>
        <lastmod>${LAST_UPDATE_DATE}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>1.0</priority>
    </url>`;
};

const BLOG_DIR = path.resolve('public/articles');

const addBlogPosts = () => {
  const posts = getAllPostsMetadata(BLOG_DIR);

  return posts
    .map(
      (post) => `<url>
    <loc>${blogRoutes.article.path({
      params: {
        slug: post.slug,
      },
    })}</loc>
    <lastmod>${formatAmericanDate(post.date)}</lastmod>
    <priority>0.5</priority>
    </url>
    `
    )
    .join('');
  return ``;
};

const handler: NextApiHandler = (req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/xml');

  // Instructing the Vercel edge to cache the file
  res.setHeader('Cache-control', 'stale-while-revalidate, s-maxage=3600');

  // generate sitemap here
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"> 
      ${addHomePage()}
      ${addBlogPosts()}
      </urlset>`;

  res.end(xml);
};

export default handler;
