import { prisma } from '@worksheets/prisma';
import { routes } from '@worksheets/ui/routes';
import { printShortDate } from '@worksheets/util/time';
import { NextApiHandler } from 'next';

import {
  aboutSeo,
  categoriesSeo,
  contactSeo,
  cookiesSeo,
  gamesSeo,
  helpAccountsSeo,
  helpCenterSeo,
  helpContributionsSeo,
  helpDevelopersSeo,
  helpFaqSeo,
  helpFriendsSeo,
  helpNotificationsSeo,
  helpPlayingGamesSeo,
  helpPrizesSeo,
  helpReferralsSeo,
  helpTokensSeo,
  helpVIPSeo,
  loginSeo,
  privacySeo,
  prizesSeo,
  rafflesSeo,
  signUpSeo,
  termsSeo,
  vipSeo,
} from '../../util/seo';

const LAST_UPDATE_DATE = `2024-02-14`;

const addHomePage = () => {
  return `<url><loc>${routes.baseUrl}</loc><lastmod>${LAST_UPDATE_DATE}</lastmod><changefreq>weekly</changefreq><priority>1.0</priority></url>`;
};

const addBasicPages = () => {
  const slugs = [
    aboutSeo.canonical,
    contactSeo.canonical,
    cookiesSeo.canonical,
    loginSeo.canonical,
    signUpSeo.canonical,
    privacySeo.canonical,
    termsSeo.canonical,
    gamesSeo.canonical,
    categoriesSeo.canonical,
    prizesSeo.canonical,
    rafflesSeo.canonical,
    vipSeo.canonical,
    helpCenterSeo.canonical,
    helpAccountsSeo.canonical,
    helpFaqSeo.canonical,
    helpPlayingGamesSeo.canonical,
    helpTokensSeo.canonical,
    helpReferralsSeo.canonical,
    helpFriendsSeo.canonical,
    helpVIPSeo.canonical,
    helpNotificationsSeo.canonical,
    helpPrizesSeo.canonical,
    helpContributionsSeo.canonical,
    helpDevelopersSeo.canonical,
  ];

  return slugs
    .map(
      (slug) =>
        `<url><loc>${slug}</loc><lastmod>${LAST_UPDATE_DATE}</lastmod><priority>0.8</priority></url>`
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
        `<url><loc>${routes.game.url({
          params: {
            gameId: game.id,
          },
        })}</loc><lastmod>${
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
        `<url><loc>${routes.category.url({
          params: {
            tagId: tag.id,
          },
        })}</loc><lastmod>${
          tag.updatedAt
        }</lastmod><priority>0.5</priority></url>`
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
        `<url><loc>${routes.developer.url({
          params: {
            developerId: developer.id,
          },
        })}</loc><lastmod>${LAST_UPDATE_DATE}</lastmod><priority>0.3</priority></url>`
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
        `<url><loc>${routes.raffle.url({
          params: {
            raffleId: raffle.id,
          },
        })}</loc><lastmod>${printShortDate(
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
        `<url><loc>${routes.prize.url({
          params: {
            prizeId: prize.id,
          },
        })}</loc><lastmod>${printShortDate(
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
