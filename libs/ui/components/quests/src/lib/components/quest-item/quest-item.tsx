import {
  formatTaskExpiration,
  formatTaskFrequencyLabel,
  selectTaskColor,
  selectTaskStatusIcon,
} from '@worksheets/ui/components/tasks';
import { QuestSchema } from '@worksheets/util/tasks';

import { LoadingQuestItem } from './loading-quest-item';
import { QuestItemLayout } from './quest-item-layout';

export const QuestItem: React.FC<
  QuestSchema & { onClick: () => void; dirty: boolean }
> = (props) => {
  const Icon = selectTaskStatusIcon(props.status, props.type);
  const color = selectTaskColor(props.status);
  const frequency = formatTaskFrequencyLabel(props.frequency);
  const expiration = formatTaskExpiration(props.frequency, props.expiresAt);

  return props.dirty ? (
    <LoadingQuestItem />
  ) : (
    <QuestItemLayout
      onClick={props.onClick}
      color={color}
      Icon={Icon}
      name={props.name}
      frequency={frequency}
      expiration={expiration}
      loot={props.loot}
    />
  );
};
