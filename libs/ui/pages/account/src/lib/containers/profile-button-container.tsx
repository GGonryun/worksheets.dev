import { PermIdentityOutlined } from '@mui/icons-material';
import { Button } from '@mui/material';
import { routes } from '@worksheets/routes';
import { trpc } from '@worksheets/trpc-charity';
import { PulsingLogo } from '@worksheets/ui/components/loading';
import { useSession } from 'next-auth/react';

export const ProfileButtonContainer = () => {
  const session = useSession();
  const user = trpc.user.get.useQuery(undefined, {
    enabled: session.status === 'authenticated',
  });
  if (user.isLoading || user.isError) return <PulsingLogo hideMessage />;

  return (
    <Button
      size="small"
      variant="arcade"
      color="secondary"
      startIcon={<PermIdentityOutlined />}
      href={routes.user.path({
        params: {
          userId: user.data?.id,
        },
      })}
    >
      Profile
    </Button>
  );
};
