import { AddOutlined, InfoOutlined } from '@mui/icons-material';
import { Box, Button, Divider, TextField, Typography } from '@mui/material';
import { routes } from '@worksheets/routes';
import { Column, Row } from '@worksheets/ui/components/flex';
import { BulletPoints } from '@worksheets/ui/components/lists';
import { PanelFooter } from '@worksheets/ui/components/panels';
import { ReferralsPanels } from '@worksheets/util/enums';
import { Referrer } from '@worksheets/util/types';
import React, { useEffect, useState } from 'react';

export const MyReferrerSection: React.FC<{
  referrer?: Referrer;
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
        <Typography variant="h6">Referrer</Typography>
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
      <Divider />
      <BulletPoints
        icon={<InfoOutlined fontSize="small" color="info" />}
        title="How It Works"
        points={[
          `You can only have one referrer at a time.`,
          `You cannot remove a referrer, only replace them.`,
          `Setting someone as your referrer will give them tokens when you play games.`,
          `Referral new account bonuses only apply when a player creates a new account.`,
        ]}
      />

      <PanelFooter
        learn={{ text: 'Referrals', href: routes.help.referrals.path() }}
        action={{
          text: 'Share your link',
          href: routes.account.referrals.path({
            bookmark: ReferralsPanels.ShareYourLink,
          }),
          color: 'secondary',
        }}
      />
    </Box>
  );
};
