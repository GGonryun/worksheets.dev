import { createStaticTRPC } from '@worksheets/trpc-charity/server';
import { AppLayoutContainer } from '@worksheets/ui/layout';
import { DynamicArcadeScreen } from '@worksheets/ui/pages/arcade';
import { shuffle } from '@worksheets/util/arrays';
import { isExpired } from '@worksheets/util/time';
import { BasicCategoryInfo, DetailedGameInfo } from '@worksheets/util/types';
import { NextPageWithLayout } from '@worksheets/util-next';
import { uniqBy } from 'lodash';
import { GetStaticProps } from 'next';
import { NextSeo, NextSeoProps } from 'next-seo';

import { playSeo } from '../../util/seo';

type Props = {
  seo: NextSeoProps;
  games: DetailedGameInfo[];
  categories: BasicCategoryInfo[];
};

const publishedOnly = (g: DetailedGameInfo) =>
  g.visibility === 'PUBLIC' || g.publishAt === null || isExpired(g.publishAt);

const MAX_CAROUSEL_LENGTH = 20;
const MAX_FEATURED_GAMES = 8;
const Page: NextPageWithLayout<Props> = ({ seo, games, categories }) => {
  const publishedGames = [...games].filter(publishedOnly);
  const topGames = [...publishedGames]
    .sort((a, b) => b.plays - a.plays)
    .slice(0, MAX_CAROUSEL_LENGTH);
  const newGames = [...publishedGames]
    .sort((a, b) => b.createdAt - a.createdAt)
    .slice(0, MAX_CAROUSEL_LENGTH);

  const featured = shuffle(uniqBy([...topGames, ...newGames], 'id')).slice(
    0,
    MAX_FEATURED_GAMES
  );

  const primary = featured.slice(0, -1);

  const secondary = featured[featured.length - 1];
  return (
    <>
      <NextSeo {...seo} />
      <DynamicArcadeScreen
        allGames={publishedGames}
        topGames={topGames}
        newGames={newGames}
        featured={{
          primary,
          secondary,
        }}
        categories={categories}
      />
    </>
  );
};

export const getStaticProps = (async (ctx) => {
  const trpc = await createStaticTRPC(ctx);

  try {
    const rawGames = await trpc.public.games.list.fetch({});
    const games = rawGames.map((g) => ({
      ...g,
      createdAt: new Date(g.createdAt).getTime(),
      updatedAt: new Date(g.updatedAt).getTime(),
      publishAt: g.publishAt ? new Date(g.publishAt).getTime() : null,
    }));
    const categories = await trpc.public.categories.list.fetch({
      showEmpty: false,
    });

    return {
      props: {
        games,
        seo: playSeo,
        categories,
      },
    };
  } catch (error) {
    console.error('Failed to fetch arcade data', error);
    return {
      notFound: true,
    };
  }
}) satisfies GetStaticProps<Props>;

Page.getLayout = (page) => {
  return <AppLayoutContainer>{page}</AppLayoutContainer>;
};

export default Page;
