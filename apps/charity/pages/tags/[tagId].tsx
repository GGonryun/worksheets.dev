import {
  categorySquareAds,
  games,
  tagSchemas,
} from '@worksheets/data-access/charity-games';
import { CategoryScreen } from '@worksheets/ui/pages/category';
import { GameTag, TagSchema } from '@worksheets/util/types';
import { NextPageWithLayout } from '@worksheets/util-next';
import { GetServerSideProps } from 'next';
import { NextSeo, NextSeoProps } from 'next-seo';

import { LayoutContainer } from '../../containers/layout-container';
import { AdsensePushScript } from '../../scripts';
import { categorySeo } from '../../util/seo';

type Props = {
  tag: TagSchema;
  seo: NextSeoProps;
  games: {
    type: 'game';
    name: string;
    id: string;
    imageUrl: string;
    span: number;
  }[];
  categories: {
    type: 'category';
    name: string;
    id: string;
    imageUrl: string;
  }[];
};

const Page: NextPageWithLayout<Props> = ({ tag, seo, games, categories }) => {
  return (
    <>
      <NextSeo {...seo} />
      <CategoryScreen
        text={tag.name}
        description={tag.description}
        games={games}
        categories={categories}
        advertisements={categorySquareAds}
      />
      <AdsensePushScript />
    </>
  );
};

export const getServerSideProps = (async ({ params }) => {
  const tagId = params?.tagId as GameTag;
  const tag = tagSchemas.find((tag) => tag.id === tagId);

  if (!tag) throw new Error('Tag does not exist');

  const tagGames = games
    .filter((game) => game.tags.includes(tagId))
    .map((game) => ({
      type: 'game' as const,
      name: game.name,
      id: game.id,
      imageUrl: game.iconUrl,
      span: game.size,
    }));

  const relatedCategories = tag.relatedTags
    .map((tagId) => tagSchemas.find((tag) => tag.id === tagId))
    .filter(Boolean) as TagSchema[];

  const categories = relatedCategories.map((category) => ({
    type: 'category' as const,
    name: category.name,
    id: category.id,
    imageUrl: category.iconUrl,
  }));

  const seo = categorySeo(tag);

  return { props: { tag, games: tagGames, categories, seo } };
}) satisfies GetServerSideProps<Props>;

Page.getLayout = (page) => {
  return <LayoutContainer>{page}</LayoutContainer>;
};

export default Page;
