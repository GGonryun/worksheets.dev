import { Flex } from '@worksheets/ui-core';
import { motion } from 'framer-motion';
import { FC } from 'react';
import { useTheme } from '@mui/material';
import { animate, urls } from '../../util';
import { MenuButton } from '../Buttons';

export type TitleFooterProps = {
  onShowMission: () => void;
  color?: string;
};

export const TitleFooter: FC<TitleFooterProps> = ({
  color: colorOverride,
  onShowMission,
}) => {
  const theme = useTheme();
  const color = colorOverride ?? theme.palette.primary.dark;
  const border = `2px solid ${color}`;
  return (
    <Flex fullWidth mx={'auto'} pb={2}>
      <Flex grow spaceBetween px={2}>
        <motion.div {...animate(-100, 0.3)}>
          <MenuButton
            border={border}
            color={color}
            href={urls.charityGames.play()}
            target="_blank"
          >
            More Games
          </MenuButton>
        </motion.div>

        <motion.div {...animate(-100, 0.3)}>
          <MenuButton border={border} color={color} onClick={onShowMission}>
            Our Mission
          </MenuButton>
        </motion.div>
      </Flex>
    </Flex>
  );
};
