import HistoryIcon from '@mui/icons-material/History';
import { Box, Typography } from '@mui/material';

export const NoRecentGamesPlaceholder = () => (
  <Box
    display="flex"
    alignItems="center"
    gap={1}
    flexDirection={{ xs: 'column', sm: 'row' }}
  >
    <HistoryIcon
      sx={{ fontSize: 48, color: (theme) => theme.palette.text.arcade }}
    />
    <Box>
      <Typography variant="body1" fontWeight={500} color="text.arcade">
        You haven&apos;t played any games yet.
      </Typography>
      <Typography variant="body3" color="text.arcade">
        Get started by searching for a game or clicking the random game button.
      </Typography>
    </Box>
  </Box>
);