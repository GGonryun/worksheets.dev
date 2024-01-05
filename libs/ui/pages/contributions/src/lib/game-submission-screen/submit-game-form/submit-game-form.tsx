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
import { useFormContext } from './context';

export const SubmitGameForm: FC = () => {
  const { onSubmit } = useFormContext();

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

        <SubmitButton onClick={onSubmit}>Save & Submit</SubmitButton>
      </Box>

      <StickyContactBox
        text={
          'Need help with your game submission? Our team is standing by, ready to assist you.'
        }
      />
    </Box>
  );
};

const SubmitButton = styled<JSXElementConstructor<Omit<ButtonProps, 'sx'>>>(
  (props) => (
    <Button
      variant="contained"
      color="primary"
      size="large"
      startIcon={<PublishIcon sx={{ mr: -0.5 }} />}
      sx={{
        mt: 3,
        px: 4,
        py: 0.5,
        borderRadius: 6,
        width: 'fit-content',
        fontFamily: (theme) => theme.typography.body1.fontFamily,
        textTransform: 'none',
        fontWeight: 700,
      }}
      {...props}
    />
  )
)(({ theme }) => ({
  fontWeight: 700,
  padding: theme.spacing(0.5, 4),
  marginTop: theme.spacing(3),
  borderRadius: theme.shape.borderRadius * 6,
  width: 'fit-content',
  fontFamily: theme.typography.body1.fontFamily,
  textTransform: 'none',
}));
