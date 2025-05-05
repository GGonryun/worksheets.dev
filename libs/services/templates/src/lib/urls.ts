import { routes } from '@worksheets/routes';
import { SettingsPanels } from '@worksheets/util/enums';

export const GAMES_URL = routes.play.url();

export const RAFFLES_URL = routes.raffles.url();

export const CONTACT_URL = routes.contact.url();

export const ACCOUNT_CODES_URL = routes.account.url({
  bookmark: SettingsPanels.ActivationCodes,
});

export const HELP_CENTER_URL = routes.help.url();

export const ACCOUNT_REFERRED_ACCOUNTS_URL = routes.account.url({
  bookmark: SettingsPanels.Referrals,
});

export const GAME_URL = (gameId: string) =>
  routes.game.url({
    params: {
      gameId,
    },
  });

export const RAFFLE_URL = (raffleId: number) =>
  routes.raffle.url({
    params: {
      raffleId,
    },
  });
