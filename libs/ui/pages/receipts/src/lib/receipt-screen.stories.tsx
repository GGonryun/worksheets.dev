import type { Meta } from '@storybook/react';

import { sampleDonationReceipts } from './mocks';
import { ReceiptScreen } from './receipt-screen';

const Story: Meta<typeof ReceiptScreen> = {
  component: ReceiptScreen,
  title: 'Content/ReceiptScreen',
  decorators: [
    (Story) => (
      <div
        style={{
          backgroundColor: 'lightblue',
          height: '100vh',
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
