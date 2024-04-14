import { prisma } from '@worksheets/prisma';
import { EmailService } from '@worksheets/services/email';
import { createCronJob } from '@worksheets/util/cron';

export default createCronJob(async () => {
  const email = new EmailService(prisma);
  await email.process();
});
