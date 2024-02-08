import { ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material';
import {
  raffleCategoryIcons,
  raffleCategoryLabels,
} from '@worksheets/ui/components/raffles';
import { FilterableRaffleCategory } from '@worksheets/util/types';
import React from 'react';

export const CategoryMenu: React.FC<{
  anchorEl: null | HTMLElement;
  onClose: () => void;
  category: FilterableRaffleCategory;
  setCategory: (category: FilterableRaffleCategory) => void;
}> = ({ anchorEl, onClose, category, setCategory }) => {
  return (
    <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={onClose}>
      {Object.entries(raffleCategoryLabels).map(([key, value]) => (
        <MenuItem
          key={key}
          disabled={category === key}
          onClick={() => {
            setCategory(key as FilterableRaffleCategory);
            onClose();
          }}
        >
          <ListItemIcon>
            {raffleCategoryIcons[key as FilterableRaffleCategory]}
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
