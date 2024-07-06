import {
  Box,
  Button,
  ButtonProps,
  Menu as MuiMenu,
  MenuItem as MuiMenuItem,
  MenuItemProps,
  MenuProps as MuiMenuProps,
  styled,
  Typography,
  TypographyProps,
} from '@mui/material';
import { FC } from 'react';

export type MenuProps = Pick<
  MuiMenuProps,
  | 'onClose'
  | 'children'
  | 'sx'
  | 'anchorEl'
  | 'anchorOrigin'
  | 'transformOrigin'
>;

export type WithMenuProps<T> = Omit<MenuProps, 'children'> & T;

export const Menu: FC<MenuProps> = ({ children, sx, ...props }) => {
  return (
    <StyledMenu {...props} open={Boolean(props.anchorEl)}>
      {children}
    </StyledMenu>
  );
};
const StyledMenu = styled((props: MuiMenuProps) => (
  <MuiMenu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: theme.shape.borderRadius * 4,
    marginTop: theme.spacing(1),
    padding: theme.spacing(0.5, 0),
    minWidth: 200,
    maxWidth: '90%',
    boxShadow: theme.shadows[4],
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
  },
}));

export const MenuTitle = styled((props: Pick<MenuItemProps, 'children'>) => (
  <MuiMenuItem dense disableRipple disabled {...props} />
))(({ theme }) => ({
  '&.Mui-disabled': {
    color: theme.palette.text.primary,
    opacity: 1,
  },
  fontFamily: theme.typography.body3.fontFamily,
  fontSize: theme.typography.body3.fontSize,
  fontWeight: 700,
}));

export const MenuAction = styled(
  (props: Omit<ButtonProps, 'variant' | 'size' | 'fullWidth'>) => (
    <Box mx={2} mb={1.5} mt={0.5}>
      <Button {...props} variant="arcade" fullWidth size="small" />
    </Box>
  )
)();

export const MenuCaption = styled(
  (props: Pick<TypographyProps, 'children'>) => (
    <Typography
      variant="body3"
      color="text.secondary"
      component={'div'}
      {...props}
    />
  )
)(({ theme }) => ({
  padding: theme.spacing(0, 2),
}));
