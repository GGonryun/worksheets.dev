import { Box } from '@mui/material';
import {
  ECommerceCustomerService,
  ECommerceGift,
  ECommercePrizes,
} from '@worksheets/icons/ecommerce';
import { LearningCode } from '@worksheets/icons/learning';
import {
  ValentinesPadlock,
  ValentinesPotion,
  ValentinesProfile,
} from '@worksheets/icons/valentines';
import { WebGamepad, WebQuestion } from '@worksheets/icons/web';
import { helpRoutes } from '@worksheets/routes';

import {
  HelpCenterCategory,
  HelpCenterCategoryProps,
} from './help-center-category';

const categories: HelpCenterCategoryProps[] = [
  {
    title: 'Common Questions',
    description: 'Answers to our most frequently asked questions',
    href: helpRoutes.faq.url(),
    icon: WebQuestion,
  },
  {
    title: 'Accounts & Profiles',
    description: 'Learn about accounts and profile settings',
    href: helpRoutes.accounts.url(),
    icon: ValentinesProfile,
  },
  {
    title: 'Playing Games',
    href: helpRoutes.playingGames.url(),
    description: 'Learn how to play games on our arcade',
    icon: WebGamepad,
  },
  {
    title: 'Prizes',
    href: helpRoutes.prizes.url(),
    description: 'Redeem your tokens for real world prizes',
    icon: ECommercePrizes,
  },
  {
    title: 'Inventory',
    href: helpRoutes.inventory.url(),
    description: 'Learn about your inventory and how to use items',
    icon: ValentinesPotion,
  },
  {
    title: 'Integrations',
    href: helpRoutes.integrations.url(),
    description: 'Connect your account to other services and apps',
    icon: ValentinesPadlock,
  },
  {
    title: 'Contributions',
    href: helpRoutes.contributions.url(),
    description: 'Help us build a better world, one game at a time',
    icon: ECommerceGift,
  },
  {
    title: 'Developer',
    href: helpRoutes.developers.url(),
    description: 'Contribute a game to our arcade',
    icon: LearningCode,
  },
  {
    title: 'Contact Us',
    description: 'Reach out to our support team',
    href: helpRoutes.contact.url(),
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

export type HelpCenterCategoriesProps = React.ComponentProps<
  typeof HelpCenterCategories
>;
