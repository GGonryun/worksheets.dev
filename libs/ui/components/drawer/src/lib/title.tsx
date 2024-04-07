import {
  ListItem,
  ListItemProps,
  ListItemText,
  styled,
  Typography,
} from '@mui/material';

export const DrawerTitle = styled((props: Pick<ListItemProps, 'children'>) => (
  <ListItem disablePadding>
    <ListItemText primary={<Typography {...props} />} />
  </ListItem>
))(({ theme }) => ({
  color: theme.palette.text.blue.main,
  padding: theme.spacing(1, 2, 0, 2),
  fontFamily: theme.typography.body3.fontFamily,
  fontSize: theme.typography.body3.fontSize,
  fontWeight: 700,
}));
