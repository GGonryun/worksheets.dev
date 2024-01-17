import { ArrowRightAlt } from '@mui/icons-material';
import { Box, Button, ButtonProps, Link, Typography } from '@mui/material';
import React from 'react';

export const PanelFooter: React.FC<{
  learn: {
    text: string;
    href: string;
  };
  action?: {
    text: string;
    href: string;
    color?: ButtonProps['color'];
  };
}> = ({ learn, action }) => (
  <Box
    sx={{
      mt: 1,
      display: 'flex',
      justifyContent: 'space-between',
      gap: 1,
      alignItems: { xs: 'flex-start', sm: 'flex-end' },
      flexDirection: { xs: 'column', sm: 'row' },
    }}
  >
    <Typography variant="body3" color="text.secondary">
      Learn more about <b>{learn.text}</b> in the{' '}
      <Box component="span" color="primary.main">
        <Link href={learn.href}>Help Center</Link>
      </Box>
    </Typography>
    {action && (
      <Button
        endIcon={<ArrowRightAlt sx={{ ml: '-2px', mt: '-3px' }} />}
        color={action.color ?? 'primary'}
        variant="round"
        disableElevation
        href={action.href}
      >
        {action.text}
      </Button>
    )}
  </Box>
);
