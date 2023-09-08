import { CreateProjectRequest } from '@worksheets/schemas-projects';
import { trpc } from '@worksheets/trpc/ide';
import { useUser } from '@worksheets/ui/common';
import { useProjectId } from './useProjectId';

/**
 * This react hook lets us access the project id from local storage.
 * If the project id is not set, it will return undefined.
 */
export function useProjects() {
  const { user } = useUser();
  const utils = trpc.useContext();

  const listProjects = trpc.projects.list.useQuery(
    {},
    {
      enabled: !!user?.uid,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      cacheTime: 5 * 60 * 1000, // 5 minutes
    }
  );

  const createProject = trpc.projects.create.useMutation();

  const [selectedProjectId, setSelectedProjectId] = useProjectId();

  const selectProject = (projectId: string) => {
    setSelectedProjectId(projectId);
  };

  const createProjectAndSelect = async (form: CreateProjectRequest) => {
    const created = await createProject.mutateAsync(form);
    await utils.projects.list.invalidate();

    setSelectedProjectId(created.project.id);
  };

  const project = listProjects.data?.projects.find(
    (p) => p.id === selectedProjectId
  );

  return {
    initializing: listProjects.isLoading,
    project,
    projects: listProjects?.data?.projects,
    max: listProjects?.data?.max,
    selectProject,
    createProjectAndSelect,
  };
}
