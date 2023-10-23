import { Box, Typography, useTheme } from '@mui/material';
import { tabletBoxShadow } from '@worksheets/ui-games';
import Image from 'next/image';
import { FC } from 'react';
import ConfettiExplosion from 'react-confetti-explosion';
import { CARD_HEIGHT, CARD_WIDTH } from '../../util/constants';
import { motion } from 'framer-motion';

export const GameCompleteScreen: FC<{ open: boolean }> = ({ open }) => {
  const theme = useTheme();
  if (!open) return null;
  return (
    <>
      <Box
        sx={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.5 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1 }}
          style={{
            position: 'relative',
            bottom: -20,
            zIndex: 1999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Image
            style={{
              rotate: '-25deg',
              marginBottom: -30,
            }}
            src="/cards/heart-1.png"
            width={CARD_WIDTH * 0.8}
            height={CARD_HEIGHT * 0.8}
            alt={'Ace of Hearts'}
          />
          <Image
            style={{
              marginLeft: -10,
              marginRight: -5,
              rotate: '-10deg',
            }}
            src="/cards/diamond-1.png"
            width={CARD_WIDTH * 0.8}
            height={CARD_HEIGHT * 0.8}
            alt={'Ace of Diamonds'}
          />
          <Image
            style={{
              marginLeft: -5,
              marginRight: -10,
              marginBottom: -5,
              rotate: '10deg',
            }}
            src="/cards/club-1.png"
            width={CARD_WIDTH * 0.8}
            height={CARD_HEIGHT * 0.8}
            alt={'Ace of Clubs'}
          />
          <Image
            style={{
              rotate: '25deg',
              marginBottom: -35,
            }}
            src="/cards/spade-1.png"
            width={CARD_WIDTH * 0.8}
            height={CARD_HEIGHT * 0.8}
            alt={'Ace of Spades'}
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          style={{
            position: 'relative',
            backgroundColor: 'white',
            paddingLeft: '50px',
            paddingRight: '50px',
            paddingTop: '14px',
            paddingBottom: '14px',
            boxShadow: tabletBoxShadow,
            zIndex: 2000,
            border: '1px solid ' + theme.palette.grey[700],
            borderRadius: '8px',
            display: 'grid',
            placeItems: 'center',
          }}
        >
          <Typography variant="h4" whiteSpace="nowrap">
            Victory!
          </Typography>
        </motion.div>
      </Box>
      <Box
        sx={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <ConfettiExplosion
          zIndex={2000} // modal index is like 1.3k
          force={0.8}
          duration={3000}
          particleCount={200}
        />
      </Box>
    </>
  );
};
