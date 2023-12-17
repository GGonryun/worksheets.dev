import {
  CategoryDoesNotExistScreen,
  CategoryScreen,
} from '@worksheets/ui/pages/category';
import { NextPageWithLayout } from '@worksheets/util-next';
import { useRouter } from 'next/router';
import { GameTag, TagSchema } from '@worksheets/util/types';
import {
  categorySquareAds,
  games,
  tagSchemas,
} from '@worksheets/data-access/charity-games';

export const TagPage: NextPageWithLayout = () => {
  const { query } = useRouter();
  const tagId = query.tagId as GameTag;
  const tag = tagSchemas.find((tag) => tag.id === tagId);
  if (!tag) return <CategoryDoesNotExistScreen tag={tagId} />;

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
      advertisements={categorySquareAds}
    />
  );
};
