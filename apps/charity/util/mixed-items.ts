import {
  MixedGridItem,
  campaigns,
  games,
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

  return [campaignItem, ...gameItems(), ...tagItems()];
};
