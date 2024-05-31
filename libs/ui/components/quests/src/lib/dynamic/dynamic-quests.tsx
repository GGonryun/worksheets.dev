import { InfoOutlined, OfflinePin } from '@mui/icons-material';
import { Button, Typography } from '@mui/material';
import { CharityGamesLogo } from '@worksheets/icons/native';
import { routes } from '@worksheets/routes';
import { trpc } from '@worksheets/trpc-charity';
import { ErrorComponent } from '@worksheets/ui/components/errors';
import { Column, Row } from '@worksheets/ui/components/flex';
import {
  InventoryItem,
  ItemModalLayout,
  QuestLootDescription,
} from '@worksheets/ui/components/items';
import { LoadingBar } from '@worksheets/ui/components/loading';
import { useSnackbar } from '@worksheets/ui/components/snackbar';
import { isTaskComplete, TaskModal } from '@worksheets/ui/components/tasks';
import { fireAndForget } from '@worksheets/util/promises';
import { QuestSchema, TaskInputSchema } from '@worksheets/util/tasks';
import { parseTRPCClientErrorMessage } from '@worksheets/util/trpc';
import dynamic from 'next/dynamic';
import React, { useEffect } from 'react';

import { QuestItem } from '../components/quest-item';

const Container: React.FC = () => {
  const snackbar = useSnackbar();
  const utils = trpc.useUtils();
  const tokens = trpc.user.inventory.quantity.useQuery('1');
  const track = trpc.user.tasks.quests.track.useMutation();
  const quests = trpc.user.tasks.quests.list.useInfiniteQuery(
    {
      // TODO: this might overwhelm the server, lower the limit per page if needed
      limit: 10,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      initialCursor: 0,
    }
  );

  const [loading, setLoading] = React.useState(false);
  const [dirty, setDirty] = React.useState<string[]>([]);
  const [questId, setQuestId] = React.useState<string | undefined>(undefined);

  useEffect(() => {
    if (!quests.isRefetching) {
      setDirty([]);
    }
  }, [quests.isRefetching]);

  const updateState = async (qid: string) => {
    tokens.refetch();
    setDirty((prev) => [...prev, qid]);
    await utils.user.tasks.quests.list.refetch();
  };

  const handleSubmit = async (input: TaskInputSchema) => {
    if (!questId) return;

    try {
      await track.mutateAsync({
        questId,
        ...input,
      });
      snackbar.success('Quest completed!');
      setQuestId(undefined);
    } catch (error) {
      snackbar.error(parseTRPCClientErrorMessage(error));
    }

    fireAndForget(updateState(questId));
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
                {quest.loot.map((l) => (
                  <InventoryInformation
                    key={l.item.id}
                    loot={l}
                    status={quest.status}
                  />
                ))}
              </Row>
            </Column>
          }
        />
      )}
    </>
  );
};

const InventoryInformation: React.FC<{
  loot: QuestSchema['loot'][number];
  status: QuestSchema['status'];
}> = ({ loot, status }) => {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <InventoryItem
        icon={
          isTaskComplete(status) && (
            <OfflinePin
              color="success"
              sx={{
                borderRadius: '50%',
                backgroundColor: 'white.main',
              }}
            />
          )
        }
        size={64}
        item={{ ...loot, ...loot.item }}
        onClick={() => setOpen(true)}
      />
      <ItemModalLayout
        item={loot.item}
        open={open}
        onClose={() => setOpen(false)}
        content={<QuestLootDescription loot={loot} />}
        action={
          <Button
            fullWidth
            variant="arcade"
            size="small"
            startIcon={<InfoOutlined />}
            href={routes.item.path({ params: { itemId: loot.item.id } })}
          >
            Details
          </Button>
        }
      />
    </>
  );
};

export const DynamicQuests = dynamic(() => Promise.resolve(Container), {
  ssr: false,
  loading: () => <LoadingBar />,
});
