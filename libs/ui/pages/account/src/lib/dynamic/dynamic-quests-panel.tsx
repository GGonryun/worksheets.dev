import { trpc } from '@worksheets/trpc-charity';
import { ErrorComponent } from '@worksheets/ui/components/errors';
import { LoadingBar } from '@worksheets/ui/components/loading';
import { DynamicQuests } from '@worksheets/ui/components/quests';
import dynamic from 'next/dynamic';

import { QuestsPanel } from '../panels/quests-panel/quests-panel';

const QuestsPanelContainer = () => {
  const tokens = trpc.user.inventory.quantity.useQuery('1');

  if (tokens.isLoading) return <LoadingBar />;

  if (tokens.error) return <ErrorComponent />;

  return (
    <QuestsPanel tokens={tokens.data}>
      <DynamicQuests />
    </QuestsPanel>
  );
};

export const DynamicQuestPanel = dynamic(
  () => Promise.resolve(QuestsPanelContainer),
  {
    ssr: false,
    loading: () => <LoadingBar />,
  }
);
