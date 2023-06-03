import { Execution } from '@worksheets/engine';
import { newPrivateLibrary } from '@worksheets/feat/execution-settings';

export const newExecution = async (userId: string): Promise<Execution> => {
  const library = newPrivateLibrary(userId);
  const execution = new Execution({ library });
  return execution;
};
