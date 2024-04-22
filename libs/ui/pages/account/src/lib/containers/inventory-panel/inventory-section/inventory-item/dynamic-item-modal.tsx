import { ArrowBack, ArrowForward, FavoriteBorder } from '@mui/icons-material';
import { Button, Typography } from '@mui/material';
import { routes } from '@worksheets/routes';
import {
  ActivateItemUseState,
  ConsumeItemUseState,
  ItemUseState,
} from '@worksheets/services/inventory';
import { trpc } from '@worksheets/trpc-charity';
import { ErrorComponent } from '@worksheets/ui/components/errors';
import { Column, Row } from '@worksheets/ui/components/flex';
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
import { FriendsPanels, InventoryPanels } from '@worksheets/util/enums';
import { assertNever } from '@worksheets/util/errors';
import { parseTRPCClientErrorMessage } from '@worksheets/util/trpc';
import { Friend, InventoryItemSchema } from '@worksheets/util/types';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import pluralize from 'pluralize';
import React from 'react';

const ACTION_DISPLAY: Record<ItemUseState['action'], 'block' | 'none'> = {
  pending: 'block',
  loading: 'block',
  consume: 'none',
  redirect: 'block',
  activate: 'none',
  share: 'none',
};
const ACTION_DISABLED: Record<ItemUseState['action'], boolean> = {
  pending: false,
  loading: true,
  consume: true,
  redirect: true,
  activate: true,
  share: true,
};
const ACTION_LABEL: Record<ItemUseState['action'], string> = {
  pending: 'Use Item',
  loading: 'Loading',
  consume: 'Consuming...',
  redirect: 'Redirecting',
  activate: 'Confirming...',
  share: 'Share Item',
};
const ACTION_COLOR: Record<ItemUseState['action'], PaletteColor> = {
  pending: 'primary',
  loading: 'primary',
  consume: 'success',
  redirect: 'primary',
  activate: 'error',
  share: 'secondary',
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
  const [consuming, setConsuming] = React.useState(false);

  const handleSetQuantity = (num: number) => {
    if (num < 1) return;
    if (num > item.quantity) return;
    setQuantity(num);
  };

  const handleConsumption = async () => {
    try {
      setConsuming(true);
      const result = await consume.mutateAsync({
        itemId: item.itemId,
        quantity,
      });
      await utils.user.inventory.items.invalidate();
      await utils.user.inventory.quantity.invalidate();
      snackbar.success(result);
    } catch (error) {
      snackbar.error(parseTRPCClientErrorMessage(error));
    } finally {
      onClose();
      setConsuming(false);
    }
  };

  if (consuming)
    return (
      <Column alignItems="center" gap={1}>
        <PulsingLogo />
        <Typography>Consuming items...</Typography>
      </Column>
    );

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
        disabled={consuming}
        sx={{ width: 'fit-content', px: 3 }}
        onClick={handleConsumption}
      >
        {consuming ? 'Loading...' : `Consume x${quantity}`}
      </Button>
    </Column>
  );
};

const ShareItem: React.FC<{
  item: InventoryItemSchema;
  onClose: () => void;
}> = ({ item, onClose }) => {
  const friends = trpc.user.friends.list.useQuery();

  const [friend, setFriend] = React.useState<Friend | undefined>(undefined);

  if (friends.isLoading) return <PulsingLogo />;
  if (friends.isError) return <ErrorComponent />;

  return (
    <Column gap={2} alignItems="center">
      {!friend ? (
        friends.data.length ? (
          <SelectFriend
            friends={friends.data}
            onSelect={(friend) => setFriend(friend)}
          />
        ) : (
          <NoFriendsWarning />
        )
      ) : (
        <SelectQuantity
          item={item}
          friend={friend}
          onClose={onClose}
          onBack={() => setFriend(undefined)}
        />
      )}
    </Column>
  );
};

const SelectQuantity: React.FC<{
  item: InventoryItemSchema;
  friend: Friend;
  onClose: () => void;
  onBack: () => void;
}> = (props) => {
  const snackbar = useSnackbar();
  const utils = trpc.useUtils();
  const share = trpc.user.inventory.share.useMutation();
  const [quantity, setQuantity] = React.useState(1);
  const [sharing, setSharing] = React.useState(false);
  const handleSetQuantity = (num: number) => {
    if (num < 1) return;
    if (num > props.item.quantity) return;
    setQuantity(num);
  };

  const handleShare = async () => {
    try {
      setSharing(true);
      const message = await share.mutateAsync({
        friendshipId: props.friend.friendshipId,
        itemId: props.item.itemId,
        quantity,
      });
      await utils.user.inventory.invalidate();
      snackbar.success(message);
    } catch (error) {
      snackbar.error(parseTRPCClientErrorMessage(error));
    } finally {
      props.onClose();
      setSharing(false);
    }
  };

  return (
    <Column gap={2} alignItems="center">
      <Typography typography={{ xs: 'body2', sm: 'body1' }}>
        How many {pluralize(props.item.name)} would you like to share with{' '}
        {props.friend.username}?
      </Typography>
      <NumericCounterField value={quantity} onChange={handleSetQuantity} />
      <Row gap={1}>
        <Button
          variant="arcade"
          color="primary"
          size="small"
          onClick={props.onBack}
        >
          Back
        </Button>
        <Button
          variant="arcade"
          color="secondary"
          size="small"
          disabled={sharing}
          sx={{ width: 'fit-content', px: 3 }}
          onClick={handleShare}
        >
          Share
        </Button>
      </Row>
    </Column>
  );
};

const SelectFriend: React.FC<{
  friends: Friend[];
  onSelect: (friend: Friend) => void;
}> = (props) => {
  // TODO: Implement pagination on server side
  const [page, setPage] = React.useState(0);

  const handleNext = () => {
    setPage((prev) => prev + 1);
  };
  const handlePrev = () => {
    setPage((prev) => prev - 1);
  };

  const items = props.friends.slice(page * 5, page * 5 + 5);

  return (
    <Column gap={2}>
      <Typography typography={{ xs: 'body2', sm: 'body1' }}>
        Who would you like to share this item with?
      </Typography>
      {props.friends.map((friend) => (
        <FriendItem
          key={friend.friendshipId}
          friend={friend}
          onClick={() => props.onSelect(friend)}
        />
      ))}
      <Row justifyContent="space-between">
        <Button variant="square" onClick={handlePrev} disabled={page === 0}>
          <ArrowBack />
        </Button>
        <Button
          variant="square"
          onClick={handleNext}
          disabled={items.length < 5}
        >
          <ArrowForward />
        </Button>
      </Row>
    </Column>
  );
};

const FriendItem: React.FC<{ friend: Friend; onClick: () => void }> = (
  props
) => {
  return (
    <Button
      variant="arcade"
      size="small"
      color={props.friend.isFavorite ? 'secondary' : 'primary'}
      sx={{
        display: 'block',
        maxWidth: 210,
        px: 2,
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
      }}
      onClick={props.onClick}
    >
      {props.friend.username}
    </Button>
  );
};

const NoFriendsWarning = () => (
  <Column gap={2}>
    <Typography>You must add friends to share items.</Typography>
    <Button
      variant="arcade"
      color="secondary"
      sx={{ width: 'fit-content' }}
      startIcon={<FavoriteBorder />}
      href={routes.account.friends.path({
        bookmark: FriendsPanels.AddFriends,
      })}
    >
      Add Friends
    </Button>
  </Column>
);

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
    case 'share':
      return <ShareItem item={item} onClose={onClose} />;
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
