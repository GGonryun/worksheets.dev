import { Typography } from '@mui/material';
import { Column } from '@worksheets/ui/components/flex';

export const QuestCompleteNotice: React.FC = () => {
  return (
    <Column my={1}>
      <Typography
        variant="h6"
        textAlign="center"
        fontWeight={700}
        color="text.secondary"
      >
        Task Complete!
      </Typography>
    </Column>
  );
};
