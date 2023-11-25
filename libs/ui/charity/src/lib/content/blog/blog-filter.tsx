import { Box, Typography } from '@mui/material';

export const BlogFilter = () => (
  <Box
    sx={{
      border: (theme) => `1px solid ${theme.palette.grey[500]}`,
      margin: '-1px',
      px: 1,
      py: 0.5,
      backgroundColor: (theme) => theme.palette.grey[200],
      display: 'flex',
      justifyContent: 'space-between',
    }}
  >
    <Typography
      sx={{
        textDecoration: 'underline',
        textDecorationThickness: '3px',
        textUnderlineOffset: '8px',
        textDecorationColor: (theme) => theme.palette.primary.main,
      }}
    >
      All Posts
    </Typography>
  </Box>
);
