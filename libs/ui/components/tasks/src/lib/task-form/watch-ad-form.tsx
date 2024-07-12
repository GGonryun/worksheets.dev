import { WatchAdvertisement } from '@worksheets/ui/components/advertisements';
import { Column } from '@worksheets/ui/components/flex';
import { TaskFormProps } from '@worksheets/util/tasks';
import React from 'react';

import { isTaskComplete } from '../util';

export const WatchAdForm: React.FC<TaskFormProps> = ({ task, actions }) => {
  const completed = isTaskComplete(task.status);

  return (
    <Column gap={1}>
      <WatchAdvertisement
        onSubmit={() => actions.onSubmit({ repetitions: 1 })}
        disabled={completed}
        buttonText={completed ? 'Come Back Later' : 'Display Ad'}
      />
    </Column>
  );
};
