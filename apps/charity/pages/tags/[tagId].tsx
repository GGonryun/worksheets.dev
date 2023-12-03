import { CategoryScreen } from '@worksheets/ui-charity';
import { NextPageWithLayout } from '@worksheets/util-next';
import { LayoutContainer } from '../../containers/layout-container';
import { useRouter } from 'next/router';
import { GameTag, TagSchema } from '@worksheets/util/types';
import { games, tagSchemas } from '@worksheets/data-access/charity-games';

const Page: NextPageWithLayout = () => {
  const { query } = useRouter();
  const tagId = query.tagId as GameTag;
  const tag = tagSchemas.find((tag) => tag.id === tagId);
  if (!tag) return <></>;

  const tagGames = games.filter((game) => game.tags.includes(tagId));
  const relatedCategories = tag.relatedTags
    .map((tagId) => tagSchemas.find((tag) => tag.id === tagId))
    .filter(Boolean) as TagSchema[];

  return (
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
    />
  );
};

Page.getLayout = (page) => {
  return <LayoutContainer>{page}</LayoutContainer>;
};

export default Page;
