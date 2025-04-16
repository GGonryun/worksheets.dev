import Link from 'next/link';
import { Button } from '../ui';
import { PlusIcon } from 'lucide-react';
import { devRoutes } from '@worksheets/routes';

export const GameDashboardHeading = () => {
  return (
    <div className="pb-4">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold">Game Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Manage your game submissions and track performance
          </p>
        </div>
        <Button asChild variant="default">
          <Link href={devRoutes.dashboard.games.new.path()}>
            <PlusIcon />
            Add New Game
          </Link>
        </Button>
      </div>
    </div>
  );
};
