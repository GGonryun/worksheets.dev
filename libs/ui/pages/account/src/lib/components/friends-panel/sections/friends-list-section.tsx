import { InfoOutlined } from '@mui/icons-material';
import { Box, Divider, Link, Typography } from '@mui/material';
import { routes } from '@worksheets/ui/routes';
import { FriendsPanels } from '@worksheets/util/enums';
import { Follower, Friend } from '@worksheets/util/types';
import React from 'react';

import { BulletPoints } from '../../bullet-points';
import { PanelFooter } from '../../panel-footer';
import { EmptyFriendsPlaceholder } from '../empty-friends-placeholder';
import { FollowersTable } from '../followers-table';
import { FriendsListTable } from '../friends-list-table';

export const FriendsListSection: React.FC<{
  friends: Friend[];
  followers: Follower[];
  onAdd: (code: string) => void;
  onRemove: (friend: Friend) => void;
  onFavorite: (friend: Friend) => void;
}> = (props) => {
  const addFriendsLink = routes.account.friends.path({
    bookmark: FriendsPanels.AddFriends,
  });
  const sendGiftLink = routes.account.friends.path({
    bookmark: FriendsPanels.SendGifts,
  });

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      {props.friends.length === 0 && props.followers.length === 0 ? (
        <EmptyFriendsPlaceholder />
      ) : (
        <>
          <Typography variant="h6">Friends</Typography>

          <FriendsListTable
            friends={props.friends}
            onRemove={props.onRemove}
            onFavorite={props.onFavorite}
          />

          <Typography variant="h6">Followers</Typography>

          <FollowersTable followers={props.followers} onAdd={props.onAdd} />
        </>
      )}

      <Divider />
      <BulletPoints
        title="How It Works"
        icon={<InfoOutlined color="info" fontSize="small" />}
        points={[
          <>
            Add friends by sharing your{' '}
            <Link href={addFriendsLink}>Friend Code</Link>.
          </>,
          `Favorite friends to keep them at the top of the list.`,
          <>
            You earn a gift box for every friend you{' '}
            <Link href={sendGiftLink}>send a gift to</Link>.
          </>,
        ]}
      />
      <PanelFooter
        learn={{
          text: 'Friends',
          href: routes.help.friends.path(),
        }}
        action={{ text: 'Add Friends', href: addFriendsLink }}
      />
    </Box>
  );
};
