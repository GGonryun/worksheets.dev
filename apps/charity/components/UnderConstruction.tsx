import { Box } from '@mui/material';
import { FC, ReactNode } from 'react';
import { ParagraphText, SmallHeaderText } from './Typography';
import { SubmissionButton } from './Buttons';
import { urls } from '@worksheets/ui-games';
import Image from 'next/image';
import { assets } from '../util/assets';

export const UnderConstruction: FC<{ children?: ReactNode }> = ({
  children,
}) => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: 2,
    }}
  >
    <SmallHeaderText>This Page is Under Construction</SmallHeaderText>
    <Image src={assets.art.construction} alt="TODO" width={200} height={200} />
    <ParagraphText>
      Please check back later or stay up to date with our progress by joining
      our newsletter.
    </ParagraphText>
    {children}
    <SubmissionButton href={urls.relative.contact}>
      Join newsletter
    </SubmissionButton>
  </Box>
);