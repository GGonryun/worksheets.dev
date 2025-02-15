import {
  DiscordTemplates,
  EmailTemplates,
  NotificationTemplateType,
  TemplateBuilder,
  TwitterTemplates,
} from '@worksheets/services/templates';

const newGameTemplates: TemplateBuilder<'new-game'> = (payload) => ({
  twitter: TwitterTemplates.newGame(payload),
  discord: DiscordTemplates.newGame(payload),
});

const newRaffleTemplates: TemplateBuilder<'new-raffle'> = (payload) => ({
  twitter: TwitterTemplates.newRaffle(payload),
  discord: DiscordTemplates.newRaffle(payload),
});

const wonRaffleTemplates: TemplateBuilder<'won-raffle'> = (payload) => ({
  email: EmailTemplates.wonRaffle(payload),
});

const expiringCodeReminderTemplates: TemplateBuilder<
  'expiring-code-reminder'
> = (payload) => ({
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
});

const welcomeUserTemplates: TemplateBuilder<'welcome-user'> = (payload) => ({
  email: EmailTemplates.welcomeUser(payload),
});

const gameReportTemplates: TemplateBuilder<'game-report'> = (payload) => ({
  discord: DiscordTemplates.gameReport(payload),
});

const userReportTemplates: TemplateBuilder<'user-report'> = (payload) => ({
  discord: DiscordTemplates.userReport(payload),
});

export const destinations: Record<NotificationTemplateType, TemplateBuilder> = {
  'new-game': newGameTemplates,
  'new-raffle': newRaffleTemplates,
  'won-raffle': wonRaffleTemplates,
  'expiring-code-reminder': expiringCodeReminderTemplates,
  'expired-item': expiredItemTemplates,
  'raffle-expired': raffleExpiredTemplates,
  'new-user': newUserTemplates,
  'welcome-user': welcomeUserTemplates,
  'game-report': gameReportTemplates,
  'user-report': userReportTemplates,
};
