import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { useRouter } from 'next/router';
import { useTheme } from '@mui/material';
import { Person } from '@mui/icons-material';
import { TinyMenu, TinyMenuItem } from '@worksheets/ui-basic-style';
import { useUser } from '../hooks';

export function AccountMenu() {
  const { push } = useRouter();
  const theme = useTheme();
  const { signOut } = useUser();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleGoToSettings = () => {
    push('/settings');
  };

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <React.Fragment>
      <Tooltip title="My account">
        <IconButton onClick={handleClick} size="small">
          <Avatar
            sx={{
              width: 32,
              height: 32,
              '&:hover': {
                backgroundColor: theme.palette.primary.main,
              },
            }}
          >
            <Person />
          </Avatar>
        </IconButton>
      </Tooltip>

      <TinyMenu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        showArrow
        horizontal={'right'}
      >
        <TinyMenuItem onClick={handleGoToSettings}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </TinyMenuItem>
        <TinyMenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </TinyMenuItem>
      </TinyMenu>
    </React.Fragment>
  );
}
