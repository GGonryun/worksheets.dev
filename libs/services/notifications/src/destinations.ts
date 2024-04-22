import {
  DiscordTemplates,
  EmailTemplates,
  NewsletterTemplates,
  NotificationTemplateType,
  PushTemplates,
  TemplateBuilder,
  TwitterTemplates,
} from '@worksheets/services/templates';

const newGameTemplates: TemplateBuilder<'new-game'> = (payload) => ({
  twitter: TwitterTemplates.newGame(payload),
  discord: DiscordTemplates.newGame(payload),
  broadcast: PushTemplates.newGame(payload),
  // TODO: re-enable newsletter
  // newsletter: NewsletterTemplates.newGame(payload),
});

const newRaffleTemplates: TemplateBuilder<'new-raffle'> = (payload) => ({
  twitter: TwitterTemplates.newRaffle(payload),
  discord: DiscordTemplates.newRaffle(payload),
  broadcast: PushTemplates.newRaffle(payload),
  // TODO: re-enable newsletter
  // newsletter: NewsletterTemplates.newRaffle(payload),
});

const wonRaffleTemplates: TemplateBuilder<'won-raffle'> = (payload) => ({
  push: PushTemplates.wonRaffle(payload),
  email: EmailTemplates.wonRaffle(payload),
});

const expiringItemReminderTemplates: TemplateBuilder<
  'expiring-item-reminder'
> = (payload) => ({
  push: PushTemplates.expiringItemReminder(payload),
  email: EmailTemplates.expiringItemReminder(payload),
});

const expiredItemTemplates: TemplateBuilder<'expired-item'> = (payload) => ({
  discord: DiscordTemplates.expiredItem(payload),
});

const raffleExpiredTemplates: TemplateBuilder<'raffle-expired'> = (
  payload
) => ({
  discord: DiscordTemplates.raffleExpired(payload),
  twitter: TwitterTemplates.raffleExpired(payload),
  broadcast: PushTemplates.raffleExpired(payload),
});

const newUserTemplates: TemplateBuilder<'new-user'> = (payload) => ({
  discord: DiscordTemplates.newUser(payload),
});

const welcomeUserTemplates: TemplateBuilder<'welcome-user'> = (payload) => ({
  push: PushTemplates.welcomeUser(payload),
  newsletter: NewsletterTemplates.welcomeUser(payload),
});

const newReferralTemplates: TemplateBuilder<'new-referral'> = (payload) => ({
  push: PushTemplates.newReferral(payload),
});

const giftReceivedTemplates: TemplateBuilder<'gift-received'> = (payload) => ({
  push: PushTemplates.giftReceived(payload),
});

const newFollowerTemplates: TemplateBuilder<'new-follower'> = (payload) => ({
  push: PushTemplates.newFollower(payload),
});

const newGameSubmissionTemplates: TemplateBuilder<'new-game-submission'> = (
  payload
) => ({
  discord: DiscordTemplates.newGameSubmission(payload),
});

const confirmNewsletterSubscriptionTemplates: TemplateBuilder<
  'confirm-newsletter-subscription'
> = (payload) => ({
  email: EmailTemplates.confirmNewsletterSubscription(payload),
});

const newSubscriberTemplates: TemplateBuilder<'new-subscriber'> = (
  payload
) => ({
  discord: DiscordTemplates.newSubscriber(payload),
});

const activationCodeRedeemedTemplates: TemplateBuilder<
  'activation-code-redeemed'
> = (payload) => ({
  email: EmailTemplates.activationCodeRedeemed(payload),
});

const questCompletedTemplates: TemplateBuilder<'quest-completed'> = (
  payload
) => ({
  push: PushTemplates.questCompleted(payload),
});

const newBattleTemplates: TemplateBuilder<'new-battle'> = (payload) => ({
  twitter: TwitterTemplates.newBattle(payload),
  discord: DiscordTemplates.newBattle(payload),
  broadcast: PushTemplates.newBattle(payload),
});

const battleCompletedTemplates: TemplateBuilder<'battle-completed'> = (
  payload
) => ({
  twitter: TwitterTemplates.battleCompleted(payload),
  discord: DiscordTemplates.battleCompleted(payload),
  push: PushTemplates.battleCompleted(payload),
});

const battleMvpAwardedTemplates: TemplateBuilder<'battle-mvp-awarded'> = (
  payload
) => ({
  push: PushTemplates.battleMvpAwarded(payload),
});

const battleLootAwardedTemplates: TemplateBuilder<'battle-loot-awarded'> = (
  payload
) => ({
  push: PushTemplates.battleLootAwarded(payload),
});

export const destinations: Record<NotificationTemplateType, TemplateBuilder> = {
  'new-game': newGameTemplates,
  'new-raffle': newRaffleTemplates,
  'won-raffle': wonRaffleTemplates,
  'expiring-item-reminder': expiringItemReminderTemplates,
  'expired-item': expiredItemTemplates,
  'raffle-expired': raffleExpiredTemplates,
  'new-user': newUserTemplates,
  'welcome-user': welcomeUserTemplates,
  'new-referral': newReferralTemplates,
  'gift-received': giftReceivedTemplates,
  'new-follower': newFollowerTemplates,
  'new-game-submission': newGameSubmissionTemplates,
  'confirm-newsletter-subscription': confirmNewsletterSubscriptionTemplates,
  'new-subscriber': newSubscriberTemplates,
  'activation-code-redeemed': activationCodeRedeemedTemplates,
  'quest-completed': questCompletedTemplates,
  'new-battle': newBattleTemplates,
  'battle-completed': battleCompletedTemplates,
  'battle-mvp-awarded': battleMvpAwardedTemplates,
  'battle-loot-awarded': battleLootAwardedTemplates,
};
