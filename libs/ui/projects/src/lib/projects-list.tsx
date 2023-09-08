import Grid from '@mui/material/Unstable_Grid2';
import { ProjectCard } from './project-cards/project-card';

import { useProjects } from '../hooks';

export const ProjectsList = () => {
  const { projects } = useProjects();

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {projects?.map((project) => (
        <Grid xs={12} sm={6} md={4} lg={3} key={project.id}>
          <ProjectCard
            id={project.id}
            title={project.title}
            domain={project.domain}
            features={project.features}
          />
        </Grid>
      ))}
    </>
  );
};
