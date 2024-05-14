import { HelpOutline, OpenInNew, SaveOutlined } from '@mui/icons-material';
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { IntegrationProvider } from '@prisma/client';
import { routes } from '@worksheets/routes';
import { trpc } from '@worksheets/trpc-charity';
import { Column } from '@worksheets/ui/components/flex';
import { IntegrationLogo } from '@worksheets/ui/components/integrations';
import { CloseButton } from '@worksheets/ui/components/modals';
import { useSnackbar } from '@worksheets/ui/components/snackbar';
import { ErrorScreen } from '@worksheets/ui/pages/errors';
import { LoadingScreen } from '@worksheets/ui/pages/loading';
import { HelpIntegrationsQuestions } from '@worksheets/util/enums';
import { capitalizeFirstLetter } from '@worksheets/util/strings';
import { parseTRPCClientErrorMessage } from '@worksheets/util/trpc';
import dynamic from 'next/dynamic';
import React from 'react';

const ConnectionScreen: React.FC<{
  providerId: IntegrationProvider;
  integrationId: string | undefined;
}> = ({ providerId, integrationId }) => {
  // TODO: support other API KEY providers.
  if (providerId !== IntegrationProvider.STEAM) {
    return (
      <ErrorScreen
        message={`${capitalizeFirstLetter(
          providerId.toLowerCase()
        )} provider is not supported.`}
      />
    );
  }

  if (!integrationId)
    return (
      <ErrorScreen
        message={'Invalid state parameter received. Cannot secure integration.'}
      />
    );

  return <SteamConnectionScreen integrationId={integrationId} />;
};
// steam id regex pattern
const steamIdRegex = new RegExp(/^[0-9]{17}$/);

const SteamConnectionScreen: React.FC<{ integrationId: string }> = ({
  integrationId,
}) => {
  const snackbar = useSnackbar();
  const [steamID, setSteamID] = React.useState<string>('');
  const [error, setError] = React.useState<string>('');
  const secure = trpc.user.integrations.apiKey.secure.useMutation();

  const isInvalidSteamID = steamID.length > 0 && !steamIdRegex.test(steamID);

  const handleSetSteamID = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSteamID(event.target.value);
    setError('');
  };

  const handleSubmit = async () => {
    try {
      await secure.mutateAsync({
        apiKey: steamID,
        integrationId,
      });
      window.close();
    } catch (error) {
      const parsed = parseTRPCClientErrorMessage(error);
      snackbar.error(parsed);
      setError(parsed);
    }
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        display: 'grid',
        placeItems: 'center',
        height: '100vh',
        p: 2,
      }}
    >
      <Paper
        elevation={10}
        sx={{
          m: 2,
          p: 2,
          maxHeight: '100%',
          maxWidth: 400,
          overflow: 'auto',
          position: 'relative',
        }}
      >
        <CloseButton
          onClick={() => {
            window.close();
          }}
        />
        <Column gap={1}>
          <Column gap={1}>
            <IntegrationLogo provider={IntegrationProvider.STEAM} />
            <Typography typography={'h4'} gutterBottom>
              Connect Your Steam Account
            </Typography>
          </Column>
          <Column textAlign="left">
            <Typography variant="body2" fontWeight={700}>
              Steam ID
            </Typography>
            <TextField
              disabled={secure.isLoading}
              value={steamID}
              onChange={handleSetSteamID}
              size="small"
              variant="outlined"
              fullWidth
              placeholder="Enter your Steam ID"
            />
            <Typography
              variant="body3"
              fontWeight={500}
              color={
                Boolean(error) || isInvalidSteamID
                  ? 'error.main'
                  : 'text.secondary'
              }
              mt={0.5}
            >
              {error
                ? error
                : isInvalidSteamID
                ? 'Steam ID should be a 17 digit number'
                : 'Your Steam ID is a unique identifier that allows us to access your Steam account.'}
            </Typography>
          </Column>
          <Box alignSelf="flex-start">
            <Button
              variant="text"
              startIcon={<OpenInNew />}
              size="small"
              href={routes.help.integrations.path({
                bookmark: HelpIntegrationsQuestions.Steam,
              })}
            >
              How do connect my Steam account?
            </Button>
          </Box>
          <Column gap={1}>
            <Button
              disabled={
                isInvalidSteamID || secure.isLoading || steamID.length === 0
              }
              variant="arcade"
              color="primary"
              size="small"
              startIcon={<SaveOutlined />}
              onClick={handleSubmit}
            >
              Save
            </Button>
            <Box alignSelf={'flex-end'}>
              <Button
                variant={error ? 'arcade' : 'text'}
                color={error ? 'secondary' : 'primary'}
                size="small"
                href={routes.contact.url()}
                startIcon={<HelpOutline />}
              >
                Contact Support
              </Button>
            </Box>
          </Column>
        </Column>
      </Paper>
    </Container>
  );
};

export const DynamicConnectionScreen = dynamic(
  () => Promise.resolve(ConnectionScreen),
  { ssr: false, loading: () => <LoadingScreen /> }
);
