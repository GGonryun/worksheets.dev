import { OpenInNew } from '@mui/icons-material';
import { Button } from '@mui/material';
import { routes } from '@worksheets/routes';
import { Column } from '@worksheets/ui/components/flex';
import { TaskFormProps } from '@worksheets/util/tasks';

import { selectTaskColor } from '../util';

export const SubmitLeaderboardScore: React.FC<TaskFormProps> = ({ task }) => {
  const colorKey = selectTaskColor(task.status);
  const gameId = task.gameId;
  return (
    <Column gap={2}>
      <Button
        variant="arcade"
        color={colorKey}
        href={
          gameId
            ? routes.game.path({
                params: {
                  gameId,
                },
              })
            : routes.play.path()
        }
        startIcon={<OpenInNew />}
        target="_blank"
      >
        Play Now!
      </Button>
    </Column>
  );
};
