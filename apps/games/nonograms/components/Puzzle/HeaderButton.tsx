import { SvgIconComponent } from '@mui/icons-material';
import { Box } from '@mui/material';
import { tabletBoxShadow } from '@worksheets/ui-games';
import { FC, MouseEventHandler } from 'react';

export const HeaderButton: FC<{
  Icon: SvgIconComponent;
  size: number;
  onClick?: MouseEventHandler<HTMLDivElement>;
}> = ({ Icon, size, onClick }) => (
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      backgroundColor: 'white',
      p: 0.8,
      borderRadius: '50%',
      boxShadow: tabletBoxShadow,
    }}
    onClick={onClick}
  >
    <Icon
      sx={{
        color: 'primary.dark',
        fontSize: Math.min(size * 1.5, 32),
        position: 'relative',
        top: '-2px',
      }}
    />
  </Box>
);
