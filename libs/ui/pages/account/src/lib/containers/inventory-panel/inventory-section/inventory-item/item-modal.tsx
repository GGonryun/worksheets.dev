import {
  Add,
  Close,
  KeyboardDoubleArrowLeftOutlined,
  KeyboardDoubleArrowRightOutlined,
  QuestionMarkOutlined,
  Remove,
} from '@mui/icons-material';
import { Box, Button, Divider, IconButton, Typography } from '@mui/material';
import { ItemType } from '@prisma/client';
import { routes } from '@worksheets/routes';
import {
  ActivateItemUseState,
  ConsumeItemUseState,
  ItemUseState,
} from '@worksheets/services/inventory';
import { trpc } from '@worksheets/trpc-charity';
import { Column, Row } from '@worksheets/ui/components/flex';
import { ContainImage } from '@worksheets/ui/components/images';
import { LoadingBar, PulsingLogo } from '@worksheets/ui/components/loading';
import {
  Modal,
  ModalProps,
  ModalWrapper,
  OnClose,
} from '@worksheets/ui/components/modals';
import { useSnackbar } from '@worksheets/ui/components/snackbar';
import { PaletteColor } from '@worksheets/ui/theme';
import { InventoryPanels } from '@worksheets/util/enums';
import { assertNever } from '@worksheets/util/errors';
import { printDateTime } from '@worksheets/util/time';
import { parseTRPCClientErrorMessage } from '@worksheets/util/trpc';
import { InventoryItem } from '@worksheets/util/types';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React from 'react';

import { ItemDataRow } from './item-data-row';

const ITEM_TYPE_LABEL: Record<ItemType, string> = {
  STEAM_KEY: 'Steam Key',
  COMBAT: 'Combat',
  CONSUMABLE: 'Consumable',
  CURRENCY: 'Currency',
  ETCETERA: 'Etcetera',
};

const canUse = (type: InventoryItem['type']) =>
  type === 'STEAM_KEY' || type === 'CONSUMABLE';

const CloseButton: React.FC<{ onClick: OnClose }> = (props) => {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: 6,
        right: 6,
      }}
    >
      <IconButton
        onClick={() => props.onClick?.({}, 'escapeKeyDown')}
        size="small"
        disableRipple
        sx={{
          p: '3px',
          background: (theme) => theme.palette.primary.gradient,
        }}
      >
        <Close fontSize="small" color="white" />
      </IconButton>
    </Box>
  );
};

const InfoButton: React.FC = () => {
  return (
    <Box
      sx={{
        position: 'absolute',
        bottom: 6,
        right: 6,
      }}
    >
      <IconButton
        href={routes.help.inventory.path()}
        target="_blank"
        size="small"
        disableRipple
        sx={{
          p: '3px',
          background: (theme) => theme.palette.primary.gradient,
        }}
      >
        <QuestionMarkOutlined fontSize="small" color="white" />
      </IconButton>
    </Box>
  );
};

const ModalLayout: React.FC<ModalProps> = ({ children, open, onClose }) => (
  <Modal open={open} onClose={onClose}>
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'auto 1fr',
        gridTemplateRows: 'auto',
        p: 2,
        gap: 2,
        position: 'relative',
      }}
    >
      <CloseButton onClick={onClose} />
      <InfoButton />
      {children}
    </Box>
  </Modal>
);

const ItemModalLayout: React.FC<
  ModalWrapper<{
    content?: React.ReactNode;
    item: InventoryItem;
    action?: React.ReactNode;
  }>
> = ({ content, open, onClose, item, action }) => {
  return (
    <ModalLayout open={open} onClose={onClose}>
      <>
        <Column gap={2} justifyContent="space-between">
          <Box
            sx={{
              borderRadius: (theme) => theme.shape.borderRadius,
              boxShadow: `rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset`,
              p: 1,
            }}
          >
            <Box
              sx={{
                position: 'relative',
                width: { xs: 80, mobile2: 96, sm: 128 },
                height: { xs: 80, mobile2: 96, sm: 128 },
              }}
            >
              <ContainImage src={item.imageUrl} alt={item.name} />
            </Box>
          </Box>
          {action}
        </Column>
        <Column
          minWidth={{ xs: 128, mobile2: 200, sm: 256 }}
          maxWidth={384}
          mt={1.5}
          mb={1}
          gap={1}
        >
          <Column>
            <Typography
              typography={{ xs: 'body1', sm: 'h6' }}
              fontWeight={{ xs: 700, sm: 700 }}
            >
              {item.name}
            </Typography>
            <Divider />
          </Column>
          {content}
        </Column>
      </>
    </ModalLayout>
  );
};

const Container: React.FC<ModalWrapper<{ item: InventoryItem }>> = ({
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
  loading: () => (
    <ModalLayout open={true}>
      <LoadingBar />
    </ModalLayout>
  ),
});

const ItemContent: React.FC<{
  item: InventoryItem;
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

const ActivateItem: React.FC<{
  onClose: () => void;
  item: InventoryItem;
  state: ActivateItemUseState;
}> = ({ state, item }) => {
  const { push } = useRouter();
  const snackbar = useSnackbar();
  const util = trpc.useUtils();
  const activate = trpc.user.inventory.activate.useMutation();
  const handleActivation = async () => {
    try {
      const result = await activate.mutateAsync(item.inventoryId);
      await util.user.codes.activation.list.invalidate();
      await util.user.inventory.items.invalidate();
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
  item: InventoryItem;
  state: ConsumeItemUseState;
}> = ({ item, state, onClose }) => {
  const snackbar = useSnackbar();
  const util = trpc.useUtils();
  const consume = trpc.user.inventory.consume.useMutation();
  const [quantity, setQuantity] = React.useState(1);

  const handleConsumption = async () => {
    try {
      const result = await consume.mutateAsync({
        itemId: item.itemId,
        quantity,
      });
      await util.user.inventory.items.invalidate();
      await util.user.inventory.quantity.invalidate();
      snackbar.success(result);
      onClose();
    } catch (error) {
      snackbar.error(parseTRPCClientErrorMessage(error));
    }
  };
  return (
    <Column gap={1} alignItems="center">
      <Typography typography={{ xs: 'body2', sm: 'body1' }}>
        {state.message}
      </Typography>
      <Row gap={1} alignItems="center" justifyContent="center">
        <Button
          variant="square"
          color="error"
          size="small"
          disabled={quantity === 1}
          onClick={() => setQuantity(1)}
        >
          <KeyboardDoubleArrowLeftOutlined fontSize="small" />
        </Button>
        <Button
          variant="square"
          color="primary"
          size="small"
          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
        >
          <Remove fontSize="small" />
        </Button>
        <Typography typography={'h3'} sx={{ mx: 1 }}>
          {quantity}
        </Typography>
        <Button
          variant="square"
          color="primary"
          size="small"
          onClick={() => setQuantity((q) => Math.min(q + 1, item.quantity))}
        >
          <Add fontSize="small" />
        </Button>
        <Button
          variant="square"
          color="error"
          size="small"
          disabled={item.quantity === quantity}
          onClick={() => setQuantity(item.quantity)}
        >
          <KeyboardDoubleArrowRightOutlined fontSize="small" />
        </Button>
      </Row>
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

const ItemDescription: React.FC<{ item: InventoryItem }> = ({ item }) => (
  <Column gap={1}>
    <Typography typography={{ xs: 'body2', sm: 'body1' }}>
      {item.description}
    </Typography>
    <Column>
      <ItemDataRow label="Type" value={ITEM_TYPE_LABEL[item.type]} />
      <ItemDataRow label="Quantity" value={item.quantity} />
      {item.expiresAt && (
        <ItemDataRow
          color="error"
          label="Expires"
          value={printDateTime(item.expiresAt)}
        />
      )}
    </Column>
  </Column>
);

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
