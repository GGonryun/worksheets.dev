import { InfoOutlined, OfflinePin } from '@mui/icons-material';
import { Button } from '@mui/material';
import { routes } from '@worksheets/routes';
import { trpc } from '@worksheets/trpc-charity';
import { Column, Row } from '@worksheets/ui/components/flex';
import {
  InventoryItem,
  ItemModalLayout,
  QuestLootDescription,
} from '@worksheets/ui/components/items';
import { useSnackbar } from '@worksheets/ui/components/snackbar';
import { isTaskComplete, TaskModal } from '@worksheets/ui/components/tasks';
import { QuestSchema } from '@worksheets/util/tasks';
import { parseTRPCClientErrorMessage } from '@worksheets/util/trpc';
import dynamic from 'next/dynamic';
import React from 'react';

import { LoadingQuestItem, QuestItem } from '../components/quest-item';

const Container: React.FC<{ quest: QuestSchema }> = ({ quest }) => {
  const snackbar = useSnackbar();
  const [open, setOpen] = React.useState(false);
  const utils = trpc.useUtils();
  const tokens = trpc.user.inventory.quantity.useQuery('1');
  const track = trpc.user.tasks.trackQuest.useMutation();

  const handleSubmit = async (input: { repetitions: number }) => {
    try {
      await track.mutateAsync({ questId: quest.questId, ...input });
      snackbar.success('Quest completed!');
      setOpen(false);
    } catch (error) {
      snackbar.error(parseTRPCClientErrorMessage(error));
    }

    await Promise.all([
      utils.user.tasks.listQuests.invalidate(),
      tokens.refetch(),
    ]);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <QuestItem {...quest} onClick={() => setOpen(true)} />
      <TaskModal
        open={open}
        task={quest}
        onClose={() => setOpen(false)}
        actions={{
          onSubmit: handleSubmit,
          onCancel: handleCancel,
        }}
        isLoading={track.isLoading}
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
      ></TaskModal>
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

export const DynamicQuest = dynamic(() => Promise.resolve(Container), {
  ssr: false,
  loading: () => <LoadingQuestItem />,
});
