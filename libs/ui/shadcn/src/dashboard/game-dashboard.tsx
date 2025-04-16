import { GameDashboardHeading } from './game-dashboard-heading';
import { GameDashboardLayout } from './game-dashboard-layout';
import { GameList } from './game-list';
import { GameStats } from './game-stats';

export const GameDashboard: React.FC = () => {
  return (
    <GameDashboardLayout>
      <GameDashboardHeading />
      <GameStats />
      <GameList />
    </GameDashboardLayout>
  );
};
