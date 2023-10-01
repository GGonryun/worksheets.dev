import {
  IconButtonProps as MuiIconButtonProps,
  IconButton as MuiIconButton,
  styled,
} from '@mui/material';
import { border } from '../layouts';

export const IconButton = styled((props: MuiIconButtonProps) => (
  <MuiIconButton size="small" {...props} />
))(({ theme }) => ({
  border: border(theme),
  backgroundColor: theme.palette.grey[300],
  '&:active': {
    backgroundColor: theme.palette.grey[400],
  },
  '&:hover': {
    backgroundColor: theme.palette.grey[400],
  },
}));
