import { HelpOutline, SportsEsportsOutlined } from '@mui/icons-material';
import { useTheme } from '@mui/material';
import { Flex } from '@worksheets/ui-core';
import { MenuButton, urls } from '@worksheets/ui-games';
import { FC } from 'react';

export const SupportSection: FC<{
  onShowInstructions: () => void;
}> = ({ onShowInstructions }) => {
  const theme = useTheme();
  return (
    <Flex gap={2} fullWidth spaceBetween>
      <MenuButton
        variant="body2"
        startIcon={<HelpOutline color="secondary" />}
        onClick={onShowInstructions}
        color="secondary.main"
        border={`3px solid ${theme.palette.secondary.main}`}
      >
        How to play
      </MenuButton>
      <MenuButton
        variant="body2"
        endIcon={<SportsEsportsOutlined color="secondary" />}
        href={urls.charityGames.home()}
        color="secondary"
        border={`3px solid ${theme.palette.secondary.main}`}
      >
        More Games
      </MenuButton>
    </Flex>
  );
};
