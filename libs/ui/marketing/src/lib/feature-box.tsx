import { ArrowRightAlt } from '@mui/icons-material';
import { ButtonBase, Paper, Typography, Link, useTheme } from '@mui/material';
import { TinyLogo } from '@worksheets/ui-basic-style';
import { FC } from 'react';
import { growOnHoverMixin } from './mixins';
import { Flex } from '@worksheets/ui-core';

export const FeatureBox: FC<{
  title: string;
  description: string;
  logo: string;
  big?: boolean;
  beta?: boolean;
}> = ({ title, description, logo, big, beta }) => {
  const theme = useTheme();
  return (
    <ButtonBase
      disableRipple
      sx={{
        transform: big ? 'scale(1.10)' : 'scale(1.00)',
        backgroundColor: theme.palette.background.paper,
        ...growOnHoverMixin(big),
        '&:active': {
          backgroundColor: theme.palette.grey[200],
        },
        position: 'relative',
      }}
    >
      {beta && (
        <Flex
          sx={{
            position: 'absolute',
            bottom: -12,
            left: 'auto',
            right: 'auto',
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
      <Paper variant="outlined" sx={{ backgroundColor: 'transparent' }}>
        <Flex
          column
          alignItems="center"
          spaceBetween
          sx={{
            height: 340,
            width: 260,
            p: 3,
            pt: 4,
          }}
        >
          <Flex column alignItems="center">
            <Typography variant="h6" fontWeight={900}>
              {title}
            </Typography>
            <Typography
              variant="body2"
              textAlign="center"
              color="text.secondary"
            >
              {description}
            </Typography>
          </Flex>
          <Flex column alignItems="center" gap={3}>
            <TinyLogo borderless area={108} src={logo} />
            <Link href="/" color="inherit" underline="hover">
              <Flex gap={0.5}>
                <Typography variant="body2" fontWeight={900}>
                  Learn More
                </Typography>
                <ArrowRightAlt />
              </Flex>
            </Link>
          </Flex>
        </Flex>
      </Paper>
    </ButtonBase>
  );
};
