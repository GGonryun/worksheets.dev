import { Box, Button, Divider, Link, Typography } from '@mui/material';
import { Modal, TabletButton } from '@worksheets/ui-games';
import { FC } from 'react';
import { PuzzleItem } from '../../util/types';
import { Flex } from '@worksheets/ui-core';
import Image from 'next/image';
import { LibraryAddCheck } from '@mui/icons-material';
import { urls } from '../../util/urls';
import { motion } from 'framer-motion';
import ConfettiExplosion from 'react-confetti-explosion';
import React from 'react';
import {
  growAnimation,
  spinAnimation,
  flyUpAnimation,
} from '../../util/styles';

export const LevelCompleteModal: FC<{
  open: boolean;
  onClose: () => void;
  puzzle: PuzzleItem;
}> = ({ puzzle, open, onClose }) => {
  const [showExplosion, setShowExplosion] = React.useState(false);

  return (
    <>
      {showExplosion && (
        <>
          <Box
            sx={{
              position: 'absolute',
              left: '50%',
              top: '45%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            <ConfettiExplosion
              zIndex={2000} // modal index is like 1.3k
              force={0.8}
              duration={3000}
              particleCount={100}
            />
          </Box>
        </>
      )}
      <Modal
        open={open}
        onClose={onClose}
        maxHeight={500}
        sx={{ overflow: 'hidden' }}
      >
        <Flex fullWidth column p={2} grow gap={1}>
          <motion.div {...growAnimation(0.25)}>
            <Typography
              variant="h4"
              align="center"
              fontWeight={900}
              fontSize={'1.75rem'}
            >
              New Photo Unlocked!
            </Typography>
          </motion.div>
          <motion.div {...growAnimation(0.5)}>
            <Flex centered gap={1}>
              <LibraryAddCheck />
              <Typography variant="body1" align="center">
                <Link color="inherit" href={urls.gallery()}>
                  Added to My Collection
                </Link>
              </Typography>
            </Flex>
          </motion.div>
          <Divider />
          <Flex grow centered column>
            <motion.div
              layout
              {...spinAnimation(2)}
              onAnimationStart={() => setShowExplosion(false)}
              onAnimationComplete={() => setShowExplosion(true)}
            >
              <Image
                style={{
                  border: '12px solid black',
                }}
                src={puzzle.image}
                width={180}
                height={180}
                alt={`${puzzle.name} image`}
              />
              <Typography variant="h6" align="center" fontWeight={900}>
                {puzzle.name}
              </Typography>
            </motion.div>
            <motion.div {...flyUpAnimation(0.25)}>
              <TabletButton href={urls.levels()}>
                <Typography variant="h6">Next Level</Typography>
              </TabletButton>
            </motion.div>
            <motion.div {...flyUpAnimation(0.5)}>
              <Button
                disableFocusRipple
                disableRipple
                href={urls.home()}
                sx={{
                  mt: 2,
                  borderRadius: '50px',
                  pb: 1,
                  textDecoration: 'underline',
                  color: '',
                }}
              >
                Main Menu
              </Button>
            </motion.div>
          </Flex>
        </Flex>
      </Modal>
    </>
  );
};
