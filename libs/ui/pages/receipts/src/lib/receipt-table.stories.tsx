import type { Meta } from '@storybook/react';
import { ReceiptTable } from './receipt-table';
import { sampleDonationReceipts } from './mocks';

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
