import { SvgIconComponent } from '@mui/icons-material';
import { Box } from '@mui/material';
import { FC } from 'react';
import { boxShadow } from '../../util/styles';

export const HeaderButton: FC<{ Icon: SvgIconComponent; size: number }> = ({
  Icon,
  size,
}) => (
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      backgroundColor: 'white',
      p: 0.8,
      borderRadius: '50%',
      boxShadow,
    }}
  >
    <Icon
      sx={{
        color: 'black',
        fontSize: Math.min(size * 1.5, 32),
        position: 'relative',
        top: '-2px',
      }}
    />
  </Box>
);
