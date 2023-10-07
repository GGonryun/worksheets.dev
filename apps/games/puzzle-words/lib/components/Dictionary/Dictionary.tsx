import { FC } from 'react';
import { Modal } from '../Modal';
import { Definition } from './Definition';
import { Discovered } from '../../types';
import { Flex } from '@worksheets/ui-core';
import { CircularProgress, Divider } from '@mui/material';
import { Header } from './Header';
import { ErrorMessage } from './ErrorMessage';
import { useDefinition } from '@worksheets/ui-charity';

export type DictionaryProps = {
  define: string; // the word we want to dictionary to be set to.
  words: Discovered;
  bonuses: Discovered;
  open?: boolean;
  onClose: () => void;
  onReportProblem: (word: string) => void;
};

export const Dictionary: FC<DictionaryProps> = ({
  define,
  words,
  bonuses,
  open,
  onClose,
  onReportProblem,
}) => {
  const discovered = words[define] || bonuses[define];
  const { definition, loading, error } = useDefinition(define);

  return (
    <Modal open={open ?? false} onClose={onClose}>
      <Flex p={2} column>
        <Header
          word={define}
          discovered={discovered}
          pronounciation={definition?.pronounciation ?? '/ ??? /'}
          onClose={onClose}
          audio={definition?.audio}
        />
        <Divider sx={{ width: '100%', backgroundColor: 'error.main' }} />
        {loading && <CircularProgress />}{' '}
        {definition && (
          <Definition
            word={define}
            meanings={definition?.meanings}
            discovered={discovered}
          />
        )}
        {error && (
          <ErrorMessage
            onReportProblem={() => onReportProblem(define)}
            error={error}
          />
        )}
      </Flex>
    </Modal>
  );
};
