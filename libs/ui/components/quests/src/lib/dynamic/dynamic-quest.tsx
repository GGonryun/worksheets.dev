import { trpc } from '@worksheets/trpc-charity';
import { useSnackbar } from '@worksheets/ui/components/snackbar';
import { parseTRPCClientErrorMessage } from '@worksheets/util/trpc';
import { Quest, QuestFormActions, QuestId } from '@worksheets/util/types';
import dynamic from 'next/dynamic';
import React from 'react';

import { QuestForm } from '../components/quest-form';
import {
  ErrorQuestItem,
  LoadingQuestItem,
  QuestItem,
} from '../components/quest-item';
import { QuestModal } from '../components/quest-modal';

const Container: React.FC<{ questId: QuestId }> = ({ questId }) => {
  const snackbar = useSnackbar();
  const tokens = trpc.user.inventory.quantity.useQuery('tokens');
  const quest = trpc.user.quests.find.useQuery(
    {
      questId,
    },
    {
      retry: false,
    }
  );
  const track = trpc.user.quests.track.useMutation();

  if (quest.isLoading) {
    return <LoadingQuestItem />;
  }

  if (quest.isError) {
    return <ErrorQuestItem onClick={async () => await quest.refetch()} />;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = async (input: any) => {
    try {
      await track.mutateAsync({ questId, input });
      await quest.refetch();
      await tokens.refetch();
      snackbar.success('Quest completed!');
    } catch (error) {
      snackbar.error(parseTRPCClientErrorMessage(error));
    }
  };

  return (
    <QuestContainer
      quest={quest.data}
      actions={{
        onSubmit: handleSubmit,
        onCancel: () => {
          // no-op
        },
      }}
    />
  );
};

function QuestContainer<T extends Quest>({
  quest,
  actions,
}: {
  quest: T;
  actions: QuestFormActions<T['type']>;
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <QuestItem {...quest} onClick={() => setOpen(true)} />
      <QuestModal open={open} quest={quest} onClose={() => setOpen(false)}>
        <QuestForm
          quest={quest}
          actions={{
            // TODO: type safety gets bricked here.
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onSubmit: (payload: any) => {
              actions.onSubmit(payload);
              setOpen(false);
            },
            onCancel: () => {
              actions.onCancel();
              setOpen(false);
            },
          }}
        />
      </QuestModal>
    </>
  );
}

export const DynamicQuest = dynamic(() => Promise.resolve(Container), {
  ssr: false,
  loading: () => <LoadingQuestItem />,
});
