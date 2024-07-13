import {
  Prisma,
  TaskCategory,
  TaskFrequency,
  TaskType,
} from '@worksheets/prisma';
import { SeedableGameSchema } from '@worksheets/util/types';

export const createGameTask = (
  game: SeedableGameSchema
): Prisma.TaskUncheckedCreateInput[] => {
  const code = game.id.toUpperCase().replace(/-/g, '_');

  const tasks: Prisma.TaskUncheckedCreateInput[] = [
    {
      id: `PLAY_GAME_${code}_ONCE`,
      type: TaskType.PLAY_GAME,
      frequency: TaskFrequency.ONCE,
      name: `Play ${game.name} once`,
      requiredRepetitions: 1,
      maxRepetitions: 1,
      description: `Play ${game.name} once and earn rewards.`,
      version: 1,
      category: TaskCategory.GAMEPLAY,
      gameId: game.id,
      data: {},
    },
  ];

  if (game.tasks && game.tasks.length) {
    game.tasks.forEach((t) => {
      tasks.push({
        id: `LEADERBOARD_SCORE_${code}_${t.score}_ONCE`,
        type: TaskType.SUBMIT_LEADERBOARD_SCORE,
        frequency: TaskFrequency.ONCE,
        name: `Score ${t.score} points on ${game.name}`,
        requiredRepetitions: 1,
        maxRepetitions: 1,
        description: `Submit a minimum score of ${t.score} on the leaderboard for ${game.name} and earn rewards.`,
        version: 1,
        category: TaskCategory.GAMEPLAY,
        gameId: game.id,
        data: {
          score: t.score,
        },
      });
    });
  }

  return tasks;
};
