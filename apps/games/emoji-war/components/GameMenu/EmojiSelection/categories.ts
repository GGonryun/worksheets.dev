const defaultEmojis = [
  '👾',
  '🤖',
  '👽',
  '👻',
  '👺',
  '👹',
  '🤡',
  '👿',
  '👩‍🚀',
  '💩',
  '💎',
  '🔥',
  '🌈',
  '🌞',
  '🌝',
];

const faceEmojis = [
  '😱',
  '🤣',
  '😎',
  '😪',
  '😩',
  '🤮',
  '🥱',
  '😤',
  '😡',
  '🤬',
  '🤣',
  '😂',
  '😆',
  '😅',
  '😄',
];

const animalEmojis = [
  '🐶',
  '🐱',
  '🐹',
  '🐰',
  '🦊',
  '🐻',
  '🐼',
  '🐨',
  '🦁',
  '🐮',
  '🐷',
  '🐸',
  '🐵',
  '🐔',
  '🐧',
];

const foodEmojis = [
  '🍎',
  '🍊',
  '🍋',
  '🍆',
  '🍌',
  '🍉',
  '🍇',
  '🍓',
  '🍒',
  '🍑',
  '🍕',
  '🍟',
  '🍔',
  '🍗',
  '🍖',
];

export const emojiCategories = [
  {
    name: 'Popular',
    emojis: defaultEmojis,
  },
  {
    name: 'Faces',
    emojis: faceEmojis,
  },
  {
    name: 'Animals',
    emojis: animalEmojis,
  },
  {
    name: 'Food',
    emojis: foodEmojis,
  },
];

export const selectRandomEmoji = () => {
  const randomCategory = Math.floor(Math.random() * emojiCategories.length);
  const randomEmoji = Math.floor(
    Math.random() * emojiCategories[randomCategory].emojis.length
  );

  return emojiCategories[randomCategory].emojis[randomEmoji];
};
