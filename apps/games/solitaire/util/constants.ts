export const GAME_TITLE = 'Solitaire' as const;
export const APP_VERSION = 1;
export const WATER_PER_GAME = 50;
export const CARD_HEIGHT = 100;
export const CARD_WIDTH = 69;
export const CARD_ASPECT = CARD_HEIGHT / CARD_WIDTH;

export const CSS_PALETTE = {
  success: {
    light: `invert(61%) sepia(31%) saturate(831%) hue-rotate(73deg) brightness(90%) contrast(87%)`, //'#4caf50',
    main: `invert(37%) sepia(71%) saturate(452%) hue-rotate(73deg) brightness(93%) contrast(89%)`, //'#2e7d32',
    dark: `invert(26%) sepia(59%) saturate(609%) hue-rotate(75deg) brightness(94%) contrast(92%)`, //'#1b5e20',
  },
};

export const DECK_RESET_STYLES = {
  src: '/art/rotate-left.svg',
  alt: 'reset deck',
  style: {
    filter: CSS_PALETTE.success.light,
  },
};

export const SUITE_STYLES = [
  {
    src: '/art/heart.svg',
    alt: 'hearts',
    style: {
      filter: CSS_PALETTE.success.light,
    },
  },
  {
    src: '/art/diamond.svg',
    alt: 'diamonds',
    style: {
      filter: CSS_PALETTE.success.light,
    },
  },
  {
    src: '/art/club.svg',
    alt: 'clubs',
    style: {
      filter: CSS_PALETTE.success.dark,
    },
  },
  {
    src: '/art/spade.svg',
    alt: 'spades',
    style: {
      filter: CSS_PALETTE.success.dark,
    },
  },
];
