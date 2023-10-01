import { Flex } from '@worksheets/ui-core';
import { FC } from 'react';
import { Button, Typography } from '@mui/material';

export type ErrorMessageProps = {
  error: string;
  onReportProblem: () => void;
};

export const ErrorMessage: FC<ErrorMessageProps> = ({
  error,
  onReportProblem,
}) => {
  return (
    <>
      <Flex column pt={1} pr={2} gap={1}>
        <Typography variant="h5" color="error.main">
          {error}
        </Typography>
        <Typography fontFamily={'sans-serif'}>
          Please try again later. If the problem persists, please submit a
          report.
        </Typography>
        <Button variant="outlined" onClick={onReportProblem}>
          Report A Problem
        </Button>
      </Flex>
    </>
  );
};
