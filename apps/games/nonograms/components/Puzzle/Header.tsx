import { ArrowBack, Menu } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import { FC, MouseEventHandler } from 'react';
import { HeaderButton } from './HeaderButton';
import { TabletButton } from '@worksheets/ui-games';

export type HeaderProps = {
  levelComplete: boolean;
  windowHeight: number;
  size: number;
  onLevelComplete: () => void;
  onMenu: MouseEventHandler<HTMLDivElement>;
  onBack: MouseEventHandler<HTMLDivElement>;
};

export const Header: FC<HeaderProps> = ({
  levelComplete,
  windowHeight,
  size,
  onLevelComplete,
  onBack,
  onMenu,
}) => {
  return (
    <Box
      position="absolute"
      top={windowHeight * 0.02}
      left={0}
      right={0}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box display="flex" width="90%" justifyContent="space-between">
        <HeaderButton Icon={ArrowBack} size={size} onClick={onBack} />
        {levelComplete && (
          <Box mt={1}>
            <TabletButton color="white" onClick={() => onLevelComplete()}>
              <Typography fontWeight={900} variant="body2">
                🎉 Next Level
              </Typography>
            </TabletButton>
          </Box>
        )}
        <HeaderButton Icon={Menu} size={size} onClick={onMenu} />
      </Box>
    </Box>
  );
};
