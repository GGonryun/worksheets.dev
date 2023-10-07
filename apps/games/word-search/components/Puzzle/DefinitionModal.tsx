import { FC } from 'react';
import { Modal } from '../Modal';
import { Flex } from '@worksheets/ui-core';
import { Divider, IconButton, Typography } from '@mui/material';
import { useDefinition } from '@worksheets/ui-charity';
import { motion } from 'framer-motion';
import { animate } from '../../util';
import { Close, VolumeUp } from '@mui/icons-material';

export const DefinitionModal: FC<{
  open: boolean;
  onClose: () => void;
  word: string;
}> = ({ open, onClose, word }) => {
  const { definition, loading, error } = useDefinition(word);

  const playAudio = () => {
    if (!definition?.audio) return;
    new Audio(definition.audio).play();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Flex column p={2} grow>
        <Flex spaceBetween fullWidth pb={1}>
          <Flex gap={1.5}>
            <Typography variant="h5" fontWeight={900}>
              {word}
            </Typography>
            {definition?.pronounciation && (
              <Typography variant="h6" color="text.secondary">
                {definition.pronounciation}
              </Typography>
            )}
            {definition?.audio && (
              <IconButton onClick={playAudio}>
                <VolumeUp />
              </IconButton>
            )}
          </Flex>
          <IconButton size="small" onClick={onClose}>
            <Close fontSize="large" />
          </IconButton>
        </Flex>
        <Divider sx={{ backgroundColor: 'primary.main', mb: 2 }} />
        <motion.div {...animate(0, 0.3)}>
          {loading && <div>Loading...</div>}
          {error && <div>Error: {error}</div>}
          {definition && (
            <div>
              {definition.meanings.map((m, i) => {
                return (
                  <Flex key={i} column>
                    <Typography fontWeight={900}>{m.partOfSpeech}</Typography>
                    <ul style={{ marginTop: 0, paddingTop: 0 }}>
                      {m.definitions.map((d, j) => (
                        <li key={j}>
                          <Typography>{d.definition}</Typography>
                        </li>
                      ))}
                    </ul>
                  </Flex>
                );
              })}
            </div>
          )}{' '}
        </motion.div>
      </Flex>
    </Modal>
  );
};
