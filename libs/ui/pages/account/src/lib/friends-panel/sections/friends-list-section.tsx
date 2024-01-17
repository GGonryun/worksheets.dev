import { InfoOutlined } from '@mui/icons-material';
import { Box, Divider, Link, Typography } from '@mui/material';
import { FriendsPanels } from '@worksheets/util/enums';
import React from 'react';

import { BulletPoints } from '../../bullet-points';
import { PanelFooter } from '../../panel-footer';
import { Friend } from '../../types';
import { FriendsListTable } from '../friends-list-table';

export const FriendsListSection: React.FC<{
  friends: Friend[];
  onRemove: (friend: Friend) => void;
  onFavorite: (friend: Friend) => void;
}> = (props) => {
  const addFriendsLink = `/account/friends#${FriendsPanels.AddFriends}`;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <Typography variant="h6">Your Friends</Typography>

      <FriendsListTable
        friends={props.friends}
        onRemove={props.onRemove}
        onFavorite={props.onFavorite}
      />

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
          `You earn a gift box for every friend you send a gift to.`,
        ]}
      />

      <PanelFooter
        learn={{
          text: 'Friends',
          href: '/help/friends',
        }}
        action={{ text: 'Add Friends', href: addFriendsLink }}
      />
    </Box>
  );
};
