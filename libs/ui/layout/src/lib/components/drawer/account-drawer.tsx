import {
  AccountCircleOutlined,
  AddBoxOutlined,
  ContactMailOutlined,
  DesignServicesOutlined,
  Diversity1Outlined,
  EmojiEventsOutlined,
  FavoriteBorder,
  LinkOutlined,
  LocalActivityOutlined,
  Logout,
  MilitaryTechOutlined,
  NotificationsActiveOutlined,
  NotificationsNoneOutlined,
  PasswordOutlined,
  PersonAddOutlined,
  SportsKabaddiOutlined,
  StarBorder,
  SvgIconComponent,
} from '@mui/icons-material';
import { Box, Link, ListItem, Typography } from '@mui/material';
import Divider from '@mui/material/Divider';
import { routes } from '@worksheets/routes';
import {
  Drawer,
  DRAWER_MIN_WIDTH,
  DrawerAction,
  DrawerLinks,
  DrawerText,
  WithDrawerProps,
} from '@worksheets/ui/components/drawer';
import { Column } from '@worksheets/ui/components/flex';
import { PaletteColor } from '@worksheets/ui/theme';
import {
  FriendsPanels,
  InventoryPanels,
  ReferralsPanels,
  SettingsPanels,
} from '@worksheets/util/enums';
import { UserSchema } from '@worksheets/util/types';
import pluralize from 'pluralize';
import React from 'react';

import { SharedDrawerFooter } from './shared-drawer-footer';

export const AccountDrawer: React.FC<
  WithDrawerProps<{
    user?: UserSchema;
    tokens?: number;
    notifications?: number;
  }>
> = ({ user, tokens, notifications, ...drawerProps }) => {
  return (
    <Drawer {...drawerProps}>
      {user ? (
        <UserContent
          user={user}
          tokens={tokens}
          notifications={notifications}
        />
      ) : (
        <NoUserContent />
      )}
      <SharedDrawerFooter />
    </Drawer>
  );
};

const UserContent: React.FC<{
  user: UserSchema;
  tokens?: number;
  notifications?: number;
}> = ({ user, tokens, notifications }) => {
  return (
    <>
      <ListItem
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: 0,
        }}
      >
        <Link
          href={routes.account.path()}
          underline="hover"
          color="text.primary"
        >
          <Typography
            variant={'body1'}
            fontWeight={700}
            sx={{
              maxWidth: DRAWER_MIN_WIDTH - 40,
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
            }}
          >
            {user.username}
          </Typography>
        </Link>
        <Typography variant={'body3'} color={'text.secondary'} fontWeight={500}>
          {user.email}
        </Typography>
        <Column mt={2} mb={1} gap={1}>
          <ResourceLink
            text={`${tokens ?? 0} Tokens`}
            Icon={LocalActivityOutlined}
            color={'primary'}
            href={routes.account.inventory.path()}
          />
          <ResourceLink
            text={`${notifications} ${pluralize(
              'Notifications',
              notifications
            )}`}
            Icon={
              notifications
                ? NotificationsActiveOutlined
                : NotificationsNoneOutlined
            }
            color={notifications ? 'error' : 'primary'}
            href={routes.account.notifications.path()}
          />
        </Column>
      </ListItem>
      <Divider />
      <DrawerLinks
        title={'Settings'}
        links={[
          {
            href: routes.account.path({ bookmark: SettingsPanels.EditProfile }),
            icon: <DesignServicesOutlined />,
            label: 'Edit Profile',
          },
          {
            href: routes.account.path({
              bookmark: SettingsPanels.Communication,
            }),
            icon: <ContactMailOutlined />,
            label: 'Communication',
          },
        ]}
      />
      <Divider />
      <DrawerLinks
        title="Quests"
        links={[
          {
            href: routes.account.quests.path(),
            label: 'Quests',
            icon: <LocalActivityOutlined />,
          },
        ]}
      />
      <Divider />
      <DrawerLinks
        title="Inventory"
        links={[
          {
            href: routes.account.inventory.path({
              bookmark: InventoryPanels.Items,
            }),
            label: 'My Items',
            icon: <StarBorder />,
          },
          {
            href: routes.account.inventory.path({
              bookmark: InventoryPanels.ActivationCodes,
            }),
            label: 'Activation Codes',
            icon: <EmojiEventsOutlined />,
          },
          {
            href: routes.account.inventory.path({
              bookmark: InventoryPanels.RaffleParticipation,
            }),
            label: 'Raffle Participation',
            icon: <MilitaryTechOutlined />,
          },
          {
            href: routes.account.inventory.path({
              bookmark: InventoryPanels.BattleParticipation,
            }),
            label: 'Battle Contributions',
            icon: <SportsKabaddiOutlined />,
          },
          {
            href: routes.account.inventory.path({
              bookmark: InventoryPanels.RedemptionCodes,
            }),
            label: 'Redemption Codes',
            icon: <PasswordOutlined />,
          },
        ]}
      />
      <Divider />
      <DrawerLinks
        title="Friends"
        links={[
          {
            href: routes.account.friends.path({
              bookmark: FriendsPanels.AddFriends,
            }),
            label: 'Add Friends',
            icon: <PersonAddOutlined />,
          },
          {
            href: routes.account.friends.path({
              bookmark: FriendsPanels.FriendsList,
            }),
            label: 'Friends List',
            icon: <Diversity1Outlined />,
          },
        ]}
      />
      <Divider />
      <DrawerLinks
        title="Referrals"
        links={[
          {
            href: routes.account.referrals.path({
              bookmark: ReferralsPanels.ReferredAccounts,
            }),
            label: 'Referred Accounts',
            icon: <AccountCircleOutlined />,
          },
          {
            href: routes.account.referrals.path({
              bookmark: ReferralsPanels.ShareYourLink,
            }),
            label: 'Share Your Link',
            icon: <LinkOutlined />,
          },
          {
            href: routes.account.referrals.path({
              bookmark: ReferralsPanels.MyReferrer,
            }),
            label: 'My Referrer',
            icon: <AddBoxOutlined />,
          },
        ]}
      />
      <Divider />
      <DrawerLinks
        title="Submissions"
        links={[
          {
            href: routes.account.submissions.path(),
            label: 'My Submissions',
            icon: <FavoriteBorder />,
          },
        ]}
      />
      <Divider />
      <DrawerAction
        href={routes.logout.path()}
        sx={{ mt: 0.5 }}
        startIcon={<Logout />}
      >
        Sign Out
      </DrawerAction>
      <Divider />
    </>
  );
};

const ResourceLink: React.FC<{
  text: string;
  Icon: SvgIconComponent;
  color: PaletteColor;
  href: string;
}> = ({ text, Icon, color, href }) => (
  <Box
    component={Link}
    display="flex"
    gap={1}
    alignItems={'center'}
    underline="hover"
    color={(theme) => theme.palette[color].main}
    href={href}
  >
    <Icon fontSize="small" />
    <Typography variant="body2" fontWeight={700}>
      {text}
    </Typography>
  </Box>
);

const NoUserContent: React.FC = () => {
  return (
    <Box>
      <DrawerText>Sign in to access your account</DrawerText>
      <DrawerAction href={routes.login.path()}>Sign In</DrawerAction>
    </Box>
  );
};
