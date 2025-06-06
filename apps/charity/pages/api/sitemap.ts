import { prisma } from '@worksheets/prisma';
import { routes } from '@worksheets/routes';
import { printShortDate } from '@worksheets/util/time';
import { NextApiHandler } from 'next';

import {
  aboutSeo,
  categoriesSeo,
  contactSeo,
  cookiesSeo,
  helpAccountsSeo,
  helpCenterSeo,
  helpContributionsSeo,
  helpDevelopersSeo,
  helpEmailsSeo,
  helpFaqSeo,
  helpPlayingGamesSeo,
  helpPrizesSeo,
  helpReferralsSeo,
  librarySeo,
  loginSeo,
  playSeo,
  privacySeo,
  rafflesSeo,
  signUpSeo,
  teamsSeo,
  termsSeo,
} from '../../util/seo';

const LAST_UPDATE_DATE = `2025-02-11`;

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
    teamsSeo.canonical,
    termsSeo.canonical,
    playSeo.canonical,
    librarySeo.canonical,
    categoriesSeo.canonical,
    rafflesSeo.canonical,
    helpCenterSeo.canonical,
    helpAccountsSeo.canonical,
    helpFaqSeo.canonical,
    helpPlayingGamesSeo.canonical,
    helpReferralsSeo.canonical,
    helpPrizesSeo.canonical,
    helpContributionsSeo.canonical,
    helpDevelopersSeo.canonical,
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
    where: {
      visibility: 'PUBLIC',
    },
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

const getTeams = async () => {
  const teams = await prisma.team.findMany({
    select: {
      id: true,
    },
  });

  return teams
    .map(
      (team) =>
        `<url><loc>${routes.team.url({
          params: {
            teamId: team.id,
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

  const [games, tags, teams] = await Promise.all([
    getGames(),
    getTags(),
    getTeams(),
  ]);

  // generate sitemap here
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"> 
      ${addHomePage()}
      ${addBasicPages()}
      ${games}
      ${tags}
      ${teams}
      </urlset>`;

  res.end(xml);
};

export default handler;
