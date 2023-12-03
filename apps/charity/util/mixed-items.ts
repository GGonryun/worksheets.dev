import {
  advertisementSquares,
  campaigns,
  games,
  sidecadePartnership,
  tagSchemas,
} from '@worksheets/data-access/charity-games';
import { MixedGridItem } from '@worksheets/ui-charity';

export const gameItems = (): MixedGridItem[] => {
  return games.map((game) => ({
    type: 'game',
    id: game.id,
    href: `/games/${game.id}`,
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

  const campaign = campaigns['primary'];
  if (!campaign) throw new Error('Campaign not found');
  const campaignItem: MixedGridItem = {
    type: 'progress',
    current: campaign.pledge.current,
    required: campaign.pledge.required,
  };

  const partnershipItem: MixedGridItem = {
    type: 'image',
    ...sidecadePartnership,
  };

  const games = gameItems().slice(0, maxGames);
  const tags = tagItems().slice(0, maxTags);

  const mixedItems: MixedGridItem[] = [];

  let i = 0;
  while (games.length || tags.length) {
    // as long as the games aren't empty, push 2, 4, or 8 games.
    if (games.length) {
      const slot = i % 3 === 0 ? 2 : i % 3 === 1 ? 4 : 8;
      mixedItems.push(...games.splice(0, slot));
    }
    // as long as the tags aren't empty, push one tag.
    if (tags.length) {
      const tag = tags.shift();
      if (tag) {
        mixedItems.push(tag);
      }
    }
    i++;
  }

  const collection = [campaignItem, ...mixedItems, partnershipItem];

  if (hideAds) return collection;

  return insertAdvertisements(collection);
};

const insertAdvertisements = (items: MixedGridItem[]) => {
  advertisementSquares.forEach((ad) => {
    items.splice(ad.position, 0, {
      type: 'advertisement',
      slot: ad.slot,
      client: ad.client,
      span: ad.size,
    });
  });

  return items;
};
