import type { Meta } from '@storybook/react';

import { MarketWidgets } from './market-widgets';

const Story: Meta<typeof MarketWidgets> = {
  component: MarketWidgets,
  title: 'Content/GameScreen/GameDescription/MarketWidgets',
  decorators: [
    (Story) => (
      <div
        style={{
          padding: 32,
          backgroundColor: 'lightblue',
        }}
      >
        <Story />
      </div>
    ),
  ],
};
export default Story;

const SAMPLE_IOS_APP = 'https://apps.apple.com/us/app/solitaire/id359917414';
const SAMPLE_ANDROID_APP =
  'https://play.google.com/store/apps/details?id=com.mobilityware.solitaire&hl=en_US&gl=US';
const SAMPLE_STEAM_APP = 'https://store.steampowered.com/widget/500';
const SAMPLE_ITCH_APP = 'https://itch.io/embed/2257102';

export const Primary = {
  args: {
    android: SAMPLE_ANDROID_APP,
    ios: SAMPLE_IOS_APP,
    steam: SAMPLE_STEAM_APP,
    itch: SAMPLE_ITCH_APP,
  },
};

export const Empty = {
  args: {},
};

export const AndroidOnly = {
  args: {
    android: SAMPLE_ANDROID_APP,
  },
};

export const IosOnly = {
  args: {
    ios: SAMPLE_IOS_APP,
  },
};

export const SteamOnly = {
  args: {
    steam: SAMPLE_STEAM_APP,
  },
};

export const ItchOnly = {
  args: {
    itch: SAMPLE_ITCH_APP,
  },
};

export const AndroidAndIos = {
  args: {
    android: SAMPLE_ANDROID_APP,
    ios: SAMPLE_IOS_APP,
  },
};

export const itchAndSteam = {
  args: {
    steam: SAMPLE_STEAM_APP,
    itch: SAMPLE_ITCH_APP,
  },
};

export const itchAndAndroid = {
  args: {
    android: SAMPLE_ANDROID_APP,
    itch: SAMPLE_ITCH_APP,
  },
};

export const steamAndIos = {
  args: {
    ios: SAMPLE_IOS_APP,
    steam: SAMPLE_STEAM_APP,
  },
};
