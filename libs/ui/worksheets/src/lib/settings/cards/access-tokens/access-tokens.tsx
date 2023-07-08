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
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { SERVER_SETTINGS } from '@worksheets/data-access/server-settings';
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

  const { data: limit } = trpc.user.tokens.limit.useQuery(undefined, {
    enabled: Boolean(user),
  });

  const hasExceededMax = (tokens?.length ?? 0) >= (limit ?? 0);

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
            Tokens provide other applications with access to your account. We
            will never ask for these tokens. Secure them as you would a
            password.{' '}
            <strong>
              You are authorized to create up to ({limit}) tokens.
            </strong>{' '}
            View your billing page{' '}
            <Link href="/settings/billing">for more information</Link>.
          </Typography>
        </Box>
        <Divider />
        <Box display="flex" flexDirection="column" gap={2} sx={{ p: 2 }}>
          {hasExceededMax && (
            <Typography variant="caption" color="text.secondary">
              You have exceeded your maximum number of tokens.
            </Typography>
          )}
          <CreateTokenForm
            form={form}
            setForm={setForm}
            disabled={hasExceededMax}
          />
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
              <Link
                href={SERVER_SETTINGS.WEBSITES.DOCS_URL(
                  '/docs/api/overview#api-tokens'
                )}
                target="_blank"
              >
                access tokens{' '}
                <OpenInNewIcon color="primary" fontSize={'inherit'} />.
              </Link>
            </Typography>
            <Box display="flex" justifyContent="flex-end">
              <Box display="flex" alignItems="center" gap={2}>
                {hasExceededMax && (
                  <Tooltip
                    title="Delete a token before adding a new one or contact customer support to increase your quotas."
                    placement="top"
                  >
                    <InfoOutlinedIcon color="primary" />
                  </Tooltip>
                )}
                <Tooltip
                  placement="top"
                  title={
                    isValid
                      ? 'Missing required fields.'
                      : hasExceededMax
                      ? 'You have exceeded the maximum number of tokens.'
                      : ''
                  }
                  disableHoverListener={isValid && !hasExceededMax}
                >
                  <span>
                    <Button
                      disabled={!isValid || hasExceededMax}
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
