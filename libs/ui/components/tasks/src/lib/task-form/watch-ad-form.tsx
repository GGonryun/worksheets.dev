import { WatchAdvertisement } from '@worksheets/ui/components/advertisements';
import { TaskFormProps } from '@worksheets/util/tasks';
import React from 'react';

import { isTaskComplete } from '../util';

export const WatchAdForm: React.FC<TaskFormProps> = ({ task, actions }) => {
  const completed = isTaskComplete(task.status);

  return (
    <WatchAdvertisement
      network={task.data.network}
      onSubmit={() => actions.onSubmit({ repetitions: 1 })}
      disabled={completed}
      buttonText={completed ? 'Come Back Later' : 'Display Ad'}
    />
  );
};
