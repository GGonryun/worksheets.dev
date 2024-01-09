import Box from '@mui/material/Box';
import PublishIcon from '@mui/icons-material/Publish';
import Button, { ButtonProps } from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { StickyContactBox } from '@worksheets/ui/qa-section';
import {
  BasicInformationSection,
  ExternalWebsiteSection,
  GameDetails,
  GameFiles,
  InteractionPreferences,
  MediaAssets,
  PurchaseOptions,
  EmbedOptions,
} from './sections';
import { FC, JSXElementConstructor } from 'react';
import { useGameSubmissionFormContext } from '../../form-context';
import DraftsIcon from '@mui/icons-material/Drafts';
import { SvgIconComponent } from '@mui/icons-material';
import { Typography } from '@mui/material';

export const SubmitGameForm: FC = () => {
  const { isValid, onSubmit, onUpdate } = useGameSubmissionFormContext();

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '100%', sm: '67% 30%' },
        justifyContent: 'space-around',
        gap: 3,
      }}
    >
      <Box
        sx={{
          order: { xs: 1, sm: 0 },
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
        }}
      >
        <BasicInformationSection />

        <ExternalWebsiteSection />

        <GameFiles />

        <EmbedOptions />

        <GameDetails />

        <MediaAssets />

        <PurchaseOptions />

        <InteractionPreferences />

        <Box display="flex" flexDirection="column" gap={1} mt={1}>
          <ErrorWarning />
          <Box display="flex" gap={2} flexWrap="wrap">
            <SubmitButton
              onClick={onSubmit}
              StartIcon={PublishIcon}
              disabled={!isValid}
            >
              Submit For Review
            </SubmitButton>
            <SubmitButton
              onClick={onUpdate}
              color="secondary"
              variant="outlined"
              StartIcon={DraftsIcon}
            >
              Save Draft
            </SubmitButton>
          </Box>

          <Typography variant="caption" color="text.secondary">
            You are allowed to edit your submission after it has been submitted.
            <br />
            Click the "Save Draft" button to save your progress and come back
            later.
          </Typography>
        </Box>
      </Box>

      <StickyContactBox
        text={
          'Need help with your game submission? Our team is standing by, ready to assist you.'
        }
      />
    </Box>
  );
};

const ErrorWarning = () => {
  const { errors } = useGameSubmissionFormContext();
  const errorMessages = Object.values(errors).filter(Boolean);
  return (
    <Box display={errorMessages.length ? 'block' : 'none'}>
      <Typography
        color="error"
        variant="body2"
        sx={{
          listStyleType: 'circle',
        }}
      >
        Fix the following errors before submitting your game.
      </Typography>
      <Box component="ul" m={0} py={0}>
        {errorMessages.map((error, i) => (
          <Typography component="li" key={i} variant="body3" color="error">
            {error}
          </Typography>
        ))}
      </Box>
    </Box>
  );
};

const SubmitButton = styled<
  JSXElementConstructor<
    Omit<ButtonProps, 'sx' | 'startIcon'> & {
      StartIcon: SvgIconComponent;
    }
  >
>(({ StartIcon, ...props }) => (
  <Button
    variant="contained"
    color="primary"
    size="large"
    startIcon={<StartIcon sx={{ mr: -0.5 }} />}
    {...props}
  />
))(({ theme }) => ({
  fontWeight: 700,
  padding: theme.spacing(0.5, 4),
  borderRadius: theme.shape.borderRadius * 6,
  width: '100%',
  fontFamily: theme.typography.body1.fontFamily,
  textTransform: 'none',
  [theme.breakpoints.up('sm')]: {
    width: 'fit-content',
  },
}));
