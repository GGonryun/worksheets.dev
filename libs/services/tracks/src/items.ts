type UserItemQuantities = Record<string, Record<string, number>>;
export type UserItemQuantity = {
  quantity: number;
  itemId: string;
  userId: string;
};

export const userItems = () => {
  const collection: UserItemQuantities = {};

  const add = (userId: string, itemId: string, quantity: number) => {
    if (!collection[userId]) {
      collection[userId] = {};
    }

    if (!collection[userId][itemId]) {
      collection[userId][itemId] = 0;
    }

    collection[userId][itemId] += quantity;
  };

  function* iterate(): Generator<UserItemQuantity> {
    for (const userId of Object.keys(collection)) {
      for (const itemId of Object.keys(collection[userId])) {
        yield {
          userId,
          itemId,
          quantity: collection[userId][itemId],
        };
      }
    }
  }

  return {
    add,
    iterate,
  };
};
