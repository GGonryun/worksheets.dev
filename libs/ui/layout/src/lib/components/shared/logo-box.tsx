import {
  Box,
  LinkProps,
  styled,
  Typography,
  TypographyProps,
} from '@mui/material';
import { CHARITY_TOOLBAR_LOGO_PATH } from '@worksheets/util/assets';
import Image from 'next/image';
import React from 'react';

export const LogoBox: React.FC = () => {
  return (
    <TitleBox component="a" href={'/'}>
      <Image
        src={CHARITY_TOOLBAR_LOGO_PATH}
        alt="Charity.Games"
        height={44}
        width={88}
        priority
      />
      <TitleText>{'Charity\nGames'}</TitleText>
    </TitleBox>
  );
};

const TitleBox = styled(Box)<LinkProps>(({ theme }) => ({
  userSelect: 'none',
  padding: theme.spacing(0.5, 1),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  gap: theme.spacing(1),
  textDecoration: 'none',
}));

const TitleText = styled(
  Typography,
  {}
)<TypographyProps>(({ theme }) => ({
  color: theme.palette.text.red.light,
  fontFamily: theme.typography.mPlus1p.fontFamily,
  fontWeight: 600,
  fontSize: '1.25rem',
  lineHeight: '1.25rem',
  whiteSpace: 'pre-line',
  [theme.breakpoints.down('mobile1')]: {
    display: 'none',
  },
}));
