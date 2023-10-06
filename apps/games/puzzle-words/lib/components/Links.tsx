import { Link } from '@mui/material';
import { urls } from '../urls';
import { FC, ReactNode } from 'react';

export const WorksheetsLink = () => (
  <Link href={urls.worksheets()}>Worksheets.dev</Link>
);

export const ContactLink: FC<{ children: ReactNode }> = ({ children }) => (
  <Link href={urls.contact()}>{children}</Link>
);

export const SubscribeLink: FC<{ children: ReactNode }> = ({ children }) => (
  <Link href={urls.subscribe()}>{children}</Link>
);
