import { HomeOutlined, InfoOutlined } from '@mui/icons-material';
import { IconButton, useTheme, Typography } from '@mui/material';
import { Flex } from '@worksheets/ui-core';
import { animate, responsiveFontSize, textShadow } from '@worksheets/ui-games';
import { motion } from 'framer-motion';
import { FC } from 'react';
import { iconProps } from '../../util/styles';

export type HeaderProps = {
  onHome: () => void;
  onInfo: () => void;
};

export const Header: FC<HeaderProps> = ({ onHome, onInfo }) => {
  const theme = useTheme();

  return (
    <Flex fullWidth>
      <Flex grow spaceBetween>
        <motion.div {...animate(-100, 0.3)}>
          <IconButton disableRipple onClick={onHome}>
            <HomeOutlined {...iconProps(theme)} />
          </IconButton>
        </motion.div>
        <motion.div {...animate(-100, 0.3)}>
          <Typography
            color="primary.contrastText"
            fontWeight={900}
            variant="h5"
            fontSize={responsiveFontSize({ grow: 6 })}
            sx={{
              textShadow: textShadow(2),
            }}
          >
            Levels
          </Typography>
        </motion.div>
        <motion.div {...animate(-100, 0.3)}>
          <IconButton disableRipple onClick={onInfo}>
            <InfoOutlined {...iconProps(theme)} />
          </IconButton>
        </motion.div>
      </Flex>
    </Flex>
  );
};
