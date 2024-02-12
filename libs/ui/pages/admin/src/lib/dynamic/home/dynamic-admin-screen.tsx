import { Divider, Link } from '@mui/material';
import { LoadingScreen } from '@worksheets/ui/pages/loading';
import dynamic from 'next/dynamic';

import { CustomContainer } from '../../shared/custom-container';
import { CustomPaper } from '../../shared/custom-paper';

const AdminScreenContainer = () => {
  return (
    <CustomContainer>
      <CustomPaper title="Admin Directory">
        <Spacer />

        <Link href="/admin/users" color="inherit">
          View all users
        </Link>

        <Spacer />

        <Link href="/admin/games" color="inherit">
          View all games
        </Link>
        <Link href="/admin/reports" color="inherit">
          View all game reports
        </Link>
        <Link href="/admin/submissions" color="inherit">
          View all game submissions
        </Link>
        <Spacer />

        <Link href="/admin/prizes" color="inherit">
          View all prizes
        </Link>
        <Link href="/admin/raffles" color="inherit">
          View all raffles
        </Link>
        <Link href="/admin/winners" color="inherit">
          View all winners
        </Link>
        <Link href="/admin/codes" color="inherit">
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
