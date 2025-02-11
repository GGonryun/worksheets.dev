'use client';

import { Box, Link, Typography } from '@mui/material';
import { helpRoutes, portalRoutes } from '@worksheets/routes';
import { Column } from '@worksheets/ui/components/flex';
import { ResponsiveImage } from '@worksheets/ui/components/images';
import { HelpIntegrationsQuestions } from '@worksheets/util/enums';
import { QuestionAnswer } from '@worksheets/util/types';

export const helpIntegrations: QuestionAnswer[] = [
  {
    id: HelpIntegrationsQuestions.Description,
    question: 'What are integrations?',
    summary: `Integrations are connections between Charity.Games and other services. You can connect your Charity.Games account to other apps and services to earn tokens, rewards, and prizes.`,
    answer: (
      <Column>
        <Typography>
          Integrations are connections between Charity.Games and other services.
          You can connect your Charity.Games account to other apps and services
          to earn tokens, rewards, and prizes.
          <br />
          <br />
          We'll never share your data with third parties or trusted partners
          without your permission. You can revoke access to any integration at
          any time.
          <br />
          <br />
          We currently support the following integrations:
        </Typography>
        <ul>
          <li>Steam</li>
          <li>Discord</li>
          <li>X (Twitter)</li>
          <li>Twitch TV</li>
        </ul>
      </Column>
    ),
  },
  {
    id: HelpIntegrationsQuestions.Steam,
    question: 'How do I connect my Steam account?',
    summary: 'Connect your Steam account to Charity.Games to earn tokens.',
    answer: (
      <Column>
        <Typography>
          To connect your Steam account, visit the{' '}
          <Link href={portalRoutes.account.integrations.url()}>
            Integrations page in your account settings
          </Link>
          . Click the "Connect" button next to the Steam logo. You will be
          redirected to a special page on Charity Games that will ask you to add
          your Steam account id and make your profile public. Once you complete
          the process, you will be redirected back to Charity Games and your
          account will be connected.
          <br />
          <br />
          If you are having difficulty connecting your Steam account, follow the
          instructions below or{' '}
          <Link href={helpRoutes.contact.url()}>contact us</Link> for help.
        </Typography>
        <br />
        <Typography variant="h5" gutterBottom>
          Finding your Steam ID
        </Typography>

        <Box>
          To find your Steam ID, follow these steps:
          <ol>
            <li>
              Visit the steam website and log into your account:{' '}
              <Link href="https://store.steampowered.com/login/">
                https://store.steampowered.com/login/
              </Link>
            </li>
            <Box position="relative" maxWidth="500px">
              <ResponsiveImage
                src="/help/integrations/steam/tutorial-0.png"
                alt={'Steam login page'}
              />
            </Box>
            <li>
              Go to your account details page by visiting the following URL:{' '}
              <Link href="https://store.steampowered.com/account/">
                https://store.steampowered.com/account/
              </Link>
            </li>
            <Box position="relative" maxWidth="500px">
              <ResponsiveImage
                src="/help/integrations/steam/tutorial-1.png"
                alt={'Steam account details page'}
              />
            </Box>
            <li>
              Your Steam ID will be displayed on the page under your user name.
              Your Steam ID is a 17-digit number.
            </li>
          </ol>
        </Box>
        <br />
        <Typography variant="h5" gutterBottom>
          Making your profile public
        </Typography>

        <Box>
          In order for Charity Games to verify actions you take on Steam, you
          will need to make your profile public. To do this, follow these steps:
          <ol>
            <li>
              Visit the steam website and log into your account:{' '}
              <Link href="https://store.steampowered.com/login/">
                https://store.steampowered.com/login/
              </Link>
            </li>
            <Box position="relative" maxWidth="500px">
              <ResponsiveImage
                src="/help/integrations/steam/tutorial-0.png"
                alt={'Steam login page'}
              />
            </Box>
            <li>Navigate to your profile.</li>
            <Box position="relative" maxWidth="500px">
              <ResponsiveImage
                src="/help/integrations/steam/tutorial-2.png"
                alt={'Steam home page'}
              />
            </Box>
            <li>Click on the edit profile button.</li>
            <Box position="relative" maxWidth="500px">
              <ResponsiveImage
                src="/help/integrations/steam/tutorial-3.png"
                alt={'Steam profile'}
              />
            </Box>
            <li>Navigate to your privacy settings.</li>
            <Box position="relative" maxWidth="500px">
              <ResponsiveImage
                src="/help/integrations/steam/tutorial-4.png"
                alt={'Steam navigation bar'}
              />
            </Box>
            <li>
              Change your "Game Details" to <u>public</u>
            </li>
            <Box position="relative" maxWidth="400px">
              <ResponsiveImage
                src="/help/integrations/steam/tutorial-5.png"
                alt={'Steam privacy settings'}
              />
            </Box>
          </ol>
        </Box>
      </Column>
    ),
  },
];
