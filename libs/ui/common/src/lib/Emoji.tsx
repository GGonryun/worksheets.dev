import React from 'react';

// https://emojipedia.org/emoji/

export const Emoji = React.memo(
  ({
    className,
    label,
    symbol,
  }: {
    className?: string;
    label: string;
    // https://www.w3schools.com/charsets/ref_emoji.asp
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
