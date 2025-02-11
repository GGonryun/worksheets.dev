import { InfoOutlined } from '@mui/icons-material';
import { Link, Typography } from '@mui/material';
import { contestsRoutes, helpRoutes, portalRoutes } from '@worksheets/routes';
import { Column } from '@worksheets/ui/components/flex';
import { BulletPoints } from '@worksheets/ui/components/lists';
import { PanelFooter } from '@worksheets/ui/components/panels';
import { SettingsPanels } from '@worksheets/util/enums';
import { ActivationCodeDetailSchema } from '@worksheets/util/types';
import React from 'react';

import { ActivationCodesTable } from './activation-code-table';

export const ActivationCodesSection: React.FC<{
  codes: ActivationCodeDetailSchema[];
}> = ({ codes }) => {
  return (
    <Column gap={2}>
      <Typography variant="h6">My Activation Codes</Typography>

      <ActivationCodesTable codes={codes} />

      <BulletPoints
        icon={<InfoOutlined fontSize="small" color="info" />}
        title={'How It Works'}
        points={[
          <>
            Participate in{' '}
            <Link href={contestsRoutes.raffles.url()}>raffles</Link> to win
            prizes. No purchase necessary.
          </>,
          "Some items expire if you don't claim them in time.",
          <>
            Configure your{' '}
            <Link
              href={portalRoutes.account.url({
                bookmark: SettingsPanels.Communication,
              })}
            >
              notification settings
            </Link>{' '}
            to receive reminders about your prizes.
          </>,
        ]}
      />

      <PanelFooter
        learn={{
          text: 'Prizes',
          href: helpRoutes.prizes.path(),
        }}
      />
    </Column>
  );
};
