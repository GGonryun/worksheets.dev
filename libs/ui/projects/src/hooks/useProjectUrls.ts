import { urls } from '@worksheets/ui/common';
import { useProjectId } from './useProjectId';

export const useProjectUrls = () => {
  const [projectId] = useProjectId();
  return {
    ...urls,
    app: {
      ...urls.app,
      project: {
        ...urls.app.project(projectId),
      },
    },
  };
};
