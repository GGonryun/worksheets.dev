import { FC } from 'react';
import { Modal } from '../Modal';
import { Definition } from './Definition';
import { Discovered, WordMeaning } from '../../types';

export type DictionaryProps = {
  define: string; // the word we want to dictionary to be set to.
  words: Discovered;
  bonuses: Discovered;
  open?: boolean;
  onClose: () => void;
};

export const Dictionary: FC<DictionaryProps> = ({
  define,
  words,
  bonuses,
  open,
  onClose,
}) => {
  const discovered = words[define] || bonuses[define];
  return (
    <Modal open={open ?? false} onClose={onClose}>
      <Definition
        pronounciation={testWordPronounciation}
        word={define}
        meanings={testWordMeanings}
        discovered={discovered}
        onClose={onClose}
        onPlay={() => alert(`TODO: play audio for ${define}`)}
      />
    </Modal>
  );
};

const testWordPronounciation = 'TODO';

const testWordMeanings: WordMeaning[] = [
  {
    partOfSpeech: 'noun',
    definitions: [
      {
        definition:
          'a word that is the same as another word in spelling, but not in meaning',
        example:
          "The word 'bank' is a homograph because it has different meanings.",
      },
      {
        definition:
          'a word that is spelled the same as another word but has a different meaning and origin and may sound the same or different',
        example:
          "The word 'bow' is a homograph because it has different meanings.",
      },
    ],
  },
  {
    partOfSpeech: 'verb',
    definitions: [
      {
        definition:
          'a word that is the same as another word in spelling, but not in meaning',
        example:
          "The word 'bank' is a homograph because it has different meanings.",
      },
      {
        definition:
          'a word that is spelled the same as another word but has a different meaning and origin and may sound the same or different',
        example:
          "The word 'bow' is a homograph because it has different meanings.",
      },
    ],
  },
];
