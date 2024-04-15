import { Box } from '@mui/material';
import {
  ECommerceCustomerService,
  ECommerceGift,
  ECommercePrizes,
  ECommerceQuality,
} from '@worksheets/icons/ecommerce';
import { LearningCode } from '@worksheets/icons/learning';
import {
  ValentinesCalendar,
  ValentinesLock,
  ValentinesMail,
  ValentinesPhones,
  ValentinesPotion,
  ValentinesTicket,
  ValentinesWorld,
} from '@worksheets/icons/valentines';
import { WebGamepad, WebHeart, WebQuestion } from '@worksheets/icons/web';
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
    icon: ValentinesLock,
  },
  {
    title: 'Notifications',
    href: routes.help.notifications.path(),
    description: 'Get notified about new games and rewards',
    icon: ValentinesPhones,
  },
  {
    title: 'Playing Games',
    href: routes.help.playingGames.path(),
    description: 'Learn how to play games on our arcade',
    icon: WebGamepad,
  },
  {
    title: 'Tokens',
    href: routes.help.tokens.path(),
    description: 'Play games at our arcade and win real world prizes',
    icon: ValentinesTicket,
  },
  {
    title: 'Quests',
    href: routes.help.quests.path(),
    description: 'Complete challenges to earn tokens',
    icon: ValentinesCalendar,
  },
  {
    title: 'Referrals',
    href: routes.help.referrals.path(),
    description: 'Refer your friends and earn rewards',
    icon: ValentinesWorld,
  },
  {
    title: 'Friends',
    href: routes.help.friends.path(),
    description: 'Playing with friends is more fun and rewarding',
    icon: WebHeart,
  },
  {
    title: 'Prizes',
    href: routes.help.prizes.path(),
    description: 'Redeem your tokens for real world prizes',
    icon: ECommercePrizes,
  },
  {
    title: 'Inventory',
    href: routes.help.inventory.path(),
    description: 'Learn about your inventory and how to use items',
    icon: ValentinesPotion,
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
  {
    title: 'VIP Membership',
    href: routes.help.vip.path(),
    description: 'Help support our mission and earn more rewards',
    icon: ECommerceQuality,
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

export type HelpCenterCategoriesProps = React.ComponentProps<
  typeof HelpCenterCategories
>;
