import Image from 'next/image';

export const CHARITY_GAMES_LOGO_PATH = '/common/charity-games/logos/square.png';

export const CharityGamesLogo: React.FC<{ size: number; margin?: string }> = ({
  size,
  margin,
}) => {
  return (
    <Image
      src={CHARITY_GAMES_LOGO_PATH}
      alt="Charity.Games"
      width={size}
      height={size}
      style={{ margin }}
    />
  );
};
