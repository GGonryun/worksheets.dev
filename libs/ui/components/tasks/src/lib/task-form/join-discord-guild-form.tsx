import { DoneOutline, OpenInNew } from '@mui/icons-material';
import { Button } from '@mui/material';
import { IntegrationProvider } from '@prisma/client';
import { trpc } from '@worksheets/trpc-charity';
import { Column } from '@worksheets/ui/components/flex';
import { DiscordIntegration } from '@worksheets/ui/components/integrations';
import { useSnackbar } from '@worksheets/ui/components/snackbar';
import { TaskFormProps } from '@worksheets/util/tasks';
import { parseTRPCClientErrorMessage } from '@worksheets/util/trpc';
import React from 'react';

import { QuestCompleteNotice } from './quest-complete-notice';

export const JoinDiscordGuildForm: React.FC<TaskFormProps> = ({
  task,
  actions,
}) => {
  return (
    <Column>
      {task.status === 'COMPLETED' ? (
        <QuestCompleteNotice />
      ) : (
        <Column gap={2}>
          <DiscordIntegration />
          <JoinGuild
            task={task}
            onComplete={() => actions.onSubmit({ repetitions: 1 })}
          />
        </Column>
      )}
    </Column>
  );
};

const JoinGuild: React.FC<{
  task: TaskFormProps['task'];
  onComplete: () => void;
}> = ({ task, onComplete }) => {
  const snackbar = useSnackbar();
  const user = trpc.user.integrations.oauth.identity.useQuery(
    IntegrationProvider.DISCORD
  );
  const isGuildMember =
    trpc.user.integrations.discord.isGuildMember.useMutation();

  if (user.isLoading || user.isError || !user.data) return null;

  const handleClick = async () => {
    try {
      const result = await isGuildMember.mutateAsync({
        guildId: task.data.guildId,
      });
      if (result) {
        snackbar.success('Quest completed!');
        onComplete();
      } else {
        snackbar.error(
          'Failed to complete task. Are you following the correct user?'
        );
      }
    } catch (error) {
      snackbar.error(parseTRPCClientErrorMessage(error));
    }
  };

  return (
    <Column gap={2}>
      <Button
        href={task.data.invite}
        target="_blank"
        variant="arcade"
        color="primary"
        startIcon={<OpenInNew />}
      >
        {task.name}
      </Button>
      <Button
        onClick={handleClick}
        variant="arcade"
        color="success"
        startIcon={<DoneOutline />}
      >
        Claim Reward
      </Button>
    </Column>
  );
};
