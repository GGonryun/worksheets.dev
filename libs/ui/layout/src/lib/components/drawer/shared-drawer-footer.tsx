import {
  BookOutlined,
  CodeOutlined,
  ContactSupportOutlined,
  FavoriteBorder,
  InfoOutlined,
  ManageSearchOutlined,
  PrivacyTipOutlined,
} from '@mui/icons-material';
import { Box, Divider } from '@mui/material';
import { blogRoutes, routes } from '@worksheets/routes';
import {
  DrawerAction,
  DrawerCaption,
  DrawerLinks,
} from '@worksheets/ui/components/drawer';
import { copyright, version } from '@worksheets/util/settings';

export const SharedDrawerFooter: React.FC = () => {
  return (
    <>
      <DrawerLinks
        title={'More'}
        links={[
          { href: routes.about.path(), icon: <InfoOutlined />, label: 'About' },
          {
            href: blogRoutes.home.url(),
            icon: <BookOutlined />,
            label: 'Blog',
          },
          {
            href: routes.help.path(),
            icon: <ContactSupportOutlined />,
            label: 'Help Center',
          },
          {
            href: routes.help.contributions.path(),
            icon: <FavoriteBorder />,
            label: 'Contribute',
          },
          {
            href: routes.help.developers.path(),
            icon: <CodeOutlined />,
            label: 'Developers',
          },
          {
            href: routes.cookies.path(),
            icon: <PrivacyTipOutlined />,
            label: 'Cookies',
          },
          {
            href: routes.privacy.path(),
            icon: <ManageSearchOutlined />,
            label: 'Privacy',
          },
          { href: routes.terms.path(), icon: <InfoOutlined />, label: 'Terms' },
        ]}
      />
      <DrawerAction href={routes.contact.path()}>Contact</DrawerAction>
      <Divider />
      <Box mt={1}>
        <DrawerCaption>Version {version}</DrawerCaption>
        <DrawerCaption>{copyright}</DrawerCaption>
      </Box>
    </>
  );
};
