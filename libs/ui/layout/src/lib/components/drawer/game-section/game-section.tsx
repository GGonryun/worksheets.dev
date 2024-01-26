import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { Carousel } from '@worksheets/ui/components/carousel';
import { GameIcon } from '@worksheets/ui/components/games';
import { useMediaQuery } from '@worksheets/ui/hooks/use-media-query';
import { BasicGameInfo } from '@worksheets/util/types';
import { FC, ReactNode } from 'react';

export type GameSectionProps = {
  title: string;
  href?: string;
  games: BasicGameInfo[];
  placeholder?: ReactNode;
};
export const GameSection: FC<GameSectionProps> = ({
  placeholder,
  title,
  games,
  href,
}) => {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  return (
    <Box>
      <Link underline={href ? 'hover' : 'none'} color="text.arcade" href={href}>
        <Typography variant={isMobile ? 'h5' : 'h4'} color="text.arcade">
          {title}
        </Typography>
      </Link>
      {placeholder && !games.length && <Box mt={2}>{placeholder}</Box>}
      <Carousel sx={{ gap: 2, px: 2 }}>
        {games.map((game) => (
          <Box key={game.id} minWidth={92} width={92} height="auto">
            <GameIcon
              key={game.id}
              id={game.id}
              name={game.name}
              caption={''}
              imageUrl={game.image}
            />
          </Box>
        ))}
      </Carousel>
    </Box>
  );
};
