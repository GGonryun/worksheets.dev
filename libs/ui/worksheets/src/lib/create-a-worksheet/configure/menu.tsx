import {
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
} from '@mui/material';
import AlarmIcon from '@mui/icons-material/AlarmOutlined';
import SendIcon from '@mui/icons-material/SendOutlined';
import React, { ReactNode } from 'react';

const triggers: TriggerMenuOption[] = [
  {
    label: 'Schedule',
    value: 'schedule',
    caption: 'execute on an interval',
    icon: <AlarmIcon />,
  },
  {
    label: 'Event',
    value: 'event',
    caption: 'execute on an event',
    icon: <SendIcon />,
  },
];

type TriggerMenuOption = {
  value: 'schedule' | 'event';
  label: string;
  caption: string;
  icon: ReactNode;
};
// a mui menu that can be used to create a new trigger
export type TriggerMenuProps = {
  anchorEl: HTMLElement | null;
  onSelect: (value: TriggerMenuOption['value']) => void;
  onClose: () => void;
};
export const TriggerMenu: React.FC<TriggerMenuProps> = ({
  anchorEl,
  onSelect,
  onClose,
}) => (
  <Menu
    anchorEl={anchorEl}
    open={Boolean(anchorEl)}
    onClose={onClose}
    sx={{ my: 1 }}
  >
    <MenuList dense disablePadding>
      {triggers.map((option) => (
        <MenuItem
          key={option.value}
          value={option.value}
          onClick={() => onSelect(option.value)}
        >
          <ListItemIcon sx={{ paddingRight: 2 }}>{option.icon}</ListItemIcon>
          <ListItemText primary={option.label} secondary={option.caption} />
        </MenuItem>
      ))}
    </MenuList>
  </Menu>
);
