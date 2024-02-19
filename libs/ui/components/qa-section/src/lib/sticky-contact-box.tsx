import { ArrowForward } from '@mui/icons-material';
import { Box, Button, Link, Typography } from '@mui/material';
import { routes } from '@worksheets/ui/routes';
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
    <Typography fontWeight={500} color="text.arcade" variant="body2">
      {text}
    </Typography>
    <Button
      href={routes.contact.path()}
      variant="arcade"
      color="success"
      fullWidth
      endIcon={<ArrowForward />}
      sx={{
        my: 2,
      }}
    >
      Contact Us
    </Button>

    <Typography
      fontWeight={500}
      component={Link}
      href={routes.help.path()}
      variant="body2"
      sx={{
        color: 'text.arcade',
        textDecorationColor: 'text.arcade',
        textDecoration: 'underline',
        textAlign: { xs: 'center', sm: 'left' },
      }}
    >
      Help Center
    </Typography>
  </Box>
);
