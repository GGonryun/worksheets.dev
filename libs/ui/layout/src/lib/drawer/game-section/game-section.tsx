import { FC, ReactNode } from 'react';
import { ArrowUpRight } from '@worksheets/ui/icons';
import { ItemCarousel } from '../item-carousel';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material';

export type GameSectionProps = {
  title: string;
  href?: string;
  children?: ReactNode;
};
export const GameSection: FC<GameSectionProps> = ({
  title,
  children,
  href,
}) => {
  return (
    <Box>
      <SectionWrapper href={href}>
        <SectionText variant="h4">
          {title}
          <ArrowUpRight
            sx={{ fontSize: 'inherit', display: href ? 'block' : 'none' }}
          />
        </SectionText>
      </SectionWrapper>
      <ItemCarousel sx={{ gap: 2, px: 2 }}>{children}</ItemCarousel>
    </Box>
  );
};

const SectionWrapper: FC<{ href?: string; children: ReactNode }> = ({
  href,
  children,
}) => {
  if (href)
    return (
      <Link underline="hover" color="inherit" href={href}>
        {children}
      </Link>
    );

  return <Box>{children}</Box>;
};

const SectionText = styled(Typography)(({ theme }) => ({
  marginLeft: theme.spacing(2),
  userSelect: 'none',
  display: 'flex',
  gap: theme.spacing(1),
  alignItems: 'center',
  fontSize: '1.5rem',
  [theme.breakpoints.up('sm')]: {
    fontSize: '2rem',
  },
}));
