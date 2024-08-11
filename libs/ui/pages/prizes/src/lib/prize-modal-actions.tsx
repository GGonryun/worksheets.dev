import { Cancel, LockOpen, Login } from '@mui/icons-material';
import { Button } from '@mui/material';
import { routes } from '@worksheets/routes';
import { Row } from '@worksheets/ui/components/flex';

export const PrizeModalActions: React.FC<{
  authenticated: boolean;
  onClose: () => void;
  onUnlock: () => void;
}> = ({ authenticated, onClose, onUnlock }) => {
  return (
    <Row gap={2} flexWrap={{ xs: 'wrap', sm: 'nowrap' }}>
      {authenticated ? (
        <>
          <Button
            variant="arcade"
            color="error"
            startIcon={<Cancel />}
            fullWidth
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            variant="arcade"
            color="success"
            startIcon={<LockOpen />}
            fullWidth
            onClick={onUnlock}
          >
            Unlock Prize
          </Button>
        </>
      ) : (
        <Button
          variant="arcade"
          color="warning"
          startIcon={<Login />}
          fullWidth
          href={routes.login.path({
            query: {
              redirect: routes.prizes.path(),
            },
          })}
        >
          Login to Continue
        </Button>
      )}
    </Row>
  );
};
