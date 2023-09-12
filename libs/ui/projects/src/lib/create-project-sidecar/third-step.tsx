import { TinyLogo, TinyToggle } from '@worksheets/ui-basic-style';
import { CustomStep } from './custom-step';
import { Flex } from '@worksheets/ui-core';
import { Typography, useTheme } from '@mui/material';
import { ProjectFeatures } from '@worksheets/schemas-projects';
import {
  projectFeatureIcons,
  projectFeatureLabels,
} from '../../util/constants';
import { FC, useState } from 'react';
import { PrimaryButton, SecondaryButton } from './buttons';

const toggleableFeatures: ProjectFeatures[] = [
  'connections',
  'services',
  'tasks',
  'converter',
  'vault',
  'events',
];

export const ThirdStep: FC<{
  initialValue: ProjectFeatures[];
  onContinue: (features: ProjectFeatures[]) => void;
  onPrevious: () => void;
}> = ({ initialValue, onContinue, onPrevious }) => {
  const theme = useTheme();
  const [features, setFeatures] = useState<ProjectFeatures[]>(initialValue);

  const handleSelectFeature = (feature: ProjectFeatures) => () => {
    if (features.includes(feature)) {
      setFeatures(features.filter((f) => f !== feature));
    } else {
      setFeatures([...features, feature]);
    }
  };

  return (
    <CustomStep
      title="**Third**"
      subtitle="enable __features__ for your project."
      description="You can enable or disable **features** at any time. **Upgrade** your account and unlock more features."
      actions={
        <>
          <SecondaryButton onClick={() => onPrevious()}>
            Previous
          </SecondaryButton>
          <PrimaryButton
            TooltipProps={{
              title: 'You must select at least one feature to continue.',
              disableHoverListener: !!features.length,
            }}
            onClick={() => onContinue(features)}
            disabled={!features.length}
          >
            Save
          </PrimaryButton>
        </>
      }
    >
      {toggleableFeatures.map((feature) => (
        <Flex
          key={feature}
          fullWidth
          spaceBetween
          sx={{
            '&:hover': {
              color: theme.palette.primary.main,
              cursor: 'pointer',
              textDecoration: 'underline',
            },
          }}
          onClick={handleSelectFeature(feature)}
        >
          <Flex gap={1}>
            <TinyLogo
              borderless
              key={feature}
              src={projectFeatureIcons[feature]}
              area={34}
            />
            <Typography variant="h6" fontWeight={900}>
              {projectFeatureLabels[feature]}
            </Typography>
          </Flex>
          <TinyToggle
            checked={features.includes(feature)}
            onClick={handleSelectFeature(feature)}
          >
            {features.includes(feature) ? 'Selected' : 'Enable'}
          </TinyToggle>
        </Flex>
      ))}
    </CustomStep>
  );
};
