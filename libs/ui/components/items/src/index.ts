import { LocalActivityOutlined, SvgIconComponent } from '@mui/icons-material';
import { ColoredSteamGames } from '@worksheets/icons/companies';
import { Briefcase, Sword } from '@worksheets/icons/dazzle';
import { ValentinesPotion } from '@worksheets/icons/valentines';
import { ItemType } from '@worksheets/prisma';

export const itemTypeLabel: Record<ItemType, string> = {
  CURRENCY: 'Tokens',
  STEAM_KEY: 'Steam Key',
  CONSUMABLE: 'Consumable',
  COMBAT: 'Combat',
  ETCETERA: 'Et Cetera',
};
export const itemTypeActionLabel: Record<ItemType, string> = {
  CURRENCY: 'In Game Currency',
  STEAM_KEY: 'Steam Key',
  CONSUMABLE: 'Consumable Item',
  COMBAT: 'Combat Item',
  ETCETERA: 'Miscellaneous',
};

export const itemTypeLogo: Record<ItemType, SvgIconComponent> = {
  CURRENCY: LocalActivityOutlined,
  STEAM_KEY: ColoredSteamGames,
  CONSUMABLE: ValentinesPotion,
  COMBAT: Sword,
  ETCETERA: Briefcase,
};
