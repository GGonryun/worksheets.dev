import {
  CategoryDoesNotExistScreen,
  CategoryScreen,
} from '@worksheets/ui/pages/category';
import { NextPageWithLayout } from '@worksheets/util-next';
import { LayoutContainer } from '../../containers/layout-container';
import { useRouter } from 'next/router';
import { GameTag, TagSchema } from '@worksheets/util/types';
import {
  categorySquareAds,
  games,
  tagSchemas,
} from '@worksheets/data-access/charity-games';
import { useGoogleAdsense } from '@worksheets/ui/advertisements';
import { NextSeo } from 'next-seo';

const Page: NextPageWithLayout = () => {
  useGoogleAdsense();

  const { query } = useRouter();
  const tagId = query.tagId as GameTag;
  const tag = tagSchemas.find((tag) => tag.id === tagId);
  if (!tag) return <CategoryDoesNotExistScreen tag={tagId} />;

  const tagGames = games.filter((game) => game.tags.includes(tagId));
  const relatedCategories = tag.relatedTags
    .map((tagId) => tagSchemas.find((tag) => tag.id === tagId))
    .filter(Boolean) as TagSchema[];

  const openGraph = {
    url: `https://www.charity.games/tags/${tagId}`,
    title: `${tag.name} - Play Free Browser Games for Charity`,
    description: `Play ${tag.name} online for free on Charity Games. The easiest way to make a difference. Donate to charity by playing ${tag.name}.`,
  };

  return (
    <>
      <NextSeo
        title={openGraph.title}
        description={openGraph.description}
        canonical={openGraph.url}
        openGraph={openGraph}
      />
      <CategoryScreen
        text={tag.name}
        description={tag.description}
        games={tagGames.map((game) => ({
          type: 'game',
          name: game.name,
          id: game.id,
          imageUrl: game.iconUrl,
          span: game.size,
        }))}
        categories={relatedCategories.map((category) => ({
          type: 'category',
          name: category.name,
          id: category.id,
          imageUrl: category.iconUrl,
        }))}
        advertisements={categorySquareAds}
      />
    </>
  );
};

Page.getLayout = (page) => {
  return <LayoutContainer>{page}</LayoutContainer>;
};

export default Page;
