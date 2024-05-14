import { DoneOutline, OpenInNew } from '@mui/icons-material';
import { Button } from '@mui/material';
import { IntegrationProvider } from '@prisma/client';
import { trpc } from '@worksheets/trpc-charity';
import { Column } from '@worksheets/ui/components/flex';
import { TwitchIntegration } from '@worksheets/ui/components/integrations';
import { useSnackbar } from '@worksheets/ui/components/snackbar';
import { parseTRPCClientErrorMessage } from '@worksheets/util/trpc';
import { DetailedQuestSchema, QuestFormActions } from '@worksheets/util/types';
import React from 'react';

import { QuestCompleteNotice } from './quest-complete-notice';

export const FollowTwitchQuestForm: React.FC<{
  quest: DetailedQuestSchema<'FOLLOW_TWITCH'>;
  actions: QuestFormActions<'FOLLOW_TWITCH'>;
}> = ({ quest, actions }) => {
  return (
    <Column>
      {quest.status === 'COMPLETED' ? (
        <QuestCompleteNotice />
      ) : (
        <Column gap={2}>
          <TwitchIntegration />
          <FollowUser quest={quest} onComplete={() => actions.onSubmit({})} />
        </Column>
      )}
    </Column>
  );
};

const FollowUser: React.FC<{
  quest: DetailedQuestSchema<'FOLLOW_TWITCH'>;
  onComplete: () => void;
}> = ({ quest, onComplete }) => {
  const snackbar = useSnackbar();
  const user = trpc.user.integrations.oauth.identity.useQuery(
    IntegrationProvider.TWITCH
  );
  const following = trpc.user.integrations.twitch.isFollowing.useMutation();

  if (user.isLoading || user.isError || !user.data) return null;

  const handleClick = async () => {
    try {
      const result = await following.mutateAsync({
        broadcaster: quest.data.handle,
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
        href={`https://twitch.tv/${quest.data.handle}`}
        target="_blank"
        variant="arcade"
        color="primary"
        startIcon={<OpenInNew />}
      >
        Follow {quest.data.handle}
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
