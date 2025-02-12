import {
  ArrowBack,
  ArrowForward,
  Close,
  FavoriteBorder,
  FeaturedVideoOutlined,
  LockOutlined,
  Loop,
  OpenInNewOutlined,
  StarBorder,
} from '@mui/icons-material';
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Link,
  Typography,
  useTheme,
} from '@mui/material';
import { ItemId } from '@worksheets/data/items';
import { routes } from '@worksheets/routes';
import { trpc } from '@worksheets/trpc-charity';
import { WatchAdvertisement } from '@worksheets/ui/components/advertisements';
import { ErrorComponent } from '@worksheets/ui/components/errors';
import { Column, Row } from '@worksheets/ui/components/flex';
import { NumericCounterField } from '@worksheets/ui/components/inputs';
import {
  ExpiringItemIcon,
  InventoryItem,
  InventoryItemDescription,
  ItemDescription,
  ItemModalLayout,
  rarityIcon,
} from '@worksheets/ui/components/items';
import { PulsingLogo } from '@worksheets/ui/components/loading';
import { InfoModal } from '@worksheets/ui/components/modals';
import { PrizeWheel } from '@worksheets/ui/components/prize-wheel';
import { useSnackbar } from '@worksheets/ui/components/snackbar';
import { useMediaQueryDown } from '@worksheets/ui/hooks/use-media-query';
import { Redirect } from '@worksheets/ui-core';
import {
  FriendsPanels,
  HelpInventoryQuestions,
  InventoryPanels,
} from '@worksheets/util/enums';
import { assertNever } from '@worksheets/util/errors';
import { MAX_CONSUMPTION_RATE } from '@worksheets/util/settings';
import { capitalizeFirstLetter, shorten } from '@worksheets/util/strings';
import { NO_REFETCH, parseTRPCClientErrorMessage } from '@worksheets/util/trpc';
import {
  ACTION_AVAILABLE,
  ACTION_LABEL,
  CapsuleOptionSchema,
  Friend,
  InventoryCapsuleSchema,
  InventoryItemSchema,
  ItemSchema,
  PRIZE_WHEEL_COLORS,
} from '@worksheets/util/types';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import pluralize from 'pluralize';
import React, { useEffect, useState } from 'react';

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
        routes.account.inventory.path({
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

const ConsumeItem: React.FC<{
  onConsume: (itemId: ItemId, quantity: number) => void;
  item: InventoryItemSchema;
  verb: 'use' | 'sell';
}> = ({ item, onConsume, verb }) => {
  const decrement = trpc.user.inventory.decrement.useMutation();
  const [quantity, setQuantity] = React.useState(1);

  const handleSetQuantity = (num: number) => {
    if (num < 1) return;
    if (num > item.quantity) return;
    setQuantity(num);
  };

  return (
    <Column gap={2} alignItems="center">
      <Typography typography={{ xs: 'body2', sm: 'body1' }}>
        How many would you like to {verb}?
      </Typography>
      <Column gap={0.5} textAlign="center">
        <Typography typography={{ xs: 'body3', sm: 'body2' }}>
          <b>You own {item.quantity}</b> {pluralize(item.name, item.quantity)}
        </Typography>
        {verb === 'sell' && (
          <Typography typography={{ xs: 'body3', sm: 'body2' }}>
            {pluralize(item.name)} sell for <b>{item.sell} tokens</b> each
          </Typography>
        )}
      </Column>
      <NumericCounterField value={quantity} onChange={handleSetQuantity} />
      <Button
        variant="arcade"
        color="success"
        size="small"
        disabled={decrement.isLoading || quantity > MAX_CONSUMPTION_RATE}
        sx={{ width: 'fit-content', px: 3 }}
        onClick={() => onConsume(item.itemId, quantity)}
      >
        {decrement.isLoading
          ? 'Loading...'
          : `${capitalizeFirstLetter(verb)} x${quantity}`}
      </Button>
      {quantity > MAX_CONSUMPTION_RATE && (
        <Typography
          typography={{ xs: 'body3', sm: 'body2' }}
          color="error"
          fontWeight={{ xs: 500, sm: 500 }}
        >
          You can only {verb} up to {MAX_CONSUMPTION_RATE} items at a time.
        </Typography>
      )}
    </Column>
  );
};

const ShareItem: React.FC<{
  item: InventoryItemSchema;
  onShare: (friendshipId: string, itemId: ItemId, quantity: number) => void;
}> = ({ item, onShare }) => {
  const friends = trpc.user.friends.list.useQuery();

  const [friend, setFriend] = React.useState<Friend | undefined>(undefined);

  if (friends.isLoading) return <PulsingLogo />;
  if (friends.isError) return <ErrorComponent />;

  return (
    <Column gap={2} alignItems="center">
      {!friend ? (
        friends.data.following.length ? (
          <SelectFriend
            friends={friends.data.following}
            onSelect={(friend) => setFriend(friend)}
          />
        ) : (
          <NoFriendsWarning />
        )
      ) : (
        <SelectQuantity
          item={item}
          friend={friend}
          onShare={onShare}
          onBack={() => setFriend(undefined)}
        />
      )}
    </Column>
  );
};

const SelectQuantity: React.FC<{
  item: InventoryItemSchema;
  friend: Friend;
  onShare: (friendshipId: string, itemId: ItemId, quantity: number) => void;
  onBack: () => void;
}> = (props) => {
  const [quantity, setQuantity] = React.useState(1);
  const handleSetQuantity = (num: number) => {
    if (num < 1) return;
    if (num > props.item.quantity) return;
    setQuantity(num);
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
          sx={{ width: 'fit-content', px: 3 }}
          onClick={() =>
            props.onShare(
              props.friend.friendshipId,
              props.item.itemId,
              quantity
            )
          }
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
      {items.map((friend) => (
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

const CapsuleItem: React.FC<{
  item: InventoryItemSchema;
  onCloseCapsule: (itemId: ItemId) => void;
}> = ({ item, onCloseCapsule }) => {
  const snackbar = useSnackbar();

  const utils = trpc.useUtils();
  const capsule = trpc.user.inventory.capsule.get.useQuery(item, NO_REFETCH);
  const award = trpc.user.inventory.capsule.award.useMutation();
  const unlock = trpc.user.inventory.capsule.unlock.useMutation();

  const [showAdvertisement, setShowAdvertisement] = useState(false);
  const [dirty, setDirty] = React.useState<string[]>([]);
  const [unlocks, setUnlocks] = React.useState(0);

  const loadingState =
    award.isLoading ||
    unlock.isLoading ||
    capsule.isFetching ||
    capsule.isRefetching;

  useEffect(() => {
    if (
      capsule.data &&
      !capsule.isLoading &&
      !capsule.isFetching &&
      !capsule.isRefetching
    ) {
      setUnlocks(capsule.data.unlocks);
    }
  }, [
    capsule.data,
    capsule.isFetching,
    capsule.isLoading,
    capsule.isRefetching,
  ]);

  useEffect(() => {
    if (
      !capsule.isFetching &&
      !capsule.isLoading &&
      !capsule.isRefetching &&
      !award.isLoading &&
      !unlock.isLoading
    ) {
      setDirty([]);
    }
  }, [
    award.isLoading,
    capsule.isFetching,
    capsule.isLoading,
    capsule.isRefetching,
    unlock.isLoading,
  ]);

  const handleSubmitAdvertisement = async () => {
    if (!capsule.data) {
      return;
    }

    setShowAdvertisement(false);
    try {
      await award.mutateAsync({ capsuleId: capsule.data.id });
      snackbar.success('You can now unlock an additional item!');
    } catch (error) {
      snackbar.error(parseTRPCClientErrorMessage(error));
    }
    await capsule.refetch();
  };

  const handleUnlock = async (optionId: string) => {
    if (!capsule.data) return;

    if (!capsule.data.unlocks) {
      snackbar.warning('You have no more unlocks remaining');
      return;
    }

    try {
      setDirty((prev) => [...prev, optionId]);
      setUnlocks((prev) => prev - 1);
      await unlock.mutateAsync({
        optionId,
      });
      utils.user.inventory.capsule.get.refetch();
      utils.user.inventory.invalidate();
    } catch (error) {
      setUnlocks((prev) => prev + 1);
      snackbar.error(parseTRPCClientErrorMessage(error));
    }
  };

  if (capsule.isLoading) return <PulsingLogo message="Loading Capsule..." />;

  if (capsule.isError)
    return <ErrorComponent hideLogo message={capsule.error.message} />;

  if (!capsule.data) return null;

  return (
    <>
      <OpenCapsuleItem
        item={item}
        capsule={capsule.data}
        dirty={dirty}
        onWatchAdvertisement={() => setShowAdvertisement(true)}
        onCloseCapsule={() => onCloseCapsule(item.itemId)}
        onUnlock={handleUnlock}
        unlocks={Math.max(unlocks, 0)}
        isLoadingState={loadingState}
      />
      <WatchAdvertisementModal
        open={showAdvertisement}
        onClose={() => setShowAdvertisement(false)}
        onSubmit={handleSubmitAdvertisement}
      />
    </>
  );
};

const WatchAdvertisementModal: React.FC<{
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
}> = (props) => {
  return (
    <InfoModal open={props.open} onClose={props.onClose}>
      <Column gap={2}>
        <Column>
          <FeaturedVideoOutlined fontSize="large" color="info" />
          <Typography variant="h6">Watch an Advertisement</Typography>
          <Typography variant="body2" gutterBottom>
            Receive an extra unlock for your capsule after watching a short
            message from our sponsors.
          </Typography>
          <Divider />
        </Column>
        <WatchAdvertisement onSubmit={props.onSubmit} buttonText="Watch Ad" />
      </Column>
    </InfoModal>
  );
};

const OpenCapsuleItem: React.FC<{
  item: InventoryItemSchema;
  capsule: InventoryCapsuleSchema;
  unlocks: number;
  dirty: string[];
  isLoadingState: boolean;
  onWatchAdvertisement: () => void;
  onCloseCapsule: () => void;
  onUnlock: (optionId: string) => void;
}> = ({
  item,
  unlocks,
  capsule,
  dirty,
  isLoadingState,
  onWatchAdvertisement,
  onCloseCapsule,
  onUnlock,
}) => {
  const needsMoreUnlocks = !unlocks && capsule.remaining > 0;
  const canEarnMoreUnlocks = capsule.remaining > unlocks;
  const availableCapsules = item.quantity - 1;
  const options = capsule.options.sort((a, b) => a.position - b.position);

  return (
    <Column gap={2} width="fit-content">
      <Column gap={0.5}>
        <Typography variant="body2" gutterBottom>
          <b>Selections Available:</b> {capsule.remaining}
        </Typography>

        <CapsuleOptions
          options={options}
          hasUnlocks={unlocks > 0}
          onUnlock={onUnlock}
          dirty={dirty}
        />
      </Column>

      <Column>
        <Typography variant="body2">
          <b>Unlocks Remaining:</b> {unlocks}
        </Typography>
        {Boolean(needsMoreUnlocks) && (
          <Typography variant="body2" color="error" fontWeight={500}>
            Unlock more items by watching a message from our sponsors.
          </Typography>
        )}
        {!capsule.remaining && (
          <Typography variant="body2">No more selections available.</Typography>
        )}
        <Box my={0.5} />

        <Button
          variant="arcade"
          color="secondary"
          size="small"
          disabled={!canEarnMoreUnlocks || isLoadingState}
          startIcon={
            isLoadingState ? (
              <CircularProgress size={18} />
            ) : (
              <FeaturedVideoOutlined />
            )
          }
          onClick={onWatchAdvertisement}
        >
          {isLoadingState ? 'Loading...' : 'Watch Ad'}
        </Button>
      </Column>

      <Column>
        <Typography variant="body2">
          <b>Available Capsules:</b> {availableCapsules}
        </Typography>
        <Typography variant="body2">
          {capsule.unlocks
            ? 'Use all your unlocks before closing this capsule.'
            : ' Permanently close this capsule to open another.'}
        </Typography>
        <Box my={0.5} />
        <Button
          disabled={!!unlocks || isLoadingState}
          variant="arcade"
          color="primary"
          size="small"
          startIcon={
            isLoadingState ? <CircularProgress size={18} /> : <LockOutlined />
          }
          onClick={onCloseCapsule}
        >
          {isLoadingState ? 'Loading...' : 'Close Capsule'}
        </Button>
      </Column>
      <Row gap={0.5}>
        <Typography
          variant="body2"
          color="primary"
          component={Link}
          href={routes.help.inventory.path({
            bookmark: HelpInventoryQuestions.Capsules,
          })}
          target="_blank"
        >
          {item.name} Drop Rates
        </Typography>
        <OpenInNewOutlined color="info" fontSize="small" />
      </Row>
    </Column>
  );
};

const CapsuleOptions: React.FC<{
  options: CapsuleOptionSchema[];
  hasUnlocks: boolean;
  dirty: string[];
  onUnlock: (optionId: string) => void;
}> = ({ options, dirty, hasUnlocks, onUnlock }) => {
  return (
    <Column gap={1}>
      <Box
        sx={{
          display: 'grid',
          // 3 rows that fit the items
          gridTemplateColumns: `repeat(3, fit-content(33%))`,
          gap: 1,
        }}
      >
        {options.map((option) => (
          <CapsuleOption
            key={option.id}
            option={option}
            dirty={dirty.includes(option.id)}
            hasUnlocks={hasUnlocks}
            onUnlock={() => onUnlock(option.id)}
          />
        ))}
      </Box>
    </Column>
  );
};

const CapsuleOption: React.FC<{
  option: CapsuleOptionSchema;
  hasUnlocks: boolean;
  dirty: boolean;
  onUnlock: () => void;
}> = ({ option, hasUnlocks, onUnlock, dirty }) => {
  const [open, setOpen] = React.useState(false);

  const handleSelect = () => {
    if (option.item) {
      return setOpen(true);
    } else {
      onUnlock();
    }
  };
  return (
    <>
      <InventoryItem
        loading={dirty}
        icon={option.item?.rarity ? rarityIcon(option.item.rarity) : undefined}
        size={72}
        item={option.item ? { ...option, ...option.item } : undefined}
        onClick={handleSelect}
        disabled={!hasUnlocks && !option.item}
      />

      {option.item && (
        <ItemModalLayout
          item={option.item}
          content={<ItemDescription item={option.item} />}
          open={open}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
};

const PrizeWheelItem: React.FC<{
  item: InventoryItemSchema;
  onDirty: (itemId: ItemId) => void;
  onClose: () => void;
}> = ({ item, onDirty, onClose }) => {
  const snackbar = useSnackbar();
  const spin = trpc.user.inventory.prizeWheel.spin.useMutation();
  const [showSpinner, setShowSpinner] = React.useState(false);
  const [spins, setSpins] = React.useState(item.quantity);
  const [spinner, setSpinner] = React.useState<
    { items: ItemSchema[]; prize: ItemSchema } | undefined
  >(undefined);

  const handleStartSpinner = async () => {
    try {
      setSpinner(undefined);
      const data = await spin.mutateAsync({ itemId: item.itemId });
      onDirty(item.itemId);
      setSpins((prev) => prev - 1);
      setSpinner(data);
      setShowSpinner(true);
    } catch (error) {
      snackbar.error(parseTRPCClientErrorMessage(error));
    }
  };

  const handleSkipAnimation = async () => {
    try {
      const data = await spin.mutateAsync({ itemId: item.itemId });
      onDirty(item.itemId);
      setSpins((prev) => prev - 1);
      snackbar.success(`Congratulations! You won a ${data.prize.name}!`);
    } catch (error) {
      snackbar.error(parseTRPCClientErrorMessage(error));
    }
  };

  const handleClaim = (prize?: ItemSchema) => {
    if (!prize) return;
    snackbar.success(`Congratulations! You won a ${prize.name}!`);
  };

  const handleClose = async () => {
    onClose();
    onDirty(item.itemId);
    setSpinner(undefined);
    setShowSpinner(false);
  };

  if (spin.isError) return <ErrorComponent message={spin.error.message} />;

  return (
    <>
      {spin.isLoading ? (
        <PulsingLogo message="Building a spinner..." />
      ) : (
        <Column gap={1} alignItems="center">
          <Typography
            typography={{ xs: 'body3', sm: 'body2' }}
            color="text.secondary"
            gutterBottom
          >
            You have{' '}
            <b>
              {spins} {pluralize('spin', spins)}
            </b>{' '}
            available.
          </Typography>
          <Button
            disabled={!spins}
            variant="arcade"
            color="primary"
            size="small"
            startIcon={<StarBorder />}
            onClick={handleStartSpinner}
            sx={{ minWidth: 200 }}
          >
            I'm Feeling Lucky!
          </Button>
          <Button
            disabled={!spins}
            variant="arcade"
            color="secondary"
            size="small"
            endIcon={<ArrowForward />}
            onClick={handleSkipAnimation}
            sx={{ minWidth: 200 }}
          >
            Skip Animation
          </Button>
        </Column>
      )}
      <PrizeWheelModal
        {...spinner}
        open={showSpinner}
        spins={spins}
        onSpin={handleStartSpinner}
        onClaim={handleClaim}
        onClose={handleClose}
      />
    </>
  );
};

const PrizeWheelModal: React.FC<{
  items?: ItemSchema[];
  prize?: ItemSchema;
  spins: number;
  open: boolean;
  onSpin: () => void;
  onClose: () => void;
  onClaim: (item?: ItemSchema) => void;
}> = ({ onSpin, onClose, onClaim, open, items, prize, spins }) => {
  const theme = useTheme();
  const isTiny = useMediaQueryDown('mobile1');
  const isMobile = useMediaQueryDown('sm');
  const [finished, setFinished] = React.useState(false);

  const handleSpin = () => {
    if (spins) {
      setFinished(false);
      onSpin();
    } else {
      onClose();
    }
  };

  return (
    <InfoModal
      open={open}
      onClose={() => {
        onClaim(prize);
        onClose();
      }}
    >
      <Column gap={2} alignItems="center" textAlign="center">
        <Column gap={0.5}>
          <Typography typography={{ xs: 'h5', mobile1: 'h4' }}>
            Spin the Wheel!
          </Typography>
          <Typography
            typography={{ xs: 'body3', sm: 'body2' }}
            color="text.secondary"
          >
            You have{' '}
            <b>
              {spins} {pluralize('spin', spins)}
            </b>{' '}
            available.
          </Typography>
        </Column>
        {!items || !prize ? (
          <PulsingLogo message="Selecting random items..." />
        ) : (
          <PrizeWheel
            segments={items.map((item) => item.name).map(shorten(15))}
            segColors={PRIZE_WHEEL_COLORS}
            winner={items.findIndex((p) => p.name === prize.name)}
            onFinished={() => {
              onClaim(prize);
              setFinished(true);
            }}
            primaryColor={theme.palette.text.primary}
            contrastColor={theme.palette.text.white}
            buttonText="Spin"
            isOnlyOnce={true}
            fontSize={isTiny ? `0.5rem` : isMobile ? `.75rem` : `1rem`}
            fontFamily={theme.typography.fontFamily}
            size={isTiny ? 120 : isMobile ? 155 : 180}
            outlineWidth={5}
            upDuration={200}
            downDuration={1000}
          />
        )}
        {!!spins && (
          <Button
            fullWidth
            disabled={!finished}
            startIcon={<Loop />}
            variant="arcade"
            color="secondary"
            onClick={handleSpin}
          >
            Spin Again
          </Button>
        )}
        <Button
          fullWidth
          disabled={!finished}
          startIcon={<Close />}
          variant="arcade"
          color="primary"
          onClick={onClose}
        >
          Close
        </Button>
      </Column>
    </InfoModal>
  );
};

const ItemContent: React.FC<{
  item: InventoryItemSchema;
  onConsume: (itemId: ItemId, quantity: number) => void;
  onCloseCapsule: (itemId: ItemId) => void;
  onDirty: (itemId: ItemId) => void;
  onShare: (friendshipId: string, itemId: ItemId, quantity: number) => void;
  onClose: () => void;
}> = ({ item, onDirty, onConsume, onCloseCapsule, onClose, onShare }) => {
  switch (item.type) {
    case 'ETCETERA':
      return <ConsumeItem item={item} onConsume={onConsume} verb="sell" />;
    case 'CONSUMABLE':
      return <ConsumeItem item={item} onConsume={onConsume} verb="use" />;
    case 'CAPSULE':
      return <CapsuleItem item={item} onCloseCapsule={onCloseCapsule} />;
    case 'PRIZE_WHEEL':
      return <PrizeWheelItem item={item} onDirty={onDirty} onClose={onClose} />;
    case 'SHARABLE':
      return <ShareItem item={item} onShare={onShare} />;
    case 'STEAM_KEY':
      return <ActivateItem item={item} onDirty={onDirty} onClose={onClose} />;
    // No activation supported.
    case 'COMBAT':
      return (
        <Redirect
          href={routes.battles.path()}
          placeholder={<PulsingLogo message={'Redirecting...'} />}
        />
      );
    case 'CURRENCY':
      return (
        <ErrorComponent message="Currency cannot be used. Contact Support." />
      );
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
