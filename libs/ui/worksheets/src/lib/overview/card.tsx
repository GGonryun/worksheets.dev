import { ArrowRight, PriorityHigh } from '@mui/icons-material';
import { Card, CardActionArea, Typography, Divider } from '@mui/material';
import { Flex } from '@worksheets/ui-core';
import { useLayout } from '@worksheets/ui/common';
import Image from 'next/image';
import { FC } from 'react';

export type OverviewCardProps = {
  title: string;
  subtitle: string;
  src: string;
  href?: string;
  color?: string;
  beta?: boolean;
};
export const OverviewCard: FC<OverviewCardProps> = ({
  title,
  subtitle,
  src,
  href,
  color,
  beta,
}) => {
  const { isMobile, theme } = useLayout();
  return (
    <Card
      elevation={0}
      variant="outlined"
      sx={{ width: '100%', position: 'relative' }}
    >
      <CardActionArea href={href ?? ''} disabled={!href}>
        {beta && (
          <Flex
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
              borderRadius: 1,
              px: 0.5,
              py: 0.25,
            }}
          >
            <Typography variant="caption" fontWeight={900}>
              coming soon
            </Typography>
          </Flex>
        )}
        <Flex column>
          <Flex
            centered
            p={3}
            sx={{
              backgroundColor: color,
            }}
          >
            <Image
              src={src}
              alt={`Marketing image for ${title}`}
              height={72}
              width={72}
              style={{
                height: 'auto',
                width: 'auto',
                maxHeight: isMobile ? '80px' : '140px',
              }}
            />
          </Flex>

          <Divider />
          <Flex spaceBetween px={3} py={2}>
            <Flex column>
              <Typography variant="h6">{title}</Typography>
              <Typography variant="caption" color="text.secondary">
                {subtitle}
              </Typography>
            </Flex>
            {href ? (
              <ArrowRight color="action" fontSize="large" />
            ) : (
              <PriorityHigh color="action" />
            )}
          </Flex>
        </Flex>
      </CardActionArea>
    </Card>
  );
};
