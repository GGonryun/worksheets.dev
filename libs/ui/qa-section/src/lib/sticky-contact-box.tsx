import { Box, Typography, Button, Link } from '@mui/material';
import { FC } from 'react';

export const StickyContactBox: FC<{
  hideFAQRedirect?: boolean;
  text?: string;
}> = ({
  hideFAQRedirect,
  text = "Don't see your question here? Ask us anything, we're here to help!",
}) => (
  <Box
    sx={{
      position: { xs: 'block', sm: 'sticky' },
      top: 80,
      bottom: 0,
      height: 'fit-content',
      paddingLeft: { xs: 0, sm: 2 },
      borderLeft: (theme) => ({
        xs: 'none',
        sm: `3px solid ${theme.palette.divider}`,
      }),
    }}
  >
    <Typography variant="body2">{text}</Typography>
    <Button
      variant="contained"
      fullWidth
      sx={{
        borderRadius: 8,
        mt: 2,
        textTransform: 'none',
        fontWeight: 700,
        fontFamily: (theme) => theme.typography.body1.fontFamily,
      }}
    >
      Contact Us
    </Button>
    {!hideFAQRedirect && (
      <Link href="/faq">
        <Typography
          variant="body2"
          sx={{
            mt: 2,
            textAlign: { xs: 'center', sm: 'left' },
          }}
        >
          Frequently Asked Questions
        </Typography>
      </Link>
    )}
  </Box>
);
