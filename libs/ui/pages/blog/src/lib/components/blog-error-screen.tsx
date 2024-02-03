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
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        p: 3,
        background: (theme) => theme.palette.background['gradient-blue'],
      }}
    >
      <Typography color="text.arcade" textAlign="center">
        This page doesn&apos;t exist. Sorry about that!
      </Typography>
      <Typography sx={{ pt: 3 }} color="text.arcade" textAlign="center">
        I don&apos;t know what you were looking for, but it&apos;s not here.
        <br />
        Maybe you can find it on the{' '}
        <Link href={'/blog'} color="text.arcade">
          Blog page
        </Link>
        ?
      </Typography>
    </Paper>
  </Box>
);
