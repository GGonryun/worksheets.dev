import { QuestionMark, SvgIconComponent } from '@mui/icons-material';
import { ColoredSteamGames } from '@worksheets/icons/companies';
import { PrizeType } from '@worksheets/util/types';

export const prizeTypeLabel: Record<PrizeType, string> = {
  'steam-key': 'Steam Key',
  'epic-games-key': 'Epic Games Key',
};
export const prizeTypeActionLabel: Record<PrizeType, string> = {
  'steam-key': 'Get It On Steam',
  'epic-games-key': 'Get It On Epic Games',
};

export const prizeTypeLogos: Record<PrizeType, SvgIconComponent> = {
  'steam-key': ColoredSteamGames,
  'epic-games-key': QuestionMark,
};
