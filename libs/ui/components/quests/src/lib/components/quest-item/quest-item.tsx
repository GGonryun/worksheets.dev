import { DetailedQuestSchema } from '@worksheets/util/types';

import {
  formatQuestExpiration,
  formatQuestFrequencyLabel,
  selectQuestColor,
  selectQuestStatusIcon,
} from '../../util';
import { QuestItemLayout } from './quest-item-layout';

export const QuestItem: React.FC<
  DetailedQuestSchema & { onClick: () => void }
> = (props) => {
  const Icon = selectQuestStatusIcon(props.status, props.type);
  const color = selectQuestColor(props.status);
  const frequency = formatQuestFrequencyLabel(props.frequency);
  const expiration = formatQuestExpiration(props.frequency, props.expiresAt);

  return (
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
