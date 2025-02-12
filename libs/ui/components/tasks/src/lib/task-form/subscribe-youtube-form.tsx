import { OpenInNew } from '@mui/icons-material';
import { Button, Typography } from '@mui/material';
import { Column } from '@worksheets/ui/components/flex';
import { useSnackbar } from '@worksheets/ui/components/snackbar';
import { TaskFormProps, TaskSchema } from '@worksheets/util/tasks';
import React from 'react';

import { TaskCompleteNotice } from './task-complete-notice';

export const SubscribeYouTubeForm: React.FC<TaskFormProps> = ({
  task,
  actions,
}) => {
  return (
    <Column>
      {task.status === 'COMPLETED' ? (
        <TaskCompleteNotice />
      ) : (
        <Column gap={2}>
          <SubscribeChannel
            task={task}
            onComplete={() => actions.onSubmit({ repetitions: 1 })}
          />
        </Column>
      )}
      <Typography variant="body3" color="textSecondary" mt={2}>
        It's important to support the creators you love. Subscribe to their
        channel to show your support! We won't track your subscription, so make
        sure to subscribe before you click the button.
      </Typography>
    </Column>
  );
};

const SubscribeChannel: React.FC<{
  task: TaskSchema;
  onComplete: () => void;
}> = ({ task, onComplete }) => {
  const snackbar = useSnackbar();
  const [visited, setVisited] = React.useState(false);

  const handleClick = async () => {
    snackbar.success('Task completed!');
    onComplete();
  };

  return (
    <Column gap={2}>
      <Button
        href={`https://www.youtube.com/${task.data.channel.url}`}
        target="_blank"
        variant="arcade"
        color="primary"
        startIcon={<OpenInNew />}
        onClick={() => setVisited(true)}
      >
        Subscribe to {task.data.channel.name}
      </Button>
      <Button
        onClick={handleClick}
        variant="arcade"
        color="success"
        disabled={!visited}
      >
        Claim Reward
      </Button>
    </Column>
  );
};
