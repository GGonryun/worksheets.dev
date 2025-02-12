import Box from '@mui/material/Box';
import { FC } from 'react';

type TabPanelProps = {
  children?: React.ReactNode;
  target: string;
  current: string;
};

export const TabPanel: FC<TabPanelProps> = (props: TabPanelProps) => {
  const { children, target, current } = props;

  return (
    <Box
      className={`tab-panel`}
      role="tabpanel"
      hidden={target !== current}
      id={`settings-tabpanel-${target}`}
      aria-labelledby={`settings-tab-${target}`}
    >
      {target === current && <Box sx={{ p: { xs: 2, sm: 4 } }}>{children}</Box>}
    </Box>
  );
};
