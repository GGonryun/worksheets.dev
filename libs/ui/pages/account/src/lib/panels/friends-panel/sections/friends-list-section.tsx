import { InfoOutlined } from '@mui/icons-material';
import { Box, Divider, Link, Typography } from '@mui/material';
import { routes } from '@worksheets/routes';
import { Column } from '@worksheets/ui/components/flex';
import { BulletPoints } from '@worksheets/ui/components/lists';
import { PanelFooter } from '@worksheets/ui/components/panels';
import { FriendsPanels } from '@worksheets/util/enums';
import { MAX_BEST_FRIENDS, MAX_FRIENDS } from '@worksheets/util/settings';
import { Follower, Friend } from '@worksheets/util/types';
import { useSession } from 'next-auth/react';
import React from 'react';

import { EmptyFriendsPlaceholder } from '../empty-friends-placeholder';
import { FollowersTable } from '../followers-table';
import { FollowingTable } from '../following-table';

export const FriendsListSection: React.FC<{
  following: Friend[];
  followers: Follower[];
  onAdd: (code: string) => void;
  onRemove: (friend: Friend) => void;
  onFavorite: (friend: Friend) => void;
}> = (props) => {
  const session = useSession();
  const addFriendsLink = routes.account.friends.path({
    bookmark: FriendsPanels.AddFriends,
  });

  const profileLink = routes.user.path({
    params: {
      userId: session.data?.user.id ?? 'error',
    },
  });
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      {props.following.length === 0 && props.followers.length === 0 ? (
        <EmptyFriendsPlaceholder />
      ) : (
        <>
          <Column>
            <Typography variant="h6" gutterBottom>
              Following ({props.following.length}/{MAX_FRIENDS})
            </Typography>

            <FollowingTable
              friends={props.following}
              onRemove={props.onRemove}
              onFavorite={props.onFavorite}
            />
          </Column>

          <Column>
            <Typography variant="h6" gutterBottom>
              Followers ({props.followers.length})
            </Typography>

            <FollowersTable followers={props.followers} onAdd={props.onAdd} />
          </Column>
        </>
      )}

      <Divider />
      <BulletPoints
        title="How It Works"
        icon={<InfoOutlined color="info" fontSize="small" />}
        points={[
          <>Friends are players you follow that follow you back.</>,
          <>
            Add friends by sharing your{' '}
            <Link href={addFriendsLink}>Friend Code</Link> or{' '}
            <Link href={profileLink}>Profile Page</Link>.
          </>,
          `You can have at most ${MAX_FRIENDS} friends and ${MAX_BEST_FRIENDS} best friends.`,
          `Players you add as best friends will earn tokens when you play games.`,
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
