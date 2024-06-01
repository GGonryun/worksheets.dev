import { DoneOutline, OpenInNew } from '@mui/icons-material';
import { Button, CircularProgress } from '@mui/material';
import { IntegrationProvider } from '@prisma/client';
import { trpc } from '@worksheets/trpc-charity';
import { Column } from '@worksheets/ui/components/flex';
import { YouTubeIntegration } from '@worksheets/ui/components/integrations';
import { useSnackbar } from '@worksheets/ui/components/snackbar';
import { TaskFormProps, TaskSchema } from '@worksheets/util/tasks';
import { parseTRPCClientErrorMessage } from '@worksheets/util/trpc';
import React from 'react';

import { QuestCompleteNotice } from './quest-complete-notice';

export const SubscribeYouTubeForm: React.FC<TaskFormProps> = ({
  task,
  actions,
}) => {
  return (
    <Column>
      {task.status === 'COMPLETED' ? (
        <QuestCompleteNotice />
      ) : (
        <Column gap={2}>
          <YouTubeIntegration />
          <SubscribeChannel
            task={task}
            onComplete={() => actions.onSubmit({ repetitions: 1 })}
          />
        </Column>
      )}
    </Column>
  );
};

const SubscribeChannel: React.FC<{
  task: TaskSchema;
  onComplete: () => void;
}> = ({ task, onComplete }) => {
  const snackbar = useSnackbar();
  const user = trpc.user.integrations.oauth.identity.useQuery(
    IntegrationProvider.YOUTUBE
  );
  const subscribed = trpc.user.integrations.youtube.isSubscribed.useMutation();

  if (user.isLoading || user.isError || !user.data) return null;

  const handleClick = async () => {
    try {
      const result = await subscribed.mutateAsync({
        channelId: task.data.channel.id,
      });
      if (result) {
        snackbar.success('Quest completed!');
        onComplete();
      } else {
        snackbar.error(
          'Failed to complete quest. Are you subscribed to the correct channel?'
        );
      }
    } catch (error) {
      snackbar.error(parseTRPCClientErrorMessage(error));
    }
  };

  return (
    <Column gap={2}>
      <Button
        href={`https://www.youtube.com/${task.data.channel.url}`}
        target="_blank"
        variant="arcade"
        color="primary"
        startIcon={<OpenInNew />}
      >
        Subscribe to {task.data.channel.name}
      </Button>
      <Button
        onClick={handleClick}
        variant="arcade"
        color="success"
        startIcon={
          subscribed.isLoading ? (
            <CircularProgress size="18px" />
          ) : (
            <DoneOutline />
          )
        }
        disabled={subscribed.isLoading}
      >
        Claim Reward
      </Button>
    </Column>
  );
};
