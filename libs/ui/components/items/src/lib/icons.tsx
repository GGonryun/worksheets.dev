import { Remove } from '@mui/icons-material';
import { Box } from '@mui/material';
import { ClockExclamation } from '@worksheets/icons/dazzle';

export const ExpiringItemIcon: React.FC<{ size: number }> = ({ size }) => (
  <Box
    sx={{
      lineHeight: 0,
      backgroundColor: (theme) => theme.palette.error.main,
      // background: `linear-gradient(90deg, rgba(168, 105, 74, 0.15) 0%,rgba(49, 77, 202, 0.15) 100%),linear-gradient(180deg, rgb(88, 1, 221),rgb(53, 46, 111))`,
      background: `linear-gradient(0deg, rgb(149, 5, 4),rgb(253, 19, 61));`,
      borderRadius: '24px',
      p: '3px',
      border: (theme) => `2px solid ${theme.palette.background.paper}`,
    }}
  >
    <ClockExclamation
      color="white"
      sx={{
        fontSize: size,
      }}
    />
  </Box>
);

export const RemoveItemIcon: React.FC<{ size: number }> = ({ size }) => (
  <Box
    sx={{
      lineHeight: 0,
      backgroundColor: (theme) => theme.palette.error.main,
      // background: `linear-gradient(90deg, rgba(168, 105, 74, 0.15) 0%,rgba(49, 77, 202, 0.15) 100%),linear-gradient(180deg, rgb(88, 1, 221),rgb(53, 46, 111))`,
      background: `linear-gradient(0deg, rgb(149, 5, 4),rgb(253, 19, 61));`,
      borderRadius: '24px',
      p: '3px',
      border: (theme) => `2px solid ${theme.palette.background.paper}`,
    }}
  >
    <Remove
      color="white"
      sx={{
        fontSize: size,
      }}
    />
  </Box>
);
