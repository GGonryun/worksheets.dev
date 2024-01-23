import { Theme, useMediaQuery as useMediaQueryOriginal } from '@mui/material';

export const useMediaQuery = () => {
  const isTiny = useMediaQueryOriginal((theme: Theme) =>
    theme.breakpoints.down('mobile1')
  );
  const isMobile1 = useMediaQueryOriginal((theme: Theme) =>
    theme.breakpoints.down('mobile2')
  );
  const isMobile2 = useMediaQueryOriginal((theme: Theme) =>
    theme.breakpoints.down('sm')
  );
  const isSmall = useMediaQueryOriginal((theme: Theme) =>
    theme.breakpoints.down('desktop1')
  );
  const isDesktop1 = useMediaQueryOriginal((theme: Theme) =>
    theme.breakpoints.down('md')
  );
  const isMedium = useMediaQueryOriginal((theme: Theme) =>
    theme.breakpoints.down('lg')
  );
  const isLarge = useMediaQueryOriginal((theme: Theme) =>
    theme.breakpoints.down('xl')
  );

  return {
    isTiny,
    isMobile: isMobile2,
    isMobile1,
    isMobile2,
    isSmall,
    isDesktop1,
    isMedium,
    isLarge,
  };
};
