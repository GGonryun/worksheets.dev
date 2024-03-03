import { TypographyProps } from '@mui/material';
import MuiListItem from '@mui/material/ListItem';
import MuiListItemText from '@mui/material/ListItemText';

export const ListItem: React.FC<{
  children: TypographyProps['children'];
  variant?: TypographyProps['variant'];
  disablePadding?: boolean;
}> = ({ children, variant, disablePadding }) => (
  <MuiListItem
    dense
    sx={{ display: 'list-item' }}
    disablePadding={disablePadding}
  >
    <MuiListItemText primaryTypographyProps={{ variant: variant ?? 'body1' }}>
      {children}
    </MuiListItemText>
  </MuiListItem>
);
