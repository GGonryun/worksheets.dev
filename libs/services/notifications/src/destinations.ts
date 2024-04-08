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
  newsletter: NewsletterTemplates.newGame(payload),
});

const newRaffleTemplates: TemplateBuilder<'new-raffle'> = (payload) => ({
  twitter: TwitterTemplates.newRaffle(payload),
  discord: DiscordTemplates.newRaffle(payload),
  broadcast: PushTemplates.newRaffle(payload),
  newsletter: NewsletterTemplates.newRaffle(payload),
});

const wonRaffleTemplates: TemplateBuilder<'won-raffle'> = (payload) => ({
  push: PushTemplates.wonRaffle(payload),
  newsletter: NewsletterTemplates.wonRaffle(payload),
});

const wonRaffleReminderTemplates: TemplateBuilder<'won-raffle-reminder'> = (
  payload
) => ({
  push: PushTemplates.wonRaffleReminder(payload),
  newsletter: NewsletterTemplates.wonRaffleReminder(payload),
});

const unclaimedPrizeTemplates: TemplateBuilder<'unclaimed-prize'> = (
  payload
) => ({
  discord: DiscordTemplates.unclaimedPrize(payload),
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

export const destinations: Record<NotificationTemplateType, TemplateBuilder> = {
  'new-game': newGameTemplates,
  'new-raffle': newRaffleTemplates,
  'won-raffle': wonRaffleTemplates,
  'won-raffle-reminder': wonRaffleReminderTemplates,
  'unclaimed-prize': unclaimedPrizeTemplates,
  'raffle-expired': raffleExpiredTemplates,
  'new-user': newUserTemplates,
  'welcome-user': welcomeUserTemplates,
  'new-referral': newReferralTemplates,
  'gift-received': giftReceivedTemplates,
  'new-follower': newFollowerTemplates,
  'new-game-submission': newGameSubmissionTemplates,
  'confirm-newsletter-subscription': confirmNewsletterSubscriptionTemplates,
  'new-subscriber': newSubscriberTemplates,
};
