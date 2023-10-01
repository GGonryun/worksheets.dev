import { FC } from 'react';

import { ProjectCard } from './project-card';

export const AnonymousConnectionCard: FC = () => {
  return (
    <ProjectCard
      id={'test'}
      title={'Demo Project'}
      features={['tasks', 'connections', 'services']}
    />
  );
};
