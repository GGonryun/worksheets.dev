import { Box, Button, Link, Paper, Typography } from '@mui/material';
import { FC, ReactNode } from 'react';
import { Construction } from '../../icons/construction';
import { useRouter } from 'next/router';
import { ArrowBack } from '@mui/icons-material';

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
            display: 'flex',
            flexDirection: 'column',
            borderRadius: 4,
            alignItems: 'flex-start',
            maxWidth: 400,
            p: 3,
            mb: 6,
          }}
        >
          <Button
            color="error"
            size="small"
            onClick={back}
            startIcon={<ArrowBack />}
          >
            <Typography variant="h6">Back</Typography>
          </Button>
          <Typography variant="h5">This Page is Under Construction</Typography>
          <Construction sx={{ height: 200, width: 200, py: 3 }} />
          <Typography>
            Please check back later or stay up to date with our progress by{' '}
            <Link href="/login">joining our newsletter</Link>.
          </Typography>
          {children}
        </Paper>
      </Box>
    </Box>
  );
};
