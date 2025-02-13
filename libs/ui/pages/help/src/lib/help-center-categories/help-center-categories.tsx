import { Box } from '@mui/material';
import {
  ECommerceCustomerService,
  ECommerceGift,
  ECommercePrizes,
} from '@worksheets/icons/ecommerce';
import { LearningCode } from '@worksheets/icons/learning';
import {
  ValentinesMail,
  ValentinesProfile,
  ValentinesWorld,
} from '@worksheets/icons/valentines';
import { WebGamepad, WebQuestion } from '@worksheets/icons/web';
import { routes } from '@worksheets/routes';

import {
  HelpCenterCategory,
  HelpCenterCategoryProps,
} from './help-center-category';

const categories: HelpCenterCategoryProps[] = [
  {
    title: 'Common Questions',
    description: 'Answers to our most frequently asked questions',
    href: routes.help.faq.path(),
    icon: WebQuestion,
  },
  {
    title: 'Accounts & Profiles',
    description: 'Learn about accounts and profile settings',
    href: routes.help.accounts.path(),
    icon: ValentinesProfile,
  },
  {
    title: 'Playing Games',
    href: routes.help.playingGames.path(),
    description: 'Learn how to play games on our arcade',
    icon: WebGamepad,
  },
  {
    title: 'Referrals',
    href: routes.help.referrals.path(),
    description: 'Refer your friends and earn rewards',
    icon: ValentinesWorld,
  },
  {
    title: 'Prizes',
    href: routes.help.prizes.path(),
    description: 'Redeem your tokens for real world prizes',
    icon: ECommercePrizes,
  },
  {
    title: 'Contributions',
    href: routes.help.contributions.path(),
    description: 'Help us build a better world, one game at a time',
    icon: ECommerceGift,
  },
  {
    title: 'Emails',
    href: routes.help.emails.path(),
    description: 'Understand the emails we send you',
    icon: ValentinesMail,
  },
  {
    title: 'Developer',
    href: routes.help.developers.path(),
    description: 'Contribute a game to our arcade',
    icon: LearningCode,
  },
  {
    title: 'Contact Us',
    description: 'Reach out to our support team',
    href: routes.contact.path(),
    icon: ECommerceCustomerService,
  },
];

export const HelpCenterCategories: React.FC = () => {
  return (
    <Box width="90%">
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
          gridTemplateRows: 'auto',
          gridGap: 32,
        }}
      >
        {categories.map((category) => (
          <HelpCenterCategory key={category.title} {...category} />
        ))}
      </Box>
    </Box>
  );
};
