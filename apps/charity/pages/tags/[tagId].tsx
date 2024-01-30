import { games, tagSchemas } from '@worksheets/data-access/charity-games';
import { DynamicLayout } from '@worksheets/ui/layout';
import { CategoryScreen } from '@worksheets/ui/pages/category';
import {
  BasicCategoryInfo,
  BasicGameInfo,
  GameTag,
  TagSchema,
} from '@worksheets/util/types';
import { NextPageWithLayout } from '@worksheets/util-next';
import { GetServerSideProps } from 'next';
import { NextSeo, NextSeoProps } from 'next-seo';

import { categorySeo } from '../../util/seo';

type Props = {
  tag: TagSchema;
  seo: NextSeoProps;
  games: BasicGameInfo[];
  categories: BasicCategoryInfo[];
};

const Page: NextPageWithLayout<Props> = ({ tag, seo, games, categories }) => {
  return (
    <>
      <NextSeo {...seo} />
      <CategoryScreen
        name={tag.name}
        description={tag.description}
        games={games}
        relatedCategories={categories}
      />
    </>
  );
};

export const getServerSideProps = (async ({ params }) => {
  const tagId = params?.tagId as GameTag;
  const tag = tagSchemas.find((tag) => tag.id === tagId);

  if (!tag)
    return {
      notFound: true,
    };

  const tagGames = games
    .filter((game) => game.tags.includes(tagId))
    .map((game) => ({
      name: game.name,
      id: game.id,
      image: game.iconUrl,
    }));

  const relatedCategories = tag.relatedTags
    .map((tagId) => tagSchemas.find((tag) => tag.id === tagId))
    .filter(Boolean) as TagSchema[];

  const categories = relatedCategories.map((category) => ({
    name: category.name,
    id: category.id,
    image: category.iconUrl,
  }));

  const seo = categorySeo(tag);

  return { props: { tag, games: tagGames, categories, seo } };
}) satisfies GetServerSideProps<Props>;

Page.getLayout = (page) => {
  return <DynamicLayout>{page}</DynamicLayout>;
};

export default Page;
