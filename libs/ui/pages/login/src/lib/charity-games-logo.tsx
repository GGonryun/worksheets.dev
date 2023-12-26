import Image from 'next/image';

export const CHARITY_GAMES_LOGO_PATH = '/common/charity-games/logos/square.png';

export const CharityGamesLogo = () => (
  <Image
    src={CHARITY_GAMES_LOGO_PATH}
    alt="Charity.Games"
    width={100}
    height={100}
    style={{ margin: `-16px 0` }}
  />
);
