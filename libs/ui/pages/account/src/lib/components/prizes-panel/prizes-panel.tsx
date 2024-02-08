import {
  CrisisAlert,
  FormatListNumbered,
  HowToVote,
} from '@mui/icons-material';
import { Box, Divider, Typography } from '@mui/material';
import { ValentinesGift, ValentinesLetter } from '@worksheets/icons/valentines';
import { PrizesPanels } from '@worksheets/util/enums';
import { EnteredRaffleSchema, WonRaffleDetails } from '@worksheets/util/types';

import { CollapsibleSection } from '../collapsible-section';
import { usePanelController } from '../hooks/use-panel-controller';
import { PanelFooter } from '../panel-footer';
import { PanelHeader } from '../panel-header';
import { ParticipationSection } from './sections/participation-section';
import { PrizesSection } from './sections/prizes-section';

export const PrizesPanel: React.FC<{
  bookmark?: PrizesPanels;
  previous: EnteredRaffleSchema[];
  prizes: WonRaffleDetails[];
  onClaim: (prize: WonRaffleDetails) => void;
}> = ({ prizes, previous, bookmark, onClaim }) => {
  const { active: activeBookmark, toggleActive } = usePanelController(bookmark);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <PanelHeader
        primary="Prizes"
        secondary={`${prizes.length} Prizes Won`}
        icon={<ValentinesGift fontSize="large" />}
      />

      <Divider />

      <CollapsibleSection
        text="Prizes Won"
        description="Claim your prizes, track your winnings, access redemption codes."
        id={PrizesPanels.Prizes}
        active={activeBookmark}
        onClick={toggleActive}
        status={<CrisisAlert fontSize="large" color="error" />}
        Icon={ValentinesGift}
      >
        <PrizesSection prizes={prizes} onClaim={onClaim} />
      </CollapsibleSection>

      <CollapsibleSection
        id={PrizesPanels.Raffles}
        text="Raffle Participation"
        description="See a list of raffles that you've participated in and their status."
        active={activeBookmark}
        onClick={toggleActive}
        status={<FormatListNumbered fontSize="large" color="info" />}
        Icon={ValentinesLetter}
      >
        <ParticipationSection raffles={previous} />
      </CollapsibleSection>

      <Divider />

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
        }}
      >
        <HowToVote fontSize="small" color="info" />
        <Typography>
          Win free prizes by playing games and referring friends.
        </Typography>
      </Box>

      <PanelFooter
        learn={{ text: 'The Prize Wall', href: '/help/prize-wall' }}
        action={{ text: 'Prize Wall', href: '/prizes', color: 'secondary' }}
      />
    </Box>
  );
};
