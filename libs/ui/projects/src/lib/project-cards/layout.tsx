import { CardActionArea } from '@mui/material';
import { FC, ReactNode } from 'react';
import { CustomCard } from './custom-card';

export const ProjectCardLayout: FC<{
  onClick?: () => void;
  children: ReactNode;
  disabled?: boolean;
}> = ({ children, onClick, disabled }) => {
  return (
    <CustomCard variant="outlined">
      <CardActionArea disabled={disabled} onClick={() => onClick && onClick()}>
        {children}
      </CardActionArea>
    </CustomCard>
  );
};
