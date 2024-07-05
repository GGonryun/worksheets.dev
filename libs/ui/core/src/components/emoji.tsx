export const Emoji: React.FC<{
  label: string;
  symbol: string;
  fontSize?: string;
}> = ({ label, symbol, fontSize = '1rem' }) => (
  <span
    role="img"
    aria-label={label || ''}
    aria-hidden={label ? 'false' : 'true'}
    style={{
      fontSize,
    }}
  >
    {symbol}
  </span>
);
