import { trpc } from '@worksheets/trpc-charity';
import { PulsingLogo } from '@worksheets/ui/components/loading';
import { useSnackbar } from '@worksheets/ui/components/snackbar';
import { parseTRPCClientErrorMessage } from '@worksheets/util/trpc';
import dynamic from 'next/dynamic';
import React from 'react';

import { QuestForm } from '../components/quest-form';
import {
  ErrorQuestItem,
  LoadingQuestItem,
  QuestItem,
} from '../components/quest-item';
import { QuestModal } from '../components/quest-modal';

const Container: React.FC<{ questId: string }> = ({ questId }) => {
  const snackbar = useSnackbar();
  const [open, setOpen] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
  const tokens = trpc.user.inventory.quantity.useQuery('1');
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

  // TODO: type safety gets bricked here.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = async (input: any) => {
    try {
      setSubmitting(true);
      await track.mutateAsync({ questId, input });
      await quest.refetch();
      await tokens.refetch();
      snackbar.success('Quest completed!');
    } catch (error) {
      snackbar.error(parseTRPCClientErrorMessage(error));
    } finally {
      setSubmitting(false);
      setOpen(false);
    }
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <QuestItem {...quest.data} onClick={() => setOpen(true)} />
      <QuestModal open={open} quest={quest.data} onClose={() => setOpen(false)}>
        {submitting ? (
          <PulsingLogo />
        ) : (
          <QuestForm
            quest={quest.data}
            actions={{
              onSubmit: handleSubmit,
              onCancel: handleCancel,
            }}
          />
        )}
      </QuestModal>
    </>
  );
};

export const DynamicQuest = dynamic(() => Promise.resolve(Container), {
  ssr: false,
  loading: () => <LoadingQuestItem />,
});
