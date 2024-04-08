import { routes } from '@worksheets/routes';
import {
  FriendsPanels,
  HelpPrizesQuestions,
  PrizesPanels,
  ReferralsPanels,
  SettingsPanels,
} from '@worksheets/util/enums';

export const GAMES_URL = routes.play.url();

export const RAFFLES_URL = routes.raffles.url();

export const PRIZES_LINK = routes.prizes.url();

export const CONTACT_URL = routes.contact.url();

export const ACCOUNT_URL = routes.account.url();

export const ACCOUNT_QUESTS_URL = routes.account.quests.url();

export const CONFIRM_NEWSLETTER_SUBSCRIPTION_URL = (id: string) =>
  routes.newsletter.confirm.url({
    query: { id },
  });

export const ACCOUNT_PRIZES_URL = routes.account.prizes.url({
  bookmark: PrizesPanels.Prizes,
});

export const ACCOUNT_GIFT_BOXES_URL = routes.account.friends.url({
  bookmark: FriendsPanels.GiftBoxes,
});

export const ACCOUNT_REFERRED_ACCOUNTS_URL = routes.account.referrals.url({
  bookmark: ReferralsPanels.ReferredAccounts,
});

export const ACCOUNT_FRIENDS_LIST_URL = routes.account.friends.url({
  bookmark: FriendsPanels.FriendsList,
});

export const ACCOUNT_ADD_FRIENDS_URL = routes.account.friends.url({
  bookmark: FriendsPanels.AddFriends,
});

export const ACCOUNT_COMMUNICATIONS_URL = routes.account.url({
  bookmark: SettingsPanels.Communication,
});

export const CLAIM_URL = routes.help.prizes.url({
  bookmark: HelpPrizesQuestions.HowToClaim,
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

export const PRIZE_URL = (prizeId: string) =>
  routes.prize.url({
    params: {
      prizeId,
    },
  });
