import { ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material';
import {
  prizeCategoryIcons,
  prizeCategoryLabels,
} from '@worksheets/ui/components/prizes';
import { FilterablePrizeCategory } from '@worksheets/util/types';
import React from 'react';

export const CategoryMenu: React.FC<{
  anchorEl: null | HTMLElement;
  onClose: () => void;
  category: FilterablePrizeCategory;
  setCategory: (category: FilterablePrizeCategory) => void;
}> = ({ anchorEl, onClose, category, setCategory }) => {
  return (
    <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={onClose}>
      {Object.entries(prizeCategoryLabels).map(([key, value]) => (
        <MenuItem
          key={key}
          disabled={category === key}
          onClick={() => {
            setCategory(key as FilterablePrizeCategory);
            onClose();
          }}
        >
          <ListItemIcon>
            {prizeCategoryIcons[key as FilterablePrizeCategory]}
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
