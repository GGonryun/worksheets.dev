import { TableBody } from '@mui/material';
import { Follower } from '@worksheets/util/types';

import { FollowersTableListItem } from './followers-table-list-item';

export const FollowersTableBody: React.FC<{
  followers: Follower[];
  onAdd: (code: string) => void;
}> = ({ followers, onAdd }) => (
  <TableBody>
    {followers.map((follower) => (
      <FollowersTableListItem
        key={follower.friendshipId}
        follower={follower}
        onAdd={onAdd}
      />
    ))}
  </TableBody>
);
