import { Link, Typography } from '@mui/material';
import { routes } from '@worksheets/routes';
import { trpc } from '@worksheets/trpc-charity';
import { Row } from '@worksheets/ui/components/flex';
import { LoadingBar } from '@worksheets/ui/components/loading';
import { HelpTokensQuestions } from '@worksheets/util/enums';
import dynamic from 'next/dynamic';
import pluralize from 'pluralize';

const Container = () => {
  const { data } = trpc.user.inventory.items.useQuery(undefined);
  const items = data?.length ?? 0;
  return (
    <Row justifyContent="space-between" flexWrap="wrap" gap={1}>
      <Typography variant="h6" gutterBottom>
        My Inventory
      </Typography>
      <Typography
        variant="body2"
        fontWeight={900}
        component={Link}
        underline="hover"
        color="text.primary"
        href={routes.help.tokens.path({
          bookmark: HelpTokensQuestions.HowToEarn,
        })}
      >
        {items} {pluralize('items', items)}
      </Typography>
    </Row>
  );
};

export const DynamicItemsHeader = dynamic(() => Promise.resolve(Container), {
  ssr: false,
  loading: () => <LoadingBar />,
});
