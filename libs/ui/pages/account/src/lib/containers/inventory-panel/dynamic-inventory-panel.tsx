import {
  HowToVote,
  Inventory,
  KeyOutlined,
  SportsMma,
  Star,
} from '@mui/icons-material';
import { Backpack, Trophy } from '@worksheets/icons/adventure';
import { Key } from '@worksheets/icons/hotel';
import { TokenIcon } from '@worksheets/icons/native';
import { ValentinesGift, ValentinesLetter } from '@worksheets/icons/valentines';
import { routes } from '@worksheets/routes';
import { trpc } from '@worksheets/trpc-charity';
import { LoadingBar } from '@worksheets/ui/components/loading';
import { Panel } from '@worksheets/ui/components/panels';
import { useBookmark } from '@worksheets/ui-core';
import { InventoryPanels } from '@worksheets/util/enums';
import { shorthandNumber } from '@worksheets/util/numbers';
import dynamic from 'next/dynamic';
import pluralize from 'pluralize';

import { CollapsibleSection } from '../../components';
import { DynamicActivationCodesSection } from './activation-codes-section/dynamic-activation-codes-section';
import { DynamicBattleParticipationSection } from './battle-participation-section';
import { DynamicInventorySection } from './inventory-section';
import { DynamicRaffleParticipationSection } from './raffle-participation-section';
import { DynamicRedemptionCodesSection } from './redemption-codes-section';

const InventoryPanel: React.FC<{
  tokens: number;
  bookmark?: InventoryPanels;
  raffleParticipation: React.ReactNode;
  battleParticipation: React.ReactNode;
  inventory: React.ReactNode;
  activationCodes: React.ReactNode;
  redemptionCodes: React.ReactNode;
}> = ({
  tokens,
  raffleParticipation,
  battleParticipation,
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
        secondary: `${shorthandNumber(tokens)} ${pluralize('token', tokens)}`,
        icon: <TokenIcon size={32} />,
      }}
      footer={{
        learn: { text: 'Find Prizes', href: routes.help.inventory.path() },
        action: {
          text: 'Complete Quests',
          href: routes.account.quests.path(),
          color: 'secondary',
        },
      }}
      note={{
        content:
          'Win free prizes by playing games, completing quests, and referring friends.',
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
            id={InventoryPanels.BattleParticipation}
            text="Boss Battles"
            description="See a list of boss battles that you've participated in."
            active={active}
            onClick={toggle}
            status={<SportsMma fontSize="large" color="info" />}
            Icon={Trophy}
          >
            {battleParticipation}
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
  const tokens = trpc.user.inventory.quantity.useQuery('1');

  return (
    <InventoryPanel
      tokens={tokens.data ?? 0}
      bookmark={bookmark}
      raffleParticipation={<DynamicRaffleParticipationSection />}
      battleParticipation={<DynamicBattleParticipationSection />}
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
