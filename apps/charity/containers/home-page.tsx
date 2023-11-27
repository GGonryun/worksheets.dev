import { Container } from '@mui/material';
import {
  MixedGrid,
  MixedGridItem,
  games,
  tagSchemas,
} from '@worksheets/ui-charity';

export const HomePageContainer = () => (
  <Container sx={{ py: 2 }}>
    <MixedGrid items={mixedItems()} />
  </Container>
);

const mixedItems = () => {
  // get all games.
  const gameItems: MixedGridItem[] = games.map((game) => ({
    type: 'game',
    id: game.id,
    href: `/games/${game.id}`,
    imageUrl: game.iconUrl,
    name: game.name,
    banner: game.qualifier,
    span: game.size,
  }));

  // get all categories.
  const categories: MixedGridItem[] = tagSchemas.map((tag) => ({
    type: 'category',
    id: tag.id,
    href: `/tags/${tag.id}`,
    name: tag.name,
    imageUrl: tag.iconUrl,
  }));

  return [...gameItems, ...categories];
};
