import { Shuffle, Star } from '@mui/icons-material';
import { FC } from 'react';
import { FooterProps } from './Footer';
import { Flex } from '@worksheets/ui-core';
import { IconAction, LaunchIcon } from '@worksheets/ui-games';
import { Typography, useTheme } from '@mui/material';

export const TopSection: FC<FooterProps> = (props) => {
  const { shuffleBuilder } = props;
  const theme = useTheme();
  const color = theme.palette.primary.light;

  return (
    <Flex
      fullWidth
      spaceBetween
      position="absolute"
      alignItems="flex-start"
      top={0}
    >
      <IconAction color={color} onClick={shuffleBuilder} Icon={Shuffle} />
      <TokensBonus {...props} />
    </Flex>
  );
};

export const TokensBonus: FC<FooterProps> = ({ tokens, openPowerUps }) => {
  const theme = useTheme();
  const color = theme.palette.primary.light;

  return (
    <Flex position="relative" onClick={openPowerUps}>
      <NumberPill number={tokens} />
      <IconAction dense color={color} Icon={Star} />
      <LaunchIcon count={tokens}>
        <Star color="secondary" />
      </LaunchIcon>
    </Flex>
  );
};

const NumberPill: FC<{ number: number }> = ({ number }) => {
  const theme = useTheme();
  const color = theme.palette.primary.light;
  return (
    <Flex
      sx={{
        position: 'absolute',
        right: 12,
        backgroundColor: 'background.paper',
        borderRadius: '60px',
        border: `3px solid ${color}`,
        pl: 1,
        pr: 4.5,
        fontSize: 16,
      }}
    >
      <Typography>{number >= 1000 ? '999+' : number}</Typography>
    </Flex>
  );
};
