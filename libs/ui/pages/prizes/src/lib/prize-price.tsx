import { alpha, Box, darken, lighten, Typography } from '@mui/material';
import { Column, Row } from '@worksheets/ui/components/flex';
import { TOKEN_ICON } from '@worksheets/util/misc';
import { toPercentage } from '@worksheets/util/numbers';
import Image from 'next/image';

export const PrizePrice: React.FC<{
  value: number;
  discount: number;
  backgroundColor?: 'solid' | 'secondary';
}> = ({ value, discount, backgroundColor = 'secondary' }) => {
  return (
    <Row
      gap={0.5}
      sx={{
        borderRadius: (theme) => theme.shape.borderRadius,
        overflow: 'hidden',
        background: (theme) =>
          backgroundColor === 'secondary'
            ? theme.palette.background.marketing.gradients.blue.secondary
            : theme.palette.background['solid-blue'],
      }}
    >
      <Typography
        typography="h6"
        color={(theme) => lighten(theme.palette.success.light, 0.2)}
        fontWeight={900}
        pl={0.75}
        pr={0.25}
        py={'1px'}
        sx={{
          backgroundColor: (theme) => theme.palette.success.dark,
        }}
      >
        -{toPercentage(discount)}
      </Typography>
      <Column ml={'4px'} mr={'0px'} gap={0.5} alignItems="flex-end">
        <Typography
          typography={'body3'}
          color={(theme) => alpha(darken(theme.palette.text.arcade, 0.35), 0.7)}
          lineHeight={1}
          fontWeight={900}
        >
          <s>{value}</s>
        </Typography>
        <Typography
          typography={'body3'}
          color={'text.arcade'}
          fontWeight={900}
          lineHeight={1}
        >
          {Math.floor(value * (1 - discount))}
        </Typography>
      </Column>
      <Box pr={0.5}>
        <Image
          src={TOKEN_ICON}
          height={22}
          width={22}
          alt="1"
          style={{ marginBottom: -6 }}
        />
      </Box>
    </Row>
  );
};
