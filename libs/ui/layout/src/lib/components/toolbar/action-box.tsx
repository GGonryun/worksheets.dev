import { SvgIconComponent } from '@mui/icons-material';
import { Box, Button } from '@mui/material';
import { routes } from '@worksheets/routes';
import { useMediaQuery } from '@worksheets/ui/hooks/use-media-query';
import { buttonBoxShadow, ButtonBoxShadowColor } from '@worksheets/ui/styles';
import React, { useEffect } from 'react';

export const ActionBox = () => {
  const isMedium = useMediaQuery((theme) => theme.breakpoints.down('lg'));
  const isSmall = useMediaQuery((theme) => theme.breakpoints.down('md'));
  const isTiny = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  return (
    <Box display="flex" gap={1} alignItems="center" pb={1}>
      <Button
        href={routes.raffles.url()}
        variant="arcade"
        color="secondary"
        size={isMedium ? 'small' : 'medium'}
        sx={{
          display: isTiny ? 'none' : 'flex',
          width: isSmall ? 'unset' : 170,
          ...buttonBoxShadow('secondary'),
        }}
      >
        Giveaways
      </Button>

      <Button
        href={routes.raffles.url()}
        variant="arcade"
        color="warning"
        size={isMedium ? 'small' : 'medium'}
        sx={{
          display: isTiny ? 'none' : 'flex',
          width: isSmall ? 'unset' : 170,
          ...buttonBoxShadow('warning'),
        }}
      >
        Contests
      </Button>
    </Box>
  );
};

export const ToolbarActionButton: React.FC<{
  color: ButtonBoxShadowColor;
  Icon: SvgIconComponent;
  href: string;
  label?: string;
  square?: boolean;
}> = ({ color, Icon, href, label, square }) => {
  const isMedium = useMediaQuery((theme) => theme.breakpoints.down('lg'));
  const isSmall = useMediaQuery((theme) => theme.breakpoints.down('md'));
  const isTiny = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  // This prevents the button from rendering with the wrong size on initial render
  const [mounted, setMounted] = React.useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Button
      href={href}
      variant={isTiny || square ? 'square' : 'arcade'}
      color={color}
      size={isMedium ? 'small' : 'medium'}
      sx={{
        width: isSmall || square ? 'unset' : 170,
        whiteSpace: 'nowrap',
        ...buttonBoxShadow(color),
      }}
    >
      {isTiny || square ? <Icon fontSize="small" /> : label}
    </Button>
  );
};
