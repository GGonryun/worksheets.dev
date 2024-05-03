import { ArrowRightAlt, Refresh } from '@mui/icons-material';
import { Box, Button, Theme, Typography, useMediaQuery } from '@mui/material';
import common from '@worksheets/assets-common';
import { routes } from '@worksheets/routes';
import { InternallyCenter } from '@worksheets/ui-core';
import Image from 'next/image';
import React from 'react';

const DEFAULT_ERROR_MESSAGE = 'If the problem persists, please contact us.';
const DEFAULT_HEADER_MESSAGE = 'Something went wrong.';
const DEFAULT_TITLE = 'Oops!';

export const ErrorComponent: React.FC<{
  message?: string;
  title?: string;
  header?: string;
  hideLogo?: boolean;
  onRetry?: () => void;
}> = ({ title, header, hideLogo, message, onRetry }) => {
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('sm')
  );

  return (
    <InternallyCenter>
      <Box
        className="error-component"
        sx={{
          display: 'grid',
          placeItems: 'center',
          p: 2,
          textAlign: 'center',
          maxWidth: 400,
          color: (theme) => theme.palette.text.arcade,
        }}
      >
        {!hideLogo && (
          <Image
            src={common.charityGames.logos.square}
            alt="Charity Games Logo"
            width={isMobile ? 100 : 200}
            height={isMobile ? 100 : 200}
          />
        )}

        <Typography variant={isMobile ? 'h5' : 'h4'}>
          {title ?? DEFAULT_TITLE}
        </Typography>
        <Typography variant={isMobile ? 'h6' : 'h5'} gutterBottom>
          {header ?? DEFAULT_HEADER_MESSAGE}
        </Typography>
        <Typography variant={isMobile ? 'body2' : 'body1'}>
          {message ?? DEFAULT_ERROR_MESSAGE}
        </Typography>
        <Box py={2} />
        {onRetry && (
          <Button
            variant="arcade"
            color="error"
            sx={{ mt: 1 }}
            onClick={onRetry}
            endIcon={<Refresh />}
          >
            Try Again
          </Button>
        )}
        <Button
          variant="arcade"
          color="warning"
          sx={{ mt: 2 }}
          href={routes.home.path()}
          endIcon={<ArrowRightAlt />}
        >
          Go To Homepage
        </Button>
      </Box>
    </InternallyCenter>
  );
};

export type ErrorComponentProps = React.ComponentProps<typeof ErrorComponent>;
