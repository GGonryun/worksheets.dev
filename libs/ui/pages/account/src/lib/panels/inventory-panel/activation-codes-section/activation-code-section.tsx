import { InfoOutlined, KeyOutlined } from '@mui/icons-material';
import { Link, Typography } from '@mui/material';
import { Key } from '@worksheets/icons/hotel';
import { routes } from '@worksheets/routes';
import { Column } from '@worksheets/ui/components/flex';
import { BulletPoints } from '@worksheets/ui/components/lists';
import { PanelFooter } from '@worksheets/ui/components/panels';
import { SettingsPanels } from '@worksheets/util/enums';
import { ActivationCodeDetailSchema } from '@worksheets/util/types';
import React from 'react';

import { CollapsibleSection } from '../../../components';
import { ActivationCodesTable } from './activation-code-table';

export const ActivationCodesSection: React.FC<{
  codes: ActivationCodeDetailSchema[];
  active: SettingsPanels | undefined;
  onClick: (id: string) => void;
}> = ({ codes, active, onClick }) => {
  return (
    <CollapsibleSection
      text="Activation Codes"
      description="See a history of all your claimed activation codes, and their status."
      id={SettingsPanels.ActivationCodes}
      active={active}
      onClick={onClick}
      status={<KeyOutlined fontSize="large" color="info" />}
      Icon={Key}
    >
      <Column gap={2}>
        <Typography variant="h6">My Activation Codes</Typography>

        <ActivationCodesTable codes={codes} />

        <BulletPoints
          icon={<InfoOutlined fontSize="small" color="info" />}
          title={'How It Works'}
          points={[
            <>
              Compete in <Link href={routes.raffles.path()}>raffles</Link> to
              win prizes. New winners are chosen every day.
            </>,
            "Some items will expire if you don't claim them in time.",
            <>
              Configure your{' '}
              <Link href={routes.account.path({})}>notification settings</Link>{' '}
              to receive reminders about your prizes.
            </>,
          ]}
        />

        <PanelFooter
          learn={{
            text: 'Prizes',
            href: routes.help.prizes.path(),
          }}
          action={{
            text: 'Redeem Tokens',
            href: routes.raffles.path(),
            color: 'primary',
          }}
        />
      </Column>
    </CollapsibleSection>
  );
};
