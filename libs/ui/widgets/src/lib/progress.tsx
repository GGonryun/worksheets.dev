import {
  Box,
  LinearProgress,
  LinearProgressProps,
  Link,
  styled,
  Typography,
  TypographyProps,
} from '@mui/material';
import common from '@worksheets/assets-common';
import { routes } from '@worksheets/routes';
import Image from 'next/image';
import { FC, JSXElementConstructor } from 'react';

export type ProgressWidgetProps = {
  current: number;
  required: number;
  color?: LinearProgressProps['color'];
};

export const ProgressWidget: FC<ProgressWidgetProps> = ({
  current,
  required,
  color,
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
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
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 2,
        }}
      >
        <Link href={routes.home.url()}>
          <Image
            src={common.charityGames.logos.primary}
            alt="charity-games logo"
            height={85}
            width={85}
          />
        </Link>
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
    </Box>
  );
};

const CurrentProgressText = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  fontSize: '2rem',
  lineHeight: 1,
}));

const RequiredFundingText = styled<JSXElementConstructor<TypographyProps>>(
  (props) => <Typography variant="body2" {...props} />
)(({ theme }) => ({
  fontWeight: 500,
  color: theme.palette.text.secondary,
  paddingLeft: '2px',
}));
