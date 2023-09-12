import { Typography, Paper } from '@mui/material';
import { FC, ReactNode } from 'react';
import { SectionLayout } from './section-layout';
import { Flex } from '@worksheets/ui-core';
import { HeaderSection } from './header-section';
import { ArrowRight, MoneyOff, Public, Store } from '@mui/icons-material';
import { TinyButton, TinyLogo } from '@worksheets/ui-basic-style';
import { selectBorder, useLayout } from '@worksheets/ui/common';

export const PricingMarketingSection: FC<{
  backgroundColor?:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'error'
    | 'info';
  title?: string;
}> = ({
  backgroundColor = 'success',
  title = 'How much does Worksheets cost?',
}) => {
  const { isMobile } = useLayout();
  return (
    <SectionLayout backgroundColor={backgroundColor} gap={3} py={8}>
      <HeaderSection
        icon={<TinyLogo src="/art/pixels/payment.svg" borderless area={32} />}
        title={title}
        subtitle="Find a plan that works for your budget, team size, and use cases."
      />
      <Flex gap={3} wrap centered column={isMobile}>
        <PricingCard
          color={backgroundColor}
          icon={<MoneyOff color={backgroundColor} />}
          title="Individuals"
          subtitle="Individuals get access to most of our features. Perfect for learning and building prototypes."
          cta={{
            href: '/login',
            label: 'Try free',
          }}
        />
        <PricingCard
          color={backgroundColor}
          icon={<Store color={backgroundColor} />}
          title="Teams"
          subtitle="Unlock advanced features for your team. Perfect for small teams and production apps."
          cta={{
            href: '/login',
            label: 'Get started',
          }}
        />
        <PricingCard
          color={backgroundColor}
          icon={<Public color={backgroundColor} />}
          title="Custom"
          subtitle="Can't get enough? Get unlimited resources where you need them, for a price."
          cta={{
            href: '/contact',
            label: 'Contact Us',
          }}
        />
      </Flex>
    </SectionLayout>
  );
};

const PricingCard: FC<{
  icon: ReactNode;
  title: string;
  subtitle: string;
  color: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
  cta: {
    href: string;
    label: string;
  };
}> = ({ icon, title, subtitle, cta, color }) => {
  const { isMobile } = useLayout();

  return (
    <Paper
      variant="outlined"
      sx={(theme) => ({
        borderColor: selectBorder(theme, color),
      })}
    >
      <Flex
        column
        spaceBetween
        py={3}
        px={2}
        width={isMobile ? 300 : 220}
        minHeight={280}
      >
        <Flex column alignItems="start">
          {icon}
          <Typography variant="h6" pt={0.5}>
            <b>{title}</b>
          </Typography>
        </Flex>
        <Flex column gap={3}>
          <Typography variant="caption" color="textSecondary">
            {subtitle}
          </Typography>
          <TinyButton
            color={color}
            variant="outlined"
            size="small"
            sx={{ py: 1 }}
            endIcon={<ArrowRight />}
            href={cta.href}
          >
            {cta.label}
          </TinyButton>
        </Flex>
      </Flex>
    </Paper>
  );
};
