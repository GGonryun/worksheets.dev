import { HowToVote, Inventory, KeyOutlined, Star } from '@mui/icons-material';
import { Link } from '@mui/material';
import { Backpack } from '@worksheets/icons/adventure';
import { Key } from '@worksheets/icons/hotel';
import { ValentinesGift, ValentinesLetter } from '@worksheets/icons/valentines';
import { contestsRoutes, helpRoutes } from '@worksheets/routes';
import { LoadingBar } from '@worksheets/ui/components/loading';
import { Panel } from '@worksheets/ui/components/panels';
import { useBookmark } from '@worksheets/ui-core';
import { InventoryPanels } from '@worksheets/util/enums';
import dynamic from 'next/dynamic';

import { CollapsibleSection } from '../../components';
import { DynamicActivationCodesSection } from './activation-codes-section/dynamic-activation-codes-section';
import { DynamicInventorySection } from './inventory-section';
import { DynamicRaffleParticipationSection } from './raffle-participation-section';
import { DynamicRedemptionCodesSection } from './redemption-codes-section';

const InventoryPanel: React.FC<{
  bookmark?: InventoryPanels;
  raffleParticipation: React.ReactNode;
  inventory: React.ReactNode;
  activationCodes: React.ReactNode;
  redemptionCodes: React.ReactNode;
}> = ({
  raffleParticipation,
  bookmark,
  inventory,
  activationCodes,
  redemptionCodes,
}) => {
  return (
    <Panel
      bookmark={bookmark}
      header={{
        primary: 'Inventory',
      }}
      footer={{
        learn: { text: 'Earn Prizes', href: helpRoutes.inventory.url() },
      }}
      note={{
        content: (
          <>
            Win free prizes by participating in{' '}
            <Link href={contestsRoutes.home.url()}>contests</Link>!
          </>
        ),
      }}
      sections={(active, toggle) => (
        <>
          <CollapsibleSection
            text="Inventory Items"
            description="View your current items, prizes, and rewards."
            id={InventoryPanels.Items}
            active={active}
            onClick={toggle}
            status={<Inventory fontSize="large" color="info" />}
            Icon={Backpack}
          >
            {inventory}
          </CollapsibleSection>
          <CollapsibleSection
            text="Activation Codes"
            description="See a history of all your claimed activation codes, and their status."
            id={InventoryPanels.ActivationCodes}
            active={active}
            onClick={toggle}
            status={<KeyOutlined fontSize="large" color="info" />}
            Icon={Key}
          >
            {activationCodes}
          </CollapsibleSection>

          <CollapsibleSection
            id={InventoryPanels.RaffleParticipation}
            text="Raffles & Giveaways"
            description="See a list of raffles that you've participated in."
            active={active}
            onClick={toggle}
            status={<HowToVote fontSize="large" color="info" />}
            Icon={ValentinesLetter}
          >
            {raffleParticipation}
          </CollapsibleSection>
          <CollapsibleSection
            id={InventoryPanels.RedemptionCodes}
            text="Redeem a Code"
            description="Redeem a code to unlock a special prize."
            active={active}
            onClick={toggle}
            status={<Star fontSize="large" color="info" />}
            Icon={ValentinesGift}
          >
            {redemptionCodes}
          </CollapsibleSection>
        </>
      )}
    />
  );
};

const Container = () => {
  const bookmark = useBookmark<InventoryPanels>();

  return (
    <InventoryPanel
      bookmark={bookmark}
      raffleParticipation={<DynamicRaffleParticipationSection />}
      activationCodes={<DynamicActivationCodesSection />}
      redemptionCodes={<DynamicRedemptionCodesSection />}
      inventory={<DynamicInventorySection />}
    />
  );
};

export const DynamicInventoryPanel = dynamic(() => Promise.resolve(Container), {
  ssr: false,
  loading: () => <LoadingBar />,
});
