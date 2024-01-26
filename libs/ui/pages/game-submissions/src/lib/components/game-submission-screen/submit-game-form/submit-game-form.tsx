import DraftsIcon from '@mui/icons-material/Drafts';
import PublishIcon from '@mui/icons-material/Publish';
import { CircularProgress, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { FC } from 'react';

import { useGameSubmissionFormContext } from '../../form-context';
import {
  BasicInformationSection,
  EmbedOptions,
  ExternalWebsiteSection,
  GameDetails,
  GameFiles,
  InteractionPreferences,
  MediaAssets,
  PurchaseOptions,
} from './sections';

export const SubmitGameForm: FC = () => {
  const { loading, isValid, isUpdated, onSubmit, onUpdate } =
    useGameSubmissionFormContext();

  return (
    <Box>
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
            <Button
              variant="arcade"
              color="primary"
              onClick={onSubmit}
              startIcon={
                loading ? (
                  <CircularProgress color="inherit" size="1rem" />
                ) : (
                  <PublishIcon />
                )
              }
              disabled={!isValid || loading}
            >
              Submit For Review
            </Button>
            <Button
              onClick={onUpdate}
              disabled={!isUpdated || loading}
              color="secondary"
              variant="arcade"
              startIcon={
                loading ? (
                  <CircularProgress color="inherit" size="1rem" />
                ) : (
                  <DraftsIcon />
                )
              }
            >
              Save Draft
            </Button>
          </Box>
          <Typography variant="caption" color="text.secondary">
            You are allowed to edit your submission after it has been submitted.
            <br />
            Click the "Save Draft" button to save your progress and come back
            later.
          </Typography>
        </Box>
      </Box>
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
