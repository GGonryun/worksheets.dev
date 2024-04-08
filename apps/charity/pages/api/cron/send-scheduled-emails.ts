import { EmailService } from '@worksheets/services/email';
import { createCronJob } from '@worksheets/util/cron';

export default createCronJob(async () => {
  const email = new EmailService();
  const results = await email.process();
  console.info(`Processed scheduled emails.`, results);
});
