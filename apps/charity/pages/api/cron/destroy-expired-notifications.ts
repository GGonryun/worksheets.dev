import { prisma } from '@worksheets/prisma';
import { CRON_SECRET } from '@worksheets/services/environment';
import { IS_PRODUCTION } from '@worksheets/ui/env';
import { NextApiRequest, NextApiResponse } from 'next';

const DAYS_IN_MILLISECONDS = 1000 * 60 * 60 * 24;
const EXPIRED_NOTIFICATION_THRESHOLD = DAYS_IN_MILLISECONDS * 7;

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

  const expiredNotifications = await prisma.notification.deleteMany({
    where: {
      createdAt: {
        lte: new Date(Date.now() - EXPIRED_NOTIFICATION_THRESHOLD),
      },
    },
  });

  console.info(`Deleted ${expiredNotifications.count} expired notifications`);

  response.status(200).json({ success: true });
}
