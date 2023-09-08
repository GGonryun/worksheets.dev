import { ArrowRight } from '@mui/icons-material';
import { Link, Typography, useTheme } from '@mui/material';
import { TinyMenu, TinyMenuItem } from '@worksheets/ui-basic-style';
import { Flex } from '@worksheets/ui-core';
import { useProjects } from '@worksheets/ui-projects';
import { FC } from 'react';

// todo: use project selector instead
export const ProjectSettingsMenu: FC<{
  anchor?: HTMLElement;
  onClose: () => void;
}> = ({ anchor, onClose }) => {
  const { project } = useProjects();
  return (
    <TinyMenu
      open={!!anchor}
      anchorEl={anchor}
      onClose={onClose}
      horizontal={'center'}
      showArrow
    >
      <MenuHeader>{project?.id ?? '(none)'}</MenuHeader>
      <TinyMenuItem>Project settings</TinyMenuItem>
      <TinyMenuItem>Manage users</TinyMenuItem>
      <TinyMenuItem>View usage</TinyMenuItem>
    </TinyMenu>
  );
};

export const MenuHeader: FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const theme = useTheme();
  return (
    <Link
      underline="hover"
      href="/projects"
      sx={{
        color: theme.palette.text.secondary,
        '&:hover': { color: theme.palette.primary.main },
      }}
    >
      <Flex px={2} py={1} spaceBetween>
        <Typography variant="caption" mb={-0.5} fontWeight={900}>
          {children}
        </Typography>
        <ArrowRight fontSize="small" />
      </Flex>
    </Link>
  );
};
