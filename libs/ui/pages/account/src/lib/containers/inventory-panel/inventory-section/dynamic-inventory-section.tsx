import { Check, InfoOutlined, SellOutlined } from '@mui/icons-material';
import { Box, Button, Divider, Typography } from '@mui/material';
import { routes } from '@worksheets/routes';
import { trpc } from '@worksheets/trpc-charity';
import { Column } from '@worksheets/ui/components/flex';
import { BulletPoints } from '@worksheets/ui/components/lists';
import { LoadingBar } from '@worksheets/ui/components/loading';
import { InfoModal } from '@worksheets/ui/components/modals';
import { PanelFooter } from '@worksheets/ui/components/panels';
import { useSnackbar } from '@worksheets/ui/components/snackbar';
import { NO_REFETCH, parseTRPCClientErrorMessage } from '@worksheets/util/trpc';
import { InventoryItemSchema } from '@worksheets/util/types';
import dynamic from 'next/dynamic';
import pluralize from 'pluralize';
import { useState } from 'react';

import { DynamicItemsHeader } from './dynamic-items-header';
import { DynamicItemsGroup } from './inventory-item';
import { DynamicItemModal } from './inventory-item/dynamic-item-modal';

const Container = () => {
  const [item, setItem] = useState<InventoryItemSchema | undefined>(undefined);
  const [autoSell, setAutoSell] = useState<boolean>(false);
  const items = trpc.user.inventory.items.useQuery(undefined, NO_REFETCH);

  return (
    <>
      <Column gap={2}>
        <Column>
          <DynamicItemsHeader />
          <DynamicItemsGroup onClick={(item) => setItem(item)} />
        </Column>
        <Box alignSelf="flex-end">
          <Button
            disabled={items.isLoading || items.isFetching}
            size="small"
            variant="arcade"
            color="success"
            startIcon={<SellOutlined />}
            onClick={() => setAutoSell(true)}
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
        open={autoSell}
        onClose={() => setAutoSell(false)}
      >
        <AutoSellModal
          onSell={() => {
            setAutoSell(false);
          }}
        />
      </InfoModal>
      {item && (
        <DynamicItemModal item={item} onClose={() => setItem(undefined)} />
      )}
    </>
  );
};

const AutoSellModal: React.FC<{
  onSell: () => void;
}> = ({ onSell }) => {
  const snackbar = useSnackbar();
  const util = trpc.useUtils();
  const autoSell = trpc.user.inventory.autoSell.useMutation();
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
      await autoSell.mutateAsync();
      util.user.inventory.items.invalidate();
      util.user.inventory.quantity.invalidate('1');
      snackbar.success(`Sold ${quantity} items for ${value} tokens.`);
      onSell();
    } catch (error) {
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
        disabled={autoSell.isLoading}
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
