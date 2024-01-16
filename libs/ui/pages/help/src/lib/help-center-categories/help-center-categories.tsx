import { Box } from '@mui/material';
import {
  ECommerceAuction,
  ECommerceCustomerService,
  ECommerceGift,
  ECommercePrizes,
  ECommerceQuality,
} from '@worksheets/icons/ecommerce';
import { LearningCode } from '@worksheets/icons/learning';
import {
  ValentinesTicket,
  ValentinesWorld,
} from '@worksheets/icons/valentines';
import {
  WebGamepad,
  WebHeart,
  WebPower,
  WebQuestion,
} from '@worksheets/icons/web';

import {
  HelpCenterCategory,
  HelpCenterCategoryProps,
} from './help-center-category';

const categories: HelpCenterCategoryProps[] = [
  {
    title: 'Getting Started',
    description: 'Learn how to get started with Charity Games',
    href: '/help/getting-started',
    icon: WebPower,
  },
  {
    title: 'Frequently Asked Questions',
    description: 'Find answers to common questions',
    href: '/help/faq',
    icon: WebQuestion,
  },
  {
    title: 'Playing Games',
    description: 'Learn how to play games',
    href: '/help/playing-games',
    icon: WebGamepad,
  },
  {
    title: 'Tokens & Rewards',
    href: '/help/tokens-rewards',
    description: 'Play games at our arcade and win real world prizes',
    icon: ValentinesTicket,
  },
  {
    title: 'Referrals',
    href: '/help/referrals',
    description: 'Refer your friends and earn rewards',
    icon: ValentinesWorld,
  },
  {
    title: 'Friends',
    href: '/help/friends',
    description: 'Playing with friends is more fun and rewarding',
    icon: WebHeart,
  },
  {
    title: 'VIP Membership',
    href: '/help/vip',
    description: 'Help support our mission and earn more rewards',
    icon: ECommerceQuality,
  },
  {
    title: 'Auctions',
    href: '/help/auctions',
    description: 'Win prizes by bidding on auctions',
    icon: ECommerceAuction,
  },
  {
    title: 'Prize Wall',
    href: '/help/prize-wall',
    description: 'Redeem your tokens for real world prizes',
    icon: ECommercePrizes,
  },
  {
    title: 'Contributions',
    href: '/help/contributions',
    description: 'Help us build a better world, one game at a time',
    icon: ECommerceGift,
  },
  {
    title: 'Developer',
    href: '/help/developers',
    description: 'Contribute a game to our arcade',
    icon: LearningCode,
  },
  {
    title: 'Contact Us',
    description: 'Reach out to our support team',
    href: '/contact-us',
    icon: ECommerceCustomerService,
  },
];

export const HelpCenterCategories: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
        gridTemplateRows: 'auto',
        gridGap: 32,
        width: '100%',
      }}
    >
      {categories.map((category) => (
        <HelpCenterCategory key={category.title} {...category} />
      ))}
    </Box>
  );
};

export type HelpCenterCategoriesProps = React.ComponentProps<
  typeof HelpCenterCategories
>;
