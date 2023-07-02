import { trpc } from '@worksheets/trpc/ide';
import { warn } from '@worksheets/ui/common';
import { useState, useCallback, useEffect } from 'react';

import { useUser } from '@worksheets/util/auth/client';
import { GetConnectionsDataTableResponse } from '../shared/types';

type TableRow = GetConnectionsDataTableResponse[number];

export const useWorksheetConnections = (worksheetId?: string) => {
  const { user } = useUser();
  const utils = trpc.useContext();

  const allConnections = trpc.connections.dataTable.useQuery(undefined, {
    enabled: !!user,
  });

  const worksheetConnections = trpc.worksheets.connections.get.useQuery(
    { worksheetId: worksheetId ?? '' },
    { enabled: !!worksheetId && !!user }
  );
  const [updatingSelections, setUpdatingSelections] = useState(false);
  const [cache, setCache] = useState<TableRow[] | undefined>();
  const [selections, setSelections] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const find = useCallback(
    (id: string) => {
      return allConnections.data?.find((c) => c.id === id);
    },
    [allConnections.data]
  );

  useEffect(() => {
    const currentData = worksheetConnections.data;
    if (!currentData) return;
    const connections = allConnections.data?.filter(
      (c) => c.id && currentData.includes(c.id)
    );
    setSelections(connections?.map((c) => c.id ?? '').filter(Boolean) ?? []);
  }, [allConnections.data, worksheetConnections.data]);

  const getConnectionErrorMessage = useCallback(
    (connection?: TableRow) => {
      // dont validate if we dont have a connection
      if (!connection || !connection.id) {
        return '';
      }

      // check if the connection is already selected
      const exists = selections.includes(connection.id);
      if (!exists) {
        return '';
      }

      // if we are a unique app connection we are valid
      const multiple = selections.find(
        (s) => s === connection?.app.id && s !== connection?.id
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
    for (const connectionId of selections) {
      const selection = find(connectionId);
      if (selection) {
        const msg = getConnectionErrorMessage(selection);
        if (msg) {
          errors[''] = 'Select one connection per application.';
          errors[selection.id ?? ''] = msg;
        }
      }
    }
    setErrors(errors);
  }, [find, selections, getConnectionErrorMessage]);

  const stageSelections = () => {
    setCache(selections.map(find).filter(Boolean) as TableRow[]);
    setUpdatingSelections(true);
  };

  const revertSelections = () => {
    setSelections(cache?.map((c) => c.id ?? '').filter(Boolean) ?? []);
    setCache(undefined);
    setUpdatingSelections(false);
  };

  const commitSelections = () => {
    if (!worksheetId) return;

    updateWorksheetConnections
      .mutateAsync({
        worksheetId,
        connections: selections ?? [],
      })
      .then(() => {
        utils.worksheets.connections.invalidate().then(() => {
          setSelections(cache?.map((c) => c.id ?? '').filter(Boolean) ?? []);
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
