import Image from 'next/image';

export const TokenIcon: React.FC<{ size: number; margin?: string }> = ({
  size,
  margin,
}) => {
  return (
    <Image
      priority
      src={'https://cdn.charity.games/_items/detailed/1.png'}
      alt="Charity Games Token"
      width={size}
      height={size}
      style={{ margin }}
    />
  );
};
