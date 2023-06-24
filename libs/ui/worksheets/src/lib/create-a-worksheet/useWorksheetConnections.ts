import { trpc } from '@worksheets/trpc/ide';
import { warn } from '@worksheets/ui/common';
import { useState, useCallback, useEffect } from 'react';
import { TableRow } from '../connections/data-table';
import { useUser } from '@worksheets/util/auth/client';

export const useWorksheetConnections = (worksheetId?: string) => {
  const { user } = useUser();
  const utils = trpc.useContext();

  const allConnections = trpc.connections.dataTable.useQuery(undefined, {
    enabled: !!user,
  });

  const worksheetConnections = trpc.worksheets.connections.get.useQuery(
    worksheetId ?? '',
    { enabled: !!worksheetId && !!user }
  );
  const [updatingSelections, setUpdatingSelections] = useState(false);
  const [cache, setCache] = useState<TableRow[] | undefined>();
  const [selections, setSelections] = useState<TableRow[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const currentData = worksheetConnections.data;
    if (!currentData) return;
    const connections = allConnections.data?.filter(
      (c) => c.id && currentData.includes(c.id)
    );
    setSelections(connections ?? []);
  }, [allConnections.data, worksheetConnections.data]);

  const getConnectionErrorMessage = useCallback(
    (connection?: TableRow) => {
      // dont validate if we dont have a connection
      if (!connection || !connection.id) {
        return '';
      }

      // check if the connection is already selected
      const exists = selections.find((s) => s.id === connection?.id);
      if (!exists) {
        return '';
      }

      // if we are a unique app connection we are valid
      const multiple = selections.find(
        (s) => s.app.id === connection?.app.id && s.id !== connection?.id
      );
      if (!multiple) {
        return '';
      }

      return `${connection.app.label} is already selected for another connection.`;
    },
    [selections]
  );

  const updateWorksheetConnections =
    trpc.worksheets.connections.update.useMutation();

  useEffect(() => {
    const errors: Record<string, string> = {};
    for (const selection of selections) {
      const msg = getConnectionErrorMessage(selection);
      if (msg) {
        errors[''] = 'Select one connection per application.';
        errors[selection.id ?? ''] = msg;
      }
    }
    setErrors(errors);
  }, [selections, getConnectionErrorMessage]);

  const stageSelections = () => {
    setCache(selections);
    setUpdatingSelections(true);
  };

  const revertSelections = () => {
    setSelections(cache ?? []);
    setCache(undefined);
    setUpdatingSelections(false);
  };

  const commitSelections = () => {
    if (!worksheetId) return;

    updateWorksheetConnections
      .mutateAsync({
        worksheetId,
        connections:
          selections?.map((c) => c.id ?? '').filter((c) => !!c) ?? [],
      })
      .then(() => {
        utils.worksheets.connections.invalidate().then(() => {
          setSelections(cache ?? []);
          setUpdatingSelections(false);
        });
      })
      .catch(warn('error updating connections'));
  };

  return {
    connections: allConnections,
    selections,
    errors,
    updating: updatingSelections,
    getConnectionErrorMessage,
    setSelections,
    stageSelections,
    revertSelections,
    commitSelections,
  };
};
