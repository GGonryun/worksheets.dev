import {
  AccessTimeOutlined,
  LocalActivityOutlined,
  SvgIconComponent,
} from '@mui/icons-material';
import { alpha, Box, Button, Typography } from '@mui/material';
import { Column, Row } from '@worksheets/ui/components/flex';
import { useMediaQueryDown } from '@worksheets/ui/hooks/use-media-query';
import { PaletteColor } from '@worksheets/ui/theme';
import pluralize from 'pluralize';
import React from 'react';

export const QuestItemLayout: React.FC<{
  onClick?: () => void;
  color: PaletteColor;
  Icon: SvgIconComponent;
  title: string;
  frequency?: string;
  expiration?: string;
  reward?: number;
}> = ({ onClick, color, Icon, title, frequency, expiration, reward }) => {
  const isMobile = useMediaQueryDown('sm');
  return (
    <Box
      onClick={onClick}
      sx={{
        cursor: onClick ? 'pointer' : 'default',
        p: 1,
        border: (theme) => `3px solid ${alpha(theme.palette[color].main, 0.6)}`,
        borderRadius: (theme) => theme.shape.borderRadius,
        transition: 'all 0.3s',
        '&:hover': onClick
          ? {
              backgroundColor: (theme) => alpha(theme.palette[color].main, 0.1),
              transform: 'scale(1.01)',
            }
          : {},
        '&:active': onClick
          ? {
              transform: 'scale(0.99)',
            }
          : {},
      }}
    >
      <Row justifyContent="space-between" flexWrap={'wrap'} gap={1}>
        <Row gap={1}>
          <Button
            variant="square"
            color={color}
            size={isMobile ? 'small' : 'large'}
          >
            <Icon fontSize={isMobile ? 'small' : 'medium'} />
          </Button>
          <Column>
            <Typography
              variant={isMobile ? 'body1' : 'h6'}
              fontWeight={700}
              mb={isMobile ? '0px' : '-4px'}
            >
              {title}
            </Typography>
            {frequency && (
              <Typography
                variant="body3"
                color={(theme) => theme.palette[color].main}
                fontWeight={700}
              >
                {frequency}
              </Typography>
            )}
          </Column>
        </Row>
        <Row gap={2} minWidth={120}>
          <Column gap={0.5}>
            {expiration && (
              <Row gap={0.5}>
                <AccessTimeOutlined fontSize="small" />
                <Typography fontWeight={500} variant="body3">
                  {expiration}
                </Typography>
              </Row>
            )}
            {reward && (
              <Row gap={0.5}>
                <LocalActivityOutlined fontSize="small" />
                <Typography fontWeight={500} variant="body3">
                  {reward} {pluralize('Token', reward)}
                </Typography>
              </Row>
            )}
          </Column>
        </Row>
      </Row>
    </Box>
  );
};
