import {
  AccessTimeOutlined,
  Star,
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
  name: string;
  frequency?: string;
  expiration?: string;
  loot?: { item: { name: string }; quantity: number }[];
}> = ({ onClick, color, Icon, name, frequency, expiration, loot }) => {
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
      <Box
        sx={{
          display: 'flex',
          gap: 1,
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: isMobile ? 'flex-start' : 'center',
        }}
      >
        <Row gap={1} alignItems="flex-start">
          <Box>
            <Button
              variant="square"
              color={color}
              size={isMobile ? 'small' : 'large'}
              sx={{ p: 0.75 }}
            >
              <Icon fontSize={isMobile ? 'medium' : 'large'} />
            </Button>
          </Box>
          <Column>
            <Typography
              variant={isMobile ? 'body1' : 'h6'}
              fontWeight={700}
              mb={isMobile ? '0px' : '-4px'}
            >
              {name}
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
            {loot && (
              <Row gap={0.5}>
                <Star fontSize="small" color={'primary'} />
                <Typography
                  fontWeight={500}
                  variant="body3"
                  width={120}
                  sx={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {loot.length > 1 ? (
                    <i>Multiple Items</i>
                  ) : loot.length < 1 ? (
                    <i>No Items</i>
                  ) : (
                    `${loot[0].quantity}x ${pluralize(
                      loot[0].item.name,
                      loot[0].quantity
                    )}`
                  )}
                </Typography>
              </Row>
            )}
          </Column>
        </Row>
      </Box>
    </Box>
  );
};
