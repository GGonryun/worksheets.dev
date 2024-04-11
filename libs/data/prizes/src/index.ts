import { Prize } from '@prisma/client';
import { routes } from '@worksheets/routes';

export type SeedablePrize = Omit<Prize, 'createdAt' | 'updatedAt'>;
const rawPrizes = [
  {
    version: 1,
    id: '1000-tokens' as const,
    name: 'Pile of 1000 Tokens',
    headline:
      'Get a bag of 1000 tokens to use on the site for prizes and rewards!',
    description:
      "Tokens are the currency of the site, and you can use them to enter raffles, fight bosses, buy tickets, and more. This prize will give you a bag of 1000 tokens to use however you'd like. Tokens are non-refundable and have no cash value. If you win this prize, you'll be able to claim it from your account page. This prize is only available to users who have an account on the site.",
    type: 'LOOT' as const,
    imageUrl: 'https://cdn.charity.games/_prizes/token2.png',
    sourceUrl: routes.help.tokens.url(),
  },
];

export const prizes: SeedablePrize[] = rawPrizes;

export type PrizeId = (typeof rawPrizes)[number]['id'];
