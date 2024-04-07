import { DrawerButton } from './button';
import { DrawerIcon } from './icon';
import { DrawerText } from './text';

export const DrawerItem: React.FC<{
  icon: React.ReactNode;
  label: string;
  href: string;
}> = ({ icon, href, label }) => (
  <DrawerButton href={href}>
    <DrawerIcon sx={{ minWidth: 32 }}>{icon}</DrawerIcon>
    <DrawerText disablePadding>{label}</DrawerText>
  </DrawerButton>
);

export type DrawerItemProps = React.ComponentProps<typeof DrawerItem>;
