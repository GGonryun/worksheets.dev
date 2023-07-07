import { trpc } from '@worksheets/trpc/ide';
import { ConnectionForm, FormFieldsResponse } from '../shared/types';
import React, { useEffect } from 'react';

export const useConnectionBuilder = ({
  connectionId,
  canEdit = false,
  onSaved,
}: {
  connectionId: string;
  canEdit?: boolean;
  onSaved?: (id: string) => void;
}) => {
  // use query to get latest form data when loading for this ID.
  const [connection, setConnection] = React.useState<Required<ConnectionForm>>({
    id: connectionId,
    name: '',
    appId: '',
    settings: {},
  });

  const [loading, setLoading] = React.useState(false);
  const [editing, setEditing] = React.useState(false);
  const cannotEdit = !canEdit && editing;

  const form = trpc.connections.getForm.useMutation();

  useEffect(() => {
    setLoading(true);
    if (connectionId) {
      form.mutateAsync(connectionId).then(({ connection, created }) => {
        if (!created) {
          setEditing(true);
          setConnection({
            id: connectionId,
            name: connection.name ?? '',
            appId: connection.appId,
            settings: connection.settings ?? {},
          });
        }
      });
    } else {
      setEditing(false);
    }
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connectionId]);

  const utils = trpc.useContext();

  const {
    data: app,
    isLoading: isLoadingApp,
    isFetching: isFetchingApp,
  } = trpc.applications.get.useQuery(
    {
      appId: connection.appId,
    },
    { enabled: !!connection.appId }
  );

  const {
    data: relatedWorksheets,
    isLoading: isLoadingRelatedWorksheets,
    isFetching: isFetchingRelatedWorksheets,
  } = trpc.connections.worksheets.get.useQuery(
    { connectionId: connection.id },
    { enabled: !!connection.id }
  );

  const submitConnectionForm = trpc.connections.submitForm.useMutation();
  const getOAuthUrl = trpc.connections.getOAuthUrl.useMutation();
  const deleteConnectionField =
    trpc.connections.deleteConnectionField.useMutation();

  const updateConnection = (updates: Partial<ConnectionForm>) => {
    if (cannotEdit) return;
    setConnection({ ...connection, ...updates });
  };

  const updateConnectionSettings = (key: string, value: unknown) => {
    updateConnection({ settings: { ...connection.settings, [key]: value } });
  };

  const deleteOAuthField = async (fieldId: string) => {
    if (
      // eslint-disable-next-line no-restricted-globals
      confirm(
        'Deleting this connection will remove all data associated with it. This action cannot be undone. Are you sure?'
      )
    ) {
      await deleteConnectionField.mutateAsync({
        settingId: fieldId,
        connectionId,
      });

      updateConnectionSettings(fieldId, false);
    }
  };

  const updateOAuthField = async (fieldId: string) => {
    const { url } = await getOAuthUrl.mutateAsync({
      appId: connection.appId,
      settingId: fieldId,
      connectionId,
    });

    // assign the completion callback.
    window.oauthcallback = () => {
      // clear the callback.
      window.oauthcallback = undefined;
      updateConnectionSettings(fieldId, true);
    };

    // open window.
    const win = window.open(url, '_blank');
    if (!win)
      return console.error('failed to open a new tab during oauth flow');
    win.focus();
  };

  const updateSettingsFieldHandler = (
    field: FormFieldsResponse[number],
    value: unknown
  ) => {
    if (field.type === 'oauth') {
      if (value) {
        deleteOAuthField(field.id);
      } else {
        updateOAuthField(field.id);
      }
    } else {
      updateConnectionSettings(field.id, value);
    }
  };

  const save = async () => {
    if (cannotEdit) return;
    if (connection.id) {
      submitConnectionForm.mutateAsync(connection).then(() => {
        utils.connections.dataTable.invalidate().then(() => {
          console.info('updating saved selection');
          onSaved && onSaved(connection.id);
        });
      });
    }
  };

  const areRequiredFieldsSet = () => {
    if (!app?.fields) return true;

    return app?.fields.every((field) => {
      if (field.required) {
        if (field.type === 'oauth') {
          return connection.settings[field.id];
        }

        return !!connection.settings[field.id];
      }

      return true;
    });
  };

  return {
    connection,
    fields: app?.fields || [],
    app,
    editing,
    cannotEdit,
    relatedWorksheets,
    validation: {
      name: {
        ok: connection.name.length < 1 || connection.name.length > 2,
        message: 'Connection name must be at least 3 characters long.',
      },
      details: {
        ok: connection.name.length > 2 && connection.appId !== '',
        message: 'You must set all required fields to continue.',
      },
      authentication: {
        ok: areRequiredFieldsSet(),
        message: 'You must set all required fields to continue.',
      },
    },
    loading:
      loading ||
      (isLoadingApp && isFetchingApp) ||
      (isLoadingRelatedWorksheets && isFetchingRelatedWorksheets),
    save,
    updateConnection,
    updateSettingsFieldHandler,
  };
};
