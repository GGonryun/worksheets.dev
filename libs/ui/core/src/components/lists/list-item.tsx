import MuiListItemText from '@mui/material/ListItemText';
import MuiListItem from '@mui/material/ListItem';
import { TypographyProps } from '@mui/material';

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
    <MuiListItemText primaryTypographyProps={{ variant: variant }}>
      {children}
    </MuiListItemText>
  </MuiListItem>
);
