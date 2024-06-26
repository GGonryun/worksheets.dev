import {
  CardGiftcard,
  LocalActivityOutlined,
  Shuffle,
  StarBorder,
  SvgIconComponent,
} from '@mui/icons-material';
import { ColoredSteamGames } from '@worksheets/icons/companies';
import { Briefcase, Sword } from '@worksheets/icons/dazzle';
import { ValentinesPotion } from '@worksheets/icons/valentines';
import { ItemRarity, ItemType } from '@worksheets/prisma';

// TODO: move this to a shared location like @worksheets/types/items
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
  PRIZE_WHEEL: 'Prize Wheel',
};

export const itemTypeLogo: Record<ItemType, SvgIconComponent> = {
  SHARABLE: CardGiftcard,
  CURRENCY: LocalActivityOutlined,
  STEAM_KEY: ColoredSteamGames,
  CONSUMABLE: ValentinesPotion,
  COMBAT: Sword,
  ETCETERA: Briefcase,
  CAPSULE: Shuffle,
  PRIZE_WHEEL: StarBorder,
};
