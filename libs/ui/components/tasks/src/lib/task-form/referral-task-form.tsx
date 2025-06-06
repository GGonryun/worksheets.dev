import { Typography } from '@mui/material';
import { routes } from '@worksheets/routes';
import { trpc } from '@worksheets/trpc-charity';
import { Column, Row } from '@worksheets/ui/components/flex';
import { ClipboardText } from '@worksheets/ui/components/inputs';
import { PulsingLogo } from '@worksheets/ui/components/loading';
import { calculatePercentage } from '@worksheets/util/numbers';
import { TaskFormProps } from '@worksheets/util/tasks';

import { formatMaxRepetitions, selectTaskColor } from '../util';
import { ProgressBar } from './progress-bar';
import { TaskCompleteNotice } from './task-complete-notice';

export const ReferralTaskForm: React.FC<TaskFormProps> = ({ task }) => {
  if (task.status === 'COMPLETED') {
    return <TaskCompleteNotice />;
  }
  const colorKey = selectTaskColor(task.status);
  return (
    <Column gap={2}>
      <Column gap={0.5}>
        <Row justifyContent="space-between">
          <Typography variant="body3" fontWeight={500}>
            Progress
          </Typography>
          <Typography variant="body3" fontWeight={500}>
            {task.repetitions}/{formatMaxRepetitions(task.maxRepetitions)}
          </Typography>
        </Row>
        <ProgressBar
          value={
            task.maxRepetitions > 0
              ? calculatePercentage(task.repetitions, task.maxRepetitions)
              : 100
          }
          color={colorKey}
        />
      </Column>
      <Typography variant="body2">
        Share your referral link with other users. You will receive bonus
        entries the first time someone else completes a task using your referral
        code.
      </Typography>
      <ReferralCodeSection {...task} />
    </Column>
  );
};

const ReferralCodeSection: React.FC<TaskFormProps['task']> = ({ raffleId }) => {
  const code = trpc.user.referrals.code.useQuery();
  if (code.isPending) return <PulsingLogo />;
  if (code.isError) return <Typography>Error loading user</Typography>;
  return (
    <ClipboardText
      text={routes.ref.url({
        params: {
          code: code.data || '',
        },
        query: raffleId
          ? {
              r: raffleId.toString(),
            }
          : {},
      })}
    />
  );
};
