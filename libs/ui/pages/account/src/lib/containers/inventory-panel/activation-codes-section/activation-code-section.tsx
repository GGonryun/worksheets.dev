import { InfoOutlined } from '@mui/icons-material';
import { Link, Typography } from '@mui/material';
import { routes } from '@worksheets/routes';
import { Column } from '@worksheets/ui/components/flex';
import { BulletPoints } from '@worksheets/ui/components/lists';
import { PanelFooter } from '@worksheets/ui/components/panels';
import { HelpTokensQuestions, SettingsPanels } from '@worksheets/util/enums';
import { ActivationCodeDetails } from '@worksheets/util/types';
import React from 'react';

import { ActivationCodesTable } from './activation-code-table';

export const ActivationCodesSection: React.FC<{
  codes: ActivationCodeDetails[];
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
            <Link
              href={routes.help.tokens.path({
                bookmark: HelpTokensQuestions.HowToEarn,
              })}
            >
              Play games, refer friends, and complete quests.
            </Link>{' '}
            to earn tokens.
          </>,
          <>
            Compete in <Link href={routes.raffles.path()}>raffles</Link> to win
            prizes. New winners are chosen every day.
          </>,
          "Some items will expire if you don't claim them in time.",
          <>
            Configure your{' '}
            <Link
              href={routes.account.path({
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
          href: routes.help.prizes.path(),
        }}
        action={{
          text: 'Redeem Tokens',
          href: routes.raffles.path(),
          color: 'primary',
        }}
      />
    </Column>
  );
};
