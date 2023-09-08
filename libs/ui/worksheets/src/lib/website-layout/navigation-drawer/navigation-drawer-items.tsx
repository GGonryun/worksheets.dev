import { List, Tooltip, Typography } from '@mui/material';
import { FC, Fragment } from 'react';
import { NavigationDrawerItem, NavigationItem } from './navigation-drawer-item';
import { Flex } from '@worksheets/ui-core';
import { useRouter } from 'next/router';

export const NavigationDrawerItems: FC<{
  thin?: boolean;
  title?: string;
  items: NavigationItem[];
  strict?: boolean;
}> = ({ thin, title, items, strict }) => {
  const { asPath: path } = useRouter();

  return (
    <List>
      {!thin && !!title && (
        <Flex alignItems="center" gap={1} px={2.5} py={1}>
          <Typography variant="caption" color="text.secondary">
            {title}
          </Typography>
        </Flex>
      )}
      {items.map((item, index) => (
        <Fragment key={index}>
          <Tooltip
            title={item.text}
            placement="right-end"
            disableHoverListener={!thin}
          >
            <span>
              <NavigationDrawerItem
                thin={thin}
                {...item}
                active={
                  strict ? path === item.href : path.startsWith(item.href)
                }
              />
            </span>
          </Tooltip>
        </Fragment>
      ))}
    </List>
  );
};
