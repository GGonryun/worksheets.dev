import { prisma, TaskFrequency } from '@worksheets/prisma';
import { TasksService } from '@worksheets/services/tasks';
import { createCronJob } from '@worksheets/util/cron';

export default createCronJob(async () => {
  const tasks = new TasksService(prisma);
  await tasks.destroyExpiredTasks(TaskFrequency.WEEKLY);
});
