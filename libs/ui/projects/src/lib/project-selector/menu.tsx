import { ArrowRight, Key } from '@mui/icons-material';
import { Divider, Typography } from '@mui/material';
import { TinyMenu, TinyMenuItem } from '@worksheets/ui-basic-style';
import { Flex } from '@worksheets/ui-core';
import { urls } from '@worksheets/ui/common';
import { FC } from 'react';
import { useProjects } from '../../hooks';
import { MenuHeader } from './menu-header';

export const SelectionMenu: FC<{
  anchor?: HTMLElement;
  onClose: () => void;
  onCreate: () => void;
  onSelect: (projectId: string) => void;
}> = ({ anchor, onClose, onCreate, onSelect }) => {
  const { project, projects } = useProjects();
  // put selected project first.
  projects?.sort((a, b) => (a.id === project?.id ? -1 : 1));

  return (
    <TinyMenu
      anchorEl={anchor}
      open={!!anchor}
      horizontal="center"
      showArrow
      onClose={onClose}
      minWidth={200}
    >
      <MenuHeader>Navigation</MenuHeader>

      <TinyMenuItem href={urls.app.projects}>
        <Flex spaceBetween fullWidth>
          See all projects
          <ArrowRight fontSize="small" />
        </Flex>
      </TinyMenuItem>
      <TinyMenuItem
        onClick={() => {
          onClose();
          onCreate();
        }}
      >
        <Flex spaceBetween fullWidth>
          Add a project
          <ArrowRight fontSize="small" />
        </Flex>
      </TinyMenuItem>
      {project && (
        <TinyMenuItem
          href={project?.id ? urls.app.project(project.id).settings : undefined}
        >
          <Flex spaceBetween fullWidth>
            Project settings
            <ArrowRight fontSize="small" />
          </Flex>
        </TinyMenuItem>
      )}

      <Divider />
      <MenuHeader>All Projects</MenuHeader>
      {projects?.length === 0 && (
        <Typography variant="caption" color="text.secondary" fontWeight={900}>
          No projects
        </Typography>
      )}
      {projects?.map((p) => (
        <TinyMenuItem
          selected={p.id === project?.id}
          key={p.id}
          onClick={() => {
            onClose();
            if (p.id !== project?.id) {
              onSelect(p.id);
            }
          }}
        >
          <Flex column>
            <Typography variant="body2">
              <b>{p.title}</b> {p.id === project?.id && '(current)'}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              <Flex gap={0.5}>
                <Key sx={{ width: 16, height: 16, mb: '2px' }} />
                {p.id}
              </Flex>
            </Typography>
          </Flex>
        </TinyMenuItem>
      ))}
    </TinyMenu>
  );
};
