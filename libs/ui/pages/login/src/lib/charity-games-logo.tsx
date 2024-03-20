import { Theme, useMediaQuery } from '@mui/material';
import { CharityGamesLogo as BaseLogo } from '@worksheets/icons/native';

export const CharityGamesLogo = () => {
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('sm')
  );
  return <BaseLogo size={isMobile ? 64 : 128} margin="-24px 0" />;
};
