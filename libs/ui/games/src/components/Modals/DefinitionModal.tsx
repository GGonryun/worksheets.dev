import { FC } from 'react';
import { Flex } from '@worksheets/ui-core';
import {
  Button,
  CircularProgress,
  Divider,
  IconButton,
  Typography,
} from '@mui/material';
import { motion } from 'framer-motion';
import { Close, VolumeUp } from '@mui/icons-material';
import { useDefinition } from '../../hooks';
import { Modal } from '../Modal';
import { animate } from '../../util';

export const DefinitionModal: FC<{
  onClose: () => void;
  onReportProblem: () => void;
  word: string;
}> = ({ onReportProblem, onClose, word }) => {
  const { definition, loading, error } = useDefinition(word);

  const playAudio = () => {
    if (!definition?.audio) return;
    new Audio(definition.audio).play();
  };

  return (
    <Modal open={Boolean(word)} onClose={onClose}>
      <Flex column p={2} grow>
        <Flex spaceBetween fullWidth pb={1}>
          <Flex gap={1.5} wrap>
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
          {loading && <CircularProgress />}
          {error && (
            <ErrorMessage error={error} onReportProblem={onReportProblem} />
          )}
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

export type ErrorMessageProps = {
  error: string;
  onReportProblem: () => void;
};

export const ErrorMessage: FC<ErrorMessageProps> = ({
  error,
  onReportProblem,
}) => {
  return (
    <Flex column pt={1} pr={2} gap={1}>
      <Typography variant="h5" color="error.main">
        {error}
      </Typography>
      <Typography fontFamily={'sans-serif'}>
        Please try again later. If the problem persists, please submit a report.
      </Typography>
      <Button variant="outlined" onClick={onReportProblem}>
        Report A Problem
      </Button>
    </Flex>
  );
};
