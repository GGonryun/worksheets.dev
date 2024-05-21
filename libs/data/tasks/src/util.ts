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

  return [
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
};
