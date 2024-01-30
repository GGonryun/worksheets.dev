import { trpc } from '@worksheets/trpc-charity';
import { LoadingScreen } from '@worksheets/ui/pages/loading';
import dynamic from 'next/dynamic';

import { ReceiptScreen } from '../components/receipt-screen';

const ReceiptScreenContainer = () => {
  const receipts = trpc.donations.receipts.useQuery();

  return <ReceiptScreen rows={receipts.data ?? []} />;
};

export const DynamicReceiptScreen = dynamic(
  () => Promise.resolve(ReceiptScreenContainer),
  {
    ssr: false,
    loading: () => <LoadingScreen />,
  }
);
