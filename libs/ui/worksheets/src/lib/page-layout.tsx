import { Box, Button, ButtonProps, Divider, Typography } from '@mui/material';
import React, { ReactNode } from 'react';

export const PageLayout: React.FC<{
  title: string;
  primary?: ButtonProps;
  secondary?: ButtonProps;
  tertiary?: ButtonProps;
  children: ReactNode;
}> = ({ title, primary, secondary, tertiary, children }) => {
  return (
    <>
      <Box paddingTop={1.25} paddingBottom={1} px={3} display="flex" gap={6}>
        <Typography variant="h6">{title}</Typography>
        <Box display="flex" gap={3}>
          {primary && <Button {...primary} />}
          {secondary && <Button {...secondary} />}
          {tertiary && <Button {...tertiary} />}
        </Box>
      </Box>
      <Divider />
      {children}
    </>
  );
};
