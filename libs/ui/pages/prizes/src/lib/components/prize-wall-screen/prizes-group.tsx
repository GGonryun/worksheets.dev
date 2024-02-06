import { Box } from '@mui/material';
import { ArcadeItemGrid } from '@worksheets/ui/components/arcade';
import {
  ITEMS_PER_PAGE,
  Pagination,
  usePagination,
} from '@worksheets/ui/components/pagination';
import { Prize } from '@worksheets/ui/components/prizes';
import { PrizeSchema } from '@worksheets/util/types';
import React, { ReactNode } from 'react';

import { CustomPaper } from '../shared/custom-paper';

export const PrizesGroup: React.FC<{
  header: ReactNode;
  prizes: PrizeSchema[];
  empty?: ReactNode;
}> = ({ header, prizes, empty }) => {
  const { page, items, max, setPage } = usePagination(prizes, ITEMS_PER_PAGE);

  const ref = React.useRef<HTMLDivElement>(null);
  const handleSetPage = (page: number) => {
    setPage(page);
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Box
      width="100%"
      sx={{
        color: 'text.arcade',
      }}
    >
      <Box width="100%" pb={{ xs: 1.5, sm: 2.5 }}>
        {header}
      </Box>
      <CustomPaper
        sx={{
          backgroundColor: (theme) => theme.palette.background['solid-blue'],
          color: 'inherit',
        }}
      >
        {prizes.length > 0 ? (
          <Box
            sx={{
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              gap: 6,
            }}
          >
            <Box position="absolute" top={-128} ref={ref} visibility="hidden" />
            <ArcadeItemGrid>
              {items.map((item) => (
                <Box key={item.id}>
                  <Prize
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    imageUrl={item.imageUrl}
                    expiresAt={item.expiresAt}
                    type={item.type}
                  />
                </Box>
              ))}
            </ArcadeItemGrid>
            <Pagination page={page} setPage={handleSetPage} pages={max} />
          </Box>
        ) : (
          empty
        )}
      </CustomPaper>
    </Box>
  );
};
