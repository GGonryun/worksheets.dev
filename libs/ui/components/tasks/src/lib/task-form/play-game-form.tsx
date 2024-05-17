import { OpenInNew } from '@mui/icons-material';
import { Button, Typography } from '@mui/material';
import { MAX_INT } from '@worksheets/prisma';
import { routes } from '@worksheets/routes';
import { Column, Row } from '@worksheets/ui/components/flex';
import { calculatePercentage } from '@worksheets/util/numbers';
import { TaskFormProps } from '@worksheets/util/tasks';

import { selectTaskColor } from '../util';
import { ProgressBar } from './progress-bar';

export const PlayGameForm: React.FC<TaskFormProps> = ({ task }) => {
  const colorKey = selectTaskColor(task.status);
  return (
    <Column gap={2}>
      <Column gap={0.5}>
        <Row justifyContent="space-between">
          <Typography variant="body3" fontWeight={500}>
            Progress
          </Typography>
          <Typography variant="body3" fontWeight={500}>
            {task.repetitions}/
            {task.maxRepetitions < MAX_INT ? task.maxRepetitions : '∞'}
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
      <Button
        variant="arcade"
        color={colorKey}
        href={routes.play.path()}
        startIcon={<OpenInNew />}
        target="_blank"
      >
        Play Now!
      </Button>
    </Column>
  );
};
