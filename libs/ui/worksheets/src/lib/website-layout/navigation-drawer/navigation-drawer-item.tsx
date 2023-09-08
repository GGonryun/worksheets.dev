import {
  ListItem,
  ListItemButton,
  alpha,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
  Theme,
} from '@mui/material';
import { FC } from 'react';
import { CSSObject } from '@emotion/styled';
import { Flex } from '@worksheets/ui-core';
import { ArrowRight } from '@mui/icons-material';

export type NavigationItem = {
  icon: React.ReactNode;
  text: string;
  href: string;
  endIcon?: React.ReactNode;
};

const activeStyleMixin = (theme: Theme): CSSObject => ({
  backgroundColor: alpha(theme.palette.primary.main, 0.1),
  color: theme.palette.primary.main,
  '& .MuiListItemIcon-root': {
    color: theme.palette.primary.main,
  },
  '& .MuiSvgIcon-root': {
    color: theme.palette.primary.main,
  },
});

export const NavigationDrawerItem: FC<
  NavigationItem & { thin?: boolean; active?: boolean }
> = ({ active, thin, endIcon, text, icon, href }) => {
  const theme = useTheme();
  return (
    <ListItem disablePadding sx={{ display: 'block' }}>
      <ListItemButton
        disableTouchRipple
        href={href}
        sx={{
          height: 36,
          justifyContent: 'center',
          px: 2.5,

          // TODO: simplify hover styles. This is a mess.
          '&:hover': activeStyleMixin(theme),
          ...(active && activeStyleMixin(theme)),
        }}
      >
        <ListItemIcon
          sx={{
            minWidth: 0,
            mr: thin ? 'auto' : 3,
            justifyContent: 'center',
          }}
        >
          {icon}
        </ListItemIcon>
        <ListItemText sx={{ opacity: thin ? 0 : 1 }}>
          <Flex spaceBetween>
            <Typography variant="body2">{text}</Typography>
            <Flex gap={1}>
              {active && <ArrowRight />}
              {!!endIcon && endIcon}
            </Flex>
          </Flex>
        </ListItemText>
      </ListItemButton>
    </ListItem>
  );
};
