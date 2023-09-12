import { ArrowRight } from '@mui/icons-material';
import { Typography, Divider } from '@mui/material';
import {
  TinyLogo,
  TinyButton,
  TinyButtonProps,
} from '@worksheets/ui-basic-style';
import { SectionLayout } from './section-layout';
import { Flex, MicroMarkdown, MicroMarkdownText } from '@worksheets/ui-core';
import { FC } from 'react';
import { BackgroundColors } from '@worksheets/ui/common';

type SimpleButtonProps = {
  label: string;
  href: string;
};

export type TitleSectionProps = {
  title: string;
  subtitle: string;
  icon: string;
  description: MicroMarkdownText;
  backgroundColor?: BackgroundColors;
  buttons: {
    primary?: SimpleButtonProps;
    secondary?: SimpleButtonProps;
  };
};

export const TitleSection: FC<TitleSectionProps> = ({
  title,
  subtitle,
  icon,
  description,
  backgroundColor = 'primary',
  buttons,
}) => {
  return (
    <SectionLayout
      backgroundColor={backgroundColor}
      maxWidth="md"
      pt={8}
      pb={10}
    >
      <TinyLogo borderless src={icon} area={128} />
      <Typography variant="h3" mt={2}>
        {title}
      </Typography>
      <Divider sx={{ width: 100, my: 1 }} />
      <Typography variant="h5">{subtitle}</Typography>
      <Typography
        variant="body2"
        color="text.secondary"
        maxWidth={620}
        textAlign="center"
        pt={0.5}
      >
        <MicroMarkdown text={description} />
      </Typography>
      <Divider sx={{ width: 100, my: 2 }} />
      <Flex gap={4} wrap>
        {buttons.primary && (
          <TinyButton
            href={buttons.primary.href}
            variant="contained"
            color={convertColor[backgroundColor]}
            sx={{ width: 220 }}
            endIcon={<ArrowRight />}
          >
            {buttons.primary.label}
          </TinyButton>
        )}
        {buttons.secondary && (
          <TinyButton
            href={buttons.secondary.href}
            variant="outlined"
            color="inherit"
            sx={{ width: 220 }}
            endIcon={<ArrowRight />}
          >
            {buttons.secondary.label}
          </TinyButton>
        )}
      </Flex>
    </SectionLayout>
  );
};

const convertColor: Record<BackgroundColors, TinyButtonProps['color']> = {
  primary: 'primary',
  secondary: 'secondary',
  success: 'success',
  warning: 'warning',
  error: 'error',
  info: 'info',
  grey: 'inherit',
  white: 'inherit',
};
