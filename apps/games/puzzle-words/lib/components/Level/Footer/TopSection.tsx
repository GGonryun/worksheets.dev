import { Shuffle, Star } from '@mui/icons-material';
import { FC } from 'react';
import { FooterProps } from './Footer';
import { IconButton } from '../../IconButton';
import { Flex } from '@worksheets/ui-core';
import { border } from '../../../layouts';
import { LaunchIcon } from '@worksheets/ui-games';

export const TopSection: FC<FooterProps> = (props) => {
  const { shuffleBuilder } = props;
  return (
    <Flex fullWidth spaceBetween position="absolute" top={0}>
      <Flex column>
        <IconButton onClick={shuffleBuilder}>
          <Shuffle />
        </IconButton>
      </Flex>
      <TokensBonus {...props} />
    </Flex>
  );
};

export const TokensBonus: FC<FooterProps> = ({ tokens, openPowerUps }) => {
  return (
    <Flex position="relative" right={-20} onClick={openPowerUps}>
      <NumberPill number={tokens} />
      <IconButton>
        <Star />
      </IconButton>
      <LaunchIcon count={tokens}>
        <Star color="warning" />
      </LaunchIcon>
    </Flex>
  );
};

const NumberPill: FC<{ number: number }> = ({ number }) => {
  return (
    <Flex
      sx={(theme) => ({
        position: 'absolute',
        right: 12,
        backgroundColor: 'background.paper',
        borderRadius: '60px',
        border: border(theme),
        pl: 1,
        pr: 3.5,
        fontSize: 16,
      })}
    >
      {number >= 1000 ? '999+' : number}
    </Flex>
  );
};
