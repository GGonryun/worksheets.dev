import { Box } from '@mui/material';
import { FC, ReactNode, useState } from 'react';
import Image from 'next/image';
import { assets } from '../util/assets';
import { NewsletterPopup } from './NewsletterPopup';
import {
  SmallHeaderText,
  ParagraphText,
  SubmissionButton,
} from '@worksheets/ui-charity';

export const UnderConstruction: FC<{ children?: ReactNode }> = ({
  children,
}) => {
  const [showNewsletterPopup, setShowNewsletterPopup] = useState(false);
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: 2,
        }}
      >
        <SmallHeaderText>This Page is Under Construction</SmallHeaderText>
        <Image
          src={assets.art.construction}
          alt="TODO"
          width={200}
          height={200}
        />
        <ParagraphText>
          Please check back later or stay up to date with our progress by
          joining our newsletter.
        </ParagraphText>
        {children}
        <SubmissionButton onClick={() => setShowNewsletterPopup(true)}>
          Join newsletter
        </SubmissionButton>
      </Box>
      <NewsletterPopup
        open={showNewsletterPopup}
        onClose={() => setShowNewsletterPopup(false)}
        onIgnore={() => setShowNewsletterPopup(false)}
      />
    </>
  );
};
