import { prisma } from '@worksheets/prisma';
import { routes } from '@worksheets/routes';
import { printShortDate } from '@worksheets/util/time';
import { NextApiHandler } from 'next';

import {
  aboutSeo,
  bossBattlesSeo,
  categoriesSeo,
  contactSeo,
  cookiesSeo,
  helpAccountsSeo,
  helpCenterSeo,
  helpContributionsSeo,
  helpDevelopersSeo,
  helpEmailsSeo,
  helpFaqSeo,
  helpFriendsSeo,
  helpNotificationsSeo,
  helpPlayingGamesSeo,
  helpPrizesSeo,
  helpQuestsSeo,
  helpReferralsSeo,
  helpTokensSeo,
  helpVIPSeo,
  itemsSeo,
  librarySeo,
  loginSeo,
  monstersSeo,
  playSeo,
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
    monstersSeo.canonical,
    itemsSeo.canonical,
    playSeo.canonical,
    librarySeo.canonical,
    categoriesSeo.canonical,
    rafflesSeo.canonical,
    vipSeo.canonical,
    bossBattlesSeo.canonical,
    prizesSeo.canonical,
    helpCenterSeo.canonical,
    helpAccountsSeo.canonical,
    helpFaqSeo.canonical,
    helpPlayingGamesSeo.canonical,
    helpTokensSeo.canonical,
    helpReferralsSeo.canonical,
    helpPrizesSeo.canonical,
    helpFriendsSeo.canonical,
    helpVIPSeo.canonical,
    helpNotificationsSeo.canonical,
    helpContributionsSeo.canonical,
    helpDevelopersSeo.canonical,
    helpQuestsSeo.canonical,
    helpEmailsSeo.canonical,
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
          // use w3c date format yyyy-mm-dd
          printShortDate(tag.updatedAt, 'fr-CA')
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

const handler: NextApiHandler = async (req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/xml');

  // Instructing the Vercel edge to cache the file for 7 days in seconds
  res.setHeader('Cache-control', 'stale-while-revalidate, s-maxage=604800');

  const [games, tags, developers] = await Promise.all([
    getGames(),
    getTags(),
    getDevelopers(),
  ]);

  // generate sitemap here
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"> 
      ${addHomePage()}
      ${addBasicPages()}
      ${games}
      ${tags}
      ${developers}
      </urlset>`;

  res.end(xml);
};

export default handler;
