export const getSeedingChanges = <
  TPending extends { id?: string | number; version?: number },
  TStored extends { id?: string | number; version?: number }
>(
  pending: TPending[],
  stored: TStored[]
) => {
  const creating: TPending[] = [];

  const updating: TPending[] = [];

  for (const p of pending) {
    const existing = stored.find((s) => s.id === p.id);
    if (existing) {
      // if it exists check if we're updating
      if (p.version != null && existing.version !== p.version) {
        updating.push(p);
      }
    } else {
      creating.push(p);
    }
  }

  return { creating, updating };
};

export const seedingProperties = {
  id: true as const,
  version: true as const,
};
