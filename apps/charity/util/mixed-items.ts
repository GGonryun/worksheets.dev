import {
  homeSquareAds,
  games,
  sidecadePartnership,
  tagSchemas,
} from '@worksheets/data-access/charity-games';
import { MixedGridItem } from '@worksheets/ui/game-grid';

export const gameItems = (): MixedGridItem[] => {
  return games.map((game) => ({
    type: 'game',
    id: game.id,
    href: `/play/${game.id}`,
    imageUrl: game.iconUrl,
    name: game.name,
    banner: game.qualifier,
    span: game.size,
  }));
};

export const tagItems = (): MixedGridItem[] => {
  return tagSchemas.map((tag) => ({
    type: 'category',
    id: tag.id,
    href: `/tags/${tag.id}`,
    name: tag.name,
    imageUrl: tag.iconUrl,
  }));
};

export type MixedItemOptions = {
  maxGames?: number;
  maxTags?: number;
  hideAds?: boolean;
};

export const mixedItems = (options?: MixedItemOptions) => {
  const maxGames = options?.maxGames ?? 200;
  const maxTags = options?.maxTags ?? 50;
  const hideAds = options?.hideAds ?? false;

  const partnershipItem: MixedGridItem = {
    type: 'image',
    ...sidecadePartnership,
  };

  const games = gameItems().slice(0, maxGames);
  const tags = tagItems().slice(0, maxTags);

  const collection = [...games, ...tags, partnershipItem];

  if (hideAds) return collection;

  return insertAdvertisements(collection);
};

const insertAdvertisements = (items: MixedGridItem[]) => {
  homeSquareAds.forEach((ad) => {
    items.splice(ad.position, 0, {
      type: 'advertisement',
      slot: ad.slot,
      client: ad.client,
    });
  });

  return items;
};
