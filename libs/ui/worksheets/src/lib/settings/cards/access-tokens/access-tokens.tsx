import {
  Paper,
  Box,
  Typography,
  Divider,
  Link,
  Button,
  Tooltip,
} from '@mui/material';
import { SettingsCardGeneric } from '../generic';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { useState } from 'react';
import { trpc } from '@worksheets/trpc/ide';
import { useUser } from '@worksheets/util/auth/client';
import { CreateTokenForm } from './create-token-form';
import { TokensDataTable } from './data-table';
import { TokenModal } from './token-modal';
import { warn } from '@worksheets/ui/common';

export const SettingsCardAccessTokens: React.FC = () => {
  const { user } = useUser();
  const [newToken, setNewToken] = useState('');
  const [form, setForm] = useState({
    name: '',
    isNew: true,
    expiration: 3,
  });

  const isValid = form.name.length > 0 && form.expiration > 0;

  const utils = trpc.useContext();
  const createToken = trpc.user.tokens.create.useMutation();
  const { data: tokens } = trpc.user.tokens.list.useQuery(
    {},
    {
      enabled: Boolean(user),
    }
  );

  const handleCreateToken = async () => {
    try {
      const result = await createToken.mutateAsync({
        name: form.name,
        expiresInDays: form.expiration,
      });
      utils.user.tokens.list.invalidate();
      setForm({
        name: '',
        isNew: true,
        expiration: 3,
      });
      setNewToken(result);
    } catch (error) {
      warn('failed to create token')(error);
    }
  };

  return (
    <SettingsCardGeneric title={'Tokens'} caption="">
      <Paper variant="outlined">
        <Box display="flex" flexDirection="column" gap={1} sx={{ p: 1 }}>
          <Typography variant="body2" fontWeight={900}>
            Create new token
          </Typography>
        </Box>
        <Divider />
        <Box display="flex" flexDirection="column" gap={1} sx={{ p: 1 }}>
          <Typography variant="caption">
            Tokens provide other applications with access to your account.{' '}
            <strong>You may have up to 3 tokens.</strong>
          </Typography>
          <Typography variant="caption"></Typography>
          <Typography variant="caption">
            <strong>We will never ask for these tokens.</strong> Secure them
            like you would a password.
          </Typography>
        </Box>
        <Divider />
        <Box display="flex" flexDirection="column" gap={1} sx={{ p: 1 }}>
          <CreateTokenForm form={form} setForm={setForm} />
        </Box>
        <Divider />
        <Box display="flex" flexDirection="column" gap={1} sx={{ p: 1 }}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="caption">
              Learn more about{' '}
              <Link href="/pricing" target="_blank">
                access tokens{' '}
                <OpenInNewIcon color="primary" fontSize={'small'} />.
              </Link>
            </Typography>
            <Box display="flex" justifyContent="flex-end">
              <Tooltip
                placement="top"
                title={'Missing required fields.'}
                disableHoverListener={isValid}
              >
                <span>
                  <Button
                    disabled={!isValid}
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={handleCreateToken}
                  >
                    Add new token
                  </Button>
                </span>
              </Tooltip>
            </Box>
          </Box>
        </Box>
      </Paper>
      <br />
      <TokensDataTable tokens={tokens ?? []} />
      <TokenModal
        open={Boolean(newToken)}
        onClose={() => setNewToken('')}
        text={newToken}
      />
    </SettingsCardGeneric>
  );
};
