import { Flex } from '@worksheets/ui-core';
import { IconButton } from '../IconButton';
import { Add, Settings, WaterDrop } from '@mui/icons-material';
import { border } from '../../layouts';
import { FC } from 'react';
import { EnterDirectionally } from '../Animators';

export type HeaderProps = {
  onDonateWater: () => void;
  onSettings: () => void;
};

export const Header: FC<HeaderProps> = (props) => (
  <Flex spaceBetween fullWidth position="relative">
    <EnterDirectionally y={-50} delay={0.5}>
      <WaterDropButton {...props} />
    </EnterDirectionally>
    <EnterDirectionally y={-50} delay={0.5}>
      <IconButton onClick={props.onSettings}>
        <Settings />
      </IconButton>
    </EnterDirectionally>
  </Flex>
);

const WaterDropButton: FC<HeaderProps> = ({ onDonateWater }) => (
  <Flex position="relative" onClick={onDonateWater} zIndex={1}>
    <IconButton>
      <WaterDrop />
    </IconButton>
    <Flex
      position="absolute"
      width={24}
      height={24}
      right={-10}
      bottom={-8}
      sx={(theme) => ({
        color: 'text.secondary',
        border: border(theme),
        borderRadius: '50%',
        backgroundColor: 'background.paper',
      })}
    >
      <Flex fill centered>
        <Add color="inherit" />
      </Flex>
    </Flex>
  </Flex>
);