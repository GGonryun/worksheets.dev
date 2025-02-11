import { SquareRounded } from '@mui/icons-material';
import {
  Box,
  Button,
  ButtonProps,
  Paper,
  Theme,
  useMediaQuery,
} from '@mui/material';
import { playRoutes } from '@worksheets/routes';
import { FillImage } from '@worksheets/ui/components/images';
import { useInterval } from '@worksheets/ui-core';
import { BasicGameInfo } from '@worksheets/util/types';
import React from 'react';

export const PROMOTION_INTERVAL = 5000;

export const PrimaryFeatured: React.FC<{
  items: BasicGameInfo[];
  actionColor?: ButtonProps['color'];
}> = (props) => {
  const [active, setActive] = React.useState(0);

  const isSmall = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));

  const item = props.items[active];

  useInterval(() => {
    setActive((prev) => (prev + 1) % props.items.length);
  }, PROMOTION_INTERVAL);

  return (
    <Paper
      elevation={9}
      sx={{
        height: '100%',
        width: '100%',
        display: 'grid',
        placeItems: 'center',
        boxSizing: 'border-box',
        padding: { xs: 1.5, sm: 3 },
        backgroundColor: (theme) => theme.palette.background.soft,
      }}
    >
      <Paper
        component="a"
        href={playRoutes.game.path({
          params: {
            gameId: item.id,
          },
        })}
        sx={{
          position: 'relative',
          cursor: 'pointer',
          width: '100%',
          height: '100%',
          overflow: 'hidden',
        }}
      >
        <FillImage priority src={item.cover} alt={item.title} />
        <Box
          position="absolute"
          bottom={{ xs: 12, sm: 16 }}
          left={{ xs: 16, sm: 32 }}
          right={{ xs: 12, sm: 16 }}
          display="flex"
          justifyContent="space-between"
          alignItems="flex-end"
        >
          <ActionTabs
            isSmall={isSmall}
            active={active}
            count={props.items.length}
            onClick={(i) => setActive(i)}
          />
          <Button
            component="div"
            variant="arcade"
            color={props.actionColor ?? 'error'}
            size={isSmall ? 'small' : 'medium'}
            sx={{
              visibility: isSmall ? 'hidden' : 'visible',
            }}
          >
            Play Now
          </Button>
        </Box>
      </Paper>
    </Paper>
  );
};
const ActionTabs: React.FC<{
  active: number;
  count: number;
  onClick: (index: number) => void;
  isSmall: boolean;
}> = (props) => {
  return (
    <Box
      sx={{
        display: 'flex',
        visibility: props.count > 1 ? 'visible' : 'hidden',
      }}
    >
      {Array.from({ length: props.count }).map((_, index) => (
        <SquareRounded
          fontSize={props.isSmall ? 'small' : 'medium'}
          key={index}
          sx={{
            color: (theme) =>
              props.active === index
                ? theme.palette.success.main
                : theme.palette.background['solid-blue'],
            cursor: 'pointer',
          }}
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            props.onClick(index);
          }}
        />
      ))}
    </Box>
  );
};

export type PrimaryFeaturedProps = React.ComponentProps<typeof PrimaryFeatured>;
