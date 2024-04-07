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
        endIcon={<ArrowRightAlt />}
        color={action.color ?? 'primary'}
        variant="arcade"
        size="small"
        href={action.href}
        sx={{
          mt: { xs: 1, sm: 0 },
          alignSelf: 'flex-end',
        }}
      >
        {action.text}
      </Button>
    )}
  </Box>
);

export type PanelFooterProps = React.ComponentProps<typeof PanelFooter>;
