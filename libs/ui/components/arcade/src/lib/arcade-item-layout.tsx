import { SvgIconComponent } from '@mui/icons-material';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { FillImage } from '@worksheets/ui/components/images';
import { PLACEHOLDER_LOGO_PATH } from '@worksheets/util/assets';
import React, { ReactNode } from 'react';

export const ArcadeItemLayout: React.FC<{
  href: string;
  name: ReactNode;
  caption: string;
  imageUrl: string;
  icon?: SvgIconComponent;
}> = ({ name, href, caption, imageUrl, icon }) => {
  const [hover, setHover] = React.useState(false);

  return (
    <Box
      component="a"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      href={href}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        textDecoration: 'none',
        gap: 1.25,
        transition: 'all 0.5s ease',
        transform: hover ? 'scale(1.025)' : 'scale(1)',
      }}
    >
      <Box
        sx={{
          position: 'relative',
          boxSizing: 'border-box',
          backgroundColor: (theme) => theme.palette.background.soft,
          borderRadius: (theme) => theme.shape.borderRadius,
          aspectRatio: '1/1',
          cursor: 'pointer',
          boxShadow: (theme) => (hover ? theme.shadows[10] : theme.shadows[4]),
          transform: hover ? 'scale(1.025)' : 'scale(1)',
          transition: 'all 0.5s ease',
        }}
      >
        <FillImage
          placeholder="blur"
          blurDataURL={PLACEHOLDER_LOGO_PATH}
          src={imageUrl}
          alt={`Logo`}
          priority
          style={{
            overflow: 'hidden',
            borderRadius: 'inherit',
          }}
        />
      </Box>
      <Box textAlign="center">
        <Typography
          color="text.arcade"
          sx={{
            pb: 0.25,
            typography: { xs: 'body2', sm: 'body1' },
            fontWeight: { xs: 700, sm: 700 },
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textDecoration: hover ? 'underline' : 'none',
            textDecorationColor: 'text.arcade',
          }}
        >
          {icon && (
            <Box
              component={icon}
              sx={{
                fontSize: { xs: '1rem', sm: '1.25rem' },
                mb: { xs: '-2px', sm: '-4px' },
                mr: { xs: 0.5, sm: 1 },
              }}
            />
          )}
          {name}
        </Typography>

        <Typography
          sx={{
            color: 'text.arcade',
            typography: 'body3',
            fontWeight: 500,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: { xs: 0.5, sm: 1 },
          }}
        >
          {caption}
        </Typography>
      </Box>
    </Box>
  );
};

export type ArcadeItemLayoutProps = React.ComponentProps<
  typeof ArcadeItemLayout
>;
