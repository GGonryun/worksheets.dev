import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { FC } from 'react';

export const DetailedListItemText: FC<{
  primary: string;
  secondary: string;
}> = ({ primary, secondary }) => (
  <ListItemText
    disableTypography
    sx={{
      p: 0,
      m: 0,
    }}
  >
    <Typography component="span" variant="body2">
      {primary}
    </Typography>
    <Typography component="span" variant="body3" color="text.secondary">
      {secondary}
    </Typography>
  </ListItemText>
);
