import { Box } from '@mui/material';
import {
  ITEMS_PER_PAGE,
  Pagination,
  usePagination,
} from '@worksheets/ui/components/pagination';
import { Prize } from '@worksheets/ui/components/prizes';
import React from 'react';

import { useRaffleScreenContext } from '../context';

export const PrizesGroup: React.FC = () => {
  const { list } = useRaffleScreenContext();

  const { page, items, max, setPage } = usePagination(list, ITEMS_PER_PAGE);

  const ref = React.useRef<HTMLDivElement>(null);
  const handleSetPage = (page: number) => {
    setPage(page);
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        gap: 6,
      }}
    >
      <Box position="absolute" top={-128} ref={ref} visibility="hidden" />
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: { xs: 2, sm: 2, md: 3, lg: 4 },
          justifyContent: {
            xs: 'center',
            mobile1: 'space-around',
            sm: 'space-between',
          },
        }}
      >
        {items.map((item) => (
          <Box
            key={item.id}
            sx={{
              height: 'auto',
              width: { xs: '100%', mobile1: 128, sm: 160, md: 192 },
            }}
          >
            <Prize
              id={item.id}
              name={item.title}
              imageUrl={item.imageUrl}
              expires={item.expires}
              company={item.company}
            />
          </Box>
        ))}
      </Box>
      <Pagination page={page} setPage={handleSetPage} pages={max} />
    </Box>
  );
};
