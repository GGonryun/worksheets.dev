import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { ApplicationDetails } from '../shared/types';
import { TemplateCard } from './template-card';
import { trpc } from '@worksheets/trpc/ide';

export const TemplatesGrid: React.FC<{
  appIds: string[]; //filter templates by apps
  onAppClick: (app: ApplicationDetails) => void;
}> = ({ appIds, onAppClick }) => {
  const { data: templates } = trpc.templates.list.useQuery({
    appIds: appIds.join(','),
  });

  return (
    <Grid container spacing={2}>
      {templates?.map((t) => (
        <Grid xs={4} key={t.id}>
          <TemplateCard template={t} onAppClick={onAppClick} />
        </Grid>
      ))}
    </Grid>
  );
};
