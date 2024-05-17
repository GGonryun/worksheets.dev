import { OpenInNew } from '@mui/icons-material';
import { Button } from '@mui/material';
import { routes } from '@worksheets/routes';
import { Column } from '@worksheets/ui/components/flex';
import { TaskFormProps } from '@worksheets/util/tasks';

import { isTaskComplete, selectTaskColor } from '../util';

export const RaffleParticipationForm: React.FC<TaskFormProps> = ({ task }) => {
  const complete = isTaskComplete(task.status);
  const colorKey = selectTaskColor(task.status);

  return (
    <Column>
      <Button
        variant="arcade"
        color={colorKey}
        fullWidth
        startIcon={complete ? undefined : <OpenInNew />}
        href={routes.raffles.path()}
        target="_blank"
      >
        {complete ? 'Quest Complete' : 'Join a Raffle'}
      </Button>
    </Column>
  );
};
