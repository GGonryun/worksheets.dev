import { ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material';
import React from 'react';

import {
  categoryIcons,
  categoryLabels,
  PrizeCategory,
} from '../../../types/categories';
import { useRaffleScreenContext } from '../context';

export const CategoryMenu: React.FC<{
  anchorEl: null | HTMLElement;
  onClose: () => void;
}> = ({ anchorEl, onClose }) => {
  const { category, setCategory } = useRaffleScreenContext();
  return (
    <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={onClose}>
      {Object.entries(categoryLabels).map(([key, value]) => (
        <MenuItem
          key={key}
          disabled={category === key}
          onClick={() => {
            setCategory(key as PrizeCategory);
            onClose();
          }}
        >
          <ListItemIcon>{categoryIcons[key as PrizeCategory]}</ListItemIcon>
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
