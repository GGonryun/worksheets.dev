import { DoneOutline, OpenInNew } from '@mui/icons-material';
import { Button } from '@mui/material';
import { IntegrationProvider } from '@prisma/client';
import { trpc } from '@worksheets/trpc-charity';
import { Column } from '@worksheets/ui/components/flex';
import { DiscordIntegration } from '@worksheets/ui/components/integrations';
import { useSnackbar } from '@worksheets/ui/components/snackbar';
import { parseTRPCClientErrorMessage } from '@worksheets/util/trpc';
import { DetailedQuestSchema, QuestFormActions } from '@worksheets/util/types';
import React from 'react';

import { QuestCompleteNotice } from './quest-complete-notice';

export const JoinDiscordGuildQuestForm: React.FC<{
  quest: DetailedQuestSchema<'JOIN_DISCORD_GUILD'>;
  actions: QuestFormActions<'JOIN_DISCORD_GUILD'>;
}> = ({ quest, actions }) => {
  return (
    <Column>
      {quest.status === 'COMPLETED' ? (
        <QuestCompleteNotice />
      ) : (
        <Column gap={2}>
          <DiscordIntegration />
          <JoinGuild quest={quest} onComplete={() => actions.onSubmit({})} />
        </Column>
      )}
    </Column>
  );
};

const JoinGuild: React.FC<{
  quest: DetailedQuestSchema<'JOIN_DISCORD_GUILD'>;
  onComplete: () => void;
}> = ({ quest, onComplete }) => {
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
        guildId: quest.data.guildId,
      });
      if (result) {
        snackbar.success('Quest completed!');
        onComplete();
      } else {
        snackbar.error(
          'Failed to complete quest. Are you following the correct user?'
        );
      }
    } catch (error) {
      snackbar.error(parseTRPCClientErrorMessage(error));
    }
  };

  return (
    <Column gap={2}>
      <Button
        href={quest.data.invite}
        target="_blank"
        variant="arcade"
        color="primary"
        startIcon={<OpenInNew />}
      >
        {quest.name}
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
