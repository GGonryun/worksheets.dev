import { Layout } from '../Layout';
import { useState } from 'react';
import { Content } from './Content';
import { useRouter } from 'next/router';
import { Difficulty, GeneratedPuzzle, generatePuzzle, urls } from '../../util';
import {
  DefinitionModal,
  PuzzleHeader,
  PuzzleMenu,
  ReportBugModal,
} from '@worksheets/ui-games';
import { HowToPlayModal, ProgressModal } from '../Modals';
import { usePlayer } from '../../hooks/usePlayer';
import {
  BookOutlined,
  HelpCenterOutlined,
  Replay,
  ReportOutlined,
} from '@mui/icons-material';

export const Puzzle = () => {
  const player = usePlayer();
  const { push, query } = useRouter();
  const difficulty = (query.difficulty as Difficulty) ?? 'easy';
  const [showReportModal, setShowReportModal] = useState(false);
  const [showProgressModal, setShowProgressModal] = useState(false);
  const [showHowToPlayModal, setShowHowToPlayModal] = useState(false);
  const [define, setDefine] = useState('');

  const [menuAnchor, setMenuAnchor] = useState<Element | undefined>(undefined);
  const [puzzle, setPuzzle] = useState<GeneratedPuzzle>({
    grid: [],
    target: '',
  });

  const refreshPuzzle = () => {
    const puzzle = generatePuzzle(difficulty);
    setPuzzle(puzzle);
  };

  return (
    <>
      <Layout
        content={
          <Content
            words={player.words}
            onWordBagClick={() => setShowProgressModal(true)}
            puzzle={puzzle}
            refreshPuzzle={refreshPuzzle}
            saveWord={player.saveWord}
          />
        }
        header={
          <PuzzleHeader
            onBack={() => push(urls.home())}
            onMenu={(e) => setMenuAnchor(e.currentTarget)}
          />
        }
      />
      <PuzzleMenu
        anchor={menuAnchor}
        onClose={() => setMenuAnchor(undefined)}
        autoclose
        options={[
          {
            label: 'New Puzzle',
            icon: Replay,
            onClick: () => refreshPuzzle(),
          },
          {
            label: 'View Progress',
            icon: BookOutlined,
            onClick: () => setShowProgressModal(true),
          },
          {
            label: 'Report Issue',
            icon: ReportOutlined,
            onClick: () => setShowReportModal(true),
          },
          {
            label: 'How to Play',
            icon: HelpCenterOutlined,
            onClick: () => setShowHowToPlayModal(true),
          },
        ]}
      />
      <ReportBugModal
        open={showReportModal}
        onClose={() => setShowReportModal(false)}
      />
      <ProgressModal
        open={showProgressModal}
        onClose={() => setShowProgressModal(false)}
        onDefine={(word) => setDefine(word)}
        discoveries={player.words}
      />
      <DefinitionModal
        word={define}
        onClose={() => setDefine('')}
        onReportProblem={() => setShowReportModal(true)}
      />
      <HowToPlayModal
        open={player.isNew || showHowToPlayModal}
        onClose={() => {
          player.setIsNew(false);
          setShowHowToPlayModal(false);
        }}
      />
    </>
  );
};
