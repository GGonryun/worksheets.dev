import { ArrowRight } from '@mui/icons-material';
import { Paper, Typography, Box, useTheme, Divider } from '@mui/material';
import { Flex } from '@worksheets/ui-core';
import { StandardProductButton } from './product-buttons';
import { FC, ReactNode } from 'react';

export const MarketingSection: FC<{
  title: string;
  description: string;
  action?: {
    text: string;
    href: string;
  };
  children: ReactNode;
  footer?: ReactNode;
}> = ({ title, description, action, children, footer }) => {
  const theme = useTheme();
  return (
    <Paper variant="outlined" sx={{ width: '100%', minHeight: 320 }}>
      <Flex fullWidth column alignItems="center" py={6} px={3} gap={2}>
        <Typography variant="h4" fontWeight={900} textAlign="center">
          {title}
        </Typography>
        <Typography
          variant="body2"
          maxWidth={720}
          textAlign="center"
          color="text.secondary"
          whiteSpace="pre-line"
        >
          {description}
        </Typography>

        {children}

        {action && (
          <StandardProductButton
            endIcon={<ArrowRight />}
            href={action.href}
            sx={{
              mt: 3,
              pl: 3,
              width: 200,
            }}
          >
            {action.text}
          </StandardProductButton>
        )}
      </Flex>
      {footer && (
        <>
          <Divider />
          <Box sx={{ backgroundColor: theme.palette.grey[100] }}>{footer}</Box>
        </>
      )}
    </Paper>
  );
};
