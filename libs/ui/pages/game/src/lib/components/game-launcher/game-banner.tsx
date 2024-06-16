import {
  CheckCircleOutline,
  Close,
  ErrorOutline,
  Fullscreen,
  FullscreenExit,
  InfoOutlined,
  NotificationsActiveOutlined,
  NotificationsOutlined,
  PlayArrow,
  SvgIconComponent,
  ThumbDownAlt,
  ThumbDownOffAlt,
  ThumbUpAlt,
  ThumbUpOffAlt,
  WarningAmberOutlined,
} from '@mui/icons-material';
import {
  AlertColor,
  Box,
  BoxProps,
  dividerClasses,
  IconButton,
  IconButtonProps,
  lighten,
  Link,
  ListItemIcon,
  ListItemText,
  Menu,
  menuClasses,
  MenuItem,
  menuItemClasses,
  styled,
  Typography,
  TypographyProps,
} from '@mui/material';
import { routes } from '@worksheets/routes';
import { ResponsiveImage } from '@worksheets/ui/components/images';
import { shorthandNumber } from '@worksheets/util/numbers';
import {
  CastVote,
  DeveloperSchema,
  SerializableGameSchema,
  Vote,
} from '@worksheets/util/types';
import React, { FC, JSXElementConstructor, useState } from 'react';

import { useGameNotifications } from '../../containers/use-game-notifications';
import { useDeviceInformation } from '../../hooks/use-device-information';

export type GameBannerProps = {
  developer: DeveloperSchema;
  isFullscreen: boolean;
  isMobileOrTablet: boolean;
  userVote?: Vote;
  game: SerializableGameSchema;
  onFullscreen?: () => void;
  onVote: (vote: CastVote['vote']) => void;
};

export const GameBanner: FC<GameBannerProps> = ({
  developer,
  isFullscreen,
  isMobileOrTablet,
  game,
  userVote,
  onFullscreen,
  onVote,
}) => {
  const { notifications, active, show, showing, remove } =
    useGameNotifications();
  const [anchor, setAnchor] = useState<HTMLButtonElement | null>(null);
  const { canPlay } = useDeviceInformation(game.viewport);
  const isFullScreenAndHandheld = isMobileOrTablet && isFullscreen;
  const height = isFullScreenAndHandheld ? '36px' : { xs: '64px', sm: '80px' };

  return (
    <Box
      sx={{
        display: 'flex',
        mt: isFullscreen ? 0 : { xs: 1, sm: 2 },
        height: height,
        minHeight: height,
        maxHeight: height,
        boxSizing: 'border-box',
        userSelect: 'none',
        gap: { xs: 0.5, sm: 1 },
      }}
    >
      {!isFullScreenAndHandheld && (
        <Box
          sx={{
            aspectRatio: '1 / 1',
            padding: 1,
          }}
        >
          <ResponsiveImage
            priority
            alt={`${game.name} logo`}
            src={game.iconUrl}
            style={{
              aspectRatio: '1 / 1',
              borderRadius: '10px',
              overflow: 'hidden',
            }}
          />
        </Box>
      )}
      <Box
        display="flex"
        alignItems="center"
        flex={1}
        justifyContent="space-between"
        px={{ xs: 1, sm: 2 }}
      >
        <Box
          minWidth={0}
          sx={{
            visibility: isFullScreenAndHandheld ? 'hidden' : 'visible',
            '& > h6': {
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            },
          }}
        >
          <Typography
            color="text.blue.light"
            typography={{ xs: 'h5', sm: 'h4' }}
            component="h6"
          >
            {game.name}
          </Typography>
          <Typography
            typography={{ xs: 'body3', sm: 'body2' }}
            component={Link}
            color={(theme) => theme.palette.text.blue.light}
            sx={{
              fontWeight: 500,
            }}
            underline="hover"
            href={routes.developer.path({
              params: {
                developerId: developer.id,
              },
            })}
          >
            by {developer.name}
          </Typography>
        </Box>

        <Box display="flex" alignItems="flex-start" gap={{ xs: 1, sm: 2 }}>
          <ActionBox hidden={isMobileOrTablet}>
            <ActionButton disabled>
              <PlayArrow color="info" />
            </ActionButton>
            <ActionText>{shorthandNumber(game.plays)}</ActionText>
          </ActionBox>
          <ActionBox hidden={isMobileOrTablet}>
            <ActionButton onClick={() => onVote('up')}>
              {userVote != null && userVote === 'up' ? (
                <ThumbUpAlt />
              ) : (
                <ThumbUpOffAlt />
              )}
            </ActionButton>
            <ActionText>{shorthandNumber(game.likes)}</ActionText>
          </ActionBox>
          <ActionBox hidden={isMobileOrTablet}>
            <ActionButton onClick={() => onVote('down')}>
              {userVote != null && userVote === 'down' ? (
                <ThumbDownAlt />
              ) : (
                <ThumbDownOffAlt />
              )}
            </ActionButton>
            <ActionText>{shorthandNumber(game.dislikes)}</ActionText>
          </ActionBox>

          {canPlay && (
            <ActionButton onClick={onFullscreen}>
              {isFullscreen ? <FullscreenExit /> : <Fullscreen />}
            </ActionButton>
          )}

          <ActionButton
            disabled={!notifications.length}
            onClick={(e) => {
              show(true);
              setAnchor(e.currentTarget);
            }}
          >
            <Notifications active={active} />
          </ActionButton>
          <Menu
            container={document.fullscreenElement ?? document.body}
            anchorOrigin={{
              vertical: 2,
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            slotProps={{
              paper: {
                elevation: 8,
              },
            }}
            open={showing}
            onClose={() => show(false)}
            anchorEl={anchor}
            sx={{
              [`&.${menuClasses.paper}`]: {
                border: (theme) => `2px solid ${theme.palette.divider}`,
              },
              [`& .${menuClasses.list}`]: {
                padding: 0,
                margin: 0,
              },
              [`& .${dividerClasses.root}`]: {
                margin: 0,
              },
            }}
          >
            {notifications.map((notification, index) => (
              <MenuItem
                dense={isMobileOrTablet}
                key={index}
                onClick={() => {
                  remove(notification.id);
                }}
                sx={{
                  [`&.${menuItemClasses.root}`]: {
                    color: (theme) => theme.palette[notification.color].dark,
                    backgroundColor: (theme) =>
                      lighten(theme.palette[notification.color].main, 0.9),
                    fontWeight: 500,
                    // not last child has a border bottom
                    '&:not(:last-child)': {
                      borderBottom: (theme) =>
                        `1px solid ${theme.palette.divider}`,
                    },
                  },
                }}
              >
                <ListItemIcon>
                  <NotificationIcon color={notification.color} />
                </ListItemIcon>
                <ListItemText>{notification.text}</ListItemText>
                <Close fontSize="small" sx={{ ml: 1 }} />
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Box>
    </Box>
  );
};

const NOTIFICATION_ICON: Record<AlertColor, SvgIconComponent> = {
  warning: WarningAmberOutlined,
  success: CheckCircleOutline,
  info: InfoOutlined,
  error: ErrorOutline,
};

const NotificationIcon: React.FC<{ color: AlertColor }> = ({ color }) => {
  const Icon = NOTIFICATION_ICON[color];
  return <Icon fontSize="small" color={color} />;
};

const Notifications: React.FC<{ active: boolean }> = ({ active }) => {
  const Icon = active ? NotificationsActiveOutlined : NotificationsOutlined;
  return (
    <Icon
      color={active ? 'error' : 'info'}
      sx={{
        animation: active ? 'shake 0.25s infinite' : 'none',
        // the animation shake.
        '@keyframes shake': {
          '0%': {
            transform: 'rotate(0deg)',
          },
          '25%': {
            transform: 'rotate(5deg)',
          },
          '50%': {
            transform: 'rotate(0deg)',
          },
          '75%': {
            transform: 'rotate(-5deg)',
          },
          '100%': {
            transform: 'rotate(0deg)',
          },
        },
      }}
    />
  );
};

const ActionButton = styled<JSXElementConstructor<IconButtonProps>>((props) => (
  <IconButton size="small" {...props} />
))(({ theme }) => ({
  color: theme.palette.text.blue.light,
}));

const ActionBox = styled<JSXElementConstructor<BoxProps & { hidden: boolean }>>(
  (props) => <Box {...props} />
)(({ hidden }) => ({
  display: hidden ? 'none' : 'flex',
  alignItems: 'center',
  flexDirection: 'column',
}));

const ActionText = styled<JSXElementConstructor<TypographyProps>>((props) => (
  <Typography variant="body2" {...props} />
))(({ theme }) => ({
  color: theme.palette.text.blue.light,
  fontWeight: 500,
}));
