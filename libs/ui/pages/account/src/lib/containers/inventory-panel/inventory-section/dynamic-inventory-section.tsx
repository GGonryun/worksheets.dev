import { InfoOutlined } from '@mui/icons-material';
import { routes } from '@worksheets/routes';
import { Column } from '@worksheets/ui/components/flex';
import { BulletPoints } from '@worksheets/ui/components/lists';
import { LoadingBar } from '@worksheets/ui/components/loading';
import { PanelFooter } from '@worksheets/ui/components/panels';
import { InventoryItemSchema } from '@worksheets/util/types';
import dynamic from 'next/dynamic';
import { useState } from 'react';

import { DynamicItemsHeader } from './dynamic-items-header';
import { DynamicItemsGroup } from './inventory-item';
import { DynamicItemModal } from './inventory-item/dynamic-item-modal';

const Container = () => {
  const [item, setItem] = useState<InventoryItemSchema | undefined>(undefined);
  return (
    <>
      <Column gap={2}>
        <Column>
          <DynamicItemsHeader />
          <DynamicItemsGroup onClick={(item) => setItem(item)} />
        </Column>
        <BulletPoints
          icon={<InfoOutlined fontSize="small" color="info" />}
          title={'How It Works'}
          points={[
            `Click on an item to view more details.`,
            `Find items while playing games, winning raffles, or participating in boss fights.`,
            `Prizes that you win will be stored here until claimed.`,
            `Some items will expire from your inventory if not claimed.`,
          ]}
        />

        <PanelFooter
          learn={{
            text: 'Inventory Items',
            href: routes.help.inventory.path(),
          }}
          action={{
            text: 'Redeem Tokens',
            href: routes.raffles.path(),
            color: 'primary',
          }}
        />
      </Column>
      {item && (
        <DynamicItemModal item={item} onClose={() => setItem(undefined)} />
      )}
    </>
  );
};
export const DynamicInventorySection = dynamic(
  () => Promise.resolve(Container),
  {
    ssr: false,
    loading: () => <LoadingBar />,
  }
);
