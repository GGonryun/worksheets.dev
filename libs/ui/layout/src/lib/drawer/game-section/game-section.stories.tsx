import type { Meta } from '@storybook/react';
import { GameIcon } from '@worksheets/ui/game-grid';

import { GameSection } from './game-section';

const Story: Meta<typeof GameSection> = {
  component: GameSection,
  decorators: [
    (Story) => (
      <div
        style={{
          width: '100%',
          height: 'auto',
          padding: '20px 0',
          backgroundColor: 'rgb(250, 203, 202)',
        }}
      >
        <Story />
      </div>
    ),
  ],
};
export default Story;

export const LargeIcons = {
  args: {
    title: 'Popular This Week',
    href: '#',
    children: (
      <>
        <GameIcon size={128} id="1" name="Solitaire" banner="hot" />
        <GameIcon size={128} id="2" name="Solitaire" banner="new" />
        <GameIcon size={128} id="3" name="Solitaire" />
        <GameIcon size={128} id="4" name="Solitaire" banner="new" />
        <GameIcon size={128} id="5" name="Solitaire" banner="played" />
        <GameIcon size={128} id="6" name="Solitaire" />
        <GameIcon size={128} id="7" name="Solitaire" />
        <GameIcon size={128} id="8" name="Solitaire" banner="new" />
        <GameIcon size={128} id="9" name="Solitaire" />
        <GameIcon size={128} id="10" name="Solitaire" banner="played" />
      </>
    ),
  },
};

export const SmallIcons = {
  args: {
    title: 'Popular This Week',
    href: '#',
    children: (
      <>
        <GameIcon size={64} id="1" name="Solitaire" banner="hot" />
        <GameIcon size={64} id="2" name="Solitaire" banner="new" />
        <GameIcon size={64} id="3" name="Solitaire" />
        <GameIcon size={64} id="4" name="Solitaire" banner="new" />
        <GameIcon size={64} id="5" name="Solitaire" banner="played" />
        <GameIcon size={64} id="6" name="Solitaire" />
        <GameIcon size={64} id="7" name="Solitaire" />
        <GameIcon size={64} id="8" name="Solitaire" banner="new" />
        <GameIcon size={64} id="9" name="Solitaire" />
      </>
    ),
  },
};

export const SectionWithoutLink = {
  args: {
    title: 'Popular This Week',
    children: (
      <>
        <GameIcon size={64} id="1" name="Solitaire" banner="hot" />
        <GameIcon size={64} id="2" name="Solitaire" banner="new" />
        <GameIcon size={64} id="3" name="Solitaire" />
        <GameIcon size={64} id="4" name="Solitaire" banner="new" />
        <GameIcon size={64} id="5" name="Solitaire" banner="played" />
        <GameIcon size={64} id="6" name="Solitaire" />
        <GameIcon size={64} id="7" name="Solitaire" />
        <GameIcon size={64} id="8" name="Solitaire" banner="new" />
        <GameIcon size={64} id="9" name="Solitaire" />
      </>
    ),
  },
};
