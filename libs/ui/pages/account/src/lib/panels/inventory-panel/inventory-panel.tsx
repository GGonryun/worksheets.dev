import {
  HowToVote,
  Inventory2Outlined,
  KeyOutlined,
} from '@mui/icons-material';
import { Backpack } from '@worksheets/icons/adventure';
import { Key } from '@worksheets/icons/hotel';
import { TokenIcon } from '@worksheets/icons/native';
import { ValentinesLetter } from '@worksheets/icons/valentines';
import { routes } from '@worksheets/routes';
import { Panel } from '@worksheets/ui/components/panels';
import { InventoryPanels } from '@worksheets/util/enums';
import { shorthandNumber } from '@worksheets/util/numbers';
import pluralize from 'pluralize';

import { CollapsibleSection } from '../../components';

export const InventoryPanel: React.FC<{
  tokens: number;
  bookmark?: InventoryPanels;
  participation: React.ReactNode;
  inventory: React.ReactNode;
  codes: React.ReactNode;
}> = ({ tokens, participation, bookmark, inventory, codes }) => {
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
          text: 'Find Prizes',
          href: routes.raffles.path(),
          color: 'secondary',
        },
      }}
      note={{
        content: 'Win free prizes by playing games and referring friends.',
      }}
      sections={(active, toggle) => (
        <>
          <CollapsibleSection
            text="Inventory Items"
            description="View your current items, prizes, and rewards."
            id={InventoryPanels.Items}
            active={active}
            onClick={toggle}
            status={<Inventory2Outlined fontSize="large" color="info" />}
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
            {codes}
          </CollapsibleSection>

          <CollapsibleSection
            id={InventoryPanels.Participation}
            text="Participation"
            description="See a list of raffles and boss fights that you've participated in."
            active={active}
            onClick={toggle}
            status={<HowToVote fontSize="large" color="info" />}
            Icon={ValentinesLetter}
          >
            {participation}
          </CollapsibleSection>
        </>
      )}
    />
  );
};
