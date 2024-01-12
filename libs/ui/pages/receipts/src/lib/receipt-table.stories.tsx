import type { Meta } from '@storybook/react';

import { sampleDonationReceipts } from './mocks';
import { ReceiptTable } from './receipt-table';

const Story: Meta<typeof ReceiptTable> = {
  component: ReceiptTable,
  title: 'Content/ReceiptScreen/ReceiptTable',
  decorators: [
    (Story) => (
      <div
        style={{
          backgroundColor: 'lightblue',
          height: '100%',
        }}
      >
        <Story />
      </div>
    ),
  ],
};
export default Story;

export const Primary = {
  args: {
    rows: sampleDonationReceipts,
  },
};
