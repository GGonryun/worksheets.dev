import { DoneOutline, OpenInNew } from '@mui/icons-material';
import { Button, Typography } from '@mui/material';
import { IntegrationProvider } from '@prisma/client';
import { trpc } from '@worksheets/trpc-charity';
import { Column } from '@worksheets/ui/components/flex';
import { TwitterIntegration } from '@worksheets/ui/components/integrations';
import { useSnackbar } from '@worksheets/ui/components/snackbar';
import { parseTRPCClientErrorMessage } from '@worksheets/util/trpc';
import { DetailedQuestSchema, QuestFormActions } from '@worksheets/util/types';

import { QuestCompleteNotice } from './quest-complete-notice';

export const FollowTwitterQuestForm: React.FC<{
  quest: DetailedQuestSchema<'FOLLOW_TWITTER'>;
  actions: QuestFormActions<'FOLLOW_TWITTER'>;
}> = ({ quest, actions }) => {
  return (
    <Column>
      {quest.status === 'COMPLETED' ? (
        <QuestCompleteNotice />
      ) : (
        <Column gap={2}>
          <TwitterIntegration />
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
    IntegrationProvider.TWITTER
  );

  if (user.isLoading || user.isError || !user.data) return null;

  const handleClick = async () => {
    try {
      // TODO: twitter follows need verification.
      snackbar.success('Quest completed!');
      onComplete();
    } catch (error) {
      snackbar.error(parseTRPCClientErrorMessage(error));
    }
  };

  return (
    <Column gap={2}>
      <Button
        href={`https://twitter.com/intent/follow?screen_name=${quest.data.handle}`}
        target="_blank"
        variant="arcade"
        color="primary"
        startIcon={<OpenInNew />}
      >
        Follow @{quest.data.handle}
      </Button>
      <Button
        onClick={handleClick}
        variant="arcade"
        color="success"
        startIcon={<DoneOutline />}
      >
        Claim Reward
      </Button>
      <Typography
        variant="body2"
        fontWeight={500}
        color="text.secondary"
        fontStyle={'italic'}
      >
        <u>Disclaimer:</u> Twitter quests use manual verification. Please
        complete all quests honestly, if you are caught cheating the system,
        your account will be banned and all rewards will be forfeited.
      </Typography>
    </Column>
  );
};
