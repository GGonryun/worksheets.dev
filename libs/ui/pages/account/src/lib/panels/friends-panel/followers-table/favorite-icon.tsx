import { Favorite } from '@mui/icons-material';
import { Tooltip } from '@mui/material';

export const FavoriteIcon: React.FC<{ username: string }> = ({ username }) => (
  <Tooltip
    placement="top"
    title={`${username} has added you as a best friend.`}
  >
    <Favorite color="secondary" fontSize="small" />
  </Tooltip>
);
