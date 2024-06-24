import { Check, InfoOutlined, SellOutlined } from '@mui/icons-material';
import { Box, Button, Divider, Typography } from '@mui/material';
import { ItemId } from '@worksheets/data/items';
import { routes } from '@worksheets/routes';
import { trpc } from '@worksheets/trpc-charity';
import { Column } from '@worksheets/ui/components/flex';
import { BulletPoints } from '@worksheets/ui/components/lists';
import { LoadingBar } from '@worksheets/ui/components/loading';
import { InfoModal } from '@worksheets/ui/components/modals';
import { PanelFooter } from '@worksheets/ui/components/panels';
import { useSnackbar } from '@worksheets/ui/components/snackbar';
import { NO_REFETCH, parseTRPCClientErrorMessage } from '@worksheets/util/trpc';
import dynamic from 'next/dynamic';
import pluralize from 'pluralize';
import { useEffect, useState } from 'react';

import { DynamicItemsHeader } from './dynamic-items-header';
import { DynamicItemsGroup } from './inventory-item';
import { DynamicItemModal } from './inventory-item/dynamic-item-modal';

const Container = () => {
  const [itemId, setItemId] = useState<string | undefined>(undefined);
  const [isAutoSelling, setIsAutoSelling] = useState<boolean>(false);
  const [dirty, setDirty] = useState<string[]>([]);
  const snackbar = useSnackbar();

  const activate = trpc.user.inventory.activate.useMutation();
  const closeCapsule = trpc.user.inventory.capsule.close.useMutation();
  const autoSell = trpc.user.inventory.autoSell.useMutation();
  const decrement = trpc.user.inventory.decrement.useMutation();
  const share = trpc.user.inventory.share.useMutation();
  const inventory = trpc.user.inventory.items.useQuery(undefined, NO_REFETCH);
  const tokens = trpc.user.inventory.quantity.useQuery('1');
  const items = inventory.data ?? [];
  const item = items?.find((item) => item.itemId === (itemId as ItemId));

  const isLoading =
    inventory.isRefetching ||
    inventory.isFetching ||
    autoSell.isLoading ||
    decrement.isLoading ||
    closeCapsule.isLoading ||
    share.isLoading ||
    activate.isLoading;

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
        <Box alignSelf="flex-end">
          <Button
            disabled={isLoading}
            size="small"
            variant="arcade"
            color="success"
            startIcon={<SellOutlined />}
            onClick={() => setIsAutoSelling(true)}
          >
            Auto Sell
          </Button>
        </Box>
        <BulletPoints
          icon={<InfoOutlined fontSize="small" color="info" />}
          title={'How It Works'}
          points={[
            `Click on an item to view more details.`,
            `Find items while playing games, winning raffles, or participating in boss fights.`,
            `Prizes that you win will be stored here until claimed.`,
            `Some items will expire from your inventory if not claimed.`,
          ]}
        />

        <PanelFooter
          learn={{
            text: 'Inventory Items',
            href: routes.help.inventory.path(),
          }}
          action={{
            text: 'Redeem Tokens',
            href: routes.raffles.path(),
            color: 'secondary',
          }}
        />
      </Column>
      <InfoModal
        color="error"
        open={isAutoSelling}
        onClose={() => setIsAutoSelling(false)}
      >
        <AutoSellModal
          isLoading={autoSell.isLoading}
          onAction={async () => {
            await autoSell.mutateAsync();
          }}
          onSell={(itemIds) => {
            setIsAutoSelling(false);
            setDirty((prev) => [...prev, ...itemIds]);
          }}
        />
      </InfoModal>
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

const AutoSellModal: React.FC<{
  onSell: (itemIds: string[]) => void;
  onAction: () => Promise<void>;
  isLoading: boolean;
}> = ({ isLoading, onSell, onAction }) => {
  const snackbar = useSnackbar();
  const util = trpc.useUtils();
  const items = trpc.user.inventory.items.useQuery(['ETCETERA']);
  if (items.isLoading || items.isRefetching || items.isFetching)
    return <LoadingBar />;

  if (items.isError) {
    return (
      <Typography variant="body2" color="error">
        Error loading items
      </Typography>
    );
  }

  const value = items.data.reduce(
    (acc, item) => acc + item.quantity * item.sell,
    0
  );

  const quantity = items.data.reduce((acc, item) => acc + item.quantity, 0);

  const handleSell = async () => {
    try {
      onSell(items.data?.map((item) => item.itemId));
      await onAction();
      snackbar.success(`Sold ${quantity} items for ${value} tokens.`);
      util.user.inventory.quantity.invalidate('1');
      util.user.inventory.invalidate();
    } catch (error) {
      console.log(error);
      snackbar.error(parseTRPCClientErrorMessage(error));
    }
  };

  return (
    <Column gap={2}>
      <Column>
        <Box mb={1}>
          <Button color="success" variant="square" sx={{ p: 0.75 }}>
            <SellOutlined fontSize="large" />
          </Button>
        </Box>
        <Typography variant="h5" mb={0.25}>
          Auto Sell Items
        </Typography>
        <Typography variant="body2">
          Automatically sell all <b>unusable</b> items in your inventory for
          tokens.
        </Typography>
      </Column>
      <Divider />
      <Column>
        <Typography variant="body2" gutterBottom>
          <b>Items to Sell</b>:{' '}
          {items.data.length
            ? items.data
                .map(
                  (item) =>
                    `${item.quantity}x ${pluralize(item.name, item.quantity)}`
                )
                .join(', ')
            : 'No items to sell'}
        </Typography>

        <Typography variant="body2">
          <b>Total Value</b>: {value} Tokens
        </Typography>
      </Column>
      <Button
        disabled={isLoading || !items.data.length}
        variant="arcade"
        color="success"
        startIcon={<Check />}
        onClick={handleSell}
      >
        Sell Items ({value} Tokens)
      </Button>
    </Column>
  );
};

export const DynamicInventorySection = dynamic(
  () => Promise.resolve(Container),
  {
    ssr: false,
    loading: () => <LoadingBar />,
  }
);
