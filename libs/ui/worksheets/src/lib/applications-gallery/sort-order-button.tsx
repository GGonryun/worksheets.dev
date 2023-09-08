import { Sort } from '@mui/icons-material';
import { FC, useState } from 'react';
import { TinyToggle, TinyMenu, TinyMenuItem } from '@worksheets/ui-basic-style';

export enum SortOrder {
  AZ = 'az',
  ZA = 'za',
  Newest = 'newest',
  Oldest = 'oldest',
}

export const sortLabels: Record<SortOrder, string> = {
  [SortOrder.AZ]: 'A-Z',
  [SortOrder.ZA]: 'Z-A',
  [SortOrder.Newest]: 'Newest',
  [SortOrder.Oldest]: 'Oldest',
};

export const sortOrders: SortOrder[] = [
  SortOrder.AZ,
  SortOrder.ZA,
  SortOrder.Newest,
  SortOrder.Oldest,
];

export const SortMenuButton: FC<{
  value: SortOrder;
  onSelect: (so: SortOrder) => void;
}> = ({ value, onSelect }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);
  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (so?: SortOrder) => {
    if (so) {
      onSelect(so);
    }

    setAnchorEl(null);
  };
  return (
    <>
      <TinyToggle
        color="inherit"
        checked={true}
        startIcon={<Sort sx={{ mr: -0.5 }} />}
        onClick={handleOpen}
      >
        Sort: {sortLabels[value]}
      </TinyToggle>
      <TinyMenu
        anchorEl={anchorEl}
        open={open}
        onClose={() => handleClose()}
        horizontal={'left'}
      >
        {sortOrders.map((so) => (
          <TinyMenuItem
            key={so}
            onClick={() => {
              handleClose(so);
            }}
            selected={so === value}
          >
            {sortLabels[so]}
          </TinyMenuItem>
        ))}
      </TinyMenu>
    </>
  );
};
