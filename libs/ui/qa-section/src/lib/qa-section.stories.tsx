import type { Meta } from '@storybook/react';
import { QuestionAnswerSection } from './qa-section';
import { helpFaq } from '@worksheets/data-access/charity-games';

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
    qa: helpFaq,
  },
};

export const NoBookmark = {
  args: {
    qa: helpFaq,
  },
};

export const NoFAQ = {
  args: {
    bookmark: 'developer-help',
    qa: helpFaq,
    hideFAQRedirect: true,
  },
};

export const Empty = {
  args: {
    qa: [],
  },
};
