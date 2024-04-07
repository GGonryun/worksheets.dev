import { Button, ButtonProps, ListItem, styled } from '@mui/material';

export const DrawerAction = styled(
  (props: Omit<ButtonProps, 'variant' | 'size' | 'fullWidth'>) => (
    <ListItem sx={{ mb: 1 }}>
      <Button {...props} variant="arcade" fullWidth size="small" />
    </ListItem>
  )
)(() => ({}));
