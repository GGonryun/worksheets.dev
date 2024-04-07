import { Divider, Link } from '@mui/material';
import { routes } from '@worksheets/routes';
import { LoadingScreen } from '@worksheets/ui/pages/loading';
import dynamic from 'next/dynamic';

import { CustomContainer } from '../../shared/custom-container';
import { CustomPaper } from '../../shared/custom-paper';

const AdminScreenContainer = () => {
  return (
    <CustomContainer>
      <CustomPaper title="Admin Directory">
        <Spacer />

        <Link href={routes.admin.users.path()} color="inherit">
          View all users
        </Link>

        <Spacer />

        <Link href={routes.admin.games.path()} color="inherit">
          View all games
        </Link>
        <Link href={routes.admin.reports.path()} color="inherit">
          View all game reports
        </Link>
        <Link href={routes.admin.submissions.path()} color="inherit">
          View all game submissions
        </Link>
        <Spacer />

        <Link href={routes.admin.prizes.path()} color="inherit">
          View all prizes
        </Link>
        <Link href={routes.admin.raffles.path()} color="inherit">
          View all raffles
        </Link>
        <Link href={routes.admin.winners.path()} color="inherit">
          View all winners
        </Link>
        <Link href={routes.admin.codes.path()} color="inherit">
          View all activation codes
        </Link>
      </CustomPaper>
    </CustomContainer>
  );
};

const Spacer = () => (
  <Divider
    sx={{
      backgroundColor: 'text.arcade',
      my: 2,
    }}
  />
);

export const DynamicAdminScreen = dynamic(
  () => Promise.resolve(AdminScreenContainer),
  {
    ssr: false,
    loading: () => <LoadingScreen />,
  }
);
