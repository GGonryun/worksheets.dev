import Image from 'next/image';

export const ValentinesLoveLetterIcon: React.FC<{ size: number }> = ({
  size,
}) => (
  <Image
    src="/icons/valentines/love-letter.svg"
    height={size}
    width={size}
    alt="love letter icon"
    placeholder="empty"
  />
);
