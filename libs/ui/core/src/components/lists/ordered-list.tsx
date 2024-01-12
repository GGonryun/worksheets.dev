import List, { ListProps } from '@mui/material/List';

export const OrderedList: React.FC<{
  children: ListProps['children'];
}> = ({ children }) => (
  <List
    component="ol"
    dense
    sx={{ listStyleType: 'decimal', ml: 4 }}
    disablePadding
  >
    {children}
  </List>
);
