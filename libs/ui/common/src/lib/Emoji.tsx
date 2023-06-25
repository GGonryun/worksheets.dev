import React from 'react';

export const Emoji = React.memo(({ className, label, symbol }: any) => (
  <span className={className} role="img" aria-label={label}>
    {String.fromCodePoint(symbol)}
  </span>
));
