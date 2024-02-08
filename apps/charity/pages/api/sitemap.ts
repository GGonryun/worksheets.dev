import { prisma } from '@worksheets/prisma';
import { CHARITY_GAMES_BASE_URL } from '@worksheets/ui/env';
import { printShortDate } from '@worksheets/util/time';
import { NextApiHandler } from 'next';

const LAST_UPDATE_DATE = `2024-02-07`;

const addHomePage = () => {
  return `<url><loc>${CHARITY_GAMES_BASE_URL}</loc><lastmod>${LAST_UPDATE_DATE}</lastmod><changefreq>weekly</changefreq><priority>1.0</priority></url>`;
};

const addBasicPages = () => {
  const slugs = [
    '/about',
    '/contact',
    '/cookies',
    '/help',
    '/help/account',
    '/help/faq',
    '/help/playing-games',
    '/help/tokens-rewards',
    '/help/referrals',
    '/help/friends',
    '/help/vip',
    '/help/auctions',
    '/help/prize-wall',
    '/help/contributions',
    '/help/developers',
    '/login',
    '/privacy',
    '/terms',
    '/play',
    '/tags',
    '/prizes',
    '/raffles',
  ];

  return slugs
    .map(
      (slug) =>
        `<url><loc>${CHARITY_GAMES_BASE_URL}${slug}</loc><lastmod>${LAST_UPDATE_DATE}</lastmod><priority>0.8</priority></url>`
    )
    .join('');
};

const getGames = async () => {
  const games = await prisma.game.findMany({
    select: {
      id: true,
      updatedAt: true,
    },
  });

  return games
    .map(
      (game) =>
        `<url><loc>${CHARITY_GAMES_BASE_URL}/play/${game.id}</loc><lastmod>${
          // use w3c date format yyyy-mm-dd
          printShortDate(game.updatedAt, 'fr-CA')
        }</lastmod><priority>0.5</priority></url>`
    )
    .join('');
};

const getTags = async () => {
  const tags = await prisma.gameCategory.findMany({
    select: {
      id: true,
      updatedAt: true,
    },
  });

  return tags
    .map(
      (tag) =>
        `<url><loc>${CHARITY_GAMES_BASE_URL}/tags/${tag.id}</loc><lastmod>${tag.updatedAt}</lastmod><priority>0.5</priority></url>`
    )
    .join('');
};

const getDevelopers = async () => {
  const developers = await prisma.developer.findMany({
    select: {
      id: true,
    },
  });

  return developers
    .map(
      (developer) =>
        `<url><loc>${CHARITY_GAMES_BASE_URL}/developers/${developer.id}</loc><lastmod>${LAST_UPDATE_DATE}</lastmod><priority>0.3</priority></url>`
    )
    .join('');
};

const getRaffles = async () => {
  const raffles = await prisma.raffle.findMany({
    select: {
      id: true,
      updatedAt: true,
    },
  });

  return raffles
    .map(
      (raffle) =>
        `<url><loc>${CHARITY_GAMES_BASE_URL}/raffles/${
          raffle.id
        }</loc><lastmod>${printShortDate(
          raffle.updatedAt,
          'fr-CA'
        )}</lastmod><priority>0.3</priority></url>`
    )
    .join('');
};

const getPrizes = async () => {
  const prizes = await prisma.prize.findMany({
    select: {
      id: true,
      updatedAt: true,
    },
  });

  return prizes
    .map(
      (prize) =>
        `<url><loc>${CHARITY_GAMES_BASE_URL}/prizes/${
          prize.id
        }</loc><lastmod>${printShortDate(
          prize.updatedAt,
          'fr-CA'
        )}</lastmod><priority>0.6</priority></url>`
    )
    .join('');
};

const handler: NextApiHandler = async (req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/xml');

  // Instructing the Vercel edge to cache the file
  res.setHeader('Cache-control', 'stale-while-revalidate, s-maxage=3600');

  const [games, tags, developers, raffles, prizes] = await Promise.all([
    getGames(),
    getTags(),
    getDevelopers(),
    getRaffles(),
    getPrizes(),
  ]);

  // generate sitemap here
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"> 
      ${addHomePage()}
      ${addBasicPages()}
      ${games}
      ${prizes}
      ${raffles}
      ${tags}
      ${developers}
      </urlset>`;

  res.end(xml);
};

export default handler;
