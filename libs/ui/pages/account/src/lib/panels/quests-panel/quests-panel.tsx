import { ValentinesTicket } from '@worksheets/icons/valentines';
import { routes } from '@worksheets/routes';
import { Panel } from '@worksheets/ui/components/panels';
import { FC, ReactNode } from 'react';

// Load the quests dynamically. First make a request to the server to get the quest board.
// And then make a bunch of independent requests to compose the details and user's progress for each quest.

export const QuestsPanel: FC<{ tokens: number; children: ReactNode }> = ({
  tokens,
  children,
}) => {
  return (
    <Panel
      header={{
        primary: 'Quests',
        secondary: `${tokens} tokens`,
        icon: <ValentinesTicket fontSize="large" />,
      }}
      footer={{
        learn: {
          href: routes.help.prizes.path(),
          text: 'Quests',
        },
        action: {
          text: 'Redeem Tokens',
          href: routes.help.prizes.path(),
        },
      }}
      sections={() => children}
    />
  );
};
