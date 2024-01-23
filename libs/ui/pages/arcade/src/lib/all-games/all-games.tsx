import { Box, Button } from '@mui/material';
import { ShuffleIcon } from '@worksheets/icons/native';
import { TitledSection } from '@worksheets/ui/arcade';
import { GameIcon, GameProps } from '@worksheets/ui/games';
import { useMediaQuery } from '@worksheets/ui/hooks/use-media-query';
import { Pagination, usePagination } from '@worksheets/ui/pagination';
import React from 'react';

export const AllGames: React.FC<{ games: GameProps[] }> = (props) => {
  const { isMobile, isMedium, isDesktop1 } = useMediaQuery();

  const { page, items, max, setPage } = usePagination<GameProps>(
    props.games,
    isDesktop1 ? 12 : isMedium ? 15 : 18
  );

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
        title={'All Games'}
        header={
          <Button
            variant="arcade"
            color="warning"
            size={isMobile ? 'small' : 'large'}
            fullWidth
            startIcon={<ShuffleIcon size={isMobile ? 18 : 23} />}
          >
            Play Random Game
          </Button>
        }
        footer={<Pagination page={page} setPage={handleSetPage} pages={max} />}
      >
        {items.map((item) => (
          <Box key={item.id}>
            <GameIcon {...item} />
          </Box>
        ))}
      </TitledSection>
    </Box>
  );
};
