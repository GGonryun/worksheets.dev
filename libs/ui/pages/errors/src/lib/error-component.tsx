import { ArrowRightAlt, Refresh } from '@mui/icons-material';
import { Box, Button, Theme, Typography, useMediaQuery } from '@mui/material';
import { InternallyCenter } from '@worksheets/ui-core';
import Image from 'next/image';
import React from 'react';

const DEFAULT_ERROR_MESSAGE = 'If the problem persists, please contact us.';

export const ErrorComponent: React.FC<{
  message?: string;
  onRetry?: () => void;
}> = ({ message, onRetry }) => {
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
        }}
      >
        <Image
          src="/common/charity-games/logos/square.png"
          alt="Charity Games Logo"
          width={isMobile ? 100 : 200}
          height={isMobile ? 100 : 200}
        />

        <Typography variant={isMobile ? 'h5' : 'h4'}>Oops!</Typography>
        <Typography variant={isMobile ? 'h6' : 'h5'} gutterBottom>
          Something went wrong.
        </Typography>
        <Typography variant={isMobile ? 'body2' : 'body1'}>
          {message ?? DEFAULT_ERROR_MESSAGE}
        </Typography>
        <Box py={2} />
        {onRetry && (
          <Button
            variant="round"
            color="error"
            sx={{ mt: 1 }}
            onClick={onRetry}
            endIcon={<Refresh />}
          >
            Try Again
          </Button>
        )}
        <Button
          variant="outlined-round"
          color="error"
          sx={{ mt: 1 }}
          href="/"
          endIcon={<ArrowRightAlt />}
        >
          Go To Homepage
        </Button>
      </Box>
    </InternallyCenter>
  );
};

export type ErrorComponentProps = React.ComponentProps<typeof ErrorComponent>;
