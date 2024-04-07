import { Button, Typography } from '@mui/material';
import { Column } from '@worksheets/ui/components/flex';
import { Construction } from '@worksheets/ui/pages/under-construction';
import { useState } from 'react';
import ConfettiExplosion from 'react-confetti-explosion';

export const IntegrationsPanelContainer: React.FC = () => {
  const [isExploding, setIsExploding] = useState(false);

  return (
    <Column gap={1}>
      <Typography variant="h4">Integrations</Typography>
      <Construction
        sx={{
          height: 128,
          width: 128,
        }}
      />
      <Typography variant="body1">
        This page is currently under construction.
        <br />
        Click the button below to let us know you want to see this page built!
      </Typography>
      <Button
        variant="arcade"
        color="primary"
        sx={{ width: 'fit-content' }}
        onClick={() => setIsExploding(true)}
      >
        Click Me!
      </Button>
      {isExploding && (
        <ConfettiExplosion
          style={{
            // put in center
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
          onComplete={() => {
            setIsExploding(false);
          }}
        />
      )}
    </Column>
  );
};
