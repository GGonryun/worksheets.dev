import { LinearProgress, LinearProgressProps } from '@mui/material';
import { PaletteColor } from '@worksheets/ui/theme';

export const ProgressBar: React.FC<
  Pick<LinearProgressProps, 'value'> & { color: PaletteColor }
> = (props) => {
  return (
    <LinearProgress
      variant="determinate"
      value={props.value}
      color={'black'}
      sx={{
        height: 8,
        borderRadius: 8,
      }}
    />
  );
};
