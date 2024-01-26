import type { Meta } from '@storybook/react';

import { QuestionAnswerSection } from './qa-section';

const simpleQa = [
  {
    id: 'developer-help',
    question: "I'm a developer. How can I help?",
    summary:
      "We're always looking for new games to add to our platform. If you have a game that you'd like to add, please use our contribution portal.",
    answer: <div>This is an answer</div>,
  },
  {
    id: 'player-help',
    question: "I'm a player. How can I help?",
    answer: <div>This is an answer</div>,

    summary: `The more games you play, the more money we can raise for charity.`,
  },
];

const Story: Meta<typeof QuestionAnswerSection> = {
  component: QuestionAnswerSection,
  decorators: [
    (Story) => (
      <div
        style={{
          height: '100%',
        }}
      >
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            height: '70px',
            display: 'grid',
            placeItems: 'center',
            border: '1px solid',
            backgroundColor: 'red',
            zIndex: 100,
          }}
        >
          Header Object
        </div>
        <div style={{ position: 'relative', top: 70, paddingBottom: 30 }}>
          <Story />
        </div>
      </div>
    ),
  ],
};
export default Story;

export const Primary = {
  args: {
    bookmark: 'developer-help',
    qa: [],
  },
};

export const NoBookmark = {
  args: {
    qa: simpleQa,
  },
};

export const NoFAQ = {
  args: {
    bookmark: 'developer-help',
    qa: simpleQa,
    hideFAQRedirect: true,
  },
};

export const Empty = {
  args: {
    qa: [],
  },
};
