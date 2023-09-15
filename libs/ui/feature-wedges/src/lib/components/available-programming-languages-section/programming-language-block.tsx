import { Paper, Typography, Link } from '@mui/material';
import { TinyLogo } from '@worksheets/ui-basic-style';
import { Flex, Spacing } from '@worksheets/ui-core';
import { FC } from 'react';
import { HttpClient } from './types';

export type ProgrammingLanguageBlockProps = {
  title: string;
  logo: string;
  client: HttpClient;
};

export const ProgrammingLanguageBlock: FC<ProgrammingLanguageBlockProps> = ({
  title,
  client,
  logo,
}) => {
  const size = 124;
  return (
    <Spacing x={3}>
      <Paper
        variant="outlined"
        sx={(theme) => ({
          borderRadius: theme.spacing(2),
        })}
      >
        <Flex
          column
          centered
          gap={0.5}
          width={size}
          height={size}
          sx={{
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
          }}
        >
          <Typography variant="body2">
            <b>{title}</b>
          </Typography>
          <TinyLogo src={logo} borderless area={50} />
          <Typography variant="caption" color="text.secondary">
            <Link color="inherit" href={client.href}>
              {client.title}
            </Link>
          </Typography>
        </Flex>
      </Paper>
    </Spacing>
  );
};
