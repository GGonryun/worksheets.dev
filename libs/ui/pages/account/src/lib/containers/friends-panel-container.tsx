import { routes } from '@worksheets/routes';
import { trpc } from '@worksheets/trpc-charity';
import { useSnackbar } from '@worksheets/ui/components/snackbar';
import { ErrorComponent } from '@worksheets/ui/pages/errors';
import { LoadingScreen } from '@worksheets/ui/pages/loading';
import { useBookmark } from '@worksheets/ui-core';
import { FriendsPanels } from '@worksheets/util/enums';
import { TOKENS_IN_GIFT_BOX } from '@worksheets/util/settings';
import { parseTRPCClientErrorMessage } from '@worksheets/util/trpc';
import { Friend } from '@worksheets/util/types';
import { useRouter } from 'next/router';
import { useState } from 'react';

import {
  AddFriendModal,
  ClaimGiftModal,
  RemoveFriendModal,
  SendGiftModal,
  SharedGiftSnackbarMessage,
} from '../components';
import { FriendsPanel } from '../panels';

export const genericUnexpectedErrorMessage = {
  message: 'An unexpected error occurred. Please try again later.',
  severity: 'error' as const,
};

export const FriendsPanelContainer: React.FC<{ refreshTimestamp: number }> = ({
  refreshTimestamp,
}) => {
  const bookmark = useBookmark<FriendsPanels>();
  const snackbar = useSnackbar();
  const { query, push } = useRouter();
  const addFriendCode = query.code as string | undefined;

  const [removeFriendship, setRemoveFriendship] = useState<Friend | undefined>(
    undefined
  );
  const [sendGiftFriendship, setSendGiftFriendship] = useState<
    Friend | undefined
  >(undefined);
  const [friendRequest, setFriendRequest] = useState<
    { username: string; code: string } | undefined
  >(undefined);
  const [showClaimGiftBox, setShowClaimGiftBox] = useState(false);

  const friends = trpc.user.friends.list.useQuery(undefined);
  const openGiftBox = trpc.user.rewards.giftBoxes.open.useMutation();

  const removeFriend = trpc.user.friends.remove.useMutation();
  const favoriteFriend = trpc.user.friends.favorite.useMutation();
  const addFriend = trpc.user.friends.add.useMutation();
  const findFriend = trpc.user.friends.find.useMutation();
  const sendGift = trpc.user.friends.sendGift.useMutation();

  const giftBoxes = trpc.user.rewards.giftBoxes.get.useQuery(undefined, {
    retry: false,
  });
  const handleError = (error: unknown) => {
    snackbar.error(parseTRPCClientErrorMessage(error));
  };

  const handleFindFriend = async (code: string) => {
    try {
      const { username } = await findFriend.mutateAsync({ code });
      setFriendRequest({ username, code });
    } catch (error) {
      handleError(error);
    }
  };

  const handleAddFriend = async () => {
    if (!friendRequest) return;

    try {
      await addFriend.mutateAsync(friendRequest);
      await friends.refetch();
      push(
        routes.account.friends.path({
          bookmark: FriendsPanels.FriendsList,
        }),
        undefined,
        {
          shallow: true,
        }
      );

      snackbar.success(
        <>
          You are now friends with <b>{friendRequest.username}</b>!
        </>
      );
    } catch (error) {
      handleError(error);
    }
  };

  const handleRemoveFriend = async () => {
    if (!removeFriendship) return;

    try {
      await removeFriend.mutateAsync({
        friendshipId: removeFriendship.friendshipId,
      });
      await friends.refetch();

      snackbar.success(
        <>
          You have successfully destroyed your friendship with{' '}
          <b>{removeFriendship.username}</b>!
        </>
      );
    } catch (error) {
      handleError(error);
    }
  };

  const handleFavoriteFriend = async (friend: Friend) => {
    try {
      const result = await favoriteFriend.mutateAsync({
        friendshipId: friend.friendshipId,
      });

      await friends.refetch();

      snackbar.success(
        <>
          {result.newState ? 'You have become' : 'You are no longer'} best
          friends with <b>{friend.username}</b>!
        </>
      );
    } catch (error) {
      handleError(error);
    }
  };

  const handleSendGift = async () => {
    if (!sendGiftFriendship) return;
    try {
      await sendGift.mutateAsync({
        friendshipId: sendGiftFriendship.friendshipId,
      });
      await friends.refetch();

      snackbar.success(
        <SharedGiftSnackbarMessage username={sendGiftFriendship.username} />
      );
    } catch (error) {
      handleError(error);
    }
  };

  const handleClaimGiftBox = () => {
    openGiftBox
      .mutateAsync()
      .then((result) => {
        giftBoxes.refetch();
        setShowClaimGiftBox(true);
      })
      .catch((error) => {
        snackbar.error(parseTRPCClientErrorMessage(error));
      });
  };

  const handleCloseClaimGiftBox = () => {
    setShowClaimGiftBox(false);

    snackbar.success('You claimed a gift box!');
  };

  if (friends.isLoading || giftBoxes.isLoading) return <LoadingScreen />;

  if (friends.error || giftBoxes.isError) return <ErrorComponent />;

  return (
    <>
      <FriendsPanel
        addFriendCode={addFriendCode}
        bookmark={bookmark}
        friends={friends.data.friends}
        followers={friends.data.followers}
        refreshTimestamp={refreshTimestamp}
        giftsRemaining={friends.data.giftsRemaining}
        giftBoxes={giftBoxes.data}
        friendCode={friends.data.code}
        onSendGift={(friend) => setSendGiftFriendship(friend)}
        onRemove={(friend) => setRemoveFriendship(friend)}
        onFavorite={handleFavoriteFriend}
        onAdd={handleFindFriend}
        onClaimGiftBox={handleClaimGiftBox}
      />
      <RemoveFriendModal
        open={Boolean(removeFriendship)}
        onClose={() => setRemoveFriendship(undefined)}
        onRemove={handleRemoveFriend}
      />
      <AddFriendModal
        open={Boolean(friendRequest)}
        friendUsername={friendRequest?.username ?? 'ERROR'}
        onClose={() => {
          setFriendRequest(undefined);
        }}
        onAdd={handleAddFriend}
      />
      <SendGiftModal
        open={Boolean(sendGiftFriendship)}
        onSend={handleSendGift}
        onClose={() => setSendGiftFriendship(undefined)}
      />
      <ClaimGiftModal
        open={showClaimGiftBox}
        onClose={handleCloseClaimGiftBox}
        amount={TOKENS_IN_GIFT_BOX}
      />
    </>
  );
};
