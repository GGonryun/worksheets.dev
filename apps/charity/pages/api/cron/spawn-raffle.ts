// // TODO: create an auto-spawning raffle system so that we don't have to keep generating them manually.
// // TODO: every 19 hours a new raffle is generated and published. Pick a random template and generate a new raffle.
// /**
//  * @title autospawning raffle system
//  * create an auto-spawning raffle system so that we don't have to keep generating them manually. it should spawn a new raffle
//  * every 17 hours with a random prize and random tasks from a list of available rewards/tasks. Steam keys should be spawned every
//  * second raffle. The raffle should be published immediately after generation.
//  */
// import { prisma } from '@worksheets/prisma';
// import { RafflesService } from '@worksheets/services/raffles';
// import { createCronJob } from '@worksheets/util/cron';

// export default createCronJob(async () => {
//   const raffles = new RafflesService(prisma);
//   await raffles.publishAll();

//   await res.revalidate(
//     routes.battle.path({
//       params: {
//         battleId: spawned.battleId,
//       },
//     })
//   );
// });
