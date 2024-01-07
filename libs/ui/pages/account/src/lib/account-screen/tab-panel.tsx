import Box from '@mui/material/Box';
import { FC } from 'react';

export type TabPanelProps = {
  children?: React.ReactNode;
  target: string;
  current: string;
};

export const TabPanel: FC<TabPanelProps> = (props: TabPanelProps) => {
  const { children, target, current, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={target !== current}
      id={`settings-tabpanel-${target}`}
      aria-labelledby={`settings-tab-${target}`}
      {...other}
    >
      {target === current && <Box sx={{ p: { xs: 2, sm: 4 } }}>{children}</Box>}
    </div>
  );
};
