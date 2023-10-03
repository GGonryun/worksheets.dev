import { FC, useState } from 'react';
import { WordBuilder } from '../WordBuilder';
import { WordSelection } from '../WordSelection';
import { PanHandlers } from 'framer-motion';
import { uniqueArray } from '@worksheets/util/arrays';
import { Header } from './Header';
import { Footer } from './Footer';
import { Layout } from './Layout';
import { WordPuzzles } from '../WordPuzzles';
import { Dictionary } from '../Dictionary';
import { PowerUpCode, Discovered, Hints } from '../../types';
import { BonusWords } from '../BonusWords';
import { ReportIssue } from '../ReportIssue';
import { PowerUps } from '../PowerUps';
import { HelpCenter } from '../HelpCenter';
import { useRouter } from 'next/router';
import { PuzzleRule } from '../../puzzles';

export type ModalType =
  | 'bonuses'
  | 'definition'
  | 'report-issue'
  | 'power-ups'
  | 'help-center';

const useModalController = () => {
  const [modal, setModal] = useState<ModalType | undefined>(undefined);
  const [data, setData] = useState('');

  const handleUpdateModal = (modal?: ModalType, data?: string) => {
    if (modal === 'definition' && !data) {
      throw new Error('cannot show definition without a word being set');
    }
    setModal(modal);
    setData(data ?? '');
  };

  return {
    modal,
    data,
    setModal: handleUpdateModal,
  };
};

export const Level: FC<{
  id: number;
  letters: string[];
  rules: PuzzleRule[];
  words: Discovered;
  bonuses: Discovered;
  hints: Hints;
  tokens: number;
  water: number;
  submitWord: (word: string) => void;
  shuffleLetters: () => void;
  purchasePowerUp: (code: PowerUpCode) => boolean;
}> = ({
  id,
  tokens,
  water,
  rules,
  letters,
  words,
  hints,
  bonuses,
  submitWord,
  shuffleLetters,
  purchasePowerUp,
}) => {
  const { push } = useRouter();
  const { modal, data, setModal } = useModalController();
  const [intersections, setIntersections] = useState<number[]>([]);

  const convertIntersectionsToWord = () => {
    return intersections.map((i) => letters[i]).join('');
  };

  const submitIntersections: PanHandlers['onPanEnd'] = () => {
    if (intersections.length > 0) {
      submitWord(convertIntersectionsToWord());
      setIntersections([]);
    }
  };

  return (
    <>
      <Layout
        header={
          <Header
            id={id}
            rules={rules}
            exitLevel={() => push('/')}
            openHelp={() => setModal('help-center')}
          />
        }
        selection={
          <WordSelection
            bonuses={bonuses}
            words={words}
            letters={intersections}
            anagram={letters}
          />
        }
        footer={
          <Footer
            tokens={tokens}
            water={water}
            words={words}
            bonuses={bonuses}
            shuffleBuilder={() => shuffleLetters()}
            openBonusWords={() => setModal('bonuses')}
            openPowerUps={() => setModal('power-ups')}
            openSubmitReport={() => setModal('report-issue')}
          />
        }
        puzzle={
          <WordPuzzles
            words={words}
            hints={hints}
            onDefine={(word) => setModal('definition', word)}
          />
        }
        builder={
          <WordBuilder
            intersections={intersections}
            anagram={letters}
            onRelease={submitIntersections}
            onIntersect={(key) => {
              if (!intersections.includes(key)) {
                setIntersections((i) => uniqueArray(i.concat(key)));
              }
            }}
          />
        }
      />
      <BonusWords
        onDefine={(word) => setModal('definition', word)}
        open={modal === 'bonuses'}
        onClose={() => setModal()}
        bonuses={bonuses}
      />
      <Dictionary
        open={modal === 'definition'}
        onClose={() => setModal()}
        words={words}
        bonuses={bonuses}
        define={data}
        onReportProblem={(word) => {
          setModal('report-issue', word);
        }}
      />
      <ReportIssue
        data={data}
        open={modal === 'report-issue'}
        onClose={() => setModal()}
      />
      <PowerUps
        tokens={tokens}
        open={modal === 'power-ups'}
        onClose={() => setModal()}
        onPurchase={(code) => {
          if (purchasePowerUp(code)) {
            setModal();
          }
        }}
        onLearnMore={() => setModal('help-center')}
        onInviteFriends={() =>
          alert('TODO: navigate to invite friends modal on main menu')
        }
      />
      <HelpCenter open={modal === 'help-center'} onClose={() => setModal()} />
    </>
  );
};
