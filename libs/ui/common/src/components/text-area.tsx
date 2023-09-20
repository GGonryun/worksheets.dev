import { TextareaAutosize, styled } from '@mui/material';

export const TextArea = styled(TextareaAutosize)(
  ({ theme }) => `
    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 12px;
    border-radius: 12px 12px 0 12px;
    color: ${theme.palette.grey[900]};
    border: 1px solid ${theme.palette.grey[500]};
    &:hover {
      border-color: ${theme.palette.primary.main};
    }
    &:focus {
      border-color: ${theme.palette.primary.main};
      box-shadow: 0 0 0 3px ${
        theme.palette.mode === 'dark'
          ? theme.palette.primary.dark
          : theme.palette.primary.light
      };
    }
    // firefox
    &:focus-visible {
      outline: 0;
    }
  `
);
