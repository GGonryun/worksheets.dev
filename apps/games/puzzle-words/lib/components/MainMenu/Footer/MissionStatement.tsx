import { Typography } from '@mui/material';
import { TextButton } from '../../TextButton';
import { FC } from 'react';
import { FooterProps } from './Footer';

export const MissionStatement: FC<FooterProps> = ({
  onShowMissionStatement,
}) => (
  <TextButton onClick={onShowMissionStatement}>
    <Typography variant="body1">Our Mission</Typography>
  </TextButton>
);
