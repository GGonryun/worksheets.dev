import { createStaticTRPC } from '@worksheets/trpc-charity/server';
import { LayoutContainer } from '@worksheets/ui/layout';
import { CategoryScreen } from '@worksheets/ui/pages/category';
import {
  BasicCategoryInfo,
  BasicGameInfo,
  GameTag,
  TagSchema,
} from '@worksheets/util/types';
import { NextPageWithLayout } from '@worksheets/util-next';
import { GetStaticPaths, GetStaticProps } from 'next';
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
  const { params } = ctx;
  const tagId = params?.tagId as GameTag;

  if (!tagId)
    return {
      notFound: true,
    };

  const trpc = await createStaticTRPC(ctx);
  const { tag, games, related } = await trpc.categories.find.fetch({ tagId });

  const seo = categorySeo(tag);

  return { props: { tag, games, related, seo } };
}) satisfies GetStaticProps<Props>;

export const getStaticPaths = (async (ctx) => {
  const trpc = await createStaticTRPC(ctx);

  const tags = await trpc.categories.list.fetch({ showEmpty: true });

  return {
    paths: tags.map((tag) => ({
      params: {
        tagId: tag.id,
      },
    })),
    fallback: false,
  };
}) satisfies GetStaticPaths<{ tagId: string }>;

Page.getLayout = (page) => {
  return <LayoutContainer>{page}</LayoutContainer>;
};

export default Page;
