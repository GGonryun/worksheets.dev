import type { Meta } from '@storybook/react';
import { SubmitGameForm } from './submit-game-form';
import { action } from '@storybook/addon-actions';
import { FormContextProvider, FormContextType, FormFields } from './context';
import { addMinutesToCurrentTime } from '@worksheets/util/time';

const fakeGameFile: FormFields['gameFile'] = {
  name: 'game.zip',
  size: 123456,
  lastModified: addMinutesToCurrentTime(-61 * 3).getTime(),
  status: 'uploaded',
  url: 'https://example.com/game.zip',
};

const defaultValues: FormContextType = {
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
    category: 'action',
    tags: [],
    viewport: undefined,
    dimensions: undefined,
    externalWebsiteUrl: '',
  },
  touched: {
    title: false,
    tagline: false,
    gameId: false,
    projectType: false,
    supportedDevices: false,
    supportedOrientations: false,
    gameFile: false,
    description: false,
    instructions: false,
    category: false,
    tags: false,
    viewport: false,
    dimensions: false,
    externalWebsiteUrl: false,
  },
  handleChange: action('handleChange'),
  handleBlur: action('handleBlur'),
  handleSubmit: action('handleSubmit'),
  setFieldValue: action('setFieldValue'),
  setFieldTouched: action('setFieldTouched'),
};

const prefilledValues: FormContextType = {
  ...defaultValues,
  values: {
    title: 'My Game',
    gameId: 'my-game',
    tagline: 'A game about stuff and doing things.',
    externalWebsiteUrl: 'example.com',
    gameFile: fakeGameFile,
    projectType: 'page',
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
    viewport: 'fixed',
    category: 'action',
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
      <FormContextProvider
        value={{
          ...defaultValues,
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
            viewport: 'responsive',
            supportedDevices: {
              computer: true,
              mobile: true,
            },
            supportedOrientations: {
              portrait: true,
              landscape: true,
            },
            dimensions: undefined,
            projectType: 'page',
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
            projectType: 'page',
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
            projectType: 'page',
            dimensions: {
              width: 200,
              height: 120,
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
            projectType: 'html',
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
            projectType: 'html',
          },
        }}
      >
        <Story />
      </FormContextProvider>
    ),
  ],
};
