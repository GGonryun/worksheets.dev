import { prisma } from '@worksheets/prisma';
import { CRON_SECRET } from '@worksheets/services/environment';
import { IS_PRODUCTION } from '@worksheets/ui/env';
import { daysAgo } from '@worksheets/util/time';
import { NextApiRequest, NextApiResponse } from 'next';

const EXPIRED_NOTIFICATION_THRESHOLD = 7;

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
        lte: daysAgo(EXPIRED_NOTIFICATION_THRESHOLD),
      },
    },
  });

  console.info(`Deleted ${expiredNotifications.count} expired notifications`);

  response.status(200).json({ success: true });
}
