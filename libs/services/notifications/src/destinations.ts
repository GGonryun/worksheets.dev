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

const lostRaffleTemplates: TemplateBuilder<'lost-raffle'> = (payload) => ({
  pushMany: PushTemplates.lostRaffle(payload),
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
});

const newUserTemplates: TemplateBuilder<'new-user'> = (payload) => ({
  discord: DiscordTemplates.newUser(payload),
  push: PushTemplates.newUser(payload),
});

const welcomeUserTemplates: TemplateBuilder<'welcome-user'> = (payload) => ({
  newsletter: NewsletterTemplates.welcomeUser(payload),
});

const newReferralTemplates: TemplateBuilder<'new-referral'> = (payload) => ({
  push: PushTemplates.newReferral(payload),
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

const questCompletedTemplates: TemplateBuilder<'quest-completed'> = (
  payload
) => ({
  push: PushTemplates.questCompleted(payload),
});

const foundItemTemplates: TemplateBuilder<'found-item'> = (payload) => ({
  push: PushTemplates.foundItem(payload),
});

const gameReportTemplates: TemplateBuilder<'game-report'> = (payload) => ({
  discord: DiscordTemplates.gameReport(payload),
});

const userReportTemplates: TemplateBuilder<'user-report'> = (payload) => ({
  discord: DiscordTemplates.userReport(payload),
});

const shareGiftTemplates: TemplateBuilder<'share-gift'> = (payload) => ({
  push: PushTemplates.shareGift(payload),
});

const wonLeaderboardTemplates: TemplateBuilder<'won-leaderboard'> = (
  payload
) => ({
  push: PushTemplates.wonLeaderboard(payload),
});

const achievementUnlockedTemplates: TemplateBuilder<'achievement-unlocked'> = (
  payload
) => ({
  push: PushTemplates.achievementUnlocked(payload),
});

export const destinations: Record<NotificationTemplateType, TemplateBuilder> = {
  'new-game': newGameTemplates,
  'new-raffle': newRaffleTemplates,
  'won-raffle': wonRaffleTemplates,
  'lost-raffle': lostRaffleTemplates,
  'expiring-item-reminder': expiringItemReminderTemplates,
  'expired-item': expiredItemTemplates,
  'raffle-expired': raffleExpiredTemplates,
  'new-user': newUserTemplates,
  'welcome-user': welcomeUserTemplates,
  'new-referral': newReferralTemplates,
  'new-follower': newFollowerTemplates,
  'new-game-submission': newGameSubmissionTemplates,
  'confirm-newsletter-subscription': confirmNewsletterSubscriptionTemplates,
  'new-subscriber': newSubscriberTemplates,
  'quest-completed': questCompletedTemplates,
  'found-item': foundItemTemplates,
  'game-report': gameReportTemplates,
  'user-report': userReportTemplates,
  'share-gift': shareGiftTemplates,
  'won-leaderboard': wonLeaderboardTemplates,
  'achievement-unlocked': achievementUnlockedTemplates,
};
