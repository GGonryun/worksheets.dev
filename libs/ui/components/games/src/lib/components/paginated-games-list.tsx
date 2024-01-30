import { Box, Button } from '@mui/material';
import { ShuffleIcon } from '@worksheets/icons/native';
import { TitledSection } from '@worksheets/ui/components/arcade';
import {
  Pagination,
  usePagination,
} from '@worksheets/ui/components/pagination';
import { useMediaQuery } from '@worksheets/ui/hooks/use-media-query';
import React from 'react';

import { GameIcon, GameIconProps } from './game-icon';

export const PaginatedGamesList: React.FC<{
  title: string;
  games: GameIconProps[];
}> = (props) => {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  const { page, items, max, setPage } = usePagination(props.games, 18);

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
      <TitledSection
        title={props.title}
        header={
          <Button
            variant="arcade"
            color="warning"
            href="/random"
            size={isMobile ? 'medium' : 'large'}
            fullWidth
            startIcon={<ShuffleIcon size={isMobile ? 18 : 23} />}
            sx={{ py: { xs: 1, sm: 2 } }}
          >
            Play Random Game
          </Button>
        }
        footer={<Pagination page={page} setPage={handleSetPage} pages={max} />}
      >
        {items.map((item) => (
          <Box key={item.id}>
            <GameIcon
              id={item.id}
              name={item.name}
              caption={item.caption}
              imageUrl={item.imageUrl}
            />
          </Box>
        ))}
      </TitledSection>
    </Box>
  );
};
