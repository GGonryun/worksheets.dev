'use client';

import { ArrowBack } from '@mui/icons-material';
import { Box, Button, Link, Paper, Typography } from '@mui/material';
import { externalRoutes } from '@worksheets/routes';
import { useRouter } from 'next/navigation';
import { FC, ReactNode } from 'react';

import { Construction } from './icons/construction';

export const UnderConstruction: FC<{ children?: ReactNode }> = ({
  children,
}) => {
  const { back } = useRouter();
  return (
    <Box
      className="under-construction"
      sx={{
        height: '100%',
        width: '100%',
        display: 'grid',
        placeItems: 'center',
      }}
    >
      <Box
        sx={{
          height: '100%',
          width: '95%',
          display: 'grid',
          placeItems: 'center',
        }}
      >
        <Paper
          variant="outlined"
          sx={{
            backgroundColor: 'background.solid-blue',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            maxWidth: 400,
            p: 3,
            mb: 6,
            gap: 3,
            color: 'text.arcade',
          }}
        >
          <Button
            color="error"
            variant="arcade"
            size="small"
            onClick={back}
            startIcon={<ArrowBack />}
          >
            Back
          </Button>
          <Typography variant="h5">This Page is Under Construction</Typography>
          <Box
            sx={{
              backgroundColor: 'background.paper',
              borderRadius: 4,
              p: 2,
              pb: 0,
            }}
          >
            <Construction sx={{ height: 200, width: 200 }} />
          </Box>
          <Typography>
            Please check back later or{' '}
            <Link color="inherit" href={externalRoutes.social.twitter}>
              follow us on social media
            </Link>{' '}
            for updates.
          </Typography>
          {children}
        </Paper>
      </Box>
    </Box>
  );
};
