import { CardGiftcard, SvgIconComponent } from '@mui/icons-material';
import { PrizeType } from '@prisma/client';
import { ColoredSteamGames } from '@worksheets/icons/companies';

export const prizeTypeLabel: Record<PrizeType, string> = {
  STEAM_KEY: 'Steam Key',
  GIFT_CARD: 'Gift Card',
};
export const prizeTypeActionLabel: Record<PrizeType, string> = {
  STEAM_KEY: 'Get It On Steam',
  GIFT_CARD: 'Redeem Gift Card',
};

export const prizeTypeLogos: Record<PrizeType, SvgIconComponent> = {
  STEAM_KEY: ColoredSteamGames,
  GIFT_CARD: CardGiftcard,
};
