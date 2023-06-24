import { StepContent, Typography, Box, Tooltip, Button } from '@mui/material';
import { ReactNode } from 'react';
import SaveIcon from '@mui/icons-material/Save';
export const StepContentWithActions: React.FC<{
  children: ReactNode;
  description: string;
  index: number;
  maxIndex: number;
  disableNext?: boolean;
  tooltip?: string;
  onBack: () => void;
  onNext: () => void;
  onCancel?: () => void;
}> = ({
  index,
  description,
  children,
  disableNext,
  tooltip,
  maxIndex,
  onBack,
  onNext,
  onCancel,
}) => {
  return (
    <StepContent>
      <Typography variant="body2">{description}</Typography>
      {children}
      <Box my={1} display="flex" gap={2}>
        <Tooltip
          title={tooltip}
          disableHoverListener={Boolean(tooltip) && !disableNext}
        >
          <span>
            <Button
              startIcon={
                index === maxIndex ? <SaveIcon fontSize="small" /> : null
              }
              disabled={disableNext}
              variant="contained"
              onClick={onNext}
            >
              {index === maxIndex ? 'Finish' : 'Continue'}
            </Button>
          </span>
        </Tooltip>
        <Button disabled={index === 0} onClick={onBack}>
          Back
        </Button>
      </Box>
    </StepContent>
  );
};
