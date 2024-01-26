import Image from 'next/image';

export const ValentinesGiftIcon: React.FC<{ size: number }> = ({ size }) => (
  <Image
    src="/icons/valentines/gift.svg"
    height={size}
    width={size}
    alt="gift icon"
    placeholder="empty"
  />
);
