import { trpc } from '@worksheets/trpc-charity';
import { ErrorScreen } from '../errors';
import { Skeleton } from '../ui/skeleton';
import { TeamSettingsContent } from './team-settings-content';

export const TeamSettings: React.FC<{
  activeTab: 'sensitive' | 'profile' | 'social';
}> = ({ activeTab }) => {
  const team = trpc.user.teams.selected.useQuery();

  if (team.isPending) {
    return <TeamSettingsSkeleton />;
  }

  if (team.isError) {
    return <ErrorScreen message={team.error?.message} />;
  }

  return <TeamSettingsContent activeTab={activeTab} team={team.data} />;
};

const TeamSettingsSkeleton: React.FC = () => {
  return (
    <div className="container py-2 space-y-6">
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-96 w-full" />
      <Skeleton className="h-96 w-full" />
    </div>
  );
};
