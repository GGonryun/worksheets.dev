import { NextApiHandler } from 'next';
import { BASE_URL } from '@worksheets/util/env';
import { formatAmericanDate, printShortDate } from '@worksheets/util/time';
import {
  developers,
  games,
  tagSchemas,
} from '@worksheets/data-access/charity-games';
import path from 'path';
import getConfig from 'next/config';
import fs from 'fs';
import { getAllPostsMetadata } from '@worksheets/util-markdown';

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

const addGames = () =>
  games
    .map(
      (game) => `<url>
        <loc>${BASE_URL}/play/${game.id}</loc>
        <lastmod>${
          printShortDate(game.updatedAt, 'fr-CA') // use w3c date format yyyy-mm-dd
        }</lastmod>
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

const addBlogPosts = () => {
  const serverRuntimeConfig = getConfig().serverRuntimeConfig;

  const BLOG_DIR = path.join(
    serverRuntimeConfig.PROJECT_ROOT,
    './public/articles'
  );

  console.log('BLOG_DIR', BLOG_DIR);

  const filenames = fs.readdirSync(serverRuntimeConfig.PROJECT_ROOT);

  console.log('filenames', filenames);

  const posts = getAllPostsMetadata(BLOG_DIR);

  return posts
    .map(
      (post) => `<url>
    <loc>${BASE_URL}/blog/${post.slug}</loc>
    <lastmod>${formatAmericanDate(post.date)}</lastmod>
    <priority>0.9</priority>
    </url>
    `
    )
    .join('');
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
      ${addBasicPages()}
      ${addGames()}
      ${addTags()}
      ${addDevelopers()}
      ${addBlogPosts()}
      </urlset>`;

  res.end(xml);
};

export default handler;
