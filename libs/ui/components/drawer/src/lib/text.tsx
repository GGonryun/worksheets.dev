import {
  ListItem,
  ListItemProps,
  ListItemText,
  styled,
  Typography,
  TypographyProps,
} from '@mui/material';

export const DrawerText = styled(
  ({
    disablePadding,
    ...props
  }: Pick<ListItemProps, 'disablePadding'> & TypographyProps) => (
    <ListItem disablePadding={disablePadding}>
      <ListItemText
        primary={<Typography fontWeight={500} variant="body2" {...props} />}
      />
    </ListItem>
  )
)({});
