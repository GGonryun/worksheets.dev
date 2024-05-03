import { WatchAdvertisement } from '@worksheets/ui/components/advertisements';
import { DetailedQuestSchema, QuestFormActions } from '@worksheets/util/types';
import React from 'react';

import { isQuestComplete } from '../../util';

export const WatchAdQuestForm: React.FC<{
  quest: DetailedQuestSchema<'WATCH_AD'>;
  actions: QuestFormActions<'WATCH_AD'>;
}> = ({ quest, actions }) => {
  const completed = isQuestComplete(quest.status);

  return (
    <WatchAdvertisement
      network={quest.data.network}
      onSubmit={() => actions.onSubmit({})}
      disabled={completed}
    />
  );
};
