import { newConnectionsDatabase } from '@worksheets/data-access/connections';

const db = newConnectionsDatabase();

export const updateUserConnectionConfiguration = async (input: {
  connectionId: string;
  details: {
    name: string;
    enabled: boolean;
  };
}) => {
  const name = input.details.name;
  const enabled = input.details.enabled;
  const errors: Record<string, string> = {};
  if (name.length < 3) {
    errors['name'] = 'Name must be at least 3 characters';
  } else if (name.length > 50) {
    errors['name'] = 'Name must be less than 50 characters';
  } else {
    // save the record.
    try {
      await db.apply(input.connectionId, {
        name,
        enabled,
        updatedAt: Date.now(),
      });
    } catch (error) {
      console.error(`failed to save connection ${input.connectionId}`, error);
      errors[''] = `Unexpected error while saving connection`;
    }
  }

  return { ok: Object.keys(errors).length === 0, errors };
};
