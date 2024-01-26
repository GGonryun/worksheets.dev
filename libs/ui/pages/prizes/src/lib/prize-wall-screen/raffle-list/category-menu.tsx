import { ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material';
import {
  PrizeCategory,
  prizeCategoryIcons,
  prizeCategoryLabels,
} from '@worksheets/ui/components/prizes';
import React from 'react';

import { useRaffleScreenContext } from '../context';

export const CategoryMenu: React.FC<{
  anchorEl: null | HTMLElement;
  onClose: () => void;
}> = ({ anchorEl, onClose }) => {
  const { category, setCategory } = useRaffleScreenContext();
  return (
    <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={onClose}>
      {Object.entries(prizeCategoryLabels).map(([key, value]) => (
        <MenuItem
          key={key}
          disabled={category === key}
          onClick={() => {
            setCategory(key as PrizeCategory);
            onClose();
          }}
        >
          <ListItemIcon>
            {prizeCategoryIcons[key as PrizeCategory]}
          </ListItemIcon>
          <ListItemText
            sx={{ px: 4 }}
            primaryTypographyProps={{
              variant: 'h6',
            }}
          >
            {value}
          </ListItemText>
        </MenuItem>
      ))}
    </Menu>
  );
};
