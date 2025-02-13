import { routes } from '@worksheets/routes';
import { SettingsPanels } from '@worksheets/util/enums';

export const GAMES_URL = routes.play.url();

export const RAFFLES_URL = routes.raffles.url();

export const CONTACT_URL = routes.contact.url();

export const HELP_CENTER_URL = routes.help.url();

export const ACCOUNT_INVENTORY_URL = routes.account.url({
  bookmark: SettingsPanels.Items,
});

export const ACCOUNT_REFERRED_ACCOUNTS_URL = routes.account.url({
  bookmark: SettingsPanels.Referrals,
});

export const GAME_URL = (gameId: string) =>
  routes.game.url({
    params: {
      gameId,
    },
  });

export const DEVELOPER_URL = (developerId: string) =>
  routes.developer.url({
    params: {
      developerId,
    },
  });

export const RAFFLE_URL = (raffleId: number) =>
  routes.raffle.url({
    params: {
      raffleId,
    },
  });

export const ITEM_URL = (itemId: string) =>
  routes.item.url({
    params: {
      itemId,
    },
  });
