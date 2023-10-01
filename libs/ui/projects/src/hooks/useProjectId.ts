import { useLocalStorage } from '@worksheets/ui-core';
import { urls } from '@worksheets/ui/common';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

let globalProjectId = '';
let observers: React.Dispatch<string>[] = [];

export const setGlobalProjectId = (pid: string) => {
  globalProjectId = pid;
  observers.forEach((update) => update(pid));
};

export const useProjectId = (): [string, (pid: string) => void] => {
  const { push, query } = useRouter();
  const queryProjectId = query['projectId'] as string | undefined;
  const [projectId, setProjectId] = useLocalStorage<string>(
    'selected-project-id',
    globalProjectId
  );

  useEffect(() => {
    observers.push(setProjectId);
    return () => {
      observers = observers.filter((update) => update !== setProjectId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // sometimes the project id comes from a query parameter in which case we do not want to save it to local storage, we actually want to redirect when the query parameter is set.
  const handleSetGlobalProjectId = (pid: string) => {
    if (queryProjectId) {
      push(urls.app.project(pid).overview);
    } else {
      setGlobalProjectId(pid);
    }
  };
  return [queryProjectId || projectId, handleSetGlobalProjectId];
};
