import { InfoOutlined } from '@mui/icons-material';
import { ItemId } from '@worksheets/data/items';
import { contestsRoutes, helpRoutes } from '@worksheets/routes';
import { trpc } from '@worksheets/trpc-charity';
import { Column } from '@worksheets/ui/components/flex';
import { BulletPoints } from '@worksheets/ui/components/lists';
import { LoadingBar } from '@worksheets/ui/components/loading';
import { PanelFooter } from '@worksheets/ui/components/panels';
import { useSnackbar } from '@worksheets/ui/components/snackbar';
import { NO_REFETCH, parseTRPCClientErrorMessage } from '@worksheets/util/trpc';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

import { DynamicItemsHeader } from './dynamic-items-header';
import { DynamicItemsGroup } from './inventory-item';
import { DynamicItemModal } from './inventory-item/dynamic-item-modal';

const Container = () => {
  const [itemId, setItemId] = useState<string | undefined>(undefined);
  const [dirty, setDirty] = useState<string[]>([]);
  const snackbar = useSnackbar();

  const activate = trpc.user.inventory.activate.useMutation();
  const closeCapsule = trpc.user.inventory.capsule.close.useMutation();
  const decrement = trpc.user.inventory.decrement.useMutation();
  const share = trpc.user.inventory.share.useMutation();
  const inventory = trpc.user.inventory.items.useQuery(undefined, NO_REFETCH);
  const tokens = trpc.user.inventory.quantity.useQuery('1');
  const items = inventory.data ?? [];
  const item = items?.find((item) => item.itemId === (itemId as ItemId));

  const isLoading =
    inventory.isRefetching ||
    inventory.isFetching ||
    decrement.isPending ||
    closeCapsule.isPending ||
    share.isPending ||
    activate.isPending;

  useEffect(() => {
    if (!isLoading) {
      setDirty([]);
    }
  }, [isLoading]);

  const addDirty = (itemId: string) => {
    setDirty((prev) => [...prev, itemId]);
  };

  const clearSelection = () => {
    setItemId(undefined);
  };

  const handleConsume = async (itemId: ItemId, quantity: number) => {
    try {
      addDirty(itemId);
      clearSelection();
      const result = await decrement.mutateAsync({
        itemId,
        quantity,
      });
      tokens.refetch();
      inventory.refetch();
      snackbar.success(result);
    } catch (error) {
      snackbar.error(parseTRPCClientErrorMessage(error));
    }
  };

  const handleCloseCapsule = async (itemId: ItemId) => {
    try {
      addDirty(itemId);
      clearSelection();
      await closeCapsule.mutateAsync({ itemId });
      inventory.refetch();
      snackbar.success('You have closed this capsule!');
    } catch (error) {
      snackbar.error(parseTRPCClientErrorMessage(error));
    }
  };

  const handleDirty = async (itemId: ItemId) => {
    addDirty(itemId);
    inventory.refetch();
  };

  const handleShare = async (
    friendshipId: string,
    itemId: ItemId,
    quantity: number
  ) => {
    try {
      addDirty(itemId);
      clearSelection();
      const message = await share.mutateAsync({
        friendshipId,
        itemId,
        quantity,
      });
      inventory.refetch();
      snackbar.success(message);
    } catch (error) {
      snackbar.error(parseTRPCClientErrorMessage(error));
    }
  };

  return (
    <>
      <Column gap={2}>
        <Column>
          <DynamicItemsHeader />
          <DynamicItemsGroup
            items={items}
            isLoading={inventory.isLoading}
            onClick={(item) => setItemId(item)}
            dirty={dirty}
          />
        </Column>
        <BulletPoints
          icon={<InfoOutlined fontSize="small" color="info" />}
          title={'How It Works'}
          points={[
            `Click on an item to view more details.`,
            `Prizes that you win will be stored here until claimed.`,
            `Some items will expire from your inventory if not claimed.`,
          ]}
        />

        <PanelFooter
          learn={{
            text: 'Inventory Items',
            href: helpRoutes.inventory.url(),
          }}
          action={{
            text: 'Win Prizes',
            href: contestsRoutes.raffles.url(),
            color: 'secondary',
          }}
        />
      </Column>

      {item && (
        <DynamicItemModal
          item={item}
          onDirty={handleDirty}
          onConsume={handleConsume}
          onCloseCapsule={handleCloseCapsule}
          onClose={clearSelection}
          onShare={handleShare}
        />
      )}
    </>
  );
};

export const DynamicInventorySection = dynamic(
  () => Promise.resolve(Container),
  {
    ssr: false,
    loading: () => <LoadingBar />,
  }
);
