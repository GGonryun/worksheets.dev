import type { Meta } from '@storybook/react';
import { StoryWallpaper } from '@worksheets/ui/components/wallpaper';

import { sampleDonationReceipts } from './mocks';
import { ReceiptTable } from './receipt-table';

const Story: Meta<typeof ReceiptTable> = {
  component: ReceiptTable,
  title: 'Content/ReceiptScreen/ReceiptTable',
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
