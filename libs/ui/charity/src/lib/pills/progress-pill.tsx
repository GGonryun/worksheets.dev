import { FC, JSXElementConstructor } from 'react';
import { ReferencePillSkeleton } from './reference-pill-skeleton';
import {
  Box,
  LinearProgress,
  Typography,
  TypographyProps,
  styled,
} from '@mui/material';

export type ProgressPillProps = {
  current: number;
  required: number;
};
export const ProgressPill: FC<ProgressPillProps> = ({ current, required }) => (
  <ReferencePillSkeleton href="/charity">
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 1,
        width: '100%',
        userSelect: 'none',
      }}
    >
      <LinearProgress
        variant="determinate"
        color="success"
        value={(current / required) * 100}
        sx={{ width: '100%', height: 8 }}
      />
      <Box
        sx={{
          textAlign: 'center',
        }}
      >
        <CurrentProgressText>${current}.00</CurrentProgressText>
        <RequiredFundingText>raised of ${required} goal</RequiredFundingText>
      </Box>
    </Box>
  </ReferencePillSkeleton>
);

const CurrentProgressText = styled(Typography)(({ theme }) => ({
  color: theme.palette.success.main,
  fontWeight: 700,
  fontSize: '1.75rem',
  lineHeight: 1,
}));

const RequiredFundingText = styled<JSXElementConstructor<TypographyProps>>(
  (props) => <Typography variant="body3" {...props} />
)(({ theme }) => ({
  fontWeight: 500,
  color: theme.palette.text.secondary,
  paddingLeft: '2px',
}));
