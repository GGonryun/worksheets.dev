import { Prize } from '@prisma/client';

export type SeedablePrize = Omit<Prize, 'createdAt' | 'updatedAt'>;
const rawPrizes = [
  {
    version: 2,
    id: 'bg3' as const,
    name: "Baldur's Gate 3 Steam Key",
    headline:
      'A role-playing video game that is being developed and published by Larian Studios.',
    description:
      "<p><b>Baldur's Gate 3</b> is a role-playing video game that is being developed and published by Larian Studios. It is the third main game in the Baldur's Gate series, itself based on the Dungeons & Dragons tabletop role-playing system. The game is based on the fifth edition of Dungeons & Dragons rules and features turn-based combat and cooperative multiplayer. It is the first game in the series since Baldur's Gate II: Shadows of Amn in 2000, and the first to be developed by Larian Studios.</p><br/><p>The game was announced with a teaser trailer in June 2019, and was released in early access for Microsoft Windows and Stadia on 6 October 2020. The game is set in the Forgotten Realms, a high fantasy campaign setting, and is based on the fifth edition of the Dungeons & Dragons role-playing system. The game is set in the world of the Forgotten Realms, a campaign setting for Dungeons & Dragons, and is based on the fifth edition of the Dungeons & Dragons rules.</p>",
    type: 'STEAM_KEY' as const,
    imageUrl: '/prizes/steam-games/bg3.jpeg',
    sourceUrl: 'https://store.steampowered.com/app/1086940/Baldurs_Gate_3/',
  },
];

export const prizes: SeedablePrize[] = rawPrizes;

export type PrizeId = (typeof rawPrizes)[number]['id'];
