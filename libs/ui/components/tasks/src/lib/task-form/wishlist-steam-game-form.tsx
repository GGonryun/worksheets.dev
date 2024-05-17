import { DoneOutline, OpenInNew } from '@mui/icons-material';
import { Button } from '@mui/material';
import { IntegrationProvider } from '@prisma/client';
import { trpc } from '@worksheets/trpc-charity';
import { Column } from '@worksheets/ui/components/flex';
import { SteamIntegration } from '@worksheets/ui/components/integrations';
import { useSnackbar } from '@worksheets/ui/components/snackbar';
import { TaskFormProps } from '@worksheets/util/tasks';
import { parseTRPCClientErrorMessage } from '@worksheets/util/trpc';
import React from 'react';

import { QuestCompleteNotice } from './quest-complete-notice';

export const WishlistSteamGameForm: React.FC<TaskFormProps> = ({
  task,
  actions,
}) => {
  return (
    <Column>
      {task.status === 'COMPLETED' ? (
        <QuestCompleteNotice />
      ) : (
        <Column gap={2}>
          <SteamIntegration />
          <WishlistGame
            task={task}
            onComplete={() => actions.onSubmit({ repetitions: 1 })}
          />
        </Column>
      )}
    </Column>
  );
};

const WishlistGame: React.FC<{
  task: TaskFormProps['task'];
  onComplete: () => void;
}> = ({ task, onComplete }) => {
  const snackbar = useSnackbar();
  const user = trpc.user.integrations.apiKey.identity.useQuery(
    IntegrationProvider.STEAM
  );
  const hasGameInWishlist =
    trpc.user.integrations.steam.hasGameInWishlist.useMutation();

  if (user.isLoading || user.isError || !user.data) return null;

  const handleClick = async () => {
    try {
      const result = await hasGameInWishlist.mutateAsync({
        appId: task.data.appId,
      });
      if (result) {
        snackbar.success('Quest completed!');
        onComplete();
      } else {
        snackbar.error(
          'Failed to complete quest. Did you add the game to your wishlist?'
        );
      }
    } catch (error) {
      snackbar.error(parseTRPCClientErrorMessage(error));
    }
  };

  return (
    <Column gap={2}>
      <Button
        href={`https://store.steampowered.com/app/${task.data.appId}`}
        target="_blank"
        variant="arcade"
        color="primary"
        startIcon={<OpenInNew />}
      >
        Add To Wishlist
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
