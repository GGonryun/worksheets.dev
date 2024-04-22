import { Button, Typography } from '@mui/material';
import { routes } from '@worksheets/routes';
import {
  ActivateItemUseState,
  ConsumeItemUseState,
  ItemUseState,
} from '@worksheets/services/inventory';
import { trpc } from '@worksheets/trpc-charity';
import { Column } from '@worksheets/ui/components/flex';
import { NumericCounterField } from '@worksheets/ui/components/inputs';
import {
  ExpiringItemIcon,
  ItemDescription,
  ItemModalLayout,
} from '@worksheets/ui/components/items';
import { PulsingLogo } from '@worksheets/ui/components/loading';
import { ModalWrapper } from '@worksheets/ui/components/modals';
import { useSnackbar } from '@worksheets/ui/components/snackbar';
import { PaletteColor } from '@worksheets/ui/theme';
import { InventoryPanels } from '@worksheets/util/enums';
import { assertNever } from '@worksheets/util/errors';
import { parseTRPCClientErrorMessage } from '@worksheets/util/trpc';
import { InventoryItemSchema } from '@worksheets/util/types';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React from 'react';

const ACTION_DISPLAY: Record<ItemUseState['action'], 'block' | 'none'> = {
  pending: 'block',
  loading: 'block',
  consume: 'none',
  redirect: 'block',
  activate: 'none',
};
const ACTION_DISABLED: Record<ItemUseState['action'], boolean> = {
  pending: false,
  loading: true,
  consume: true,
  redirect: true,
  activate: true,
};
const ACTION_LABEL: Record<ItemUseState['action'], string> = {
  pending: 'Use Item',
  loading: 'Loading',
  consume: 'Consuming...',
  redirect: 'Redirecting',
  activate: 'Confirming...',
};
const ACTION_COLOR: Record<ItemUseState['action'], PaletteColor> = {
  pending: 'primary',
  loading: 'primary',
  consume: 'success',
  redirect: 'primary',
  activate: 'error',
};
const canUse = (type: InventoryItemSchema['type']) =>
  type === 'STEAM_KEY' ||
  type === 'CONSUMABLE' ||
  type === 'SHARABLE' ||
  type === 'COMBAT';

const ItemAction: React.FC<{
  action: ItemUseState['action'];
  onClick: () => void;
}> = ({ onClick, action }) => {
  const disabled = ACTION_DISABLED[action];
  return (
    <Button
      variant="arcade"
      color={ACTION_COLOR[action]}
      fullWidth
      size="small"
      disabled={disabled}
      onClick={onClick}
      sx={{
        display: ACTION_DISPLAY[action],
      }}
    >
      {ACTION_LABEL[action]}
    </Button>
  );
};

const ActivateItem: React.FC<{
  onClose: () => void;
  item: InventoryItemSchema;
  state: ActivateItemUseState;
}> = ({ state, item }) => {
  const { push } = useRouter();
  const snackbar = useSnackbar();
  const utils = trpc.useUtils();
  const activate = trpc.user.inventory.activate.useMutation();
  const handleActivation = async () => {
    try {
      const result = await activate.mutateAsync(item.inventoryId);
      await utils.user.codes.activation.list.invalidate();
      await utils.user.inventory.items.invalidate();
      snackbar.success(
        <Column>
          <Typography>You've redeemed a {result.item.name}!</Typography>
          <Typography fontWeight={500}>
            A code has been sent to your email.
          </Typography>
        </Column>
      );
      push(
        routes.account.inventory.path({
          bookmark: InventoryPanels.ActivationCodes,
        })
      );
    } catch (error) {
      snackbar.error(parseTRPCClientErrorMessage(error));
    }
  };
  return (
    <Column gap={2} textAlign="center" alignItems={'center'}>
      <Typography typography={{ xs: 'body2', sm: 'body1' }}>
        {state.warning}
      </Typography>

      <Button
        variant="arcade"
        color="error"
        size="small"
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

const ConsumeItem: React.FC<{
  onClose: () => void;
  item: InventoryItemSchema;
  state: ConsumeItemUseState;
}> = ({ item, state, onClose }) => {
  const snackbar = useSnackbar();
  const utils = trpc.useUtils();
  const consume = trpc.user.inventory.consume.useMutation();
  const [quantity, setQuantity] = React.useState(1);

  const handleSetQuantity = (num: number) => {
    if (num < 1) return;
    if (num > item.quantity) return;
    setQuantity(num);
  };

  const handleConsumption = async () => {
    try {
      const result = await consume.mutateAsync({
        itemId: item.itemId,
        quantity,
      });
      await utils.user.inventory.items.invalidate();
      await utils.user.inventory.quantity.invalidate();
      snackbar.success(result);
      onClose();
    } catch (error) {
      snackbar.error(parseTRPCClientErrorMessage(error));
    }
  };
  return (
    <Column gap={2} alignItems="center">
      <Typography typography={{ xs: 'body2', sm: 'body1' }}>
        {state.message}
      </Typography>
      <NumericCounterField value={quantity} onChange={handleSetQuantity} />
      <Button
        variant="arcade"
        color="success"
        size="small"
        sx={{ width: 'fit-content', px: 3 }}
        onClick={handleConsumption}
      >
        Consume x{quantity}
      </Button>
    </Column>
  );
};

const ItemContent: React.FC<{
  item: InventoryItemSchema;
  state: ItemUseState;
  onClose: () => void;
}> = ({ item, state, onClose }) => {
  switch (state.action) {
    case 'loading':
      return <PulsingLogo />;
    case 'redirect':
      return <Typography>Redirecting...</Typography>;
    case 'activate':
      return <ActivateItem item={item} state={state} onClose={onClose} />;
    case 'consume':
      return <ConsumeItem item={item} state={state} onClose={onClose} />;
    case 'pending':
      return <ItemDescription item={item} />;
    default:
      throw assertNever(state);
  }
};

const Container: React.FC<ModalWrapper<{ item: InventoryItemSchema }>> = ({
  open,
  onClose,
  item,
}) => {
  const [state, setState] = React.useState<ItemUseState>({
    action: 'pending',
  });
  const { push } = useRouter();
  const snackbar = useSnackbar();
  const use = trpc.user.inventory.use.useMutation();

  const handleClose = () => {
    setState({ action: 'pending' });
    onClose?.({}, 'escapeKeyDown');
  };

  const handleUsage = async () => {
    try {
      setState({ action: 'loading' });
      const result = await use.mutateAsync(item.itemId);
      if (result.action === 'redirect') {
        push(result.url);
      } else {
        setState(result);
      }
    } catch (error) {
      snackbar.error(parseTRPCClientErrorMessage(error));
    }
  };

  return (
    <ItemModalLayout
      open={open}
      onClose={handleClose}
      item={item}
      icon={item.expiresAt && <ExpiringItemIcon size={18} />}
      action={
        canUse(item.type) && (
          <ItemAction action={state.action} onClick={handleUsage} />
        )
      }
      content={<ItemContent item={item} state={state} onClose={handleClose} />}
    />
  );
};

export const DynamicItemModal = dynamic(() => Promise.resolve(Container), {
  ssr: false,
  loading: () => null,
});
