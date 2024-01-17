import { Theme, useMediaQuery } from '@mui/material';
import Image from 'next/image';

export const CHARITY_GAMES_LOGO_PATH = '/common/charity-games/logos/square.png';

export const CharityGamesLogo = () => {
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('sm')
  );
  return (
    <Image
      src={CHARITY_GAMES_LOGO_PATH}
      alt="Charity.Games"
      width={isMobile ? 64 : 128}
      height={isMobile ? 64 : 128}
      style={{ margin: `-24px 0` }}
    />
  );
};
