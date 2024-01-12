import Box from '@mui/material/Box';
import LinearProgress, {
  LinearProgressProps,
} from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';
import Typography, { TypographyProps } from '@mui/material/Typography';
import { FC, JSXElementConstructor } from 'react';

import { ReferencePillSkeleton } from './reference-pill-skeleton';

export type ProgressPillProps = {
  current: number;
  required: number;
  color?: LinearProgressProps['color'];
};
export const ProgressPill: FC<ProgressPillProps> = ({
  color,
  current,
  required,
}) => (
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
        color={color ?? 'success'}
        value={(current / required) * 100}
        sx={{ width: '100%', height: 8 }}
      />
      <Box
        sx={{
          textAlign: 'center',
        }}
      >
        <CurrentProgressText color={color ?? 'success.main'}>
          ${current}.00
        </CurrentProgressText>
        <RequiredFundingText>raised of ${required} goal</RequiredFundingText>
      </Box>
    </Box>
  </ReferencePillSkeleton>
);

const CurrentProgressText = styled(Typography)(({ theme }) => ({
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
