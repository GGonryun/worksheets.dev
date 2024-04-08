import { CrisisAlert, HowToVote, PendingOutlined } from '@mui/icons-material';
import { ValentinesGift, ValentinesLetter } from '@worksheets/icons/valentines';
import { routes } from '@worksheets/routes';
import { Panel } from '@worksheets/ui/components/panels';
import { PrizesPanels } from '@worksheets/util/enums';
import { EnteredRaffleSchema, WonRaffleDetails } from '@worksheets/util/types';

import { CollapsibleSection } from '../../components';
import { ParticipationSection } from './sections/participation-section';
import { PrizesSection } from './sections/prizes-section';

export const PrizesPanel: React.FC<{
  bookmark?: PrizesPanels;
  previous: EnteredRaffleSchema[];
  prizes: WonRaffleDetails[];
  onClaim: (prize: WonRaffleDetails) => void;
}> = ({ prizes, previous, bookmark, onClaim }) => {
  return (
    <Panel
      bookmark={bookmark}
      header={{
        primary: 'Prizes',
        secondary: `${prizes.length} Prizes Won`,
        icon: <ValentinesGift fontSize="large" />,
      }}
      footer={{
        learn: { text: 'The Prize Wall', href: routes.help.prizes.path() },
        action: {
          text: 'Get Prizes',
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
            text="Prizes Won"
            description="Claim your prizes, track your winnings, access redemption codes."
            id={PrizesPanels.Prizes}
            active={active}
            onClick={toggle}
            status={
              prizes.length ? (
                <CrisisAlert fontSize="large" color="error" />
              ) : (
                <PendingOutlined fontSize="large" color="info" />
              )
            }
            Icon={ValentinesGift}
          >
            <PrizesSection prizes={prizes} onClaim={onClaim} />
          </CollapsibleSection>

          <CollapsibleSection
            id={PrizesPanels.Raffles}
            text="Raffle Participation"
            description="See a list of raffles that you've participated in and their status."
            active={active}
            onClick={toggle}
            status={<HowToVote fontSize="large" color="info" />}
            Icon={ValentinesLetter}
          >
            <ParticipationSection raffles={previous} />
          </CollapsibleSection>
        </>
      )}
    />
  );
};
