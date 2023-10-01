import { FC, useState } from 'react';
import { Header } from './Header';
import { EnterDirectionally } from '../Animators';
import { Logo } from './Logo';
import { Footer } from './Footer';
import { Producer } from './Producer';
import { Title } from './Title';
import { StartPuzzle } from './StartPuzzle';
import { LinedPaperLayout } from '../Layouts';
import { PlayerPoints, WaterDonated } from './PlayerStatistics';
import { Flex } from '@worksheets/ui-core';
import { MissionStatementModal } from './MissionStatementModal';
import { DonateWaterModal } from './DonateWaterModal';
import { SettingsModal } from './SettingsModal';
import { usePlayer } from '../../hooks';

export const MainMenu: FC = () => {
  const [showMissionStatement, setShowMissionStatement] = useState(false);
  const [showDonateWater, setShowDonateWater] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const { water, points, level, reset, loadPuzzle } = usePlayer();

  return (
    <>
      <LinedPaperLayout>
        <EnterDirectionally y={-50} delay={0}>
          <Header
            onDonateWater={() => setShowDonateWater(true)}
            onSettings={() => setShowSettings(true)}
          />
        </EnterDirectionally>
        <EnterDirectionally y={-100} delay={0.5}>
          <Title />
        </EnterDirectionally>
        <EnterDirectionally y={-150} delay={0.75}>
          <Producer />
        </EnterDirectionally>
        <EnterDirectionally y={-200} delay={1}>
          <Logo />
        </EnterDirectionally>
        <EnterDirectionally y={200} delay={0.25}>
          <StartPuzzle level={level} />
        </EnterDirectionally>
        <Flex column centered fullWidth pt={3} gap={1}>
          <EnterDirectionally y={150} delay={0.5}>
            <PlayerPoints points={points} />
          </EnterDirectionally>
          <EnterDirectionally y={100} delay={0.75}>
            <WaterDonated water={water} />
          </EnterDirectionally>
        </Flex>

        <Footer onShowMissionStatement={() => setShowMissionStatement(true)} />
      </LinedPaperLayout>
      <MissionStatementModal
        open={showMissionStatement}
        onClose={() => setShowMissionStatement(false)}
      />
      <DonateWaterModal
        open={showDonateWater}
        onClose={() => setShowDonateWater(false)}
      />
      <SettingsModal
        onLoad={(puzzleId) => {
          loadPuzzle(puzzleId);
          setShowSettings(false);
        }}
        onReset={() => {
          reset();
          setShowSettings(false);
        }}
        open={showSettings}
        onClose={() => setShowSettings(false)}
      />
    </>
  );
};
