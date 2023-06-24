import { Button, StepLabel, Typography } from '@mui/material';

export const StepLabelWithCaption: React.FC<{
  caption?: string;
  label: string;
  onClick?: () => void;
}> = ({ caption, label, onClick }) => {
  return (
    <Button
      disabled={!onClick}
      sx={{
        textTransform: 'none',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        cursor: 'pointer',
      }}
      onClick={onClick}
      fullWidth
    >
      <StepLabel
        optional={
          caption ? <Typography variant="caption">{caption}</Typography> : null
        }
      >
        {label}
      </StepLabel>
    </Button>
  );
};
