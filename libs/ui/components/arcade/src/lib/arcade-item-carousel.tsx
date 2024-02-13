import { Box, Paper, Typography } from '@mui/material';
import { Carousel } from '@worksheets/ui/components/carousel';
import { ReactNode } from 'react';

type ArcadeItemCarousel<T> = {
  title: ReactNode;
  items: T[];
  action?: ReactNode;
  render: (item: T) => ReactNode;
};

export function ArcadeItemCarousel<T extends { id: string | number }>(
  props: ArcadeItemCarousel<T>
) {
  return (
    <Box width="100%">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
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
        {Boolean(props.action) && props.action}
      </Box>
      <Paper
        sx={{
          display: 'flex',
          flexDirection: 'column',
          borderRadius: (theme) => theme.shape.borderRadius,
          background: (theme) => theme.palette.background['solid-blue'],
          padding: { xs: 1, sm: 2 },
        }}
      >
        <Carousel gap={4}>
          {props.items.map((item) => (
            <Box
              key={item.id}
              sx={{
                minHeight: { xs: 128, sm: 160, md: 192 },
                minWidth: { xs: 128, sm: 160, md: 192 },
              }}
            >
              {props.render(item)}
            </Box>
          ))}
        </Carousel>
      </Paper>
    </Box>
  );
}
