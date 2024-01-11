import { NextApiHandler } from 'next';
import { EMOJI_WAR_URL } from '@worksheets/ui/env';

const LAST_UPDATE_DATE = `2023-12-10`;

const addHomePage = () =>
  `<url><loc>${EMOJI_WAR_URL}</loc><lastmod>${LAST_UPDATE_DATE}</lastmod><priority>1.0</priority></url>`;

const handler: NextApiHandler = (req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/xml');

  // Instructing the Vercel edge to cache the file
  res.setHeader('Cache-control', 'stale-while-revalidate, s-maxage=3600');

  // generate sitemap here
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"> 
      ${addHomePage()}
      </urlset>`;

  res.end(xml);
};

export default handler;
