import { EmailService } from '@worksheets/services/email';
import { createCronJob } from '@worksheets/util/cron';

export default createCronJob(async () => {
  const email = new EmailService();
  email.process();
});
