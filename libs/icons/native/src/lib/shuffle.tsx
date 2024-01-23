import Image from 'next/image';

export const ShuffleIcon: React.FC<{ size: number }> = ({ size }) => (
  <Image
    src="/common/icons/shuffle.png"
    height={size}
    width={size}
    alt="shuffle icon"
    placeholder="empty"
  />
);
