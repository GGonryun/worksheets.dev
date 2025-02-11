import { Button, Typography } from '@mui/material';
import { ItemId } from '@worksheets/data/items';
import { portalRoutes } from '@worksheets/routes';
import { trpc } from '@worksheets/trpc-charity';
import { ErrorComponent } from '@worksheets/ui/components/errors';
import { Column } from '@worksheets/ui/components/flex';
import {
  ExpiringItemIcon,
  InventoryItemDescription,
  ItemModalLayout,
} from '@worksheets/ui/components/items';
import { PulsingLogo } from '@worksheets/ui/components/loading';
import { useSnackbar } from '@worksheets/ui/components/snackbar';
import { InventoryPanels } from '@worksheets/util/enums';
import { assertNever } from '@worksheets/util/errors';
import { parseTRPCClientErrorMessage } from '@worksheets/util/trpc';
import {
  ACTION_AVAILABLE,
  ACTION_LABEL,
  InventoryItemSchema,
} from '@worksheets/util/types';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React from 'react';

const ItemAction: React.FC<{
  item: InventoryItemSchema;
  onClick: () => void;
}> = ({ item, onClick }) => {
  return (
    <Button
      variant="arcade"
      color={'primary'}
      fullWidth
      size="small"
      onClick={onClick}
    >
      {ACTION_LABEL[item.type]}
    </Button>
  );
};

const ActivateItem: React.FC<{
  onClose: () => void;
  onDirty: (itemId: ItemId) => void;
  item: InventoryItemSchema;
}> = ({ item, onClose, onDirty }) => {
  const { push } = useRouter();
  const snackbar = useSnackbar();
  const utils = trpc.useUtils();
  const [activating, setActivating] = React.useState(false);
  const activate = trpc.user.inventory.activate.useMutation();
  const handleActivation = async () => {
    try {
      setActivating(true);
      const result = await activate.mutateAsync(item.itemId);
      onDirty(item.itemId);
      await utils.user.codes.activation.list.invalidate();
      snackbar.success(<Typography>{result}</Typography>);
      push(
        portalRoutes.account.inventory.url({
          bookmark: InventoryPanels.ActivationCodes,
        })
      );
    } catch (error) {
      snackbar.error(parseTRPCClientErrorMessage(error));
    } finally {
      setActivating(false);
      onClose();
    }
  };

  if (activating) return <PulsingLogo message="Activating Steam Key..." />;

  return (
    <Column gap={2} textAlign="center" alignItems={'center'}>
      <Typography typography={{ xs: 'body2', sm: 'body1' }}>
        You will receive a random <b>Steam Key</b>. This action cannot be
        undone. Are you sure you want to proceed?
      </Typography>

      <Button
        variant="arcade"
        color="error"
        size="small"
        disabled={activating}
        onClick={handleActivation}
        sx={{
          width: 'fit-content',
        }}
      >
        Confirm Activation
      </Button>
      <Typography typography={'body3'} fontWeight={700}>
        A code will be sent to your email.
      </Typography>
    </Column>
  );
};

const ItemContent: React.FC<{
  item: InventoryItemSchema;
  onConsume: (itemId: ItemId, quantity: number) => void;
  onCloseCapsule: (itemId: ItemId) => void;
  onDirty: (itemId: ItemId) => void;
  onShare: (friendshipId: string, itemId: ItemId, quantity: number) => void;
  onClose: () => void;
}> = ({ item, onDirty, onClose }) => {
  switch (item.type) {
    case 'STEAM_KEY':
      return <ActivateItem item={item} onDirty={onDirty} onClose={onClose} />;
    case 'CURRENCY':
    case 'ETCETERA':
    case 'CONSUMABLE':
    case 'CAPSULE':
    case 'PRIZE_WHEEL':
    case 'SHARABLE':
    case 'COMBAT':
      return <ErrorComponent message="This item cannot be used." />;
    default:
      throw assertNever(item.type);
  }
};

const Container: React.FC<{
  item: InventoryItemSchema;
  onConsume: (itemId: ItemId, quantity: number) => void;
  onCloseCapsule: (itemId: ItemId) => void;
  onDirty: (itemId: ItemId) => void;
  onShare: (friendshipId: string, itemId: ItemId, quantity: number) => void;
  onClose: () => void;
}> = (opts) => {
  const { item, onClose } = opts;
  const [active, setActive] = React.useState(false);

  const handleClose = () => {
    setActive(false);
    onClose();
  };

  const handleActivate = async () => {
    setActive(true);
  };

  return (
    <ItemModalLayout
      open={true}
      onClose={handleClose}
      item={item}
      icon={Boolean(item.expiration.length) && <ExpiringItemIcon size={18} />}
      action={
        !active &&
        ACTION_AVAILABLE[item.type] && (
          <ItemAction item={item} onClick={handleActivate} />
        )
      }
      content={
        active ? (
          <ItemContent {...opts} />
        ) : (
          <InventoryItemDescription item={item} />
        )
      }
    />
  );
};

export const DynamicItemModal = dynamic(() => Promise.resolve(Container), {
  ssr: false,
  loading: () => null,
});
