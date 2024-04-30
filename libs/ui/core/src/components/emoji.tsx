export const Emoji: React.FC<{ label: string; symbol: string }> = ({
  label,
  symbol,
}) => (
  <span
    role="img"
    aria-label={label || ''}
    aria-hidden={label ? 'false' : 'true'}
  >
    {symbol}
  </span>
);
