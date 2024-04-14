import { trpc } from '@worksheets/trpc-charity';
import { LoadingBar } from '@worksheets/ui/components/loading';
import { useBookmark } from '@worksheets/ui-core';
import { InventoryPanels } from '@worksheets/util/enums';
import dynamic from 'next/dynamic';

import { InventoryPanel } from '../../panels';
import { DynamicActivationCodesSection } from './activation-codes-section/dynamic-activation-codes-section';
import { DynamicParticipationSection } from './dynamic-participation-section';
import { DynamicInventorySection } from './inventory-section';

const Container = () => {
  const bookmark = useBookmark<InventoryPanels>();
  const tokens = trpc.user.inventory.quantity.useQuery('1');

  return (
    <InventoryPanel
      tokens={tokens.data ?? 0}
      bookmark={bookmark}
      participation={<DynamicParticipationSection />}
      codes={<DynamicActivationCodesSection />}
      inventory={<DynamicInventorySection />}
    />
  );
};

export const DynamicInventoryPanel = dynamic(() => Promise.resolve(Container), {
  ssr: false,
  loading: () => <LoadingBar />,
});
