import Box from '@mui/material/Box';
import {
  GameIdField,
  ProjectType,
  ProjectTypeField,
  TitleField,
  gameIdFieldId,
  projectTypeFieldId,
  titleFieldId,
} from './fields';
import { FC, useState } from 'react';
import { TaglineField, taglineFieldId } from './fields/tagline-field';

export const BasicInformationSection: FC<{
  errors: Record<string, string>;
}> = ({ errors }) => {
  const titleError = errors[titleFieldId];
  const taglineError = errors[taglineFieldId];
  const gameIdError = errors[gameIdFieldId];
  const projectTypeError = errors[projectTypeFieldId];

  const [project, setProject] = useState<ProjectType | undefined>(undefined);

  const handleChange = (t: ProjectType) => {
    setProject(t);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
      }}
    >
      <TitleField error={titleError} />
      <GameIdField error={gameIdError} />
      <TaglineField error={taglineError} />
      <ProjectTypeField
        error={projectTypeError}
        value={project}
        onChange={handleChange}
      />
    </Box>
  );
};
