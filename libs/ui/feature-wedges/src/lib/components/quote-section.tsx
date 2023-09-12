import { Typography, Avatar } from '@mui/material';
import { TinyLogo } from '@worksheets/ui-basic-style';
import { FC } from 'react';
import { Flex } from '@worksheets/ui-core';
import { BackgroundColors } from '@worksheets/ui/common';
import { SectionLayout } from './section-layout';

export const QuoteSection: FC<{
  quote: string;
  speaker: string;
  title: string;
  avatar: string;
  centered?: boolean;
  backgroundColor: BackgroundColors;
  icon?: string;
}> = ({
  quote,
  speaker,
  title,
  avatar,
  centered = true,
  backgroundColor: color,
  icon,
}) => {
  return (
    <SectionLayout centered={centered} backgroundColor={color} py={6}>
      {icon && <TinyLogo borderless src={icon} area={32} />}
      <Typography
        textAlign={centered ? 'center' : 'left'}
        fontFamily="serif"
        variant="h6"
        pt={3}
      >
        <i>{quote}</i>
      </Typography>
      <Flex gap={1} alignItems="center" pt={3}>
        <Avatar src={avatar} sx={{ width: 40, height: 40 }} />
        <Flex column>
          <Typography variant="caption" fontWeight={900}>
            {speaker}
          </Typography>
          <Typography variant="caption">
            <i>{title}</i>
          </Typography>
        </Flex>
      </Flex>
    </SectionLayout>
  );
};
