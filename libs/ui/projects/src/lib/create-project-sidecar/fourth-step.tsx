import { CustomStep } from './custom-step';
import { FC } from 'react';
import { ButtonBase, Typography } from '@mui/material';
import { PrimaryButton, SecondaryButton } from './buttons';
import { Flex, MicroMarkdown, MicroMarkdownText } from '@worksheets/ui-core';
import { Edit } from '@mui/icons-material';
import { CreateProjectRequest } from '@worksheets/schemas-projects';

export const FourthStep: FC<{
  form: CreateProjectRequest;
  onSave: () => void;
  onPrevious: () => void;
  onJumpTo: (step: number) => void;
}> = ({ form, onSave, onPrevious, onJumpTo }) => {
  return (
    <CustomStep
      title="**Finally**"
      subtitle="let's review your selections so far."
      description="Any last minute changes? Some of these settings are **permanent**"
      actions={
        <>
          <SecondaryButton onClick={() => onPrevious()}>
            Previous
          </SecondaryButton>
          <PrimaryButton onClick={() => onSave()}>Create Project</PrimaryButton>
        </>
      }
    >
      <Flex column gap={4}>
        <Flex column gap={2}>
          <SettingsHeader
            title="Permanent settings"
            subtitle="These settings **cannot be changed** after creation"
          />
          <SettingsOption
            label="Project id"
            value={form.id}
            onEdit={() => onJumpTo(1)}
          />
        </Flex>
        <Flex column gap={2}>
          <SettingsHeader
            title="Custom settings"
            subtitle="These settings can be changed after creation"
          />
          <SettingsOption
            label="Project name"
            value={form.title}
            onEdit={() => onJumpTo(0)}
          />
          <SettingsOption
            label="Features enabled"
            value={form.features.join(', ')}
            onEdit={() => onJumpTo(0)}
          />
        </Flex>
      </Flex>
    </CustomStep>
  );
};

const SettingsHeader: FC<{
  title: string;
  subtitle: MicroMarkdownText;
}> = ({ title, subtitle }) => (
  <Flex column>
    <Typography variant="h6" color="text.primary">
      <b>{title}</b>
    </Typography>
    <Typography variant="body2" color="text.secondary">
      <MicroMarkdown text={subtitle} />
    </Typography>
  </Flex>
);

const SettingsOption: FC<{
  label: string;
  value: string;
  onEdit: () => void;
}> = ({ label, value, onEdit }) => (
  <Flex gap={2}>
    <Typography variant="body1" color="text.primary" whiteSpace="nowrap">
      {label}:
    </Typography>
    <ButtonBase
      disableRipple
      onClick={() => onEdit()}
      sx={{
        display: 'flex',
        gap: 1,
        color: 'primary.main',
        textAlign: 'left',
        '&:hover': {
          textDecoration: 'underline',
        },
      }}
    >
      <Typography variant="body1" component="span">
        <code>{value}</code>
      </Typography>
      <Edit fontSize="small" color="inherit" />
    </ButtonBase>
  </Flex>
);
