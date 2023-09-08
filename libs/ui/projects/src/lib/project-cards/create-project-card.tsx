import { Add } from '@mui/icons-material';
import { Box, CircularProgress, Typography } from '@mui/material';
import { FC } from 'react';
import { cardHeight } from './custom-card';
import { ProjectCardLayout } from './layout';
import { Flex } from '@worksheets/ui-core';
import { TinyLogo } from '@worksheets/ui-basic-style';
import { useProjects } from '../../hooks';

export const CreateProjectCard: FC<{ onClick: () => void }> = ({ onClick }) => {
  const { max, projects, initializing } = useProjects();

  return (
    <ProjectCardLayout onClick={onClick}>
      <Flex
        column
        height={cardHeight}
        centered
        gap={1}
        sx={{
          color: 'primary.main',
          position: 'relative',
        }}
      >
        {initializing ? (
          <CircularProgress />
        ) : (
          <CardContents current={projects?.length ?? 0} max={max ?? 0} />
        )}
      </Flex>
    </ProjectCardLayout>
  );
};

const CardContents: FC<{ current: number; max: number }> = ({
  current,
  max,
}) => (
  <>
    <Box position="absolute" bottom={8} right={20}>
      <Flex gap={0.5}>
        <TinyLogo src="/icons/features/projects.svg" borderless />
        <Typography
          variant="body2"
          fontWeight={900}
          color={current === max ? 'error' : 'text.primary'}
        >
          {current}/{max}
        </Typography>
      </Flex>
    </Box>
    <Add fontSize="large" />
    <Typography variant="body1" fontWeight={900}>
      Add project
    </Typography>
  </>
);
