import Image from 'next/image';

export const ValentinesDiamondIcon: React.FC<{ size: number }> = ({ size }) => (
  <Image
    src="/icons/valentines/diamond.svg"
    height={size}
    width={size}
    alt="valentines diamond icon"
    placeholder="empty"
  />
);
