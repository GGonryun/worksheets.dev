import { ErrorOutline } from '@mui/icons-material';

import { QuestItemLayout } from './quest-item-layout';

export const ErrorQuestItem: React.FC<{ onClick: () => void }> = ({
  onClick,
}) => (
  <QuestItemLayout
    onClick={onClick}
    color="error"
    Icon={ErrorOutline}
    name="Error"
  />
);
