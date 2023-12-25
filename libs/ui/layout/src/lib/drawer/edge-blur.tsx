import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

export const RightEdgeBlur = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  right: 0,
  width: 20,
  bottom: 0,
  background:
    'linear-gradient(270deg, rgb(250, 203, 202) 20%, rgba(250, 203, 202, 0) 100%)',
  pointerEvents: 'none',
  zIndex: 1,
}));

export const LeftEdgeBlur = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  width: 20,
  background:
    'linear-gradient(270deg, rgba(250, 203, 202, 0) 0%, rgb(250, 203, 202) 100%)',
  pointerEvents: 'none',
  zIndex: 1,
}));

export const TopEdgeBlur = styled(Box)(({ theme }) => ({
  background:
    'linear-gradient(180deg, rgba(250,203,202,1) 10%, rgba(250,203,202,0) 100%)',
  position: 'absolute',
  bottom: -30,
  left: 0,
  right: 0,
  height: 30,
  zIndex: 10,
}));
