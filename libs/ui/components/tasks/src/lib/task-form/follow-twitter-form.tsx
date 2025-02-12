import { DoneOutline, OpenInNew } from '@mui/icons-material';
import { Button } from '@mui/material';
import { Column } from '@worksheets/ui/components/flex';
import { useSnackbar } from '@worksheets/ui/components/snackbar';
import { TaskFormProps } from '@worksheets/util/tasks';
import { parseTRPCClientErrorMessage } from '@worksheets/util/trpc';

import { IntegrationDisclaimer } from '../shared/disclaimer';
import { TaskCompleteNotice } from './task-complete-notice';

export const FollowTwitterForm: React.FC<TaskFormProps> = ({
  task,
  actions,
}) => {
  return (
    <Column>
      {task.status === 'COMPLETED' ? (
        <TaskCompleteNotice />
      ) : (
        <Column gap={2}>
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

  const handleClick = async () => {
    try {
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
      <IntegrationDisclaimer provider="Twitter" />
    </Column>
  );
};
