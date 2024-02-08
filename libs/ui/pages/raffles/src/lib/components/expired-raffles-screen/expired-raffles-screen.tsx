import { ArrowRightAlt } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';
import {
  Pagination,
  usePagination,
} from '@worksheets/ui/components/pagination';
import { useMediaQueryDown } from '@worksheets/ui/hooks/use-media-query';
import { BasicRaffleDetails } from '@worksheets/util/types';
import * as React from 'react';

import { CustomContainer } from '../shared/custom-container';
import { CustomPaper } from '../shared/custom-paper';
import { ExpiredRafflesTable } from './table';

export const ExpiredRafflesScreen: React.FC<{
  raffles: BasicRaffleDetails[];
}> = ({ raffles }) => {
  const { page, setPage, max, items } = usePagination(raffles, 50);
  const isMobile = useMediaQueryDown('sm');

  return (
    <CustomContainer>
      <CustomPaper
        sx={{
          width: '90%',
          gap: 2,
        }}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          flexWrap="wrap"
          mb={1}
          gap={2}
        >
          <Typography typography={{ xs: 'h5', sm: 'h4' }}>
            Expired Raffles
          </Typography>
          <Button
            size={isMobile ? 'small' : 'medium'}
            href="/raffles"
            variant="arcade"
            color="error"
            endIcon={<ArrowRightAlt />}
            sx={{ width: { xs: '100%', sm: 'fit-content' } }}
          >
            See All
          </Button>
        </Box>
        <ExpiredRafflesTable raffles={items} />
        <Pagination page={page} pages={max} setPage={setPage} />
      </CustomPaper>
    </CustomContainer>
  );
};
