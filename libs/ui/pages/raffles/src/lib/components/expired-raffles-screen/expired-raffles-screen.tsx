import { ArrowRightAlt, InfoOutlined } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';
import { routes } from '@worksheets/routes';
import {
  Pagination,
  usePagination,
} from '@worksheets/ui/components/pagination';
import { useMediaQueryDown } from '@worksheets/ui/hooks/use-media-query';
import { HelpPrizesQuestions } from '@worksheets/util/enums';
import { BasicRaffleDetails } from '@worksheets/util/types';
import Link from 'next/link';
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
            href={routes.raffles.path()}
            variant="arcade"
            color="success"
            endIcon={<ArrowRightAlt />}
            sx={{ width: { xs: '100%', sm: 'fit-content' } }}
          >
            Active Raffles
          </Button>
        </Box>
        <ExpiredRafflesTable raffles={items} />
        <Pagination page={page} pages={max} setPage={setPage} />
        <Box display="flex" alignItems="center" gap={1} pt={1}>
          <InfoOutlined color="info" />
          <Typography
            typography="body2"
            component={Link}
            href={routes.help.prizes.path({
              bookmark: HelpPrizesQuestions.HowToWin,
            })}
            color="inherit"
          >
            Click here to learn more about Prizes & Raffles
          </Typography>
        </Box>
      </CustomPaper>
    </CustomContainer>
  );
};
