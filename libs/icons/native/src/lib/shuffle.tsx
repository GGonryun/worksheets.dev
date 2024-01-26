import Image from 'next/image';

export const ShuffleIcon: React.FC<{ size: number }> = ({ size }) => (
  <Image
    src="/icons/native/shuffle.png"
    height={size}
    width={size}
    alt="shuffle icon"
    placeholder="empty"
  />
);
