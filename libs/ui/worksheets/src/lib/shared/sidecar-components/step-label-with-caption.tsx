import { StepLabel, Typography } from '@mui/material';

export const StepLabelWithCaption: React.FC<{
  caption?: string;
  label: string;
}> = ({ caption, label }) => {
  return (
    <StepLabel
      optional={
        caption ? <Typography variant="caption">{caption}</Typography> : null
      }
    >
      {label}
    </StepLabel>
  );
};
