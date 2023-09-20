import { ButtonBase } from '@mui/material';
import { Menu } from '@mui/icons-material';

export const Options = () => {
  return (
    <ButtonBase
      onClick={() => {
        alert('test');
      }}
    >
      <Menu fontSize="small" />
    </ButtonBase>
  );
};
