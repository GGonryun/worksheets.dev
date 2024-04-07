import { Box, Button, ButtonProps } from '@mui/material';
import { routes } from '@worksheets/routes';
import React from 'react';

import { LogoBox } from '../shared/logo-box';
import { Toolbar } from './toolbar';

export const MarketingToolbar: React.FC<{ rootHref?: string }> = ({
  rootHref,
}) => {
  return (
    <Toolbar>
      <LogoBox rootHref={rootHref ?? routes.play.url()} />

      <Box mb={1} display="flex" flexDirection="row" gap={1}>
        <CustomButton href={routes.play.url()}>Play Now</CustomButton>
        <CustomButton color="secondary" href={routes.login.url()}>
          Log In
        </CustomButton>
      </Box>
    </Toolbar>
  );
};

const CustomButton: React.FC<ButtonProps> = (props) => {
  return (
    <Button
      {...props}
      variant="arcade"
      size="small"
      sx={{
        px: { xs: 1, sm: 2 },
        minWidth: { xs: 60, sm: 100 },
      }}
    />
  );
};
