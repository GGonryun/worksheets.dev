import { LoginOutlined, VpnKeyOutlined } from '@mui/icons-material';
import { Button, Link, Typography } from '@mui/material';
import { routes } from '@worksheets/routes';
import { Column } from '@worksheets/ui/components/flex';
import React from 'react';

export const LoginToView: React.FC<{
  redirect: string;
  title: string;
  subtitle: string;
}> = ({ redirect, title, subtitle }) => (
  <Column gap={2}>
    <Typography color="text.arcade" typography="h6">
      <Link href={routes.signUp.path()} color="text.arcade">
        Create an account
      </Link>{' '}
      to {title}.
    </Typography>
    <Column gap={1} mt={2}>
      <Typography fontWeight={500} color="text.arcade">
        {subtitle}
      </Typography>
      <Button
        variant="arcade"
        color="warning"
        href={routes.login.path({
          query: {
            redirect,
          },
        })}
        startIcon={<LoginOutlined />}
        sx={{
          width: 225,
        }}
      >
        Login To View
      </Button>
    </Column>
    <Column gap={1}>
      <Typography fontWeight={500} color="text.arcade">
        Don't have an account?
      </Typography>
      <Button
        variant="arcade"
        color="secondary"
        href={routes.signUp.path({
          query: {
            redirect,
          },
        })}
        startIcon={<VpnKeyOutlined />}
        sx={{
          width: 225,
        }}
      >
        Register Now
      </Button>
    </Column>
  </Column>
);
