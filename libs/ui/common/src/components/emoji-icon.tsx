import React from 'react';

// https://emojiguide.org/thinking-face
type EmojiShortCodes =
  | 'tada'
  | 'bell'
  | 'thinking'
  | 'pencil'
  | 'books'
  | 'white_check_mark';

const shortCodeMap: Record<
  EmojiShortCodes,
  { decimal: number; label: string }
> = {
  tada: {
    decimal: 127881,
    label: 'Party Popper',
  },
  bell: {
    decimal: 128718,
    label: 'Bell',
  },
  thinking: {
    decimal: 129300,
    label: 'Thinking Face',
  },
  pencil: {
    decimal: 9999,
    label: 'Pencil',
  },
  books: {
    decimal: 128218,
    label: 'Books',
  },
  white_check_mark: {
    decimal: 9989,
    label: 'White Heavy Check Mark',
  },
};

export const Emoji = React.memo(
  ({
    className,
    code,
    style,
  }: {
    className?: string;
    style?: React.CSSProperties;
    code: EmojiShortCodes;
  }) => (
    <span
      style={style ?? { height: 20, width: 20, fontSize: 14 }}
      className={className}
      role="img"
      aria-label={shortCodeMap[code].label}
    >
      {String.fromCodePoint(shortCodeMap[code].decimal)}
    </span>
  )
);
