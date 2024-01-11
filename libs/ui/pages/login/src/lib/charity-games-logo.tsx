import Image from 'next/image';

export const CHARITY_GAMES_LOGO_PATH = '/common/charity-games/logos/square.png';

export const CharityGamesLogo = () => (
  <Image
    src={CHARITY_GAMES_LOGO_PATH}
    alt="Charity.Games"
    width={128}
    height={128}
    style={{ margin: `-24px 0` }}
  />
);
