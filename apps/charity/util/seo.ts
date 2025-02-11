import {
  BattleSchema,
  ItemSchema,
  MonsterSchema,
  RaffleSchema,
} from '@worksheets/util/types';
import { NextSeoProps } from 'next-seo';

export const rafflesSeo = createSeo({
  path: routes.raffles.path(),
  title: 'Raffles',
  description:
    'Redeem your tokens for raffle entries and win real world prizes. Every token you spend is a donation towards charity. Win free prizes by playing browser games and referring friends',
});

export const raffleSeo = (raffle: RaffleSchema): NextSeoProps =>
  createSeo({
    noindex: true,
    path: routes.raffle.path({ params: { raffleId: raffle.id } }),
    title: `${raffle.name} | Raffle`,
    description:
      'Redeem your tokens for raffle entries and win real world prizes. Every token you spend is a donation towards charity. Win free prizes by playing browser games and referring friends',
    images: [
      {
        url: raffle.imageUrl,
        alt: raffle.name,
      },
    ],
  });

export const expiredRafflesSeo = createSeo({
  path: routes.raffles.expired.path(),
  title: 'Expired Raffles',
  description:
    'View all expired raffles on Charity Games. See what prizes were given away. Every token you spend is a donation towards a better world.',
});

export const vipSeo = createSeo({
  path: routes.vip.path(),
  title: 'VIP Membership',
  description:
    'Join the VIP membership program and receive exclusive benefits. Every token you spend is a donation towards charity. Win free prizes by playing browser games and referring friends',
});

export const unsubscribeSeo = createSeo({
  path: routes.newsletter.unsubscribe.path(),
  title: 'Unsubscribe',
  description:
    'Unsubscribe from the Charity Games newsletter. We are sorry to see you go. We hope you will return soon!',
});

export const subscribeSeo = createSeo({
  path: routes.newsletter.subscribe.path(),
  title: 'Subscribe',
  description:
    'Subscribe to the Charity Games newsletter. Stay up to date with the latest news, updates, and promotions.',
});

export const confirmSubscriptionSeo = createSeo({
  path: routes.newsletter.confirm.path(),
  title: 'Confirm Subscription',
  description:
    'Confirm your subscription to the Charity Games newsletter. Stay up to date with the latest news, updates, and promotions.',
});

export const auctionsSeo = createSeo({
  path: routes.auctions.path(),
  title: 'Auctions',
  description:
    'Bid on digital prizes and win free games. Win tokens by playing browser games and completing tasks.',
});

export const monstersSeo = createSeo({
  path: routes.monsters.path(),
  title: 'Monsters',
  description:
    'Defeat monsters and earn rewards. Win tokens by playing browser games.',
});

export const monsterSeo = (monster: MonsterSchema): NextSeoProps =>
  createSeo({
    path: routes.monster.path({ params: { monsterId: monster.id } }),
    title: `${monster.name} | Monster`,
    description: `Defeat ${monster.name} and earn rewards. Win prizes by playing browser games.`,
  });

export const itemsSeo = createSeo({
  path: routes.items.path(),
  title: 'Items',
  description:
    'View all items available on Charity Games. Win tokens by playing browser games.',
});

export const itemSeo = (item: ItemSchema): NextSeoProps =>
  createSeo({
    path: routes.item.path({ params: { itemId: item.id } }),
    title: `${item.name} | Item`,
    description: `View ${item.name} and learn how to use it. Win prizes by playing browser games.`,
  });

export const userSeo = (userId: string): NextSeoProps => {
  return createSeo({
    path: routes.user.path({ params: { userId } }),
    title: `User Profile`,
    description: `View information about a user on Charity Games. Turn your games into donations. Help us make a difference.`,
  });
};

export const connectSeo = (providerId: string): NextSeoProps => {
  return createSeo({
    path: routes.connect.path({ params: { providerId } }),
    title: `Connect Account`,
    description: `Connect an external account to Charity Games. Turn your games into donations. Help us make a difference.`,
  });
};
