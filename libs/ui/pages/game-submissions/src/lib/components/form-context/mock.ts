import {
  GameSubmissionFormContextType,
  MockActionType,
} from '@worksheets/util/types';

export const FAKE_GAME_FILE = {
  fileId: '1',
  type: 'application/zip',
  size: 123456789,
  name: 'game.zip',
  timestamp: new Date().getTime(),
  url: 'https://example.com/game.zip',
};

export const FAKE_THUMBNAIL_FILE = {
  fileId: '2',
  type: 'image.jpg',
  size: 123456789,
  name: 'icon.jpg',
  timestamp: new Date().getTime(),
  url: '/games/puzzle-words/icon.jpg',
};

export const FAKE_COVER_FILE = {
  fileId: '3',
  type: 'image/jpg',
  size: 123456789,
  name: 'banner.jpg',
  timestamp: new Date().getTime(),
  url: '/games/puzzle-words/banner.jpg',
};

export const DEFAULT_VALUES = (
  action: MockActionType
): GameSubmissionFormContextType => ({
  isValid: false,
  isUpdated: false,
  loading: false,
  errors: {
    slug: '',
    title: '',
    headline: '',
    projectType: '',
    externalWebsiteUrl: '',
    viewport: '',
    viewportWidth: '',
    viewportHeight: '',
    devices: '',
    orientations: '',
    description: '',
    instructions: '',
    category: '',
    tags: '',
    markets: '',
    trailerUrl: '',
    gameFile: '',
    thumbnailFile: '',
    coverFile: '',
  },
  values: {
    title: '',
    slug: '',
    headline: '',
    projectType: 'HTML',
    externalWebsiteUrl: '',
    viewport: 'FIXED',
    viewportWidth: null,
    viewportHeight: null,
    devices: ['WEB', 'MOBILE'],
    orientations: ['PORTRAIT', 'LANDSCAPE'],
    description: '',
    instructions: '',
    category: 'ACTION',
    tags: [],
    markets: {},
    trailerUrl: '',
    gameFile: null,
    thumbnailFile: null,
    coverFile: null,
  },
  onUpdate: action('onUpdate'),
  onSubmit: action('onSubmit'),
  setFieldValue: action('setFieldValue'),
  upload: (...req) =>
    new Promise((resolve) => {
      action('upload')(req);
      setTimeout(() => resolve(), 3000);
    }),
  destroy: (...req) =>
    new Promise((resolve) => {
      action('destroy')(req);
      setTimeout(() => resolve(), 3000);
    }),
});

export const PREFILLED_VALUES = (
  action: MockActionType
): GameSubmissionFormContextType => ({
  ...DEFAULT_VALUES(action),
  isValid: true,
  isUpdated: false,
  values: {
    title: 'My Game',
    slug: 'my-game',
    headline: 'A game about stuff and doing things.',
    externalWebsiteUrl: 'example.com',
    projectType: 'PAGE',
    description:
      'A game about stuff and doing things. It is very fun. 10/10. Play it now. You will not regret it. Trust me.',
    instructions: 'Use the arrow keys to move.',
    tags: [
      'action',
      'music',
      'party',
      'adventure',
      'art',
      'advertising',
      'new-tag',
    ],
    viewport: 'FIXED',
    category: 'ACTION',
    viewportHeight: 480,
    viewportWidth: 720,
    orientations: ['LANDSCAPE', 'PORTRAIT'],
    devices: ['WEB', 'MOBILE'],

    trailerUrl: 'https://www.youtube.com/watch?v=o8PWi-cJOx0',
    markets: {
      steam: 'https://store.steampowered.com/app/1234567890/My_Game/',
      itch: 'https://example.itch.io/my-game',
      googlePlay:
        'https://play.google.com/store/apps/details?id=com.example.mygame',
      appStore: 'https://apps.apple.com/us/app/my-game/id1234567890',
      windowsStore: 'https://www.microsoft.com/en-us/p/my-game/9nblggh4nns1',
      amazon: 'https://www.amazon.com/My-Game-Example/dp/B08X3CQ8QZ',
      gameJolt: 'https://gamejolt.com/games/my-game/123456',
      website: 'https://example.com/my-game',
    },
    gameFile: FAKE_GAME_FILE,
    thumbnailFile: FAKE_THUMBNAIL_FILE,
    coverFile: FAKE_COVER_FILE,
  },
});

export const ERROR_VALUES = (
  action: MockActionType
): GameSubmissionFormContextType => ({
  ...PREFILLED_VALUES(action),
  isValid: false,
  isUpdated: true,
  errors: {
    slug: 'Invalid slug format. Must be lowercase letters, numbers, and dashes.',
    title: 'Title must be between 3 and 50 characters.',
    headline: 'Headline must be between 3 and 50 characters.',
    projectType: 'Project type must be one of the following: HTML, PAGE.',
    externalWebsiteUrl: 'External website URL must be a valid URL.',
    viewport: 'Viewport must be one of the following: FIXED, SCROLLING.',
    viewportWidth: 'Width must be a number.',
    viewportHeight: 'Height must be a number.',
    devices: 'Devices must be one of the following: WEB, MOBILE.',
    orientations:
      'Orientation must be one of the following: LANDSCAPE, PORTRAIT.',
    description: 'Description must be between 3 and 50 characters.',
    instructions: 'Instructions must be between 3 and 50 characters.',
    category:
      'Category must be one of the following: ACTION, ADVENTURE, ART, MUSIC, PARTY, PUZZLE, SPORTS, STRATEGY.',
    tags: 'Tags must not include any special characters.',
    gameFile: 'Game file failed to upload.',
    thumbnailFile: 'Thumbnail failed to upload.',
    trailerUrl: 'Trail URL must be a valid URL.',
    coverFile: 'Cover failed to upload.',
    markets: 'A market contains an error.',
  },
});
