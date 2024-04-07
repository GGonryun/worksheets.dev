import { Typography } from '@mui/material';
import { ReactNode } from 'react';

export type TitleTextProps = {
  icon?: ReactNode;
  title: string;
};

export const TitleText: React.FC<TitleTextProps> = ({ icon, title }) => (
  <Typography
    sx={{
      display: 'flex',
      alignItems: 'center',
      gap: 1,
    }}
  >
    {icon && icon}
    <strong>{title}</strong>
  </Typography>
);
