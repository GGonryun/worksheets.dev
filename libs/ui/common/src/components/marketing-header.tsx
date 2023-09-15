import {
  Box,
  BoxProps,
  ButtonBase,
  Typography,
  darken,
  styled,
} from '@mui/material';
import { TinyLogo } from '@worksheets/ui-basic-style';
import { urls } from '../lib/urls';
import { useRouter } from 'next/router';

export interface ExtendedBoxProps extends BoxProps {
  active?: boolean;
}

const CustomHeader = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'active',
})<ExtendedBoxProps>(({ theme, active }) => ({
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  minHeight: '48px !important', // set to dense height
  color: active
    ? theme.palette.primary.main
    : darken(theme.palette.text.secondary, 0.5),
  '&:hover': {
    color: theme.palette.primary.main,
    textDecoration: 'underline',
  },
}));

export const MarketingHeader = () => {
  const { route } = useRouter();
  return (
    <CustomHeader
      active={route === urls.app.home}
      sx={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <ButtonBase
        href={urls.app.home}
        disableRipple
        sx={{
          height: '100%',
          width: '100%',
          borderRadius: 0,
          px: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'start',
          gap: 2,
        }}
      >
        <TinyLogo src="/logo.svg" borderless area={36} />
        <Typography variant="h6" fontWeight={900} mb={-0.7}>
          Worksheets
        </Typography>
      </ButtonBase>
    </CustomHeader>
  );
};
