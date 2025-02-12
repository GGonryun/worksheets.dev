import { Typography } from '@mui/material';

export const IntegrationDisclaimer: React.FC<{ provider: string }> = ({
  provider,
}) => (
  <Typography
    variant="body2"
    fontWeight={500}
    color="text.secondary"
    fontStyle={'italic'}
  >
    <u>Disclaimer:</u> {provider} tasks use manual verification. Please complete
    all tasks honestly, if you are caught cheating the system, your account will
    be banned and all rewards will be forfeited.
  </Typography>
);
