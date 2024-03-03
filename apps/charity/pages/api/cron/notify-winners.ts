import { Prisma, prisma } from '@worksheets/prisma';
import { sendDiscordMessage } from '@worksheets/services/discord';
import {
  CRON_SECRET,
  DISCORD_WEBHOOK_URL,
  IS_PRODUCTION,
} from '@worksheets/services/environment';
import { sendEmail } from '@worksheets/services/gmail';
import { routes } from '@worksheets/ui/routes';
import {
  HelpPrizesQuestions,
  PrizesPanels,
  SettingsPanels,
} from '@worksheets/util/enums';
import {
  CLAIM_ALERT_LAST_SENT_THRESHOLD,
  CLAIM_ALERT_SENT_COUNT_THRESHOLD,
  PRIZE_FORFEITURE_DAYS,
} from '@worksheets/util/settings';
import { hoursAgo, printShortDateTime } from '@worksheets/util/time';
import { NextApiRequest, NextApiResponse } from 'next';

const CONTACT_URL = routes.contact.url();
const ACCOUNT_URL = routes.account.prizes.url({
  bookmark: PrizesPanels.Prizes,
});
const CLAIM_URL = routes.help.prizes.url({
  bookmark: HelpPrizesQuestions.HowToClaim,
});
const UNSUBSCRIBE_URL = routes.account.url({
  bookmark: SettingsPanels.Communication,
});

const PRIZE_URL = (prizeId: number) =>
  routes.prize.url({
    params: {
      prizeId,
    },
  });

const PENDING_ALERT_PROPS = {
  id: true as const,
  lastSentAt: true as const,
  sentCount: true as const,
  winner: {
    select: {
      id: true as const,
      user: {
        select: {
          id: true as const,
          email: true as const,
          notificationPreferences: {
            select: {
              email: true as const,
            },
          },
        },
      },
      prize: {
        select: {
          id: true as const,
          name: true as const,
          type: true as const,
        },
      },
    },
  },
};

type PendingAlert = Prisma.ClaimAlertGetPayload<{
  select: typeof PENDING_ALERT_PROPS;
}>;

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const authHeader = request.headers['authorization'];

  // allow insecure requests in development
  if (IS_PRODUCTION) {
    if (authHeader !== `Bearer ${CRON_SECRET}`) {
      return response.status(401).json({ success: false });
    }
  }

  const [unsentAlerts, pendingAlerts, expiredAlerts] = await Promise.all([
    prisma.claimAlert.findMany({
      where: {
        // find alerts that haven't been sent yet
        lastSentAt: {
          equals: null,
        },
      },
      select: PENDING_ALERT_PROPS,
    }),
    prisma.claimAlert.findMany({
      where: {
        lastSentAt: {
          lt: hoursAgo(CLAIM_ALERT_LAST_SENT_THRESHOLD),
        },
        sentCount: {
          lt: CLAIM_ALERT_SENT_COUNT_THRESHOLD,
        },
      },
      select: PENDING_ALERT_PROPS,
    }),
    prisma.claimAlert.findMany({
      where: {
        sentCount: {
          gte: CLAIM_ALERT_SENT_COUNT_THRESHOLD,
        },
      },
      select: PENDING_ALERT_PROPS,
    }),
  ]);

  await Promise.all([
    ...[...unsentAlerts, ...pendingAlerts].map(processPendingAlert),
    ...expiredAlerts.map(processExpiredAlert),
  ]);

  console.info(`Processed ${unsentAlerts.length} unsent alerts.`);
  console.info(`Processed ${pendingAlerts.length} pending alerts.`);
  console.info(`Processed ${expiredAlerts.length} expired alerts.`);

  response.status(200).json({ success: true });
}

const processPendingAlert = async (alert: PendingAlert) => {
  await updateAlert(alert);

  await sendAlertEmail(alert);
};

const processExpiredAlert = async (alert: PendingAlert) => {
  await prisma.claimAlert.delete({
    where: {
      id: alert.id,
    },
  });

  await sendExpiredAlertDiscordNotification(alert);
};

const sendExpiredAlertDiscordNotification = async (alert: PendingAlert) => {
  try {
    sendDiscordMessage({
      content: `The following users have not claimed their prize in ${
        CLAIM_ALERT_SENT_COUNT_THRESHOLD * CLAIM_ALERT_LAST_SENT_THRESHOLD
      } hours.`,
      embeds: [
        {
          title: `Alert ID: ${alert.id}`,
          description: `The last alert was sent at ${printShortDateTime(
            alert.lastSentAt ?? 0
          )}. We've stopped sending alerts to this user.`,
        },
      ],
      webhookUrl: DISCORD_WEBHOOK_URL,
    });
  } catch (error) {
    console.warn('Failed to send discord message', error);
  }
};

const claimHelpText = `Please visit <a href="${ACCOUNT_URL}">Charity Games</a> to claim your prize. If you are unable to claim a prize, please <a href="${CONTACT_URL}">contact us</a> for assistance. You may receive an alternative prize or tokens equal to the prize value. If you need help, please visit our <a href="${CLAIM_URL}">Help Center</a>.<br/><br/>If you do not claim your prize within ${PRIZE_FORFEITURE_DAYS} days of winning, it may be forfeited.`;
const unsubscribedText = `<i>If you no longer wish to receive these emails, you can unsubscribe from your <a href="${UNSUBSCRIBE_URL}">account settings</a>.</i>`;

const sendAlertEmail = async (alert: PendingAlert) => {
  // if the user does not have email notifications enabled, skip
  if (alert.winner.user.notificationPreferences?.email) {
    console.info('Skipping email notification for user', alert.winner.user.id);
    return;
  }

  // if the alert hasn't been sent, send a special first-time email
  if (!alert.sentCount) {
    return sendFirstTimeAlertEmail(alert);
  } else {
    return sendReminderEmail(alert);
  }
};

const printPrizeName = (prize: PendingAlert['winner']['prize']) => {
  if (prize.type === 'STEAM_KEY') {
    return `a steam key for <a href="${PRIZE_URL(prize.id)}">${prize.name}</a>`;
  }

  if (prize.type === 'GIFT_CARD') {
    return `a ${prize.name} gift card`;
  }

  return `a ${prize.name}`;
};

const sendFirstTimeAlertEmail = async (alert: PendingAlert) => {
  return sendEmail({
    to: [alert.winner.user.email],
    subject: ` 🎉 You won a raffle!`,
    html: `Congratulations! You've won ${printPrizeName(
      alert.winner.prize
    )}.<br/><br/>${claimHelpText}<br/><br/>${unsubscribedText}`,
  });
};

const sendReminderEmail = async (alert: PendingAlert) => {
  return sendEmail({
    to: [alert.winner.user.email],
    subject: 'Remember to claim your prize!',
    html: `You've won a raffle and you have ${printPrizeName(
      alert.winner.prize
    )} waiting for you in your inventory!<br/><br/>${claimHelpText}<br/><br/>${unsubscribedText}`,
  });
};

const updateAlert = async (alert: PendingAlert) => {
  return prisma.$transaction([
    prisma.claimAlert.update({
      where: {
        id: alert.id,
      },
      data: {
        lastSentAt: new Date(),
        sentCount: {
          increment: 1,
        },
      },
    }),
    prisma.notification.create({
      data: {
        type: 'RAFFLE',
        userId: alert.winner.user.id,
        text: `You won a prize! <a href="${ACCOUNT_URL}">Go to your account</a> to redeem your copy of <a href="${PRIZE_URL(
          alert.winner.prize.id
        )}">${alert.winner.prize.name}</a>.`,
      },
    }),
  ]);
};
