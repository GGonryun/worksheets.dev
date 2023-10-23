import { Box, Typography, useTheme } from '@mui/material';
import { tabletBoxShadow } from '@worksheets/ui-games';
import Image from 'next/image';
import { FC } from 'react';
import ConfettiExplosion from 'react-confetti-explosion';
import { motion } from 'framer-motion';
import { CARD_IMAGES, CardType } from '../../util/playing-cards';

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
          zIndex: 1999,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.5 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1 }}
          style={{
            position: 'relative',
            bottom: -20,
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
            src={CARD_IMAGES[CardType.AceOfHearts]}
            width={69}
            height={100}
            alt={'Victory Card'}
          />
          <Image
            style={{
              marginLeft: -10,
              marginRight: -5,
              rotate: '-10deg',
            }}
            src={CARD_IMAGES[CardType.AceOfDiamonds]}
            width={69}
            height={100}
            alt={'Victory Card'}
          />
          <Image
            style={{
              marginLeft: -5,
              marginRight: -10,
              marginBottom: -5,
              rotate: '10deg',
            }}
            src={CARD_IMAGES[CardType.AceOfClubs]}
            width={69}
            height={100}
            alt={'Victory Card'}
          />
          <Image
            style={{
              rotate: '25deg',
              marginBottom: -35,
            }}
            src={CARD_IMAGES[CardType.AceOfSpades]}
            width={69}
            height={100}
            alt={'Victory Card'}
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
            border: '1px solid ' + theme.palette.grey[700],
            borderRadius: '8px',
            display: 'grid',
            placeItems: 'center',
          }}
        >
          <Typography variant="h3" whiteSpace="nowrap">
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
