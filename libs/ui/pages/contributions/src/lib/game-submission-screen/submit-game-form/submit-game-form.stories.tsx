import type { Meta } from '@storybook/react';
import { SubmitGameForm } from './submit-game-form';
import { FormContextProvider, FormContextType, FormFields } from './context';
import { defaultValues } from '../../__mocks__';
import { addMinutesToCurrentTime } from '@worksheets/util/time';

const fakeGameFile: FormFields['gameFile'] = {
  name: 'game.zip',
  size: 123456,
  lastModified: addMinutesToCurrentTime(-61 * 3).getTime(),
  status: 'uploaded',
  url: 'https://example.com/game.zip',
};

const prefilledValues: FormContextType = {
  ...defaultValues,
  values: {
    title: 'My Game',
    gameId: 'my-game',
    tagline: 'A game about stuff and doing things.',
    externalWebsiteUrl: 'example.com',
    gameFile: fakeGameFile,
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
      src: '/games/solitaire/icon.jpg',
      name: 'Solitaire Icon',
      height: 512,
      width: 512,
    },
    cover: {
      id: '2',
      status: 'uploaded',
      src: '/games/solitaire/banner.png',
      name: 'Solitaire Icon',
      width: 2208,
      height: 1242,
    },
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

type Story = Meta<typeof SubmitGameForm>;
const DefaultStory: Story = {
  component: SubmitGameForm,
  decorators: [
    (Story) => (
      <div
        style={{
          backgroundColor: 'lightblue',
          height: '100%',
          padding: '16px',
        }}
      >
        <div
          style={{
            padding: '16px',
            backgroundColor: 'white',
            height: '100%',
          }}
        >
          <Story />
        </div>
      </div>
    ),
  ],
};
export default DefaultStory;

export const EmptyForm: Story = {
  decorators: [
    (Story) => (
      <FormContextProvider value={defaultValues}>
        <Story />
      </FormContextProvider>
    ),
  ],
};

export const UploadingFiles: Story = {
  decorators: [
    (Story) => (
      <FormContextProvider
        value={{
          ...prefilledValues,
          values: {
            ...prefilledValues.values,
            projectType: 'HTML',
            viewport: 'RESPONSIVE',
            gameFile: {
              name: 'game.zip',
              size: 123456,
              lastModified: addMinutesToCurrentTime(-61 * 3).getTime(),
              status: 'uploading',
            },
            thumbnail: {
              id: '1',
              name: 'thumbnail.jpg',
              status: 'uploading',
            },
            cover: {
              id: '2',
              name: 'cover.jpg',
              status: 'uploading',
            },
          },
        }}
      >
        <Story />
      </FormContextProvider>
    ),
  ],
};

export const ResponsiveMobileGame: Story = {
  decorators: [
    (Story) => (
      <FormContextProvider
        value={{
          ...defaultValues,
          values: {
            ...prefilledValues.values,
            viewport: 'RESPONSIVE',
            supportedDevices: {
              computer: true,
              mobile: true,
            },
            supportedOrientations: {
              portrait: true,
              landscape: true,
            },
            dimensions: undefined,
            projectType: 'PAGE',
          },
        }}
      >
        <Story />
      </FormContextProvider>
    ),
  ],
};

export const ExternalWebsite: Story = {
  decorators: [
    (Story) => (
      <FormContextProvider
        value={{
          ...defaultValues,
          values: {
            ...prefilledValues.values,
            projectType: 'PAGE',
          },
        }}
      >
        <Story />
      </FormContextProvider>
    ),
  ],
};

export const ExternalWebsiteErrors: Story = {
  decorators: [
    (Story) => (
      <FormContextProvider
        value={{
          ...defaultValues,
          values: {
            ...prefilledValues.values,
            title: "@ My Game's Title %",
            tagline: "My Game's Tagline ".repeat(10),
            externalWebsiteUrl: 'https://example.com',
            projectType: 'PAGE',
            dimensions: {
              width: 200,
              height: 120,
            },
            purchaseOptions: {
              steam: 'http://store.steampowered.com/app/1234567890/My_Game/',
              itch: 'store.itch.io/my-game',
              googlePlay: 'an invalid url',
            },
          },
          errors: {
            gameId: 'That Game ID is already taken. Please choose another.',
            supportedDevices: 'You must select at least one device.',
            supportedOrientations: 'You must select at least one orientation.',
            title:
              'Your title cannot include characters such as %, $, #, @, or &.',
            tagline: 'Your tagline is too long.',
            projectType: 'Invalid project type selected.',
            gameFile: '',
            description: 'Your description is invalid.',
            instructions: 'Your instructions are invalid.',
            category: 'You must select at least one category.',
            tags: 'You must select at least one tag.',
            viewport: 'You must select a viewport.',
            dimensions:
              'Your game must be at least 240 pixels wide and 160 pixels tall.',
            externalWebsiteUrl:
              'Your web page must not include "http://" or "https://"',
            thumbnail: 'Failed to upload a thumbnail.',
            cover: 'Failed to upload a cover.',
            trailer: 'Trailer must be a YouTube or Vimeo link.',
            purchaseOptions:
              'Invalid purchase options. Please check your links and try again.',
          },
        }}
      >
        <Story />
      </FormContextProvider>
    ),
  ],
};

export const HTML5Game: Story = {
  decorators: [
    (Story) => (
      <FormContextProvider
        value={{
          ...defaultValues,
          values: {
            ...defaultValues.values,
            ...prefilledValues.values,
            projectType: 'HTML',
            gameFile: undefined,
          },
        }}
      >
        <Story />
      </FormContextProvider>
    ),
  ],
};

export const HTML5GameUploaded: Story = {
  decorators: [
    (Story) => (
      <FormContextProvider
        value={{
          ...defaultValues,
          values: {
            ...defaultValues.values,
            ...prefilledValues.values,
            projectType: 'HTML',
            purchaseOptions: {
              steam: 'https://store.steampowered.com/app/1234567890/My_Game/',
              itch: 'https://example.itch.io/my-game',
              gameJolt: '',
            },
          },
        }}
      >
        <Story />
      </FormContextProvider>
    ),
  ],
};
