import {
  MixedGridItem,
  campaigns,
  games,
  sidecadePartnership,
  tagSchemas,
} from '@worksheets/ui-charity';

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

export const mixedItems = () => {
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

  const games = gameItems();
  const tags = tagItems();

  const mixedItems: MixedGridItem[] = [];

  while (games.length || tags.length) {
    // as long as the games aren't empty, push 5 games.
    if (games.length) {
      mixedItems.push(...games.splice(0, 5));
    }
    // as long as the tags aren't empty, push one tag.
    if (tags.length) {
      const tag = tags.shift();
      if (tag) {
        mixedItems.push(tag);
      }
    }
  }

  return [campaignItem, ...mixedItems, partnershipItem];
};
