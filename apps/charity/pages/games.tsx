import { Box, CircularProgress } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { NextPageWithLayout } from '@worksheets/util-next';
import { WebsiteLayout } from '../components/Layout';

const Page: NextPageWithLayout = () => {
  const { push } = useRouter();

  useEffect(() => {
    if (!push) return;

    push('/');
  }, [push]);

  return (
    <Box
      sx={{
        position: 'absolute',
        display: 'grid',
        placeItems: 'center',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
    >
      <CircularProgress />
    </Box>
  );
};

Page.getLayout = (page) => {
  return <WebsiteLayout hideNavigationBar>{page}</WebsiteLayout>;
};

export default Page;
