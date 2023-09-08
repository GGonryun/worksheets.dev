import { Lightbulb, OpenInNew } from '@mui/icons-material';
import { Card, Typography, Button } from '@mui/material';
import { TinyLogo } from '@worksheets/ui-basic-style';
import { useLayout } from '@worksheets/ui/common';
import { FC } from 'react';
import { cardHeight } from './custom-card';
import { Flex } from '@worksheets/ui-core';

export const BrowseFeaturesCard: FC = () => {
  const { isMobile, isTablet, theme } = useLayout();
  return (
    <Card
      variant="outlined"
      sx={{
        borderRadius: theme.shape.borderRadius * 0.9,
      }}
    >
      <Flex>
        <Flex column spaceBetween gap={1} p={3} width={'60%'}>
          <Flex column>
            <Typography variant="h6">Explore use cases and features</Typography>
            <Typography variant="body2" color="text.secondary">
              Worksheets offers a variety of features to help you build your
              next project. Learn more about each feature and how to use them.
            </Typography>
          </Flex>
          <Flex>
            <Button
              startIcon={<Lightbulb />}
              endIcon={<OpenInNew />}
              size="small"
              sx={{
                pt: 3,
                textTransform: 'none',
                color: 'primary.main',
                border: 'transparent',
                '&:hover': {
                  backgroundColor: 'transparent',
                  color: 'primary.dark',
                  textDecoration: 'underline',
                },
              }}
            >
              Learn more
            </Button>
          </Flex>
        </Flex>
        <Flex centered grow>
          <TinyLogo
            borderless
            src="/art/evolution.svg"
            area={isMobile ? 128 : isTablet ? 150 : cardHeight}
          />
        </Flex>
      </Flex>
    </Card>
  );
};
