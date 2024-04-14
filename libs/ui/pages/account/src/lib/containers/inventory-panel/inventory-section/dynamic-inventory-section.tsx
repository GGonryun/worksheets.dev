import { InfoOutlined } from '@mui/icons-material';
import { routes } from '@worksheets/routes';
import { Column } from '@worksheets/ui/components/flex';
import { BulletPoints } from '@worksheets/ui/components/lists';
import { LoadingBar } from '@worksheets/ui/components/loading';
import { PanelFooter } from '@worksheets/ui/components/panels';
import dynamic from 'next/dynamic';

import { DynamicItemsHeader } from './dynamic-items-header';
import { DynamicItemsGroup } from './inventory-item';

const Container = () => {
  return (
    <Column gap={2}>
      <Column>
        <DynamicItemsHeader />
        <DynamicItemsGroup />
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
  );
};
export const DynamicInventorySection = dynamic(
  () => Promise.resolve(Container),
  {
    ssr: false,
    loading: () => <LoadingBar />,
  }
);
