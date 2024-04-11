import { SvgIconComponent } from '@mui/icons-material';
import { ColoredSteamGames } from '@worksheets/icons/companies';
import { ValentinesHearts } from '@worksheets/icons/valentines';
import { PrizeType } from '@worksheets/prisma';

export const prizeTypeLabel: Record<PrizeType, string> = {
  STEAM_KEY: 'Steam Key',
  LOOT: 'Loot & Items',
};
export const prizeTypeActionLabel: Record<PrizeType, string> = {
  STEAM_KEY: 'Get It On Steam',
  LOOT: 'Learn about Loot',
};

export const prizeTypeLogos: Record<PrizeType, SvgIconComponent> = {
  STEAM_KEY: ColoredSteamGames,
  LOOT: ValentinesHearts,
};
