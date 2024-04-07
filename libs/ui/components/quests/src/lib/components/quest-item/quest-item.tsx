import { Quest } from '@worksheets/util/types';

import {
  formatQuestExpiration,
  formatQuestFrequencyLabel,
  selectQuestColor,
  selectQuestStatusIcon,
} from '../../util';
import { QuestItemLayout } from './quest-item-layout';

export const QuestItem: React.FC<Quest & { onClick: () => void }> = (props) => {
  const Icon = selectQuestStatusIcon(props);
  const color = selectQuestColor(props);
  const frequency = formatQuestFrequencyLabel(props.frequency);
  const expiration = formatQuestExpiration(props);

  return (
    <QuestItemLayout
      onClick={props.onClick}
      color={color}
      Icon={Icon}
      title={props.title}
      frequency={frequency}
      expiration={expiration}
      reward={props.reward}
    />
  );
};
