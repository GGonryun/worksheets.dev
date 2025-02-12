import { AddOutlined } from '@mui/icons-material';
import { Box, Button, TextField, Typography } from '@mui/material';
import { Column, Row } from '@worksheets/ui/components/flex';
import { Referrer } from '@worksheets/util/types';
import React, { useEffect, useState } from 'react';

export const MyReferrerSection: React.FC<{
  referrer: Referrer | null;
  onAdd: (code: string) => void;
}> = ({ referrer, onAdd }) => {
  const [referralCode, setReferralCode] = useState<string>('');

  useEffect(() => {
    if (referrer) {
      setReferralCode(referrer.code);
    }
  }, [referrer]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <Column gap={2}>
        <Typography variant="h6">My Referrer</Typography>
        <TextField
          placeholder="referral-code"
          value={referralCode}
          size="small"
          onChange={(e) => setReferralCode(e.target.value)}
          helperText={
            referrer ? (
              <Typography variant="caption">
                <b>{referrer.username}</b> has been set as your referrer.
              </Typography>
            ) : (
              'Enter a users referral link or friend code.'
            )
          }
        />
        <Row gap={2} justifyContent="space-between">
          <Button
            variant="arcade"
            color="primary"
            size="small"
            onClick={() => onAdd(referralCode)}
            sx={{ width: 'fit-content' }}
            startIcon={<AddOutlined />}
          >
            Set Referrer
          </Button>
        </Row>
      </Column>
    </Box>
  );
};
