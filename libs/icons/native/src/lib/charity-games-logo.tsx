import common from '@worksheets/assets-common';
import Image from 'next/image';

export const CharityGamesLogo: React.FC<{ size: number; margin?: string }> = ({
  size,
  margin,
}) => {
  return (
    <Image
      src={common.charityGames.logos.square}
      alt="Charity.Games"
      width={size}
      height={size}
      style={{ margin }}
    />
  );
};
