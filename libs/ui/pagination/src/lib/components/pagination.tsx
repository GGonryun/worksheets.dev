import {
  Box,
  Button,
  styled,
  Theme,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { arrayFromNumber } from '@worksheets/util/arrays';

export const Pagination: React.FC<{
  page: number;
  pages: number;
  setPage: (num: number) => void;
}> = ({ page, setPage, pages }) => {
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('sm')
  );

  const showLeftEllipsis = page > 2;
  const showRightEllipsis = page < pages - 3;

  const pagesToShow: number[] = [];

  if (page < 2) {
    pagesToShow.push(1, 2, 3);
  } else if (page > pages - 3) {
    pagesToShow.push(pages - 4, pages - 3, pages - 2);
  } else {
    pagesToShow.push(page - 1, page, page + 1);
  }

  const PageButton: React.FC<{ i: number }> = ({ i }) => (
    <Button
      key={i}
      variant="square"
      color={page === i ? 'success' : 'warning'}
      onClick={() => setPage(i)}
      size={isMobile ? 'small' : 'medium'}
    >
      <Typography
        sx={{
          typography: { xs: 'h6', sm: 'h6', md: 'h5' },
        }}
      >
        {i + 1}
      </Typography>
    </Button>
  );

  if (pages <= 1) return null;

  if (pages < 6)
    return (
      <PagesBox>
        {arrayFromNumber(pages).map((i) => (
          <PageButton i={i} />
        ))}
      </PagesBox>
    );

  return (
    <PagesBox>
      <PageButton i={0} />
      {showLeftEllipsis && <Ellipses />}
      {pagesToShow.map((i) => (
        <PageButton key={i} i={i} />
      ))}
      {showRightEllipsis && <Ellipses />}
      <PageButton i={pages - 1} />
    </PagesBox>
  );
};

const Ellipses = () => (
  <Typography variant="h4" color="white.main">
    ..
  </Typography>
);

const PagesBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignSelf: 'flex-end',
  alignItems: 'flex-end',
  gap: theme.spacing(1),
}));
