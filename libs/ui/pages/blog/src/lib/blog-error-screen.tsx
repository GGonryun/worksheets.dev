import { Box, Link, Paper, Typography } from '@mui/material';

export const BlogErrorScreen = () => (
  <Box
    className="blog-error-screen"
    sx={{
      height: '100vh',
      width: '100%',
      display: 'grid',
      placeItems: 'center',
    }}
  >
    <Paper
      variant="outlined"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        p: 3,
      }}
    >
      <Typography>This page doesn&apos;t exist. Sorry about that!</Typography>
      <Typography sx={{ pt: 3 }}>
        I don&apos;t know what you were looking for, but it&apos;s not here.
        Maybe you can find it on the <Link href={'/blog'}>Blog</Link>?
      </Typography>
    </Paper>
  </Box>
);
