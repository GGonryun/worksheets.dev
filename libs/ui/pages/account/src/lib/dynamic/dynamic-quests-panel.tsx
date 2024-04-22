import { Divider } from '@mui/material';
import { trpc } from '@worksheets/trpc-charity';
import { ErrorComponent } from '@worksheets/ui/components/errors';
import { Column } from '@worksheets/ui/components/flex';
import { DynamicQuests, QuestFilters } from '@worksheets/ui/components/quests';
import { LoadingScreen } from '@worksheets/ui/pages/loading';
import {
  QUEST_CATEGORIES,
  QUEST_FREQUENCIES,
  QuestFilterOptions,
} from '@worksheets/util/types';
import dynamic from 'next/dynamic';
import { useState } from 'react';

import { QuestsPanel } from '../panels/quests-panel/quests-panel';

const STARTING_FILTERS: QuestFilterOptions = {
  statuses: ['ACTIVE', 'PENDING'],
  frequencies: QUEST_FREQUENCIES,
  categories: QUEST_CATEGORIES,
};

const QuestsPanelContainer = () => {
  const tokens = trpc.user.inventory.quantity.useQuery('1');
  const [filters, setFilters] = useState<QuestFilterOptions>(STARTING_FILTERS);

  if (tokens.isLoading) return <LoadingScreen />;

  if (tokens.error) return <ErrorComponent />;

  return (
    <QuestsPanel tokens={tokens.data}>
      <Column gap={2.5}>
        <QuestFilters
          filters={filters}
          onChange={(filters) => {
            setFilters(filters);
          }}
          onReset={() => setFilters(STARTING_FILTERS)}
        />
        <Divider />
        <DynamicQuests {...filters} />
      </Column>
    </QuestsPanel>
  );
};

export const DynamicQuestPanel = dynamic(
  () => Promise.resolve(QuestsPanelContainer),
  {
    ssr: false,
    loading: () => <LoadingScreen />,
  }
);
