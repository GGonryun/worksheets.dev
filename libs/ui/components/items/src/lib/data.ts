import {
  CardGiftcard,
  LocalActivityOutlined,
  Shuffle,
  SvgIconComponent,
} from '@mui/icons-material';
import { ColoredSteamGames } from '@worksheets/icons/companies';
import { Briefcase, Sword } from '@worksheets/icons/dazzle';
import { ValentinesPotion } from '@worksheets/icons/valentines';
import { ItemRarity, ItemType } from '@worksheets/prisma';

export const itemRarityLabel: Record<ItemRarity, string> = {
  COMMON: 'Common',
  UNCOMMON: 'Uncommon',
  RARE: 'Rare',
  LEGENDARY: 'Legendary',
  MYTHIC: 'Mythic',
  PREMIUM: 'Premium',
};
export const itemTypeLabel: Record<ItemType, string> = {
  SHARABLE: 'Sharable',
  CURRENCY: 'Currency',
  STEAM_KEY: 'Steam Key',
  CONSUMABLE: 'Consumable',
  COMBAT: 'Combat',
  ETCETERA: 'Miscellaneous',
  CAPSULE: 'Prize Capsule',
};
export const itemTypeActionLabel: Record<ItemType, string> = {
  SHARABLE: 'Sharable',
  CURRENCY: 'In Game Currency',
  STEAM_KEY: 'Steam Key',
  CONSUMABLE: 'Consumable Item',
  COMBAT: 'Combat Item',
  ETCETERA: 'Miscellaneous',
  CAPSULE: 'Prize Capsule',
};

export const itemTypeLogo: Record<ItemType, SvgIconComponent> = {
  SHARABLE: CardGiftcard,
  CURRENCY: LocalActivityOutlined,
  STEAM_KEY: ColoredSteamGames,
  CONSUMABLE: ValentinesPotion,
  COMBAT: Sword,
  ETCETERA: Briefcase,
  CAPSULE: Shuffle,
};
