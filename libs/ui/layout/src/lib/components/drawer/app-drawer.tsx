import {
  AccountCircleOutlined,
  CategoryOutlined,
  CircleOutlined,
  EmojiEventsOutlined,
  GavelOutlined,
  HomeOutlined,
  LocalActivityOutlined,
  LocalFireDepartmentOutlined,
  NewReleasesOutlined,
  ShuffleOutlined,
  VideogameAssetOutlined,
} from '@mui/icons-material';
import Divider from '@mui/material/Divider';
import { routes } from '@worksheets/routes';
import {
  Drawer,
  DrawerLinks,
  WithDrawerProps,
} from '@worksheets/ui/components/drawer';

import { SharedDrawerFooter } from './shared-drawer-footer';

export const AppDrawer: React.FC<WithDrawerProps<{ connected: boolean }>> = ({
  connected,
  ...props
}) => {
  return (
    <Drawer {...props}>
      <DrawerLinks
        links={[
          { href: routes.play.path(), icon: <HomeOutlined />, label: 'Home' },
          {
            href: routes.account.path(),
            icon: <AccountCircleOutlined />,
            label: 'Account',
          },
        ]}
      />

      <Divider />
      <DrawerLinks
        title={'Games'}
        links={[
          {
            href: routes.library.path(),
            icon: <VideogameAssetOutlined />,

            label: 'All Games',
          },
          {
            href: routes.category.path({ params: { tagId: 'popular' } }),
            icon: <LocalFireDepartmentOutlined />,
            label: 'Popular',
          },
          {
            href: routes.category.path({ params: { tagId: 'new' } }),
            icon: <NewReleasesOutlined />,
            label: 'New',
          },
          {
            href: routes.play.random.path(),
            icon: <ShuffleOutlined />,
            label: 'Random',
          },
        ]}
      />
      <Divider />
      <DrawerLinks
        title="Prizes"
        links={[
          {
            href: routes.prizes.path(),
            icon: <EmojiEventsOutlined />,
            label: 'All Prizes',
          },
          {
            href: routes.raffles.path(),
            icon: <LocalActivityOutlined />,
            label: 'Raffles',
          },
          {
            href: routes.auctions.path(),
            icon: <GavelOutlined />,
            label: 'Auctions',
          },
        ]}
      />
      <Divider />
      <DrawerLinks
        title={'Categories'}
        links={[
          {
            href: routes.categories.path(),
            icon: <CategoryOutlined />,
            label: 'All Categories',
          },
          ...categories.map((category) => ({
            id: category.tagId,
            href: routes.category.path({ params: { tagId: category.tagId } }),
            icon: category.icon,
            label: category.label,
          })),
        ]}
      />
      <Divider />
      <SharedDrawerFooter />
    </Drawer>
  );
};

const categories = [
  {
    label: 'Ad-Free',
    icon: <CircleOutlined />,
    tagId: 'ad-free',
  },
  {
    label: 'Arcade',
    icon: <CircleOutlined />,

    tagId: 'arcade',
  },
  {
    label: 'Board',
    icon: <CircleOutlined />,

    tagId: 'board',
  },
  {
    label: 'Card',
    icon: <CircleOutlined />,

    tagId: 'card',
  },
  {
    label: 'Car',
    icon: <CircleOutlined />,

    tagId: 'car',
  },
  {
    label: 'Defense',
    icon: <CircleOutlined />,

    tagId: 'defense',
  },
  {
    label: 'Educational',
    icon: <CircleOutlined />,

    tagId: 'educational',
  },
  {
    label: 'Endless',
    icon: <CircleOutlined />,

    tagId: 'endless',
  },
  {
    label: 'Funny',
    icon: <CircleOutlined />,

    tagId: 'funny',
  },
  {
    label: 'Puzzle',
    icon: <CircleOutlined />,

    tagId: 'puzzle',
  },
  {
    label: 'Racing',
    icon: <CircleOutlined />,

    tagId: 'racing',
  },
  {
    label: 'Shooting',
    icon: <CircleOutlined />,

    tagId: 'shooting',
  },
  {
    label: 'Sports',
    icon: <CircleOutlined />,

    tagId: 'sports',
  },
  {
    label: 'Survival',
    icon: <CircleOutlined />,

    tagId: 'survival',
  },
  {
    label: 'Word',
    icon: <CircleOutlined />,

    tagId: 'word',
  },
];
