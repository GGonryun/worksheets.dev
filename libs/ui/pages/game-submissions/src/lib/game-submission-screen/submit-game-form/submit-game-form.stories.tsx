import type { Meta } from '@storybook/react';
import { SubmitGameForm } from './submit-game-form';
import { action } from '@storybook/addon-actions';
import {
  DEFAULT_VALUES,
  ERROR_VALUES,
  GameSubmissionFormContextProvider,
  PREFILLED_VALUES,
} from '../../form-context';

const defaultValues = DEFAULT_VALUES(action);
const prefilledValues = PREFILLED_VALUES(action);
const errorValues = ERROR_VALUES(action);

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
      <GameSubmissionFormContextProvider value={defaultValues}>
        <Story />
      </GameSubmissionFormContextProvider>
    ),
  ],
};

export const ResponsiveMobileGame: Story = {
  decorators: [
    (Story) => (
      <GameSubmissionFormContextProvider
        value={{
          ...prefilledValues,
          values: {
            ...prefilledValues.values,
            viewport: 'RESPONSIVE',
            devices: ['MOBILE'],
            orientations: ['PORTRAIT', 'LANDSCAPE'],
            projectType: 'PAGE',
          },
        }}
      >
        <Story />
      </GameSubmissionFormContextProvider>
    ),
  ],
};

export const ExternalWebsite: Story = {
  decorators: [
    (Story) => (
      <GameSubmissionFormContextProvider
        value={{
          ...prefilledValues,
          values: {
            ...prefilledValues.values,
            projectType: 'PAGE',
          },
        }}
      >
        <Story />
      </GameSubmissionFormContextProvider>
    ),
  ],
};

export const ExternalWebsiteErrors: Story = {
  decorators: [
    (Story) => (
      <GameSubmissionFormContextProvider
        value={{
          ...errorValues,
          values: {
            ...errorValues.values,
            title: "@ My Game's Title %",
            headline: "My Game's Tagline ".repeat(10),
            externalWebsiteUrl: 'https://example.com',
            projectType: 'PAGE',
            viewportHeight: 120,
            viewportWidth: 120,
            markets: {
              steam: 'http://store.steampowered.com/app/1234567890/My_Game/',
              itch: 'store.itch.io/my-game',
              googlePlay: 'an invalid url',
            },
          },
          errors: {
            ...errorValues.errors,
            slug: 'That Game ID is already taken. Please choose another.',
            devices: 'You must select at least one device.',
            orientations: 'You must select at least one orientation.',
            title:
              'Your title cannot include characters such as %, $, #, @, or &.',
            headline: 'Your tagline is too long.',
            projectType: 'Invalid project type selected.',
            gameFile: '',
            description: 'Your description is invalid.',
            instructions: 'Your instructions are invalid.',
            category: 'You must select at least one category.',
            tags: 'You must select at least one tag.',
            viewport: 'You must select a viewport.',
            viewportWidth: 'Your viewport width must be at least 240 pixels.',
            viewportHeight: 'Your viewport height must be at least 160 pixels.',
            externalWebsiteUrl:
              'Your web page must not include "http://" or "https://"',
            thumbnailFile: 'Failed to upload a thumbnail.',
            coverFile: 'Failed to upload a cover.',
            trailerUrl: 'Trailer must be a YouTube or Vimeo link.',
            markets:
              'Invalid purchase options. Please check your links and try again.',
          },
        }}
      >
        <Story />
      </GameSubmissionFormContextProvider>
    ),
  ],
};

export const HTML5Game: Story = {
  decorators: [
    (Story) => (
      <GameSubmissionFormContextProvider
        value={{
          ...prefilledValues,
          values: {
            ...prefilledValues.values,
            projectType: 'HTML',
            gameFile: null,
          },
        }}
      >
        <Story />
      </GameSubmissionFormContextProvider>
    ),
  ],
};

export const HTML5GameUploaded: Story = {
  decorators: [
    (Story) => (
      <GameSubmissionFormContextProvider
        value={{
          ...prefilledValues,
          values: {
            ...prefilledValues.values,
            projectType: 'HTML',
            markets: {
              steam: 'https://store.steampowered.com/app/1234567890/My_Game/',
              itch: 'https://example.itch.io/my-game',
              gameJolt: '',
            },
          },
        }}
      >
        <Story />
      </GameSubmissionFormContextProvider>
    ),
  ],
};

export const HTML5GameErrors: Story = {
  decorators: [
    (Story) => (
      <GameSubmissionFormContextProvider
        value={{
          ...prefilledValues,
          values: {
            ...prefilledValues.values,
            projectType: 'HTML',
            markets: {
              steam: 'https://store.steampowered.com/app/1234567890/My_Game/',
              itch: 'https://example.itch.io/my-game',
              gameJolt: '',
            },
          },
          errors: errorValues.errors,
        }}
      >
        <Story />
      </GameSubmissionFormContextProvider>
    ),
  ],
};
