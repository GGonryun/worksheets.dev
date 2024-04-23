import { Cached } from '@mui/icons-material';

import { QuestItemLayout } from './quest-item-layout';

export const LoadingQuestItem: React.FC = () => (
  <QuestItemLayout color="warning" Icon={Cached} name="Loading..." />
);
