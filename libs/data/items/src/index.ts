import { ItemType } from '@prisma/client';
import { z } from 'zod';

export const ITEMS = [
  {
    id: '1' as const,
    version: 4,
    code: 'tokens',
    name: 'Tokens',
    type: ItemType.CURRENCY,
    sell: 1,
    description: 'The primary currency of the arcade',
    imageUrl: 'https://cdn.charity.games/_items/detailed/1.png',
  },
  {
    id: '2' as const,
    version: 4,
    code: 'small-treasure-chest',
    name: 'Small Treasure Chest',
    type: ItemType.CONSUMABLE,
    sell: 1,
    description: 'A small treasure chest containing 1 to 20 tokens',
    imageUrl: 'https://cdn.charity.games/_items/detailed/2.png',
  },
  {
    id: '3' as const,
    version: 4,
    code: 'small-gift-box',
    name: 'Small Gift Box',
    type: ItemType.SHARABLE,
    sell: 1,
    description:
      'A box of 25 tokens that you can give to someone else. Sharing this gift will earn you 10 tokens.',
    imageUrl: 'https://cdn.charity.games/_items/detailed/3.png',
  },
  {
    id: '4' as const,
    version: 4,
    code: 'random-steam-key',
    name: 'Random Steam Key',
    type: ItemType.STEAM_KEY,
    expiration: 7, //days
    sell: 1,
    description: 'A random Steam key for a game. Redeemable on Steam.',
    imageUrl: 'https://cdn.charity.games/_items/detailed/4.png',
  },
  {
    id: '5' as const,
    version: 4,
    code: 'large-treasure-chest',
    name: 'Large Treasure Chest',
    type: ItemType.CONSUMABLE,
    sell: 1,
    description: 'A large treasure chest containing 10 to 100 tokens',
    imageUrl: 'https://cdn.charity.games/_items/detailed/5.png',
  },
  {
    id: '6' as const,
    version: 4,
    code: 'large-gift-box',
    name: 'Large Gift Box',
    type: ItemType.SHARABLE,
    sell: 1,
    description:
      'A box of 50 tokens that you can give to someone else. Sharing this gift will earn you 25 tokens.',
    imageUrl: 'https://cdn.charity.games/_items/detailed/6.png',
  },
  {
    id: '7' as const,
    version: 4,
    code: 'love-letter',
    name: 'Love Letter',
    type: ItemType.SHARABLE,
    sell: 1,
    description:
      'A love letter with 10 tokens that you can share with a friend. Sharing this gift will earn you 10 tokens.',
    imageUrl: 'https://cdn.charity.games/_items/detailed/7.png',
  },
  {
    id: '1000' as const,
    version: 4,
    code: 'weapon-crate',
    name: 'Weapon Crate',
    type: ItemType.CONSUMABLE,
    sell: 1,
    description: 'A crate containing a random combat item',
    imageUrl: 'https://cdn.charity.games/_items/detailed/1000.png',
  },
  {
    id: '1001' as const,
    version: 4,
    code: 'dagger',
    name: 'Dagger',
    type: ItemType.COMBAT,
    sell: 1,
    description: 'A small dagger that deals 5 damage',
    imageUrl: 'https://cdn.charity.games/_items/detailed/1001.png',
  },
  {
    id: '1002' as const,
    version: 4,
    code: 'sword',
    name: 'Sword',
    type: ItemType.COMBAT,
    sell: 1,
    description: 'A short sword that deals 6 damage',
    imageUrl: 'https://cdn.charity.games/_items/detailed/1002.png',
  },
  {
    id: '1003' as const,
    version: 4,
    code: 'axe',
    name: 'Axe',
    type: ItemType.COMBAT,
    sell: 1,
    description: 'A small axe that deals 7 damage',
    imageUrl: 'https://cdn.charity.games/_items/detailed/1003.png',
  },
  {
    id: '1004' as const,
    version: 4,
    code: 'spear',
    name: 'Spear',
    type: ItemType.COMBAT,
    sell: 1,
    description: 'A long spear that deals 8 damage',
    imageUrl: 'https://cdn.charity.games/_items/detailed/1004.png',
  },
  {
    id: '1005' as const,
    version: 4,
    code: 'club',
    name: 'Club',
    type: ItemType.COMBAT,
    sell: 1,
    description: 'A wooden club that deals 5 damage',
    imageUrl: 'https://cdn.charity.games/_items/detailed/1005.png',
  },
  {
    id: '10001' as const,
    version: 4,
    code: 'apple',
    name: 'Apple',
    type: ItemType.ETCETERA,
    sell: 3,
    description: 'A juicy apple that can be eaten to restore health',
    imageUrl: 'https://cdn.charity.games/_items/detailed/10001.png',
  },
  {
    id: '10002' as const,
    version: 4,
    code: 'empty-bottle',
    name: 'Empty Bottle',
    type: ItemType.ETCETERA,
    sell: 2,
    description: 'An empty bottle that can be filled with liquid',
    imageUrl: 'https://cdn.charity.games/_items/detailed/10002.png',
  },
  {
    id: '10003' as const,
    version: 4,
    code: 'smelly-jelly',
    name: 'Smelly Jelly',
    type: ItemType.ETCETERA,
    sell: 4,
    description: 'A blob of smelly jelly. I wonder what it tastes like.',
    imageUrl: 'https://cdn.charity.games/_items/detailed/10003.png',
  },
  {
    id: '10004' as const,
    version: 4,
    code: 'sticky-slime',
    name: 'Sticky Slime',
    type: ItemType.ETCETERA,
    sell: 3,
    description: "Mysterious sticky slime. It's not edible. Probably.",
    imageUrl: 'https://cdn.charity.games/_items/detailed/10004.png',
  },
  {
    id: '10005' as const,
    version: 4,
    code: 'emerald',
    name: 'Emerald',
    type: ItemType.ETCETERA,
    sell: 200,
    description: "A precious emerald gemstone. It's worth a lot of tokens.",
    imageUrl: 'https://cdn.charity.games/_items/detailed/10005.png',
  },
  {
    id: '10006' as const,
    version: 4,
    code: 'fur-ball',
    name: 'Fur Ball',
    type: ItemType.ETCETERA,
    sell: 3,
    description:
      'A small fur ball that can be used for crafting. It looks soft and fluffy.',
    imageUrl: 'https://cdn.charity.games/_items/detailed/10006.png',
  },
  {
    id: '10007' as const,
    version: 4,
    code: 'green-herb',
    name: 'Green Herb',
    type: ItemType.ETCETERA,
    sell: 6,
    description:
      'A green herb with medicinal properties. It can be used to restore health. It smells fresh and minty.',
    imageUrl: 'https://cdn.charity.games/_items/detailed/10007.png',
  },
  {
    id: '10008' as const,
    version: 4,
    code: 'clover',
    name: 'Clover',
    type: ItemType.ETCETERA,
    sell: 4,
    description:
      "A pot of clover that brings good luck. I don't see any 4 leaf clovers though. It needs some water.",
    imageUrl: 'https://cdn.charity.games/_items/detailed/10008.png',
  },
  {
    id: '10009' as const,
    version: 4,
    code: 'feather',
    name: 'Feather',
    type: ItemType.ETCETERA,
    sell: 7,
    description:
      "A soft feather that can be used for crafting. It looks light and delicate. It's a bit dusty.",
    imageUrl: 'https://cdn.charity.games/_items/detailed/10009.png',
  },
  {
    id: '10010' as const,
    version: 4,
    code: 'orange',
    name: 'Orange',
    type: ItemType.ETCETERA,
    sell: 6,
    description:
      "A juicy citrus fruit with a yellowish or reddish rind. It's a bit squishy. It's ripe and ready to eat.",
    imageUrl: 'https://cdn.charity.games/_items/detailed/10010.png',
  },
  {
    id: '10011' as const,
    version: 4,
    code: 'furry-tail',
    name: 'Furry Tail',
    type: ItemType.ETCETERA,
    sell: 2,
    description:
      "A furry tail that came off a small animal. It's dirty and smells a bit funky. I wouldn't suggest touching it.",
    imageUrl: 'https://cdn.charity.games/_items/detailed/10011.png',
  },
  {
    id: '10012' as const,
    version: 4,
    code: 'red-meat-slab',
    name: 'Red Meat Slab',
    type: ItemType.ETCETERA,
    sell: 15,
    description:
      "A slab of red meat that can be cooked and eaten. It looks fresh and juicy. I think I'll have mine medium rare.",
    imageUrl: 'https://cdn.charity.games/_items/detailed/10012.png',
  },
  {
    id: '10013' as const,
    version: 4,
    code: 'charcon-ingot',
    name: 'Charcon Ingot',
    type: ItemType.ETCETERA,
    sell: 25,
    description:
      "A grey metal ingot that is used to strengthen weapons and armor. It's heavy and slightly warm to the touch.",
    imageUrl: 'https://cdn.charity.games/_items/detailed/10013.png',
  },
  {
    id: '10014' as const,
    version: 4,
    code: 'cotton-shirt',
    name: 'Cotton Shirt',
    type: ItemType.ETCETERA,
    sell: 10,
    description:
      "A simple cotton shirt that is soft and comfortable to wear. It's a bit wrinkled. It's a bit too small for me.",
    imageUrl: 'https://cdn.charity.games/_items/detailed/10014.png',
  },
  {
    id: '10015' as const,
    version: 4,
    code: 'gold-bar',
    name: 'Gold Bar',
    type: ItemType.ETCETERA,
    sell: 500,
    description:
      "A bar of solid gold. It's heavy and shiny. I wonder who left it here.",
    imageUrl: 'https://cdn.charity.games/_items/detailed/10015.png',
  },
  {
    id: '10016' as const,
    version: 4,
    code: 'white-mineral',
    name: 'White Mineral',
    type: ItemType.ETCETERA,
    sell: 75,
    description:
      "A white mineral that glows in the dark. It floats in water and flakes easily. It's commonly used in jewelry and magic potions.",
    imageUrl: 'https://cdn.charity.games/_items/detailed/10016.png',
  },
  {
    id: '10017' as const,
    version: 4,
    code: 'water-crystal',
    name: 'Water Crystal',
    type: ItemType.ETCETERA,
    sell: 90,
    description:
      'A blueish crystal that is cold to the touch no matter the temperature. Wealthy citizens use it to cool their drinks and homes.',
    imageUrl: 'https://cdn.charity.games/_items/detailed/10017.png',
  },
  {
    id: '10018' as const,
    version: 4,
    code: 'shadow-stone',
    name: 'Shadow Stone',
    type: ItemType.ETCETERA,
    sell: 40,
    description:
      "A black stone that absorbs light. It's used in dark magic rituals and explosives. I should be careful with this.",
    imageUrl: 'https://cdn.charity.games/_items/detailed/10018.png',
  },
  {
    id: '10019' as const,
    version: 4,
    code: 'rock',
    name: 'Rock',
    type: ItemType.ETCETERA,
    sell: 1,
    description:
      "A small rock that can be thrown or skipped across water. It's probably not worth much.",
    imageUrl: 'https://cdn.charity.games/_items/detailed/10019.png',
  },
  {
    id: '10020' as const,
    version: 4,
    code: 'ribbon',
    name: 'Ribbon',
    type: ItemType.ETCETERA,
    sell: 15,
    description:
      "A decorative blue ribbon that can be used for wrapping gifts. It's shiny and colorful. Maybe I'll put it in my hair.",
    imageUrl: 'https://cdn.charity.games/_items/detailed/10020.png',
  },
  {
    id: '10021' as const,
    version: 4,
    code: 'dark-stinger',
    name: 'Dark Stinger',
    type: ItemType.COMBAT,
    sell: 1,
    description:
      'A sharp stinger that deals 20 shadow damage. There is a dark aura around it.',
    imageUrl: 'https://cdn.charity.games/_items/detailed/10021.png',
  },
  {
    id: '10022' as const,
    version: 4,
    code: 'red-herb',
    name: 'Red Herb',
    type: ItemType.ETCETERA,
    sell: 6,
    description:
      'A red herb with medicinal properties. It can be used to restore health. It smells spicy and sweet, but it always makes me sneeze.',
    imageUrl: 'https://cdn.charity.games/_items/detailed/10022.png',
  },
  {
    id: '10023' as const,
    version: 4,
    code: 'grape-juice',
    name: 'Grape Juice',
    type: ItemType.ETCETERA,
    sell: 20,
    description:
      "A glass of grape juice that is sweet and refreshing. It's made from freshly squeezed grapes. I hope it's not too sour.",
    imageUrl: 'https://cdn.charity.games/_items/detailed/10023.png',
  },
  {
    id: '10024' as const,
    version: 4,
    code: 'fly-wing',
    name: 'Fly Wing',
    type: ItemType.ETCETERA,
    sell: 3,
    description:
      "A small wing that came off an insect or creature. Magicians use it to teleport short distances. It smells a bit like rotten fruit. I don't think I'll be using it.",
    imageUrl: 'https://cdn.charity.games/_items/detailed/10024.png',
  },
  {
    id: '10025' as const,
    version: 4,
    code: 'old-blue-box',
    name: 'Old Blue Box',
    type: ItemType.CONSUMABLE,
    sell: 1,
    description: 'An old blue box containing a random item.',
    imageUrl: 'https://cdn.charity.games/_items/detailed/10025.png',
  },
  {
    id: '10026' as const,
    version: 4,
    code: 'old-purple-box',
    name: 'Old Purple Box',
    type: ItemType.CONSUMABLE,
    sell: 1,
    description: 'An old purple box containing a random item.',
    imageUrl: 'https://cdn.charity.games/_items/detailed/10026.png',
  },
  {
    id: '10027' as const,
    version: 4,
    code: 'old-green-box',
    name: 'Old Green Box',
    type: ItemType.CONSUMABLE,
    sell: 1,
    description: 'An old green box containing a random item.',
    imageUrl: 'https://cdn.charity.games/_items/detailed/10027.png',
  },
  {
    id: '10028' as const,
    version: 4,
    code: 'old-red-box',
    name: 'Old Red Box',
    sell: 1,
    type: ItemType.CONSUMABLE,
    description: 'An old red box containing a random item.',
    imageUrl: 'https://cdn.charity.games/_items/detailed/10028.png',
  },
  {
    id: '10029' as const,
    version: 4,
    code: 'old-puzzle-box',
    name: 'Old Puzzle Box',
    type: ItemType.CONSUMABLE,
    sell: 1,
    description:
      'An old wooden puzzle box containing a random item. This is going to be hard to solve.',
    imageUrl: 'https://cdn.charity.games/_items/detailed/10029.png',
  },
  {
    id: '10030' as const,
    version: 4,
    code: 'ice-dagger',
    name: 'Ice Dagger',
    type: ItemType.COMBAT,
    sell: 1,
    description:
      "A dagger made of ice that deals 20 water damage. I can't seem to get a good grip on it.",
    imageUrl: 'https://cdn.charity.games/_items/detailed/10030.png',
  },
  {
    id: '10031' as const,
    version: 4,
    code: 'ice-sword',
    name: 'Ice Sword',
    type: ItemType.COMBAT,
    sell: 1,
    description:
      "A sword made of ice that deals 25 water damage. It's cold to the touch.",
    imageUrl: 'https://cdn.charity.games/_items/detailed/10031.png',
  },
  {
    id: '10032' as const,
    version: 4,
    code: 'jar-of-water',
    name: 'Jar of Water',
    type: ItemType.ETCETERA,
    sell: 5,
    description:
      "A jar of water a monster dropped. It looks clear and refreshing but I'm not sure if it's safe to drink.",
    imageUrl: 'https://cdn.charity.games/_items/detailed/10032.png',
  },
  {
    id: '10033' as const,
    version: 4,
    code: 'eternal-ice',
    name: 'Eternal Ice',
    type: ItemType.ETCETERA,
    sell: 50,
    description:
      "A piece of eternal ice that never melts. I heard that it's used in refrigeration spells and ice sculptures, but it's not cold to the touch.",
    imageUrl: 'https://cdn.charity.games/_items/detailed/10033.png',
  },
  {
    id: '10034' as const,
    version: 4,
    code: 'blue-herb',
    name: 'Blue Herb',
    type: ItemType.ETCETERA,
    sell: 10,
    description:
      'A green herb with blue flowers normally used to cure poison. It smells like a mixture of mint, lavender, and rosemary. Alchemists use it in potions.',
    imageUrl: 'https://cdn.charity.games/_items/detailed/10034.png',
  },
  {
    id: '10035' as const,
    version: 4,
    code: 'blue-potion',
    name: 'Blue Potion',
    type: ItemType.ETCETERA,
    sell: 40,
    description:
      'A blue potion used to restore health. It tastes like blueberries and has a slight fizz to it.',
    imageUrl: 'https://cdn.charity.games/_items/detailed/10035.png',
  },
  {
    id: '10036' as const,
    version: 4,
    imageUrl: 'https://cdn.charity.games/_items/detailed/10036.png',
    code: 'red-potion',
    name: 'Red Potion',
    type: ItemType.ETCETERA,
    sell: 40,
    description:
      'A red potion used to restore health. It tastes like cherries and has a thick consistency.',
  },
  {
    id: '10037' as const,
    version: 4,
    imageUrl: 'https://cdn.charity.games/_items/detailed/10037.png',
    code: 'green-potion',
    name: 'Green Potion',
    type: ItemType.ETCETERA,
    sell: 40,
    description:
      'A green potion used to restore health. It tastes like mint and has a refreshing aftertaste.',
  },
  {
    id: '10038' as const,
    version: 4,
    imageUrl: 'https://cdn.charity.games/_items/detailed/10038.png',
    code: 'purple-potion',
    name: 'Purple Potion',
    type: ItemType.ETCETERA,
    sell: 40,
    description:
      'A purple potion used to restore health. It tastes like grapes and has a sweet aroma.',
  },
  {
    id: '10039' as const,
    version: 4,
    imageUrl: 'https://cdn.charity.games/_items/detailed/10039.png',
    code: 'orange-potion',
    name: 'Orange Potion',
    type: ItemType.ETCETERA,
    sell: 40,
    description:
      'An orange potion used to restore health. It tastes like oranges and has a tangy flavor.',
  },
  {
    id: '10040' as const,
    version: 4,
    imageUrl: 'https://cdn.charity.games/_items/detailed/10040.png',
    code: 'yellow-potion',
    name: 'Yellow Potion',
    type: ItemType.ETCETERA,
    sell: 40,
    description:
      'A yellow potion used to restore health. It tastes like lemons and has a sour kick.',
  },
  {
    id: '10041' as const,
    version: 4,
    imageUrl: 'https://cdn.charity.games/_items/detailed/10041.png',
    code: 'silent-dagger',
    name: 'Silent Dagger',
    type: ItemType.COMBAT,
    sell: 1,
    description:
      "A dagger that deals 25 ghost damage. It's so sharp that it cuts through the air silently.",
  },
  {
    id: '10042' as const,
    version: 4,
    imageUrl: 'https://cdn.charity.games/_items/detailed/10042.png',
    code: 'ninja-mask',
    name: 'Ninja Mask',
    type: ItemType.ETCETERA,
    sell: 100,
    description:
      'A mask that hides the identity of the wearer. These masks are extremely rare and are only given to the most skilled ninjas.',
  },
  {
    id: '10043' as const,
    version: 4,
    imageUrl: 'https://cdn.charity.games/_items/detailed/10043.png',
    code: 'kojiros-dagger',
    name: "Kojiro's Dagger",
    type: ItemType.COMBAT,
    sell: 1,
    description:
      "A dagger that deals 100 damage. It's said to have been wielded by a legendary swordsman. Forged from the finest steel, it's extremely sharp and deadly.",
  },
  {
    id: '10044' as const,
    version: 4,
    imageUrl: 'https://cdn.charity.games/_items/detailed/10044.png',
    code: 'bag-of-coins',
    name: 'Bag of Coins',
    type: ItemType.CONSUMABLE,
    sell: 1,
    description: 'A small bag of coins that contains 5 to 25 tokens.',
  },
  {
    id: '10045' as const,
    version: 4,
    imageUrl: 'https://cdn.charity.games/_items/detailed/10045.png',
    code: 'dark-weed',
    name: 'Dark Weed',
    type: ItemType.ETCETERA,
    sell: 70,
    description:
      'A dark weed that grows in the shadows. It has a pungent smell and is used in dark magic rituals.',
  },
  {
    id: '10046' as const,
    version: 4,
    imageUrl: 'https://cdn.charity.games/_items/detailed/10046.png',
    code: 'poison-blade',
    name: 'Poison Blade',
    type: ItemType.COMBAT,
    sell: 1,
    description:
      "A blade that deals 30 poison damage. It's coated with a deadly toxin that causes paralysis.",
  },
  {
    id: '10047' as const,
    version: 4,
    imageUrl: 'https://cdn.charity.games/_items/detailed/10047.png',
    code: 'leaf',
    name: 'Leaf',
    type: ItemType.ETCETERA,
    sell: 2,
    description:
      'A simple leaf that can be used for crafting. It has rounded edges and a smooth texture.',
  },
  {
    id: '10048' as const,
    version: 4,
    imageUrl: 'https://cdn.charity.games/_items/detailed/10048.png',
    code: 'precious-flower',
    name: 'Precious Flower',
    type: ItemType.ETCETERA,
    sell: 50,
    description:
      'A rare and beautiful flower with yellow petals that is said to bring good luck. They only grow in high altitudes. I should give this to someone special.',
  },
  {
    id: '10049' as const,
    version: 4,
    imageUrl: 'https://cdn.charity.games/_items/detailed/10049.png',
    code: 'wood-log',
    name: 'Wood Log',
    type: ItemType.ETCETERA,
    sell: 12,
    description:
      "A log of wood that can be used for crafting. It's unprocessed and still has bark on it.",
  },
  {
    id: '10050' as const,
    version: 4,
    imageUrl: 'https://cdn.charity.games/_items/detailed/10050.png',
    code: 'spearhead',
    name: 'Spearhead',
    type: ItemType.COMBAT,
    sell: 1,
    description:
      'The tip of a mighty spear. It can be wielded as a weapon or used for crafting. It deals 5 damage.',
  },
  {
    id: '10051' as const,
    version: 4,
    imageUrl: 'https://cdn.charity.games/_items/detailed/10051.png',
    code: 'skull',
    name: 'Skull',
    type: ItemType.ETCETERA,
    sell: 13,
    description:
      "A skull that can be used for crafting. It's clean and polished. It's looking at me funny.",
  },
  {
    id: '10052' as const,
    version: 4,
    imageUrl: 'https://cdn.charity.games/_items/detailed/10052.png',
    code: 'precious-memory',
    name: 'Precious Memory',
    type: ItemType.ETCETERA,
    sell: 32,
    description:
      "A photograph of a special moment in someone's life. It's a bit faded but still holds sentimental value. Who is this person?",
  },
  {
    id: '10053' as const,
    version: 4,
    imageUrl: 'https://cdn.charity.games/_items/detailed/10053.png',
    code: 'red-cloth',
    name: 'Red Cloth',
    type: ItemType.ETCETERA,
    sell: 27,
    description:
      "A piece of red cloth that can be used for crafting. It's soft and warm to the touch. It's been dyed with natural pigments.",
  },
  {
    id: '10054' as const,
    version: 4,
    imageUrl: 'https://cdn.charity.games/_items/detailed/10054.png',
    code: 'sarcophagus',
    name: 'Sarcophagus',
    type: ItemType.ETCETERA,
    sell: 1000,
    description:
      "A stone sarcophagus that contains the remains of a powerful sorcerer. It's sealed shut with a magical lock. I know someone who would pay a lot for this.",
  },
  {
    id: '10055' as const,
    version: 4,
    imageUrl: 'https://cdn.charity.games/_items/detailed/10055.png',
    code: 'jar-of-sand',
    name: 'Jar of Sand',
    type: ItemType.ETCETERA,
    sell: 4,
    description:
      "A jar of sand that can be used for crafting. If I open it, will some sand fall out? It's a mystery.",
  },
  {
    id: '10056' as const,
    version: 4,
    imageUrl: 'https://cdn.charity.games/_items/detailed/10056.png',
    code: 'heart-of-gold',
    name: 'Heart of Gold',
    type: ItemType.ETCETERA,
    sell: 123,
    description:
      "A heart-shaped gemstone that once belonged to a powerful person. It's said to bring good fortune and wealth to its owner. I hope it's not cursed.",
  },
  {
    id: '10057' as const,
    version: 4,
    imageUrl: 'https://cdn.charity.games/_items/detailed/10057.png',
    code: 'jar-of-blood',
    name: 'Jar of Blood',
    type: ItemType.ETCETERA,
    sell: 16,
    description:
      "A jar full of blood. I wonder whose blood it is. I don't think it was voluntarily given. It tastes metallic.",
  },
  {
    id: '10058' as const,
    version: 4,
    imageUrl: 'https://cdn.charity.games/_items/detailed/10058.png',
    code: 'ancient-relic',
    name: 'Ancient Relic',
    type: ItemType.ETCETERA,
    sell: 83,
    description:
      "An ancient relic that holds great power. It's used by prophets and seers to communicate with the gods and spirits. I should be careful with this.",
  },
  {
    id: '10059' as const,
    version: 4,
    imageUrl: 'https://cdn.charity.games/_items/detailed/10059.png',
    code: 'hourglass',
    name: 'Hourglass',
    type: ItemType.ETCETERA,
    sell: 31,
    description:
      "An hourglass that measures time. It's made of glass and filled with sand. I wonder how long it takes for the sand to run out.",
  },
  {
    id: '10060' as const,
    version: 4,
    imageUrl: 'https://cdn.charity.games/_items/detailed/10060.png',
    code: 'fang-dagger',
    name: 'Fang Dagger',
    type: ItemType.COMBAT,
    sell: 1,
    description: 'A dagger made from the fang of a beast. It deals 15 damage.',
  },
  {
    id: '10061' as const,
    version: 4,
    imageUrl: 'https://cdn.charity.games/_items/detailed/10061.png',
    code: 'hard-boiled-egg',
    name: 'Hard Boiled Egg',
    type: ItemType.ETCETERA,
    sell: 7,
    description:
      "A hard boiled egg that can be eaten to restore health. It's a bit salty. Who left this here?",
  },
  {
    id: '10062' as const,
    version: 4,
    imageUrl: 'https://cdn.charity.games/_items/detailed/10062.png',
    code: 'mysterious-egg',
    name: 'Mysterious Egg',
    type: ItemType.ETCETERA,
    sell: 10,
    description:
      "A mysterious egg that produces a strange sound when shaken. I wonder what's inside.",
  },
  {
    id: '10063' as const,
    version: 4,
    imageUrl: 'https://cdn.charity.games/_items/detailed/10063.png',
    code: 'iron-ore',
    name: 'Iron Ore',
    type: ItemType.ETCETERA,
    sell: 22,
    description:
      "A chunk of iron ore that can be smelted into iron. It's really heavy, I shouldn't be carrying this around.",
  },
  {
    id: '10064' as const,
    version: 4,
    imageUrl: 'https://cdn.charity.games/_items/detailed/10064.png',
    code: 'ceramic-plate',
    name: 'Ceramic Plate',
    type: ItemType.ETCETERA,
    sell: 6,
    description:
      "A ceramic plate that can be used for serving food. It's a bit chipped but still usable.",
  },
  {
    id: '10065' as const,
    version: 4,
    imageUrl: 'https://cdn.charity.games/_items/detailed/10065.png',
    code: 'tinderbox',
    name: 'Tinderbox',
    type: ItemType.ETCETERA,
    sell: 29,
    description:
      'A small box that contains flammable material used to start fires. A wizard has enchanted it to light with a snap of the fingers.',
  },
  {
    id: '10066' as const,
    version: 4,
    imageUrl: 'https://cdn.charity.games/_items/detailed/10066.png',
    code: 'coal-ball',
    name: 'Coal Ball',
    type: ItemType.ETCETERA,
    sell: 8,
    description:
      "A highly compressed ball of coal that can be used as fuel. Maybe if I squeeze it hard enough, it'll turn into a diamond.",
  },
  {
    id: '10067' as const,
    version: 4,
    imageUrl: 'https://cdn.charity.games/_items/detailed/10067.png',
    code: 'incendiary-bomb',
    name: 'Incendiary Bomb',
    type: ItemType.COMBAT,
    sell: 1,
    description:
      "A bomb that deals 250 fire damage. It's extremely dangerous and should be handled with care.",
  },
  {
    id: '10068' as const,
    version: 4,
    imageUrl: 'https://cdn.charity.games/_items/detailed/10068.png',
    code: 'ruby',
    name: 'Ruby',
    type: ItemType.ETCETERA,
    sell: 188,
    description:
      "A precious ruby gemstone. It's worth a lot of tokens. Many wealthy citizens use it in jewelry and a few sorcerers use it to make dangerous potions.",
  },
  {
    id: '10069' as const,
    version: 4,
    imageUrl: 'https://cdn.charity.games/_items/detailed/10069.png',
    code: 'essence-of-fire',
    name: 'Essence of Fire',
    type: ItemType.COMBAT,
    sell: 1,
    description:
      'A sphere that enchants your next attack with fire. It deals 50 fire damage. I can feel the heat radiating from it.',
  },
  {
    id: '10070' as const,
    version: 4,
    imageUrl: 'https://cdn.charity.games/_items/detailed/10070.png',
    code: 'beetle-blade',
    name: 'Beetle Blade',
    type: ItemType.COMBAT,
    sell: 1,
    description:
      'A sharp blade produced from the carapace of a giant beetle. It deals 15 damage.',
  },
  {
    id: '10071' as const,
    version: 4,
    imageUrl: 'https://cdn.charity.games/_items/detailed/10071.png',
    code: 'bug-shell',
    name: 'Bug Shell',
    type: ItemType.ETCETERA,
    sell: 5,
    description:
      'A hard shell that once belonged to a bug. It can be used for crafting or for jewelry. I should wash it first.',
  },
  {
    id: '10072' as const,
    version: 4,
    imageUrl: 'https://cdn.charity.games/_items/detailed/10072.png',
    code: 'loaf-of-bread',
    name: 'Loaf of Bread',
    type: ItemType.ETCETERA,
    sell: 11,
    description:
      "A freshly baked loaf of bread that smells delicious. It's warm and crusty. I wonder if it's still good to eat.",
  },
];

export type Item = (typeof ITEMS)[number];

export type ItemId = Item['id'];

export const itemIdSchema = z.custom<ItemId>();

export type DroppableItem = Extract<
  Item,
  { type: 'COMBAT' | 'CONSUMABLE' | 'SHARABLE' | 'ETCETERA' }
>;

export const parseItemId = (id: unknown | undefined): ItemId => {
  const itemId = String(id);
  if (!ITEMS.some((item) => item.id === itemId)) {
    throw new Error(`Invalid item ID: ${id}`);
  }

  return id as ItemId;
};

export type DroppableItemId = DroppableItem['id'];

export const DROPPABLE_ITEMS = ITEMS.filter(
  (item): item is DroppableItem =>
    item.type === ItemType.COMBAT ||
    item.type === ItemType.CONSUMABLE ||
    item.type === ItemType.SHARABLE ||
    item.type === 'ETCETERA'
);
/**
 * The drop rate for each item is determined by the number of tickets in the lottery.
 * This keeps drop rates proportional to the number of items in the lottery.
 */
export const DROP_LOTTERY: Record<DroppableItemId, number> = {
  // old boxes and loot containers are the most common
  2: 10,
  3: 10,
  5: 10,
  6: 10,
  7: 10,
  1000: 10,
  10025: 10,
  10026: 10,
  10027: 10,
  10028: 10,
  10029: 10,
  10044: 10,
  // regular items
  1001: 1,
  1002: 1,
  1003: 1,
  1004: 1,
  1005: 1,
  10001: 1,
  10002: 1,
  10003: 1,
  10004: 1,
  10005: 1,
  10006: 1,
  10007: 1,
  10008: 1,
  10009: 1,
  10010: 1,
  10011: 1,
  10012: 1,
  10013: 1,
  10014: 1,
  10015: 1,
  10016: 1,
  10017: 1,
  10018: 1,
  10019: 1,
  10020: 1,
  10021: 1,
  10022: 1,
  10023: 1,
  10024: 1,
  10030: 1,
  10031: 1,
  10032: 1,
  10033: 1,
  10034: 1,
  10035: 1,
  10036: 1,
  10037: 1,
  10038: 1,
  10039: 1,
  10040: 1,
  10041: 1,
  10042: 1,
  10043: 1,
  10045: 1,
  10046: 1,
  10047: 1,
  10048: 1,
  10049: 1,
  10050: 1,
  10051: 1,
  10052: 1,
  10053: 1,
  10054: 1,
  10055: 1,
  10056: 1,
  10057: 1,
  10058: 1,
  10059: 1,
  10060: 1,
  10061: 1,
  10062: 1,
  10063: 1,
  10064: 1,
  10065: 1,
  10066: 1,
  10067: 1,
  10068: 1,
  10069: 1,
  10070: 1,
  10071: 1,
  10072: 1,
};

export const SHARE_RATES: Record<
  SharableItemId,
  { user: number; friend: number }
> = {
  3: {
    user: 10,
    friend: 25,
  },
  6: {
    user: 25,
    friend: 50,
  },
  7: {
    user: 10,
    friend: 10,
  },
};

export const isLotteryItems = (rate: ConsumptionRate): rate is LotteryItems =>
  'items' in rate && Array.isArray(rate.items);

export const isRandomTokenQuantity = (
  rate: ConsumptionRate
): rate is RandomTokenQuantity => 'min' in rate && 'max' in rate;

export type SteamKeyItem = Extract<Item, { type: 'STEAM_KEY' }>;
export type SteamKeyItemId = SteamKeyItem['id'];

export const STEAM_KEY_ITEMS = ITEMS.filter(
  (item): item is SteamKeyItem => item.type === ItemType.STEAM_KEY
);

export type SharableItem = Extract<Item, { type: 'SHARABLE' }>;
export type SharableItemId = SharableItem['id'];

export const SHARABLE_ITEMS = ITEMS.filter(
  (item): item is SharableItem => item.type === ItemType.SHARABLE
);

export type CombatItem = Extract<Item, { type: 'COMBAT' }>;
export type CombatItemId = CombatItem['id'];

export const COMBAT_ITEMS = ITEMS.filter(
  (item): item is CombatItem => item.type === ItemType.COMBAT
);

export const COMBAT_ITEM_DAMAGE: Record<CombatItemId, number> = {
  '1001': 5,
  '1002': 6,
  '1003': 7,
  '1004': 8,
  '1005': 5,
  '10021': 20,
  '10030': 20,
  '10031': 25,
  '10041': 25,
  '10043': 100,
  '10046': 30,
  '10050': 5,
  '10060': 15,
  '10067': 250,
  '10069': 50,
  '10070': 15,
};

export type ConsumableItem = Extract<Item, { type: 'CONSUMABLE' }>;
export type ConsumableItemId = (typeof CONSUMABLE_ITEMS)[number]['id'];

export const CONSUMABLE_ITEMS = ITEMS.filter(
  (item): item is ConsumableItem => item.type === ItemType.CONSUMABLE
);

export type EtCeteraItem = Extract<Item, { type: 'ETCETERA' }>;
export type EtCeteraItemId = EtCeteraItem['id'];

export const ETCETERA_ITEMS = ITEMS.filter(
  (item): item is EtCeteraItem => item.type === ItemType.ETCETERA
);

export type CurrencyItem = Extract<Item, { type: 'CURRENCY' }>;
export type CurrencyItemId = CurrencyItem['id'];

export const CURRENCY_ITEMS = ITEMS.filter(
  (item): item is CurrencyItem => item.type === ItemType.CURRENCY
);

export type RandomTokenQuantity = { min: number; max: number };
export type LotteryItems = { items: Item[] };
export type ConsumptionRate = LotteryItems | RandomTokenQuantity;

const OLD_BOX_LOTTERY = (key: number) => {
  const BOXES_AVAILABLE = 5;
  return ITEMS.filter((item) => item.type !== ItemType.STEAM_KEY).filter(
    (item) => {
      const n = Number(item.id);
      if (isNaN(n)) return false;
      return Number(item.id) % BOXES_AVAILABLE === key;
    }
  );
};

const RAW_CONSUMPTION_RATES = {
  '2': { min: 10, max: 20 },
  '5': { min: 10, max: 100 },
  '1000': { items: COMBAT_ITEMS },
  '10025': {
    items: OLD_BOX_LOTTERY(0),
  },
  '10026': {
    items: OLD_BOX_LOTTERY(1),
  },
  '10027': {
    items: OLD_BOX_LOTTERY(2),
  },
  '10028': {
    items: OLD_BOX_LOTTERY(3),
  },
  '10029': {
    items: OLD_BOX_LOTTERY(4),
  },
  '10044': { min: 5, max: 25 },
} as const;

// type guard for consumption rates
export const CONSUMPTION_RATES: Record<ConsumableItemId, ConsumptionRate> =
  RAW_CONSUMPTION_RATES;

export type LotteryItemId = {
  [K in keyof typeof RAW_CONSUMPTION_RATES]: (typeof RAW_CONSUMPTION_RATES)[K] extends LotteryItems
    ? K
    : never;
}[keyof typeof RAW_CONSUMPTION_RATES];

export const LOTTERY_ITEMS = Object.fromEntries(
  Object.entries(CONSUMPTION_RATES).map(([key, value]) => [
    key,
    isLotteryItems(value) ? value : { items: [] },
  ])
) as Record<LotteryItemId, LotteryItems>;
