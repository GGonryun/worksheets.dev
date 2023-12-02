import { GameTag, TagSchema } from '../types/tag-schema';

export const tags: Record<GameTag, TagSchema> = {
  board: {
    id: 'board',
    name: 'Board Games',
    iconUrl: '/games/categories/board.svg',
    relatedTags: ['puzzle', 'brain', 'card'],
    description: `
    ## Board Games

    ### What are board games?
    Board games are tabletop games that typically use pieces moved or placed on a pre-marked board (playing surface) and often include elements of table, card, role-playing, and miniatures games as well.

    ### What are the most popular board games?
    The most popular board games currently trending are:
    - [Solitaire](/games/solitaire)

    ### How many people are needed for a board?
    Most board games require at least two players, while others are designed for solo play. Some board games require groups of people to work together, while others pit players against each other. [Solitaire](/games/solitaire) is a popular single-player card game. Chess is a two-player strategy board game played on a checkered board with 64 squares arranged in an 8x8 grid.

    ### What types of board games are there?
    There are many types of board games. There are [card games](/tags/cards), dice games, strategy games, and more. Each type of game has its own rules and objectives. Some games are played with a deck of cards, while others use dice or other objects. Some games are played on a board, while others are played on a table or other surface.

    ### What are the rules of board games?
    The rules of board games vary from game to game. Some games have simple rules, while others have more complex rules. Some games are played with a deck of cards, while others use dice or other objects. Some games are played on a board, while others are played on a table or other surface.

    ### What are the best board games for kids?
    If the game is too complicated, kids will lose interest. If the game is too easy, kids will get bored. The best board games for kids are those that are easy to learn and fun to play.
    `,
  },
  word: {
    id: 'word',
    name: 'Word Games',
    iconUrl: '/games/categories/word.svg',
    relatedTags: ['puzzle', 'popular', 'brain'],
    description: `
    ## Word Games

    ### What are word games?
    Word games are games that involve words. They can be played alone or with others. Some word games are played on paper, while others are played on a computer or mobile device.

    ### Why are word games important?
    Word games are important because they help people develop their vocabulary and spelling skills. They also help people learn new words and improve their memory. Word games can also be used to learn new languages.

    ### What are the most popular word games?
    The most popular word games currently trending are:
    - [Word Search](/games/word-search)
    - [Puzzle Words](/games/puzzle-words)
    - [Word Smith](/games/word-smith)
    - [Word Pack](/games/word-pack)

    ### Are word games fun?
    Word games are fun because they are challenging and require players to think creatively. They also help people improve their vocabulary and spelling skills. It's not for everyone, but it can be a great way to pass the time.
    `,
  },
  action: {
    id: 'action',
    name: 'Action Games',
    iconUrl: '/games/categories/action.svg',
    relatedTags: [],
    description: `
    ## Action Games

    ### What are action games?
    Action games are video games that emphasize physical challenges, including hand-eye coordination and reaction-time. The genre includes diverse sub-genres such as fighting games, shooter games, and platform games, which are widely considered the most important action games, though some real-time strategy games are also considered to be action games.

    ### Can kids play action games?
    Most action games are suitable for kids, but some are not. It depends on the game and the age of the child. Some action games are violent, while others are not. Some action games are easy to play, while others are more difficult. Some action games are fast-paced, while others are slow-paced.

    Please note that some action games may contain violence or other content that is not suitable for children. Parents should use their own judgment when deciding whether or not to allow their children to play action games.

    ### Can action games be played on mobile?
    Yes, action games can be played on mobile. Some action games are designed specifically for mobile devices, while others are designed for consoles or PCs.
    `,
  },
  adventure: {
    id: 'adventure',
    name: 'Adventure Games',
    iconUrl: '/games/categories/adventure.svg',
    relatedTags: ['action', 'popular', 'arcade'],
    description: `
    ## Adventure Games
    Adventure games are games that involve exploration, puzzle-solving, and/or combat. Most adventure games are single-player. In some adventure games, the player controls a character who can interact with objects and other characters. In other adventure games, the player controls a character who can only move around the environment.

    ### Should I play adventure games?
    Adventure games are fun because they allow players to have a sense of adventure. They also help people improve their problem-solving skills. It's not for everyone, but it can be a great way to pass the time.

    ### How do I get started with adventure games?
    If you're new to adventure games we recommend playing lots of them. Some adventure games are easy to learn, while others are more difficult. Some adventure games are fast-paced, while others are slow-paced. Some adventure games are violent, while others are not. Some adventure games are designed for children, while others are designed for adults. Some adventure games are designed for mobile devices, while others are designed for consoles or PCs.
    `,
  },
  arcade: {
    id: 'arcade',
    name: 'Arcade Games',
    iconUrl: '/games/categories/arcade.svg',
    relatedTags: ['action', 'popular'],
    description: `
    ## Arcade Games
    Arcade games are games that are designed to be played in an arcade. They are usually coin-operated and require the player to perform a series of actions in order to win the game. Arcade games are usually fast-paced and require quick reflexes. They are also usually easy to learn and fun to play.

    ### Are arcade games hard?
    Arcade games are not hard. They are challenging and require players to think creatively. They also help people improve their problem-solving skills. It's not for everyone, but it can be a great way to pass the time.

    ### Where can I play arcade games?
    Arcade games can be played at home, in an arcade, or on a mobile device. Some arcade games are designed for mobile devices, while others are designed for consoles or PCs.

    ### Should I play arcade games?
    That's up to you! Some people enjoy playing arcade games, while others do not. If you're not sure if you'll like arcade games, try playing a few of them. If you like them, great! If not, that's okay too. There are plenty of other types of games to play.
    `,
  },
  puzzle: {
    id: 'puzzle',
    name: 'Puzzle Games',
    iconUrl: '/games/categories/puzzle.svg',
    relatedTags: ['board', 'brain'],
    description: `
    ## Puzzle Games

    ### What are puzzle games?
    Puzzle games are games that require players to solve puzzles. They can be played alone or with others. Some puzzle games are played on paper, while others are played on a computer or mobile device.

    ### Why are puzzle games important?
    Puzzle games are important because they help people develop their problem-solving skills. They also help people learn new skills and improve their memory. Puzzle games can also be used to learn new languages.

    ### Are puzzle games hard?
    Puzzle games are not hard. They are challenging and require players to think creatively. They also help people improve their problem-solving skills. It's not for everyone, but it can be a great way to pass the time.
    `,
  },
  brain: {
    id: 'brain',
    name: 'Brain Games',
    iconUrl: '/games/categories/brain.svg',
    relatedTags: ['board', 'puzzle'],
    description: `
    ## Brain Games

    ### What are brain games?
    Brain games are games that require players to use their brains. They can be played alone or with others. Some brain games are played on paper, while others are played on a computer or mobile device.

    ### Why are brain games important?
    Brain games are important because they help people develop their problem-solving skills. They also help people learn new skills and improve their memory. Brain games can also be used to learn new languages.

    ### Are brain games hard?
    Brain games are not hard. They are challenging and require players to think creatively. They also help people improve their problem-solving skills. It's not for everyone, but it can be a great way to pass the time.

    ### Can brain games hurt your brain?
    Brain games are not harmful. They are challenging and require players to think creatively. They also help people improve their problem-solving skills. It's not for everyone, but it can be a great way to pass the time.

    If you're having trouble with brain games, try playing a different type of game. For example, if you're having trouble with word games, try playing a puzzle game instead.

    ### Who likes brain games?
    Brain games are popular among people who like to think. They are challenging and require players to think creatively. They also help people improve their problem-solving skills. It's not for everyone, but it can be a great way to pass the time.
    `,
  },
  card: {
    id: 'card',
    name: 'Card Games',
    iconUrl: '/games/categories/card.svg',
    relatedTags: ['board', 'brain'],
    description: `
    ## Card Games

    ### What are card games?
    Card games are games that use playing cards as the main component. They can be played alone or with others. Some card games are played on paper, while others are played on a computer or mobile device.

    ### Are card games fun?
    Card games are fun because they are challenging and require players to think creatively. Many card games are easy to learn and fun to play. It's not for everyone, but it can be a great way to pass the time.

    ### Are card games hard?
    Card games are not hard. They are challenging and require players to think creatively. They also help people improve their problem-solving skills. It's not for everyone, but it can be a great way to pass the time.

    ### Who can play card games?
    Anyone can play card games. Some rules are more complicated than others, but most card games are easy to learn and fun to play. If you're having trouble with card games, try playing a different type of game. For example, most [action](/tags/action) or [word games](/tags/word) are easier to learn than card games.
    `,
  },
  new: {
    id: 'new',
    name: 'New Games',
    iconUrl: '/games/categories/new.svg',
    relatedTags: ['popular'],
    description: `
    ## New Games

    ### What are new games?
    New games are games that have been released recently. They can be played alone or with others. We vet all games before adding them to our site, so you can be sure that they are safe and fun to play.
    `,
  },
  popular: {
    id: 'popular',
    name: 'Popular Games',
    iconUrl: '/games/categories/popular.svg',
    relatedTags: ['mobile', 'new'],
    description: `
    ## Popular Games

    ### What are popular games?
    Popular games are games that are played by many people. The top 10 most popular games are reviewed every week and saved on this list. You can also find the most popular games by category or tag.
    `,
  },
  mobile: {
    id: 'mobile',
    name: 'Mobile Games',
    iconUrl: '/games/categories/mobile.svg',
    relatedTags: ['desktop', 'popular'],
    description: `
    ## Mobile Games

    ### What are mobile games?
    Mobile games are games that can be played on a mobile device. Some games are designed specifically for mobile devices, while others are designed for [computers](/tags/desktop). Mobile games are popular because they are easy to play and can be played anywhere.

    ### Are mobile games free?
    All games on our site are free to play. Some games may display an advertisement, but you can play them without spending any money.
    `,
  },
  desktop: {
    id: 'desktop',
    name: 'Computer Games',
    iconUrl: '/games/categories/desktop.svg',
    relatedTags: ['mobile', 'popular'],
    description: `
    ## Computer Games

    ### What are computer games?
    Computer games are games that can be played on a computer. Some games are designed specifically for computers, while others are designed for [mobile devices](/tags/mobile). Computer games require a mouse and keyboard to play.
    `,
  },
};

export const tagIds = Object.keys(tags) as GameTag[];
export const tagSchemas = Object.values(tags) as TagSchema[];
