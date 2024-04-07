import { ScheduleNewsletterInput } from '@worksheets/services/newsletter';
import { CLAIM_ALERT_SENT_COUNT_THRESHOLD } from '@worksheets/util/settings';
import { daysFromNow, now } from '@worksheets/util/time';
import { EmailPriority } from '@worksheets/util/types';

import { ExtractTemplatePayload } from './types';
import { ACCOUNT_PRIZES_URL, CLAIM_URL, CONTACT_URL } from './urls';

export class NewsletterTemplates {
  static wonRaffle(
    opts: ExtractTemplatePayload<'won-raffle'>
  ): ScheduleNewsletterInput[] {
    return [
      {
        topic: 'Transactional',
        priority: EmailPriority.High,
        emails: [opts.user.email],
        sendAt: now(),
        subject: `You won a raffle on Charity Games!`,
        html: `Congratulations! You've won a ${prizeNameLink(
          opts.prize
        )}.<br/><br/>${claimHelpText}<br/><br/>${transactionalText}`,
      },
    ];
  }
  static wonRaffleReminder(
    opts: ExtractTemplatePayload<'won-raffle'>
  ): ScheduleNewsletterInput[] {
    return [
      {
        topic: 'Transactional',
        priority: EmailPriority.Urgent,
        emails: [opts.user.email],
        sendAt: now(),
        subject: `Claim your prize on Charity Games!`,
        html: `You won a ${prizeNameLink(
          opts.prize
        )} on Charity Games, but you haven't claimed it yet.<br/><br/>${claimHelpText}<br/><br/>${transactionalText}`,
      },
    ];
  }
  static newGame(
    opts: ExtractTemplatePayload<'new-game'>
  ): ScheduleNewsletterInput[] {
    return [
      {
        topic: 'NewGame',
        priority: EmailPriority.Normal,
        sendAt: daysFromNow(1),
        subject: `New Game Alert! Play ${opts.title} now!`,
        html: `TODO: New game ${opts.title} email template goes here.`,
      },
    ];
  }
  static newRaffle(
    opts: ExtractTemplatePayload<'new-raffle'>
  ): ScheduleNewsletterInput[] {
    return [
      {
        topic: 'NewRaffle',
        priority: EmailPriority.Normal,
        sendAt: daysFromNow(1),
        subject: `New Raffle Alert! Win a ${opts.prize.name}`,
        html: `TODO: New raffle ${opts.prize.name} email template goes here.`,
      },
    ];
  }
  static welcomeUser(
    opts: ExtractTemplatePayload<'welcome-user'>
  ): ScheduleNewsletterInput[] {
    return [
      {
        emails: [opts.user.email],
        topic: 'TipsAndTricks',
        priority: EmailPriority.Significant,
        sendAt: daysFromNow(1),
        subject: `(1/3) Welcome to Charity Games!`,
        html: `TODO: Template for the first welcome email goes here. ${opts.user.email}`,
      },
      {
        emails: [opts.user.email],
        topic: 'TipsAndTricks',
        priority: EmailPriority.Moderate,
        sendAt: daysFromNow(6),
        subject: `(2/3) Win prizes with Charity Games!`,
        html: `TODO: Template for the second welcome email goes here.`,
      },
      {
        emails: [opts.user.email],
        topic: 'TipsAndTricks',
        priority: EmailPriority.Minor,
        sendAt: daysFromNow(14),
        subject: `(3/3) The fastest ways to earn tokens on Charity Games!`,
        html: `TODO: Template for the third welcome email goes here.`,
      },
    ];
  }
}

const prizeNameLink = (
  prize: ExtractTemplatePayload<'won-raffle'>['prize']
) => {
  return `<a href="${CLAIM_URL}">${prize.name}</a>`;
};

const claimHelpText = `Please visit <a href="${ACCOUNT_PRIZES_URL}">Charity Games</a> to claim your prize. If you are unable to claim a prize, please <a href="${CONTACT_URL}">contact us</a> for assistance. You may receive an alternative prize or tokens equal to the prize value. If you need help, please visit our <a href="${CLAIM_URL}">Help Center</a>.<br/><br/>If you do not claim your prize within ${CLAIM_ALERT_SENT_COUNT_THRESHOLD} days of winning, it will be forfeited.`;
const transactionalText = `<i>This is a transactional message.</i>`;
