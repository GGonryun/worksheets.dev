import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import SportsEsportsOutlinedIcon from '@mui/icons-material/SportsEsportsOutlined';
import Box from '@mui/material/Box';
import { ButtonPill } from '@worksheets/ui/pills';
import { FC } from 'react';

export const DrawerActions: FC<{ onRandomGame: () => void }> = ({
  onRandomGame,
}) => {
  return (
    <Box mt={4} display="flex" gap={2} flexDirection="column">
      <ButtonPill
        href="/play"
        text={{
          content: 'All Games',
          color: 'primary.contrastText',
          variant: 'h4',
        }}
        backgroundColor="error.main"
        Icon={SportsEsportsOutlinedIcon}
      />
      <ButtonPill
        href="/tags"
        text={{
          content: 'All Categories',
          color: 'primary.contrastText',
          variant: 'h4',
        }}
        backgroundColor="primary.main"
        Icon={LocalOfferOutlinedIcon}
      />
      <ButtonPill
        onClick={onRandomGame}
        text={{
          content: 'Random Game',
          color: 'text.primary',
          variant: 'h4',
        }}
        backgroundColor="highlight.main"
        Icon={ShuffleIcon}
      />
    </Box>
  );
};
