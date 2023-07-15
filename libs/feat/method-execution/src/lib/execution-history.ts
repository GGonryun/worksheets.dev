import { getApplication } from '@worksheets/feat/applications-registry';
import { newMethodExecutionsDatabase } from '@worksheets/data-access/method-executions';
import {
  ListMethodExecutionsResponse,
  listMethodExecutionsRequestSchema,
} from '@worksheets/schemas-executions';
import { z } from 'zod';
import { timeBetween } from '@worksheets/util/time';

const request = listMethodExecutionsRequestSchema.extend({
  userId: z.string(),
});

type Request = z.infer<typeof request>;
type Response = ListMethodExecutionsResponse;

const db = newMethodExecutionsDatabase();

export const listMethodExecutions = async (req: Request): Promise<Response> => {
  console.info('listMethodExecutions', req);
  const data = await db.collection
    .where('uid', '==', req.userId)
    .orderBy('startedAt', 'desc')
    .limit(req.limit ?? 25)
    .offset(req.offset ?? 0)
    .get();

  const methodExecutions = db.parse(data);

  const response: Response = [];

  for (const methodExecution of methodExecutions) {
    const application = getApplication(methodExecution.appId);
    console.log('application', application);
    response.push({
      id: methodExecution.id,
      app: {
        id: application.id,
        name: application.name,
        logo: application.logo,
        description: application.description,
      },
      status: methodExecution.status,
      startedAt: methodExecution.startedAt,
      finishedAt: methodExecution.finishedAt,
      method: methodExecution.methodId,
      duration: timeBetween(
        methodExecution.startedAt,
        methodExecution.finishedAt
      ),
    });
  }

  return response;
};
