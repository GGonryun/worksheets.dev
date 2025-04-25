'use client';

import * as React from 'react';
import { HomeIcon, Settings2, UsersIcon } from 'lucide-react';

import { devRoutes } from '@worksheets/routes';

import { NavMain } from './nav-main';
import { NavUser } from './nav-user';
import { TeamSwitcher } from './team-switcher';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '../ui/sidebar';

// This is sample data.
const data = {
  navMain: [
    {
      title: 'Dashboard',
      url: devRoutes.dashboard.path(),
      icon: HomeIcon,
      pathname: devRoutes.dashboard.raw.path,
    },
    {
      title: 'Users',
      url: devRoutes.dashboard.users.path(),
      icon: UsersIcon,
      pathname: devRoutes.dashboard.users.raw.path,
    },
    {
      title: 'Settings',
      url: devRoutes.dashboard.settings.path(),
      icon: Settings2,
      pathname: devRoutes.dashboard.settings.raw.path,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { navMain } = data;
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
