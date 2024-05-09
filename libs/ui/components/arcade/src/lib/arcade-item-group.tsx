import { Box, Paper, Typography } from '@mui/material';
import {
  ITEMS_PER_PAGE,
  Pagination,
  usePagination,
} from '@worksheets/ui/components/pagination';
import React, { ReactNode } from 'react';

import { ArcadeItemGrid } from './arcade-item-grid';

export type ArcadeItemGroupProps<T> = {
  title: ReactNode;
  action?: ReactNode;
  items?: T[];
  render: (item: T) => ReactNode;
  header?: ReactNode;
  footer?: ReactNode;
  empty?: ReactNode;
  placeholder?: ReactNode;
  pageSize?: number;
};

export function ArcadeItemGroup<T extends { id: string | number }>(
  props: ArcadeItemGroupProps<T>
) {
  const { page, items, max, setPage } = usePagination<T>(
    props.items ?? [],
    props.pageSize ?? ITEMS_PER_PAGE
  );

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
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        flexWrap="wrap"
        gap={1}
        pb={{ xs: 1.5, sm: 2.5 }}
        sx={{
          color: 'text.arcade',
        }}
      >
        <Typography
          component="div"
          sx={{
            typography: { xs: 'h6', sm: 'h5', md: 'h4' },
          }}
        >
          {props.title}
        </Typography>
        {Boolean(props.action) && <Box>{props.action}</Box>}
      </Box>
      <Paper
        sx={{
          padding: { xs: 2, sm: 3, md: 4 },
          display: 'flex',
          gap: { xs: 2, sm: 3, md: 4 },
          flexDirection: 'column',
          backgroundColor: (theme) => theme.palette.background['solid-blue'],
          color: 'inherit',
        }}
      >
        {props.header}

        {props.items == null ? (
          props.placeholder
        ) : props.items.length > 0 ? (
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
                <Box key={item.id}>{props.render(item)}</Box>
              ))}
            </ArcadeItemGrid>
            <Pagination page={page} setPage={handleSetPage} pages={max} />
          </Box>
        ) : (
          props.empty
        )}

        {props.footer}
      </Paper>
    </Box>
  );
}
