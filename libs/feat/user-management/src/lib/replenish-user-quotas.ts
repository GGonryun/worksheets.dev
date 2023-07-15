import { newUserQuotasDatabase } from '@worksheets/data-access/user-agent';

const db = newUserQuotasDatabase();

export const replenishUserQuotas = async (max: number): Promise<number> => {
  const data = await db.collection.limit(max).get();
  const users = db.parse(data);

  // for each user quota reset the quota back to the max
  const promises = [];
  for (const user of users) {
    if (user.executions.current === user.executions.resetTo) {
      continue;
    }

    promises.push(
      db.update({
        ...user,
        executions: {
          current: user.executions.resetTo,
          resetTo: user.executions.resetTo,
        },
      })
    );
  }

  // parse the data into entities
  await Promise.all(promises);

  console.info(
    `replenished (${promises.length}/${data.docs.length}) user quotas`
  );

  return promises.length;
};
