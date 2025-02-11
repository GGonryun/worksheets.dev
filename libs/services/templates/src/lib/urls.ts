import {
  contestsRoutes,
  helpRoutes,
  playRoutes,
  portalRoutes,
} from '@worksheets/routes';
import {
  HelpInventoryQuestions,
  InventoryPanels,
  SettingsPanels,
} from '@worksheets/util/enums';

export const GAMES_URL = playRoutes.home.url();

export const RAFFLES_URL = contestsRoutes.raffles.url();

export const CONTACT_URL = helpRoutes.contact.url();

export const ACCOUNT_URL = portalRoutes.account.url();

export const CONFIRM_NEWSLETTER_SUBSCRIPTION_URL = (id: string) =>
  portalRoutes.newsletter.confirm.url({
    query: { id },
  });

export const ACCOUNT_INVENTORY_URL = portalRoutes.account.inventory.url({
  bookmark: InventoryPanels.Items,
});

export const ACCOUNT_COMMUNICATIONS_URL = portalRoutes.account.url({
  bookmark: SettingsPanels.Communication,
});

export const CLAIM_URL = helpRoutes.inventory.url({
  bookmark: HelpInventoryQuestions.Claiming,
});

export const GAME_URL = (gameId: string) =>
  playRoutes.game.url({
    params: {
      gameId,
    },
  });

export const DEVELOPER_URL = (developerId: string) =>
  playRoutes.developer.url({
    params: {
      developerId,
    },
  });

export const RAFFLE_URL = (raffleId: number) =>
  contestsRoutes.raffle.url({
    params: {
      raffleId,
    },
  });
