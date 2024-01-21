import {
  AccessTime,
  Check,
  CheckCircle,
  QuestionMark,
  SvgIconComponent,
} from '@mui/icons-material';
import {
  Paper,
  Theme,
  Tooltip,
  Typography,
  useMediaQuery,
} from '@mui/material';
import Box from '@mui/material/Box';
import { ColoredSteamGames } from '@worksheets/icons/companies';
import { ContainImage } from '@worksheets/ui/images';
import { daysFromNow, printTimeRemaining } from '@worksheets/util/time';
import React from 'react';

import { PrizeSchema } from '../../types/prizes';

const companyLogos: Record<PrizeSchema['company'], SvgIconComponent> = {
  'steam-games': ColoredSteamGames,
  'epic-games': QuestionMark,
};

export const Prize: React.FC<PrizeSchema> = ({
  id,
  title,
  expires,
  company,
  value,
  entered,
  imageUrl,
}) => {
  const [hover, setHover] = React.useState(false);
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('sm')
  );

  const soon = expires < daysFromNow(1).getTime();
  const expired = expires < Date.now();

  const CompanyLogo = companyLogos[company];

  return (
    <Box
      component="a"
      href={`/prizes/${id}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        textDecoration: 'none',
        gap: { xs: 1, sm: 1.5, md: 1.75 },
      }}
    >
      <Tooltip
        disableHoverListener={!entered}
        title={
          <Typography
            variant="body1"
            textTransform="uppercase"
            fontWeight={700}
          >
            {entered} Raffle Ticket{entered > 1 ? 's' : ''} Entered
          </Typography>
        }
        placement="top"
        arrow
      >
        <Paper
          elevation={0}
          sx={{
            position: 'relative',
            boxSizing: 'border-box',
            border: entered
              ? (theme) => `5px solid ${theme.palette.success.main} !important`
              : undefined,
            backgroundColor: (theme) => theme.palette.background.soft,
            borderRadius: (theme) => theme.shape.borderRadius,
            aspectRatio: '1/1',
            cursor: 'pointer',
            p: { xs: 1, sm: 2 },
            display: 'flex',
            flexDirection: 'column',
            transform: hover ? 'scale(1.05)' : 'scale(1)',
            boxShadow: (theme) =>
              hover ? theme.shadows[10] : theme.shadows[0],
            transition: 'all 0.5s ease',
            overflow: 'hidden',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                gap: 0.5,
                alignItems: 'center',
              }}
            >
              {expired ? (
                <CheckCircle
                  color="success"
                  fontSize={isMobile ? 'small' : 'medium'}
                />
              ) : (
                <AccessTime
                  color="action"
                  fontSize={isMobile ? 'small' : 'medium'}
                />
              )}
              <Typography
                color={
                  expired
                    ? 'success.main'
                    : soon
                    ? 'primary.main'
                    : 'text.secondary'
                }
                sx={{
                  typography: {
                    xs: 'body3',
                    sm: 'body2',
                  },
                  fontWeight: {
                    xs: 700,
                    sm: 700,
                  },
                }}
              >
                {expired ? 'Complete!' : printTimeRemaining(expires)}
              </Typography>
            </Box>
            <CompanyLogo fontSize={isMobile ? 'small' : 'medium'} />
          </Box>
          <Box
            position="relative"
            flexGrow={1}
            sx={{
              m: isMobile ? 1 : 2,
              // on hover make the image bigger
              transform: hover ? 'scale(1.1)' : 'scale(1)',
              transition: 'transform 0.5s ease',
            }}
          >
            <ContainImage src={imageUrl} alt={title} />
          </Box>
          {!!entered && <CornerArrow />}
        </Paper>
      </Tooltip>
      <Box textAlign="center">
        <Typography
          color="text.arcade"
          sx={{
            typography: { xs: 'h6', sm: 'h5' },
            fontWeight: { xs: 500, sm: 500 },
            fontSize: { xs: '1rem', sm: '1.25rem' },
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textDecoration: hover ? 'underline' : 'none',
            textDecorationColor: 'text.arcade',
          }}
        >
          {title}
        </Typography>

        <Typography
          variant="body2"
          color="success.main"
          fontWeight={700}
          fontSize={{
            xs: '0.875rem',
            sm: '1rem',
          }}
        >
          ${value} Value
        </Typography>
      </Box>
    </Box>
  );
};

const CornerArrow = () => (
  <>
    <Box
      sx={{
        position: 'absolute',
        width: 0,
        height: 0,
        right: 12,
        bottom: 0,
        // rotate clockwise 45deg
        transform: 'rotate(45deg)',
        // translate to the bottom right corner
        transformOrigin: 'bottom left',
        borderTop: '40px solid transparent',
        borderBottom: '40px solid transparent',
        backgroundColor: (theme) => theme.palette.success.main,
        borderLeft: (theme) => `40px solid ${theme.palette.success.main}`,
      }}
    />
    <Box
      sx={{
        position: 'absolute',
        right: 2,
        bottom: 2,
      }}
    >
      <Check
        color="white"
        sx={{
          stroke: '#FFF',
          strokeWidth: 2,
        }}
      />
    </Box>
  </>
);

export type PrizeProps = React.ComponentProps<typeof Prize>;
