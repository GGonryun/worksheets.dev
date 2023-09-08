import { FC, useState } from 'react';
import { useProjects } from '../../hooks';
import { CreateProjectSidecar } from '../create-project-sidecar';
import { SelectionMenu } from './menu';
import { SelectionButton } from './button';

export const ProjectSelector: FC<{ variant: 'outlined' | 'text' }> = ({
  variant,
}) => {
  const [openSidecar, setOpenSidecar] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState<undefined | HTMLElement>();
  const { project, selectProject } = useProjects();

  return (
    <>
      <SelectionButton
        variant={variant}
        onClick={(e) => setMenuAnchor(e.currentTarget)}
      >
        {project?.title ?? 'Select project'}
      </SelectionButton>
      <SelectionMenu
        anchor={menuAnchor}
        onClose={() => setMenuAnchor(undefined)}
        onSelect={(pid) => selectProject(pid)}
        onCreate={() => setOpenSidecar(true)}
      />
      <CreateProjectSidecar
        open={openSidecar}
        onClose={() => setOpenSidecar(false)}
      />
    </>
  );
};
