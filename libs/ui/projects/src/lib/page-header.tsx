import { Typography } from '@mui/material';
import { TinyLogo } from '@worksheets/ui-basic-style';
import { Flex } from '@worksheets/ui-core';
import { useLayout } from '@worksheets/ui/common';

export const ProjectsHeader = () => {
  const { isMobile, isTablet } = useLayout();

  return (
    <Flex column gap={1}>
      <Flex gap={2} pt={1}>
        <TinyLogo
          borderless
          label="Projects"
          src="/icons/features/projects.svg"
          area={40}
        />
        <Typography
          variant={isMobile ? 'h6' : isTablet ? 'h5' : 'h4'}
          fontWeight={900}
        >
          Your projects
        </Typography>
      </Flex>
      <Typography variant="body2" color="text.secondary" maxWidth={720}>
        Projects are containers for your Worksheets resources.{' '}
        {!isMobile &&
          'You can create multiple projects to organize your resources. You can also share projects with other users.'}
      </Typography>
    </Flex>
  );
};
