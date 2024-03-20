import { Prisma, prisma } from '@worksheets/prisma';
import { sendDiscordMessage } from '@worksheets/services/discord';
import { DISCORD_WEBHOOK_URL } from '@worksheets/services/environment';
import { sendEmail } from '@worksheets/services/gmail';
import { routes } from '@worksheets/ui/routes';
import { createCronJob } from '@worksheets/util/cron';
import {
  HelpPrizesQuestions,
  PrizesPanels,
  SettingsPanels,
} from '@worksheets/util/enums';
import {
  CLAIM_ALERT_LAST_SENT_THRESHOLD,
  CLAIM_ALERT_SENT_COUNT_THRESHOLD,
} from '@worksheets/util/settings';
import { hoursAgo, printShortDateTime } from '@worksheets/util/time';

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

const PRIZE_URL = (prizeId: string) =>
  routes.prize.url({
    params: {
      prizeId,
    },
  });

const PENDING_ALERT_PROPS = {
  id: true as const,
  lastSentAt: true as const,
  sentCount: true as const,
  createdAt: true as const,
  winner: {
    select: {
      id: true as const,
      raffleId: true as const,
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

export default createCronJob(async () => {
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
});

const processPendingAlert = async (alert: PendingAlert) => {
  await updateAlert(alert);

  await sendAlertEmail(alert);
};

const processExpiredAlert = async (alert: PendingAlert) => {
  await prisma.$transaction([
    prisma.claimAlert.delete({
      where: {
        id: alert.id,
      },
    }),
    // deleting the winner and setting the status to 'REASSIGN' will make sure that the raffle gets new winners assigned by the 'find-expired-raffles' cronjob.
    prisma.raffleWinner.delete({
      where: {
        id: alert.winner.id,
      },
    }),
    prisma.raffle.update({
      where: {
        id: alert.winner.raffleId,
      },
      data: {
        status: 'REASSIGN',
      },
    }),
  ]);

  await notifyAdmins(alert);
};

const notifyAdmins = async (alert: PendingAlert) => {
  sendDiscordMessage({
    content: `A user did not claimed their prize in time.`,
    embeds: [
      {
        title: `User ID: ${alert.winner.user.id}`,
        description: `The user (${
          alert.winner.user.email
        }) did not successfully claim their prize. The last alert was sent at ${printShortDateTime(
          alert.lastSentAt ?? 0
        )}.`,
      },
    ],
    webhookUrl: DISCORD_WEBHOOK_URL,
  });
};

const claimHelpText = `Please visit <a href="${ACCOUNT_URL}">Charity Games</a> to claim your prize. If you are unable to claim a prize, please <a href="${CONTACT_URL}">contact us</a> for assistance. You may receive an alternative prize or tokens equal to the prize value. If you need help, please visit our <a href="${CLAIM_URL}">Help Center</a>.<br/><br/>If you do not claim your prize within ${CLAIM_ALERT_SENT_COUNT_THRESHOLD} days of winning, it will be forfeited.`;
const unsubscribedText = `<i>If you no longer wish to receive these emails, you can unsubscribe from your <a href="${UNSUBSCRIBE_URL}">account settings</a>.</i>`;

const sendAlertEmail = async (alert: PendingAlert) => {
  // if the alert hasn't been sent, send a special first-time email
  if (!alert.sentCount) {
    return sendFirstTimeAlertEmail(alert);
  } else {
    return sendReminderEmail(alert);
  }
};

const sendFirstTimeAlertEmail = async (alert: PendingAlert) =>
  sendUserEmail(alert, {
    subject: `🎉 You won a raffle on Charity Games!`,
    content: `Congratulations! You've won ${printPrizeName(
      alert.winner.prize
    )}.`,
  });

const sendReminderEmail = async (alert: PendingAlert) =>
  sendUserEmail(alert, {
    subject: '🎉 Remember to claim your prize on Charity Games!',
    content: `You've won a raffle but haven't claimed your prize yet. You have ${printPrizeName(
      alert.winner.prize
    )} waiting in your inventory!`,
  });

const sendUserEmail = async (
  alert: PendingAlert,
  options: { content: string; subject: string }
) =>
  sendEmail({
    to: [alert.winner.user.email],
    subject: options.subject,
    html: `${options.content}<br/><br/>${claimHelpText}<br/><br/>${unsubscribedText}`,
  });

const printPrizeName = (prize: PendingAlert['winner']['prize']) => {
  if (prize.type === 'STEAM_KEY') {
    return `a steam key for <a href="${PRIZE_URL(prize.id)}">${prize.name}</a>`;
  }

  if (prize.type === 'GIFT_CARD') {
    return `a ${prize.name} gift card`;
  }

  return `a ${prize.name}`;
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
        text: `You won a raffle! <a href="${ACCOUNT_URL}">Go to your account</a> to redeem your prize: <a href="${PRIZE_URL(
          alert.winner.prize.id
        )}">${alert.winner.prize.name}</a>.`,
      },
    }),
  ]);
};
