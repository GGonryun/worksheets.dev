import { Box, Typography } from '@mui/material';
import HistoryIcon from '@mui/icons-material/History';

export const NoRecentGamesPlaceholder = () => (
  <Box
    display="flex"
    alignItems="center"
    gap={1}
    flexDirection={{ xs: 'column', sm: 'row' }}
  >
    <HistoryIcon sx={{ fontSize: 48 }} />
    <Box>
      <Typography variant="body1" fontWeight={700}>
        You haven&apos;t played any games yet.
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Get started by searching for a game or clicking the random game button.
      </Typography>
    </Box>
  </Box>
);
