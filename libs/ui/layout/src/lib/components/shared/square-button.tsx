import { Button, ButtonProps } from '@mui/material';
import { useMediaQueryDown } from '@worksheets/ui/hooks/use-media-query';

export const SquareButton: React.FC<ButtonProps> = (props) => {
  const isMedium = useMediaQueryDown('lg');
  return (
    <Button variant="square" size={isMedium ? 'small' : 'medium'} {...props} />
  );
};
