import { SvgIconComponent } from '@mui/icons-material';
import { Divider, ListItemText, Menu, MenuItem } from '@mui/material';
import { FC } from 'react';
import { denseBoxShadow } from '../../util';

export const PuzzleMenu: FC<{
  anchor?: Element;
  onClose: () => void;
  options: { label: string; icon: SvgIconComponent; onClick: () => void }[];
  autoclose?: boolean;
}> = ({ anchor, onClose, options, autoclose }) => {
  return (
    <Menu
      anchorEl={anchor}
      open={Boolean(anchor)}
      onClose={onClose}
      PaperProps={{
        elevation: 0,
        variant: 'outlined',
        sx: { boxShadow: denseBoxShadow({ height: 6 }) },
      }}
      sx={{
        '& .MuiMenuItem-root': {
          paddingY: 0,
        },
        '& .MuiListItemText-root': {
          paddingLeft: 2,
        },
      }}
    >
      {options.map((option, index) => [
        Boolean(index) && <Divider />,
        <MenuItem
          dense
          onClick={() => {
            autoclose && onClose();
            option.onClick();
          }}
          key={index}
        >
          <option.icon color="action" />
          <ListItemText inset>{option.label}</ListItemText>
        </MenuItem>,
      ])}
    </Menu>
  );
};
