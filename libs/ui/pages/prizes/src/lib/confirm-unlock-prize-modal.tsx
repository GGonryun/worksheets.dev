import { LockOutlined, OpenInNew } from '@mui/icons-material';
import { Box, Button, Divider, Link, Typography } from '@mui/material';
import { ColoredSteamGames } from '@worksheets/icons/companies';
import { routes } from '@worksheets/routes';
import { trpc } from '@worksheets/trpc-charity';
import { Column, Row } from '@worksheets/ui/components/flex';
import { PulsingLogo } from '@worksheets/ui/components/loading';
import { InfoModal, ModalWrapper } from '@worksheets/ui/components/modals';
import { HelpTokensQuestions } from '@worksheets/util/enums';
import { TOKEN_ICON } from '@worksheets/util/misc';
import { calculatePrizePrice, PrizeSchema } from '@worksheets/util/types';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { ReactNode } from 'react';

export const ConfirmUnlockPrizeModal: React.FC<
  ModalWrapper<{ prize: PrizeSchema | null; onPurchase: () => void }>
> = ({ open, onClose, prize, onPurchase }) => {
  if (!prize) {
    return null;
  }

  return (
    <InfoModal
      maxWidth={450}
      open={open}
      onClose={onClose}
      color="error"
      background={(theme) =>
        theme.palette.background.marketing.gradients.blue.primary
      }
    >
      <ConfirmUnlockContent prize={prize} onPurchase={onPurchase} />
    </InfoModal>
  );
};

const ConfirmUnlockContent: React.FC<{
  prize: PrizeSchema;
  onPurchase: () => void;
}> = ({ prize, onPurchase }) => {
  const session = useSession();
  const tokens = trpc.user.inventory.quantity.useQuery('1', {
    enabled: session.status === 'authenticated',
  });

  if (tokens.isLoading) {
    return <PulsingLogo textColor="text.arcade" />;
  }

  if (tokens.isError) {
    return <Typography color="text.arcade">Failed to load tokens</Typography>;
  }

  const tokensOwned = tokens.data ?? 0;
  const price = calculatePrizePrice(prize);
  const insufficientTokens = tokensOwned < price;

  return (
    <Column
      gap={3}
      p={{ xs: 0, sm: 1, md: 2 }}
      width="100%"
      color={(theme) => theme.palette.text.arcade}
    >
      <Typography
        typography={{ xs: 'h5', sm: 'h4' }}
        fontWeight={{ xs: 900, sm: 900 }}
      >
        Checkout
      </Typography>

      <Column gap={1}>
        <PurchaseItemLayout>
          <Row gap={0.5}>
            <Image src={TOKEN_ICON} height={22} width={22} alt="Token" />
            <Link
              typography="body1"
              fontWeight={700}
              href={routes.account.path()}
              color="inherit"
              target="_blank"
            >
              My Tokens
            </Link>
          </Row>
          <Typography typography="body2" fontWeight={700} textAlign="end">
            {tokens.data}
          </Typography>
        </PurchaseItemLayout>
        <PurchaseItemLayout>
          <Row gap={0.5}>
            <ColoredSteamGames fontSize="small" />
            <Link
              typography="body1"
              fontWeight={700}
              href={prize.url}
              color="inherit"
              target="_blank"
            >
              {prize.name}
            </Link>
          </Row>
          <Typography typography="body2" fontWeight={700} textAlign="end">
            -{price}
          </Typography>
        </PurchaseItemLayout>
        <Divider
          sx={{
            backgroundColor: (theme) => theme.palette.text.arcade,
          }}
        />
        {insufficientTokens ? (
          <Box textAlign="end">
            <Typography color="text.arcade" fontWeight={900}>
              Insufficient Tokens
            </Typography>
            <Link
              width="100%"
              typography="body2"
              color="text.arcade"
              target="_blank"
              fontWeight={700}
              href={routes.help.tokens.path({
                bookmark: HelpTokensQuestions.HowToEarn,
              })}
              underline="hover"
              sx={{
                mt: 0.5,
                textDecoration: 'underline',
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
                justifyContent: 'flex-end',
              }}
            >
              <OpenInNew fontSize="small" />
              Get More Tokens
            </Link>
          </Box>
        ) : (
          <PurchaseItemLayout>
            <Typography typography="body3" fontWeight={700}>
              Remaining Tokens After Purchase:
            </Typography>
            <Typography typography="body2" fontWeight={700} textAlign="end">
              {tokensOwned - price}
            </Typography>
          </PurchaseItemLayout>
        )}
      </Column>
      <Button
        variant="arcade"
        color="success"
        fullWidth
        startIcon={<LockOutlined />}
        disabled={insufficientTokens}
        onClick={onPurchase}
      >
        {insufficientTokens ? 'Insufficient Tokens' : 'Confirm Purchase'}
      </Button>
    </Column>
  );
};

const PurchaseItemLayout: React.FC<{ children: ReactNode[] }> = ({
  children,
}) => {
  return (
    <Box
      sx={{
        display: 'grid',
        gap: 1,
        gridTemplateColumns: '2.5fr 1fr',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      {children}
    </Box>
  );
};
