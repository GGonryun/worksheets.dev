import { DoneOutline, OpenInNew } from '@mui/icons-material';
import { Button, Typography } from '@mui/material';
import { IntegrationProvider } from '@prisma/client';
import { trpc } from '@worksheets/trpc-charity';
import { Column } from '@worksheets/ui/components/flex';
import { TwitterIntegration } from '@worksheets/ui/components/integrations';
import { useSnackbar } from '@worksheets/ui/components/snackbar';
import { TaskFormProps } from '@worksheets/util/tasks';
import { parseTRPCClientErrorMessage } from '@worksheets/util/trpc';

import { QuestCompleteNotice } from './quest-complete-notice';

export const FollowTwitterForm: React.FC<TaskFormProps> = ({
  task,
  actions,
}) => {
  return (
    <Column>
      {task.status === 'COMPLETED' ? (
        <QuestCompleteNotice />
      ) : (
        <Column gap={2}>
          <TwitterIntegration />
          <FollowUser
            task={task}
            onComplete={() => actions.onSubmit({ repetitions: 1 })}
          />
        </Column>
      )}
    </Column>
  );
};

const FollowUser: React.FC<{
  task: TaskFormProps['task'];
  onComplete: () => void;
}> = ({ task, onComplete }) => {
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
        href={`https://twitter.com/intent/follow?screen_name=${task.data.handle}`}
        target="_blank"
        variant="arcade"
        color="primary"
        startIcon={<OpenInNew />}
      >
        Follow @{task.data.handle}
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
