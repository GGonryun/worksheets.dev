import { Button, Typography } from '@mui/material';
import { CharityGamesLogo } from '@worksheets/icons/native';
import { trpc } from '@worksheets/trpc-charity';
import { ErrorComponent } from '@worksheets/ui/components/errors';
import { Column, Row } from '@worksheets/ui/components/flex';
import {
  InventoryInformation,
  InventoryItem,
} from '@worksheets/ui/components/items';
import { LoadingBar } from '@worksheets/ui/components/loading';
import { useSnackbar } from '@worksheets/ui/components/snackbar';
import { isTaskComplete, TaskModal } from '@worksheets/ui/components/tasks';
import { fireAndForget } from '@worksheets/util/promises';
import { TaskInputSchema } from '@worksheets/util/tasks';
import { NO_REFETCH, parseTRPCClientErrorMessage } from '@worksheets/util/trpc';
import dynamic from 'next/dynamic';
import React, { useEffect } from 'react';

import { QuestItem } from '../components/quest-item';

const Container: React.FC = () => {
  const snackbar = useSnackbar();
  const utils = trpc.useUtils();
  const tokens = trpc.user.inventory.quantity.useQuery('1', NO_REFETCH);
  const track = trpc.user.tasks.quests.track.useMutation();
  const quests = trpc.user.tasks.quests.list.useInfiniteQuery(
    {
      // TODO: this might overwhelm the server, lower the limit per page if needed
      limit: 10,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      initialCursor: 0,
      ...NO_REFETCH,
    }
  );

  const [loading, setLoading] = React.useState(false);
  const [dirty, setDirty] = React.useState<string[]>([]);
  const [questId, setQuestId] = React.useState<string | undefined>(undefined);

  useEffect(() => {
    if (!quests.isRefetching && !quests.isFetching) {
      setDirty([]);
    }
  }, [quests.isRefetching, quests.isFetching]);

  const handleSubmit = async (input: TaskInputSchema) => {
    if (!questId) return;

    try {
      setDirty((prev) => [...prev, questId]);
      setQuestId(undefined);
      await track.mutateAsync({
        questId,
        ...input,
      });
      snackbar.success('Quest completed!');
    } catch (error) {
      snackbar.error(parseTRPCClientErrorMessage(error));
    }

    fireAndForget(
      Promise.all([tokens.refetch(), utils.user.tasks.quests.list.refetch()])
    );
  };

  if (quests.isLoading) {
    return <LoadingBar />;
  }

  if (quests.isError) {
    return <ErrorComponent />;
  }

  const quest = questId
    ? quests.data.pages
        .flatMap((p) => p.items)
        .find((q) => q.questId === questId)
    : null;

  const isEmpty = quests.data.pages.every((p) => p.items.length === 0);

  return (
    <>
      <Column gap={2}>
        <Column gap={1}>
          {isEmpty && (
            <Column alignItems="center">
              <Typography variant="h6">No quests found</Typography>
              <CharityGamesLogo size={128} />
            </Column>
          )}
          {quests.data.pages.map((quests) =>
            quests.items.map((quest) => (
              <QuestItem
                key={quest.questId}
                {...quest}
                onClick={() => setQuestId(quest.questId)}
                dirty={dirty.includes(quest.questId)}
              />
            ))
          )}
        </Column>
        {quests.hasNextPage && (
          <Button
            disabled={loading || !quests.hasNextPage}
            variant="arcade"
            color={'secondary'}
            onClick={async () => {
              try {
                setLoading(true);
                await quests.fetchNextPage();
              } finally {
                setLoading(false);
              }
            }}
          >
            {loading ? 'Loading...' : 'Load More'}
          </Button>
        )}
      </Column>
      {quest && (
        <TaskModal
          open={true}
          task={quest}
          onClose={() => setQuestId(undefined)}
          actions={{
            onSubmit: handleSubmit,
            onCancel: () => setQuestId(undefined),
          }}
          isLoading={track.isLoading && dirty.includes(quest.questId)}
          rewards={
            <Column mt={2}>
              <Row mx={1} gap={2} flexWrap="wrap">
                {quest.loot.length > 0
                  ? quest.loot.map((l) => (
                      <InventoryInformation
                        key={l.item.id}
                        loot={l}
                        checked={isTaskComplete(quest.status)}
                      />
                    ))
                  : Array.from({ length: 3 }).map((_, i) => (
                      <InventoryItem key={i} size={64} />
                    ))}
              </Row>
            </Column>
          }
        />
      )}
    </>
  );
};

export const DynamicQuests = dynamic(() => Promise.resolve(Container), {
  ssr: false,
  loading: () => <LoadingBar />,
});
