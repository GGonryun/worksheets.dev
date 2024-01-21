import { Box } from '@mui/material';
import { Pagination } from '@worksheets/ui-core';
import React, { useState } from 'react';

import { Prize } from '../../shared/prize';
import { useRaffleScreenContext } from '../context';

const ITEMS_PER_PAGE = 15;

export const PrizesGroup: React.FC = () => {
  const { list } = useRaffleScreenContext();
  const [page, setPage] = useState(0);

  const max = Math.ceil(list.length / ITEMS_PER_PAGE);

  const start = page * ITEMS_PER_PAGE;
  const last = start + ITEMS_PER_PAGE;

  const items = list.slice(start, last);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 6,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: { xs: 2, sm: 2, md: 3, lg: 4 },
          justifyContent: 'center',
        }}
      >
        {items.map((item) => (
          <Box
            key={item.id}
            sx={{
              height: 'auto',
              width: { xs: 160, sm: 192, md: 224 },
            }}
          >
            <Prize {...item} />
          </Box>
        ))}
      </Box>
      <Pagination page={page} setPage={setPage} pages={max} />
    </Box>
  );
};
