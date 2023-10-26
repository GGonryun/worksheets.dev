import { FC } from 'react';
import { Header } from './Header';
import { Divider } from '@mui/material';
import { Flex } from '@worksheets/ui-core';
import { TextButton } from '../TextButton';
import { Star } from '@mui/icons-material';
import { EnterDirectionally } from '../Animators';
import { PowerUpCode } from '../../types';
import { POWER_UP_COSTS, POWER_UP_LABELS } from '../../constants';
import { Modal } from '@worksheets/ui-games';

export const PowerUps: FC<{
  tokens: number;
  open: boolean;
  onClose: () => void;
  onPurchase: (code: PowerUpCode) => void;
}> = ({ tokens, open, onClose, onPurchase }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Flex column gap={1} p={2} fullWidth>
        <EnterDirectionally delay={0.25}>
          <Header tokens={tokens} onClose={onClose} />
        </EnterDirectionally>
        <Divider sx={{ backgroundColor: 'primary.main', mb: 1 }} />
        <Flex column gap={2}>
          {Object.entries(POWER_UP_COSTS).map(([code, cost], i) => (
            <EnterDirectionally y={-50} delay={0.1 * i} key={i}>
              <PowerUp
                tokens={tokens}
                cost={cost}
                label={POWER_UP_LABELS[code as PowerUpCode]}
                onClick={() => onPurchase(code as PowerUpCode)}
              />
            </EnterDirectionally>
          ))}
        </Flex>
      </Flex>
    </Modal>
  );
};

const PowerUp: FC<{
  tokens: number;
  cost: number;
  label: string;
  onClick: () => void;
}> = ({ tokens, cost, label, onClick }) => {
  return (
    <Flex gap={1}>
      <TextButton
        disabled={cost > tokens}
        onClick={onClick}
        endIcon={
          <Flex pl={1} gap={0.5}>
            <b>-{cost}</b>
            <Star color="warning" />
          </Flex>
        }
      >
        <u>{label}</u>
      </TextButton>
    </Flex>
  );
};
