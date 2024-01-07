import { addMinutesToCurrentTime } from '@worksheets/util/time';
import { FormFields, FormContextType } from './type';

function action(name: string) {
  return (req?: unknown) => console.log(name, req);
}

export const FAKE_GAME_FILE: FormFields['gameFile'] = {
  name: 'game.zip',
  type: 'application/zip',
  size: 123456,
  lastModified: addMinutesToCurrentTime(-61 * 3).getTime(),
  status: 'uploaded',
  url: 'https://example.com/game.zip',
};

export const DEFAULT_VALUES: FormContextType = {
  errors: {
    title: '',
    tagline: '',
    gameId: '',
    projectType: '',
    supportedDevices: '',
    supportedOrientations: '',
    gameFile: '',
    description: '',
    instructions: '',
    category: '',
    tags: '',
    viewport: '',
    dimensions: '',
    externalWebsiteUrl: '',
    thumbnail: '',
    cover: '',
    trailer: '',
    purchaseOptions: '',
    screenshots: '',
  },
  values: {
    title: '',
    tagline: '',
    gameId: '',
    projectType: undefined,
    supportedDevices: {
      computer: true,
      mobile: true,
    },
    supportedOrientations: {
      portrait: true,
      landscape: true,
    },
    gameFile: undefined,
    description: '',
    instructions: '',
    category: 'ACTION',
    tags: [],
    viewport: undefined,
    dimensions: undefined,
    externalWebsiteUrl: '',
    thumbnail: undefined,
    cover: undefined,
    trailer: '',
    purchaseOptions: {},
    screenshots: [],
  },

  onSubmit: action('onSubmit'),
  setFieldValue: action('setFieldValue'),
  uploadThumbnail: (req) =>
    new Promise((resolve) => {
      action('uploadThumbnail')(req);
      setTimeout(() => resolve(), 3000);
    }),
  deleteThumbnail: (req) =>
    new Promise((resolve) => {
      action('deleteThumbnail')(req);
      setTimeout(() => resolve(), 3000);
    }),

  uploadCover: (req) =>
    new Promise((resolve) => {
      action('uploadCover')(req);
      setTimeout(() => resolve(), 3000);
    }),
  deleteCover: (req) =>
    new Promise((resolve) => {
      action('deleteCover')(req);
      setTimeout(() => resolve(), 3000);
    }),

  uploadScreenshots: (files) => {
    return new Promise((resolve) => {
      action('uploadScreenshots')(files);
      setTimeout(() => resolve(), 3000);
    });
  },
  deleteScreenshot: (req) =>
    new Promise((resolve) => {
      action('deleteScreenshot')(req);
      setTimeout(() => resolve(), 3000);
    }),

  uploadGame: (req) =>
    new Promise((resolve) => {
      action('uploadGame')(req);
      setTimeout(() => resolve(), 3000);
    }),
  deleteGame: (req) =>
    new Promise((resolve) => {
      action('deleteGame')(req);
      setTimeout(() => resolve(), 3000);
    }),
};

export const PREFILLED_VALUES: FormContextType = {
  ...DEFAULT_VALUES,
  values: {
    title: 'My Game',
    gameId: 'my-game',
    tagline: 'A game about stuff and doing things.',
    externalWebsiteUrl: 'example.com',
    gameFile: FAKE_GAME_FILE,
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
    dimensions: {
      width: 720,
      height: 480,
    },
    supportedOrientations: {
      landscape: true,
      portrait: true,
    },
    supportedDevices: {
      computer: true,
      mobile: true,
    },
    thumbnail: {
      id: '1',
      status: 'uploaded',
      size: 123456,
      lastModified: addMinutesToCurrentTime(-3).getTime(),
      url: '/games/solitaire/icon.jpg',
      name: 'Solitaire Icon',
      type: 'image/jpg',
    },
    cover: {
      id: '2',
      status: 'uploaded',
      url: '/games/solitaire/banner.png',
      name: 'Solitaire Icon',
      type: 'image/png',
      size: 123456,
      lastModified: addMinutesToCurrentTime(-3).getTime(),
    },
    screenshots: [FAKE_GAME_FILE, FAKE_GAME_FILE],
    trailer: 'https://www.youtube.com/watch?v=o8PWi-cJOx0',
    purchaseOptions: {
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
  },
};
