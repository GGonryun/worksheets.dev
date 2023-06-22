import { Box, Button } from '@mui/material';
import { SettingsCardGeneric } from './generic';

export const SettingsCardPayments: React.FC = () => (
  <SettingsCardGeneric
    title={'Payment method'}
    caption={
      'You have not added any cards. Click the button below to add a new payment method.'
    }
  >
    <Box display="flex" justifyContent="flex-end" pt={2}>
      <Button
        variant="contained"
        color="primary"
        size="small"
        onClick={() => alert("TODO: support 'add new card' feature")}
      >
        Add new card
      </Button>
    </Box>
  </SettingsCardGeneric>
);
