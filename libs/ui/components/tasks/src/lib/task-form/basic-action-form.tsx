import { Button } from '@mui/material';
import { Column } from '@worksheets/ui/components/flex';
import { TaskFormProps } from '@worksheets/util/tasks';

import { QuestCompleteNotice } from './quest-complete-notice';

export const BasicActionForm: React.FC<TaskFormProps> = ({ task, actions }) => {
  if (task.status === 'COMPLETED') {
    return <QuestCompleteNotice />;
  }

  return (
    <Column mt={2}>
      <Button
        variant="arcade"
        onClick={() => {
          actions.onSubmit({ repetitions: 1 });
        }}
      >
        Claim Items
      </Button>
    </Column>
  );
};
