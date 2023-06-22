import { Box } from '@mui/material';

export interface TabPanelProps<T> {
  children?: React.ReactNode;
  index: number;
  value: T;
}

export function TabPanel<T>(props: TabPanelProps<T>) {
  const { children, value, index } = props;
  if (value !== index) {
    return null;
  }
  return <Box height="100%">{value === index && children}</Box>;
}

export function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
