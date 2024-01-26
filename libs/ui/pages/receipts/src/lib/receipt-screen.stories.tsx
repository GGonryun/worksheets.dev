import type { Meta } from '@storybook/react';
import { StoryWallpaper } from '@worksheets/ui/components/wallpaper';

import { sampleDonationReceipts } from './mocks';
import { ReceiptScreen } from './receipt-screen';

const Story: Meta<typeof ReceiptScreen> = {
  component: ReceiptScreen,
  decorators: [
    (Story) => (
      <StoryWallpaper>
        <Story />
      </StoryWallpaper>
    ),
  ],
};
export default Story;

export const Primary = {
  args: {
    rows: sampleDonationReceipts,
  },
};
