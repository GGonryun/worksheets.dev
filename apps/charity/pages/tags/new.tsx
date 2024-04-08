import { createStaticTRPC } from '@worksheets/trpc-charity/server';
import { AppLayoutContainer } from '@worksheets/ui/layout';
import { CategoryScreen } from '@worksheets/ui/pages/category';
import {
  BasicCategoryInfo,
  BasicGameInfo,
  TagSchema,
} from '@worksheets/util/types';
import { NextPageWithLayout } from '@worksheets/util-next';
import { GetStaticProps } from 'next';
import { NextSeo, NextSeoProps } from 'next-seo';

import { categorySeo } from '../../util/seo';

type Props = {
  seo: NextSeoProps;
  tag: Omit<TagSchema, 'relatedTags'>;
  games: BasicGameInfo[];
  related: BasicCategoryInfo[];
};

const Page: NextPageWithLayout<Props> = ({ tag, seo, games, related }) => {
  return (
    <>
      <NextSeo {...seo} />
      <CategoryScreen
        name={tag.name}
        description={tag.description}
        games={games}
        relatedCategories={related}
      />
    </>
  );
};

export const getStaticProps = (async (ctx) => {
  const trpc = await createStaticTRPC(ctx);
  const games = await trpc.public.games.newest.fetch();
  const { tag, related } = await trpc.public.categories.find.fetch({
    tagId: 'new',
  });

  const seo = categorySeo(tag);

  return { props: { tag, games, related, seo } };
}) satisfies GetStaticProps<Props>;

Page.getLayout = (page) => {
  return <AppLayoutContainer>{page}</AppLayoutContainer>;
};

export default Page;
