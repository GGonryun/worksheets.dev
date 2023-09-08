import { Settings } from '@mui/icons-material';
import {
  IconButton,
  darken,
  Divider,
  styled,
  IconButtonProps,
} from '@mui/material';
import { Flex } from '@worksheets/ui-core';
import { FC } from 'react';

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  // rotation animation on hover
  transition: 'transform 0.2s ease-in-out',
  '&:hover': {
    // rotate 45deg on hover
    transform: 'rotate(45deg)',
    backgroundColor: theme.palette.grey[300],
    // change color on hover
    '& .MuiSvgIcon-root': {
      color: darken(theme.palette.primary.dark, 0.2),
    },
  },
  '&:active': {
    // make background color darker on click
    backgroundColor: theme.palette.grey[400],
    transform: 'rotate(-45deg)',
  },
}));

export const ProjectSettingsButton: FC<Pick<IconButtonProps, 'onClick'>> = ({
  onClick,
}) => {
  return (
    <Flex gap={2}>
      <Divider orientation="vertical" sx={{ height: 25 }} />
      <StyledIconButton
        size="small"
        disableTouchRipple
        onClick={(e) => {
          onClick && onClick(e);
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <Settings fontSize="small" />
      </StyledIconButton>
    </Flex>
  );
};
