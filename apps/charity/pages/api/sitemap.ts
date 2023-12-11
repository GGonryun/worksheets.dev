import { NextApiHandler } from 'next';
import { BASE_URL } from '@worksheets/util/env';
import { getAllPostsMetadata } from '@worksheets/util-markdown';
import { POSTS_PATH } from '../../util/paths';
import { printShortDate } from '@worksheets/util/time';
import {
  developers,
  games,
  tagSchemas,
} from '@worksheets/data-access/charity-games';
import path from 'path';

const BLOG_DIR = path.resolve('./_articles');

const LAST_UPDATE_DATE = `2023-12-10`;

const addHomePage = () => {
  return `<url>
        <loc>${BASE_URL}</loc>
        <lastmod>${LAST_UPDATE_DATE}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>1.0</priority>
    </url>`;
};

const addBasicPages = () => {
  const slugs = [
    '/about',
    '/charity',
    '/contact',
    '/cookies',
    '/donations',
    '/faq',
    '/help',
    '/login',
    '/privacy',
    '/terms',
    '/blog',
    '/developers',
    '/play',
    '/tags',
  ];

  return slugs
    .map(
      (slug) => `<url>
      <loc>${BASE_URL}${slug}</loc>
      <lastmod>${LAST_UPDATE_DATE}</lastmod>
      <priority>0.8</priority>
    </url>`
    )
    .join('');
};

const addBlogPosts = () => {
  const blogPostPath =
    process.env['VERCEL_ENV'] === 'development' ? POSTS_PATH : BLOG_DIR;

  const posts = getAllPostsMetadata(blogPostPath);
  return posts
    .map(
      (post) => `<url>
    <loc>${BASE_URL}/blog/${post.slug}</loc>
    <lastmod>${post.date}</lastmod>
    <priority>0.5</priority>
    </url>
    `
    )
    .join('');
};

const addGames = () =>
  games
    .map(
      (game) => `<url>
        <loc>${BASE_URL}/play/${game.id}</loc>
        <lastmod>${printShortDate(game.updatedAt)
          .split('/')
          .join('-')}</lastmod>
          <priority>0.5</priority>
        </url>
        `
    )
    .join('');

const addTags = () =>
  tagSchemas
    .map(
      (tag) => `<url>
            <loc>${BASE_URL}/tags/${tag.id}</loc>
            <lastmod>${LAST_UPDATE_DATE}</lastmod>
            <priority>0.5</priority>
        </url>`
    )
    .join('');

const addDevelopers = () =>
  developers
    .map(
      (developer) => `<url>
<loc>${BASE_URL}/developers/${developer.id}</loc>
<lastmod>${LAST_UPDATE_DATE}</lastmod>
<priority>0.3</priority>
</url>`
    )
    .join('');

const handler: NextApiHandler = (req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/xml');

  // Instructing the Vercel edge to cache the file
  res.setHeader('Cache-control', 'stale-while-revalidate, s-maxage=3600');

  // generate sitemap here

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"> 
      ${addHomePage()}
      ${addBasicPages()}
      ${addBlogPosts()}
      ${addGames()}
      ${addTags()}
      ${addDevelopers()}
      </urlset>`;

  res.end(xml);
};

export default handler;
