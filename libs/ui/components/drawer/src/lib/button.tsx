import {
  alpha,
  Link,
  LinkProps,
  ListItemButton,
  ListItemButtonProps,
  styled,
} from '@mui/material';

export const DrawerButton = styled(
  (props: ListItemButtonProps & Pick<LinkProps, 'href'>) => (
    <ListItemButton component={Link} dense disableRipple {...props} />
  )
)(({ theme }) => ({
  '& .MuiSvgIcon-root': {
    fontSize: 18,
    color: theme.palette.text.secondary,
  },
  '&:active': {
    backgroundColor: alpha(
      theme.palette.primary.main,
      theme.palette.action.selectedOpacity
    ),
  },
}));
