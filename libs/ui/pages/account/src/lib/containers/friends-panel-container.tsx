import { TRPCClientError } from '@trpc/client';
import { trpc } from '@worksheets/trpc-charity';
import { Snackbar, useSnackbar } from '@worksheets/ui/components/snackbar';
import { ErrorComponent } from '@worksheets/ui/pages/errors';
import { LoadingScreen } from '@worksheets/ui/pages/loading';
import { useBookmark } from '@worksheets/ui-core';
import { FriendsPanels } from '@worksheets/util/enums';
import { Friend } from '@worksheets/util/types';
import { useRouter } from 'next/router';
import { useState } from 'react';

import {
  AddFriendModal,
  FriendsPanel,
  RemoveFriendModal,
  SendGiftModal,
  SharedGiftSnackbarMessage,
} from '../components';

const genericUnexpectedErrorMessage = {
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

  const friends = trpc.user.friends.list.useQuery(undefined);

  const removeFriend = trpc.user.friends.remove.useMutation();
  const favoriteFriend = trpc.user.friends.favorite.useMutation();
  const addFriend = trpc.user.friends.add.useMutation();
  const findFriend = trpc.user.friends.find.useMutation();
  const sendGift = trpc.user.friends.sendGift.useMutation();

  const handleError = (error: unknown) => {
    if (error instanceof TRPCClientError) {
      snackbar.trigger({
        message: error.message,
        severity: 'error',
      });
    } else {
      snackbar.trigger(genericUnexpectedErrorMessage);
    }
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
      push(`/account/friends#${FriendsPanels.FriendsList}`, undefined, {
        shallow: true,
      });

      snackbar.trigger({
        message: (
          <>
            You are now friends with <b>{friendRequest.username}</b>!
          </>
        ),
        severity: 'success',
      });
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

      snackbar.trigger({
        message: (
          <>
            You have successfully destroyed your friendship with{' '}
            <b>{removeFriendship.username}</b>!
          </>
        ),
        severity: 'success',
      });
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

      snackbar.trigger({
        message: (
          <>
            {result.newState ? 'You have become' : 'You are no longer'} best
            friends with <b>{friend.username}</b>!
          </>
        ),
        severity: 'success',
      });
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

      snackbar.trigger({
        message: (
          <SharedGiftSnackbarMessage username={sendGiftFriendship.username} />
        ),
        severity: 'success',
      });
    } catch (error) {
      handleError(error);
    }
    // send a backend request to send the gift.
    // clear the friend id.
    // close the modal.
    // trigger snackbar saying that the gift has been sent.
  };

  if (friends.isLoading) return <LoadingScreen />;

  if (friends.error) return <ErrorComponent />;

  return (
    <>
      <FriendsPanel
        addFriendCode={addFriendCode}
        bookmark={bookmark}
        friends={friends.data.friends}
        followers={friends.data.followers}
        refreshTimestamp={refreshTimestamp}
        giftsRemaining={friends.data.giftsRemaining}
        friendCode={friends.data.code}
        onSendGift={(friend) => setSendGiftFriendship(friend)}
        onRemove={(friend) => setRemoveFriendship(friend)}
        onFavorite={handleFavoriteFriend}
        onAdd={handleFindFriend}
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
      <Snackbar {...snackbar.props} />
    </>
  );
};
