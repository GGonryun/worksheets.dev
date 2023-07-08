import React from 'react';

export const Emoji = React.memo(
  ({
    className,
    label,
    symbol,
  }: {
    className?: string;
    label: string;
    // https://emojiguide.org/thinking-face
    symbol: number;
  }) => (
    <span
      style={{ height: 20, width: 20, fontSize: 14 }}
      className={className}
      role="img"
      aria-label={label}
    >
      {String.fromCodePoint(symbol)}
    </span>
  )
);
