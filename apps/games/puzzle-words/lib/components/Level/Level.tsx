import { FC, ReactNode, useState } from 'react';
import { WordBuilder } from '../WordBuilder';
import { WordSelection } from '../WordSelection';
import { PanHandlers } from 'framer-motion';
import { uniqueArray } from '@worksheets/util/arrays';
import { Header } from './Header';
import { Footer } from './Footer';
import { WordPuzzles } from '../WordPuzzles';
import { PowerUpCode, Discovered, Hints } from '../../types';
import { BonusWords } from '../BonusWords';
import { PowerUps } from '../PowerUps';
import { HelpCenter } from '../HelpCenter';
import { useRouter } from 'next/router';
import { PuzzleRule } from '../../puzzles';
import { DefinitionModal, ReportBugModal } from '@worksheets/ui-games';
import { Box } from '@mui/material';
import { Flex } from '@worksheets/ui-core';
import { Layout } from '../Layout';

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

export type LayoutProps = {
  selection: ReactNode;
  builder: ReactNode;
  puzzle: ReactNode;
  footer: ReactNode;
};

export const PuzzleLayout: FC<LayoutProps> = (props) => {
  const { puzzle, selection, builder, footer } = props;

  return (
    <Box
      sx={{
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      <Flex grow centered>
        {puzzle}
      </Flex>
      <Flex pt="54px" position="relative" pb={2}>
        <Flex centered fullWidth top={0} position="absolute">
          {selection}
        </Flex>
        <Flex fullWidth centered position="relative">
          {builder}
          <Flex position="absolute" fill>
            {footer}
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
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
        content={
          <PuzzleLayout
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
        }
      />

      <BonusWords
        onDefine={(word) => setModal('definition', word)}
        open={modal === 'bonuses'}
        onClose={() => setModal()}
        bonuses={bonuses}
      />
      <DefinitionModal
        onClose={() => setModal()}
        word={modal === 'definition' ? data : ''}
        onReportProblem={() => {
          setModal('report-issue', data);
        }}
      />
      <ReportBugModal
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
      />
      <HelpCenter open={modal === 'help-center'} onClose={() => setModal()} />
    </>
  );
};
