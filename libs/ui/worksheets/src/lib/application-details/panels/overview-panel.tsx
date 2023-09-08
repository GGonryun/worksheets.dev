import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Container,
  Tooltip,
  Typography,
} from '@mui/material';
import {
  GetApplicationDetailsResponse,
  ListApplicationMethodDetailsResponse,
} from '@worksheets/schemas-applications';
import React from 'react';
import { Flex } from '@worksheets/ui-core';
import { addCommasToNumber } from '@worksheets/util/strings';

export const OverviewPanel: React.FC<{
  app: GetApplicationDetailsResponse;
  methods: ListApplicationMethodDetailsResponse;
}> = ({ app, methods }) => (
  <Container
    maxWidth="lg"
    disableGutters
    sx={{
      m: 0,
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      gap: 3,
      p: 3,
    }}
  >
    <IntroductionSection {...app} />
    <MethodsSection {...app} methods={methods} />
    <FrequentlyAskedSection {...app} />
  </Container>
);

const IntroductionSection: React.FC<GetApplicationDetailsResponse> = ({
  title,
  description,
}) => (
  <Flex column gap={1}>
    <Typography variant="h5" fontWeight={900}>
      Getting started with {title}
    </Typography>
    <Typography variant="body1" color="text.secondary" whiteSpace="pre-line">
      {description}
    </Typography>
  </Flex>
);

const MethodsSection: React.FC<{
  title: string;
  methods: ListApplicationMethodDetailsResponse;
}> = ({ methods, title }) => (
  <Box>
    <Typography variant="h5" fontWeight={900}>
      What can I do with {title}?
    </Typography>

    <MethodCards methods={methods} />
  </Box>
);

const MethodCards: React.FC<{
  methods: ListApplicationMethodDetailsResponse;
}> = ({ methods }) => (
  <Box pt={1} display="flex" flexWrap="wrap" gap={2}>
    {methods.map((method) => (
      <MethodCard method={method} key={method.methodId} />
    ))}
  </Box>
);

const MethodCard: React.FC<{
  method: ListApplicationMethodDetailsResponse[number];
}> = ({ method }) => (
  <Box sx={{ width: 240 }}>
    <Card variant="outlined">
      <CardActionArea
        href={`/applications/${method.appId}/api#${method.methodId}`}
      >
        <CardContent sx={{ px: 2, m: 0 }}>
          <Flex column gap={1}>
            <Flex width="100%" justifyContent="space-between" gap={1}>
              <Typography variant="h6" fontWeight={900}>
                {method.label}
              </Typography>
              <PricingChip cost={method.pricing} />
            </Flex>
            <Typography
              color="text.secondary"
              variant="body2"
              sx={{ height: 80, 'overflow-y': 'scroll' }}
            >
              {method.description}
            </Typography>
            <Typography
              pt={1.5}
              pb={0}
              color="info.main"
              sx={{ textDecoration: 'underline' }}
            >
              Learn More
            </Typography>
          </Flex>
        </CardContent>
      </CardActionArea>
    </Card>
  </Box>
);

const PricingChip: React.FC<{ cost: number }> = ({ cost }) => {
  const setPricing = () => {
    if (cost) {
      return `$${cost}`;
    } else return `free`;
  };

  const setPricingLabel = () => {
    if (cost) {
      return `$1 = ${addCommasToNumber(Math.round(1 / cost))} executions`;
    }
    return 'unlimited executions';
  };

  return (
    <Tooltip title={setPricingLabel()} placement="top">
      <Chip
        size="small"
        label={setPricing()}
        color={cost ? 'default' : 'success'}
      />
    </Tooltip>
  );
};

const FrequentlyAskedSection: React.FC<GetApplicationDetailsResponse> = ({
  faq,
}) => (
  <Flex column gap={1}>
    <Typography variant="h5" fontWeight={900}>
      Frequently Asked Questions
    </Typography>
    <Flex column gap={3}>
      {faq.map((e, i) => (
        <Flex column gap={1} key={i}>
          <Typography variant="h6" fontWeight={900}>
            {e[0]}
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            whiteSpace="pre-line"
          >
            {e[1]}
          </Typography>
        </Flex>
      ))}
    </Flex>
  </Flex>
);
