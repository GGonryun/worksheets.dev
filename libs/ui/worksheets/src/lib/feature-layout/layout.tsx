import { Box, Container, ContainerProps, Divider } from '@mui/material';
import { FC } from 'react';
import { FeatureHeaderProps, FeatureHeader } from './header';

export const FeatureLayout: FC<
  {
    HeaderProps: FeatureHeaderProps;
  } & Pick<ContainerProps, 'maxWidth' | 'children'>
> = ({ HeaderProps, children, maxWidth = 'lg' }) => {
  return (
    <Box height="100%">
      <Box
        sx={(theme) => ({
          py: 3,
          backgroundColor: theme.palette.background.paper,
        })}
      >
        <Container maxWidth={maxWidth}>
          <FeatureHeader {...HeaderProps} />
        </Container>
      </Box>
      <Divider />
      <Container maxWidth={maxWidth} sx={{ p: 3 }}>
        {children}
      </Container>
    </Box>
  );
};
