import { Box, Button, Link, Typography } from '@mui/material';
import { FC } from 'react';

export const StickyContactBox: FC<{
  text?: string;
  freeSolo?: boolean;
}> = ({
  freeSolo = false,
  text = "Don't see your question here? Ask us anything, we're here to help!",
}) => (
  <Box
    sx={{
      position: { xs: 'block', sm: 'sticky' },
      top: 80,
      bottom: 0,
      height: 'fit-content',
      paddingLeft: { xs: freeSolo ? 2 : 0, sm: 2 },
      borderRadius: (theme) => (freeSolo ? theme.shape.borderRadius : 0),
      borderLeft: (theme) => ({
        xs: 'none',
        sm: freeSolo ? 'none' : `3px solid ${theme.palette.divider}`,
      }),
      backgroundColor: (theme) =>
        freeSolo ? theme.palette.background['solid-blue'] : 'transparent',
      p: 2,
    }}
  >
    <Typography color="text.arcade" variant="body2">
      {text}
    </Typography>
    <Button
      href="/contact"
      variant="arcade"
      color="success"
      fullWidth
      sx={{
        my: 2,
      }}
    >
      Contact Us
    </Button>

    <Typography
      component={Link}
      href="/help"
      color="text.arcade"
      variant="body2"
      sx={{
        textAlign: { xs: 'center', sm: 'left' },
      }}
    >
      Help Center
    </Typography>
  </Box>
);
