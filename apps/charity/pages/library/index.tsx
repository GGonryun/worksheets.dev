import { createStaticTRPC } from '@worksheets/trpc-charity/server';
import { AppLayoutContainer } from '@worksheets/ui/layout';
import { DynamicGamesScreen } from '@worksheets/ui/pages/game';
import { BasicCategoryInfo, BasicGameInfo } from '@worksheets/util/types';
import { NextPageWithLayout } from '@worksheets/util-next';
import { GetStaticProps } from 'next';
import { NextSeo, NextSeoProps } from 'next-seo';

import { librarySeo } from '../../util/seo';

type Props = {
  games: BasicGameInfo[];
  categories: BasicCategoryInfo[];
  seo: NextSeoProps;
};

const Page: NextPageWithLayout<Props> = ({ games, categories, seo }) => {
  return (
    <>
      <NextSeo {...seo} />
      <DynamicGamesScreen games={games} categories={categories} />
    </>
  );
};

export const getStaticProps = (async (ctx) => {
  const trpc = await createStaticTRPC(ctx);

  const library = await trpc.public.games.library.fetch();
  const categories = await trpc.public.categories.list.fetch({
    showEmpty: false,
  });

  return {
    props: {
      categories,
      games: library.map((game) => ({
        id: game.id,
        name: game.title,
        imageUrl: game.thumbnail,
        plays: game.plays,
      })),
      seo: librarySeo,
    },
  };
}) satisfies GetStaticProps<Props>;

Page.getLayout = (page) => {
  return <AppLayoutContainer>{page}</AppLayoutContainer>;
};

export default Page;
