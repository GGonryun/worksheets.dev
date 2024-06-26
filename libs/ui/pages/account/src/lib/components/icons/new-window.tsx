import { createSvgIcon } from '@mui/material';

const name = 'NewWindow';

const NewWindow = createSvgIcon(
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path
      fill="none"
      stroke="#000000"
      strokeWidth="2"
      d="M11,9 L19,9 M15,13 L15,5 M17,17 L17,23 L1,23 L1,7 L1,7 L7,7 M7,1 L23,1 L23,17 L7,17 L7,1 Z"
    />
  </svg>,
  name
);
export default NewWindow;
