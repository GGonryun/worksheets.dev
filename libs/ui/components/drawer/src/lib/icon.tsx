import { ListItemIcon, ListItemIconProps, styled } from '@mui/material';

export const DrawerIcon = styled(
  (props: Pick<ListItemIconProps, 'children'>) => <ListItemIcon {...props} />
)({
  minWidth: 32,
  '& .MuiSvgIcon-root': {
    color: 'black',
  },
});
