import { LinearProgress, LinearProgressProps } from '@mui/material';

export const ProgressBar: React.FC<
  Pick<LinearProgressProps, 'value' | 'color'>
> = (props) => {
  return (
    <LinearProgress
      variant="determinate"
      value={props.value}
      color={props.color}
      sx={{
        height: 8,
        borderRadius: 8,
      }}
    />
  );
};
