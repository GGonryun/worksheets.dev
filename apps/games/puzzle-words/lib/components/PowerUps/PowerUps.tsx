import { FC } from 'react';
import { Modal } from '../Modal';
import { Header } from './Header';
import { Divider, Link, Typography } from '@mui/material';
import { Flex } from '@worksheets/ui-core';
import { TextButton } from '../TextButton';
import { Star, WaterDrop } from '@mui/icons-material';
import { EnterDirectionally } from '../Animators';
import { PowerUpCode } from '../../types';
import { POWER_UP_COSTS, POWER_UP_LABELS } from '../../constants';

export const PowerUps: FC<{
  points: number;
  open: boolean;
  onClose: () => void;
  onPurchase: (code: PowerUpCode) => void;
  onLearnMore: () => void;
  onInviteFriends: () => void;
}> = ({ points, open, onClose, onPurchase, onLearnMore, onInviteFriends }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Flex column gap={1}>
        <EnterDirectionally delay={0.25}>
          <Header points={points} onClose={onClose} />
        </EnterDirectionally>
        <Divider sx={{ backgroundColor: 'error.dark', mb: 1 }} />
        <Flex column gap={2} pb={3}>
          <EnterDirectionally y={-50} delay={0}>
            <PowerUp
              points={points}
              onClick={() => onPurchase('unlock-1-letter')}
              cost={POWER_UP_COSTS['unlock-1-letter']}
              label={POWER_UP_LABELS['unlock-1-letter']}
            />
          </EnterDirectionally>

          <EnterDirectionally y={-50} delay={0.1}>
            <PowerUp
              points={points}
              onClick={() => onPurchase('unlock-3-letters')}
              cost={POWER_UP_COSTS['unlock-3-letters']}
              label={POWER_UP_LABELS['unlock-3-letters']}
            />
          </EnterDirectionally>

          <EnterDirectionally y={-50} delay={0.2}>
            <PowerUp
              points={points}
              cost={POWER_UP_COSTS['unlock-5-letters']}
              label={POWER_UP_LABELS['unlock-5-letters']}
              onClick={() => onPurchase('unlock-5-letters')}
            />
          </EnterDirectionally>
          <EnterDirectionally y={-50} delay={0.3}>
            <PowerUp
              points={points}
              onClick={() => onPurchase('unlock-1-word')}
              cost={POWER_UP_COSTS['unlock-1-word']}
              label={POWER_UP_LABELS['unlock-1-word']}
            />
          </EnterDirectionally>
          <EnterDirectionally y={-50} delay={0.4}>
            <PowerUp
              points={points}
              onClick={() => onPurchase('unlock-3-words')}
              cost={POWER_UP_COSTS['unlock-3-words']}
              label={POWER_UP_LABELS['unlock-3-words']}
            />
          </EnterDirectionally>
          <EnterDirectionally y={-50} delay={0.5}>
            <PowerUp
              points={points}
              onClick={() => onPurchase('finish-puzzle')}
              cost={POWER_UP_COSTS['finish-puzzle']}
              label={POWER_UP_LABELS['finish-puzzle']}
            />
          </EnterDirectionally>
        </Flex>
        <Flex position="absolute" bottom={20}>
          <EnterDirectionally y={50} delay={0.3}>
            <Flex column gap={1}>
              <Typography fontSize={16} pl={0.5}>
                <Link onClick={onLearnMore} color="inherit">
                  Learn more about earning points
                </Link>
              </Typography>

              <Flex>
                <InviteFriends onClick={onInviteFriends} />
              </Flex>
            </Flex>
          </EnterDirectionally>
        </Flex>
      </Flex>
    </Modal>
  );
};

const PowerUp: FC<{
  points: number;
  cost: number;
  label: string;
  onClick: () => void;
}> = ({ points, cost, label, onClick }) => {
  return (
    <Flex gap={1}>
      <TextButton
        disabled={cost > points}
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
const InviteFriends: FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <TextButton onClick={onClick}>
      <u>Invite Friends</u>
      <b>+150</b>
      <Star color="warning" />
      <b>+10</b>
      <WaterDrop color="primary" />
    </TextButton>
  );
};
