import List, { ListProps } from '@mui/material/List';

export const UnorderedList: React.FC<{
  children: ListProps['children'];
}> = ({ children }) => (
  <List
    dense
    component="ul"
    sx={{ listStyleType: 'disc', ml: 4 }}
    disablePadding
  >
    {children}
  </List>
);
