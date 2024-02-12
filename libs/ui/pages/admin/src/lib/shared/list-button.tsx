import { ArrowBack } from '@mui/icons-material';
import { Button, ButtonProps } from '@mui/material';

export const ListButton: React.FC<
  Pick<ButtonProps, 'href' | 'children' | 'startIcon' | 'color'>
> = (props) => {
  return (
    <Button
      variant="arcade"
      sx={{ width: 'fit-content' }}
      color={props.color ?? 'secondary'}
      startIcon={props.startIcon ?? <ArrowBack />}
      href={props.href}
    >
      {props.children}
    </Button>
  );
};
