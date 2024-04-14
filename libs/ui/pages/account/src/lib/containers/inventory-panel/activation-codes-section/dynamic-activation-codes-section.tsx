import { trpc } from '@worksheets/trpc-charity';
import { LoadingBar } from '@worksheets/ui/components/loading';
import dynamic from 'next/dynamic';

import { ActivationCodesSection } from './activation-code-section';

const Container = () => {
  const codes = trpc.user.codes.activation.list.useQuery();

  return <ActivationCodesSection codes={codes.data ?? []} />;
};

export const DynamicActivationCodesSection = dynamic(
  () => Promise.resolve(Container),
  {
    ssr: false,
    loading: () => <LoadingBar />,
  }
);
