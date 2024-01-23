import { Check } from '@mui/icons-material';
import { Box, Tooltip, Typography } from '@mui/material';

export const CornerArrow = () => (
  <>
    <Box
      sx={{
        position: 'absolute',
        width: 0,
        height: 0,
        right: { xs: 14, sm: 20 },
        bottom: 0,
        // rotate clockwise 45deg
        transform: 'rotate(45deg)',
        // translate to the bottom right corner
        transformOrigin: 'bottom left',
        borderTop: {
          xs: '35px solid transparent',
          sm: '50px solid transparent',
        },
        borderBottom: {
          xs: '35px solid transparent',
          sm: '50px solid transparent',
        },
        backgroundColor: (theme) => theme.palette.success.main,
        borderLeft: (theme) => ({
          xs: `35px solid ${theme.palette.success.main}`,
          sm: `50px solid ${theme.palette.success.main}`,
        }),
      }}
    />
    <Tooltip
      title={
        <Typography variant="body2" fontWeight={500}>
          Entered in Raffle
        </Typography>
      }
      placement="top"
      arrow
    >
      <Box
        sx={{
          position: 'absolute',
          right: { xs: 4, sm: 6 },
          bottom: { xs: 4, sm: 6 },
        }}
      >
        <Check
          color="white"
          sx={{
            fontSize: { xs: 20, sm: 30 },
            stroke: '#FFF',
            strokeWidth: 2,
          }}
        />
      </Box>
    </Tooltip>
  </>
);
