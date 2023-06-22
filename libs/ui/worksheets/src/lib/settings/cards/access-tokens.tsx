import { Paper, Box, Typography, Divider, Link, Button } from '@mui/material';
import { SettingsCardGeneric } from './generic';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

export const SettingsCardAccessTokens: React.FC = () => (
  <SettingsCardGeneric
    title={'Tokens'}
    caption="These tokens provide other applications with access to your account. We will never ask for tokens to your account. Secure them as you would secure your password."
  >
    <Paper variant="outlined" sx={{ mt: 1, p: 1 }}>
      <Box display="flex" flexDirection="column" gap={1}>
        <Typography variant="body2" fontWeight={900}>
          Create new token
        </Typography>
        <Divider />
        <Typography variant="caption">
          Please provide a distinct name for your token.
        </Typography>
        <Divider />
        <Box> TODO: Create token builder</Box>
        <Divider />
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="caption">
            Learn more about{' '}
            <Link href="/pricing" target="_blank">
              access tokens <OpenInNewIcon color="primary" fontSize={'small'} />
              .
            </Link>
          </Typography>
          <Box display="flex" justifyContent="flex-end">
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={() => alert("TODO: support 'add new token' feature")}
            >
              Add new token
            </Button>
          </Box>
        </Box>
      </Box>
    </Paper>
  </SettingsCardGeneric>
);
