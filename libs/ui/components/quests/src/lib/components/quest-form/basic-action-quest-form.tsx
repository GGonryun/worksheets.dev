import { Button } from '@mui/material';
import { Column } from '@worksheets/ui/components/flex';
import { DetailedQuestSchema, QuestFormActions } from '@worksheets/util/types';

export const BasicActionQuestForm: React.FC<{
  quest: DetailedQuestSchema<'BASIC_ACTION'>;
  actions: QuestFormActions<'BASIC_ACTION'>;
}> = ({ actions }) => {
  return (
    <Column mt={2}>
      <Button
        variant="arcade"
        onClick={() => {
          actions.onSubmit({});
        }}
      >
        Claim Items
      </Button>
    </Column>
  );
};
