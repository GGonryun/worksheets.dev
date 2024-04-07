import { List } from '@mui/material';

import { DrawerItem, DrawerItemProps } from './item';
import { DrawerTitle } from './title';

export type DrawerLink = {
  id?: string;
} & DrawerItemProps;

export const DrawerLinks: React.FC<{
  title?: string;
  links: DrawerLink[];
}> = ({ title, links }) => {
  return (
    <List disablePadding>
      {title && <DrawerTitle>{title}</DrawerTitle>}
      {links.map((link) => (
        <DrawerItem key={link.id ?? link.label} {...link} />
      ))}
    </List>
  );
};
