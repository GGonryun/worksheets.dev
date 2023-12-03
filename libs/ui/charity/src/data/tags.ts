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
    relatedTags: [
      'popular',
      '2d',
      'brain',
      'arcade',
      'adventure',
      'racing',
      'endless',
    ],
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
  endless: {
    id: 'endless',
    name: 'Endless Games',
    iconUrl: '/games/categories/endless.svg',
    relatedTags: ['action', 'popular', 'adventure', 'arcade', 'board'],
    description: `
    ## Endless Games

    ### What are endless games?
    Endless games are games that never end. These games usually have no goal or objective, and the player can continue playing for as long as they want. 
    
    ### Are endless games fun?
    Endless games are fun because they allow players to play for a very long time. Endless games usually have simple rules and are easy to learn. Most endless games only require a few buttons to play, so they can be played on a mobile device or computer.

    ### Do endless games have an ending?
    No, by their very nature they do not have an ending. Endless games are designed to be played for as long as the player wants to play them. Some endless games have a goal or objective, but most do not.
    <br/><br/>
    Some endless games terminate, but if you lose you can always restart them and continue playing.
    `,
  },
  educational: {
    id: 'educational',
    name: 'Educational Games',
    iconUrl: '/games/categories/educational.svg',
    relatedTags: ['popular', 'brain', 'card'],
    description: `
    ## Educational Games
    Educational games are games that are designed to teach people about a specific topic.

    ### What are the different types of educational games?
    There are many types of educational games. The most common are math games, language games, and science games. There are also games that teach people about history, geography, and other subjects.

    ### Are educational games fun?
    Educational games are fun because they allow people to learn while playing. They also help people improve their problem-solving skills. It's not for everyone, but it can be a great way to pass the time.

    ### Are educational games good for kids?
    Yes! Educational games are a great way for kids to learn new things. Most kids will stay engaged while playing these kinds of games. Most educational games are easy to play.`,
  },
  racing: {
    id: 'racing',
    name: 'Racing Games',
    iconUrl: '/games/categories/racing.svg',
    relatedTags: ['action', 'popular', 'arcade'],
    description: `
    ## Racing Games
    ### What are racing games?
    Racing games are games that involve racing. They might not have cars, but they do involve racing. Most racing games are single-player, but some are multiplayer.

    ### What kind of racing games are there?
    There are many types of racing games. Some racing games are played on a track, while others are played on a road. Some racing games are played with cars, while others are played with motorcycles or other vehicles. Some racing games are played with a controller, while others are played with a keyboard or mouse. Some racing games are played on a computer, while others are played on a mobile device.

    ### Are racing games fun?
    Racing games can be very exciting! Some racing games are easy to learn while others are more difficult. If you don't like fast paced games, you might not enjoy racing games. If you like fast paced games, you might enjoy racing games.
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
  car: {
    id: 'car',
    name: 'Car Games',
    iconUrl: '/games/categories/car.svg',
    description: `
    ## Car Games

    ### What are car games?
    Car games are games that involve cars. Some car games also involve racing, or parking.

    ### Why play car games?
    Car games are fun because they allow players to drive cars. They also help people improve their driving skills. It's not for everyone, but it can be a great way to pass the time.
    `,
    relatedTags: ['racing', '2p', 'popular', 'action', 'boy'],
  },
  funny: {
    id: 'funny',
    name: 'Funny Games',
    iconUrl: '/games/categories/funny.svg',
    description: `
    ## Funny Games

    ### What are funny games?
    Funny games are games that make people laugh. Not all funny games have to be funny, but they should at least be entertaining.

    ### Are funny games funny?
    Ideally yes, but if you're not laughing that's okay too. Funny games are designed to be entertaining, so if you're not laughing that's okay too. If you're not laughing, try playing a different type of game. For example, most [action](/tags/action) or [word games](/tags/word) are probably more fun for you
    `,
    relatedTags: ['1p', '2p', 'action', 'drawing', 'shooting'],
  },
  ball: {
    id: 'ball',
    name: 'Ball Games',
    iconUrl: '/games/categories/ball.svg',
    description: `
    ## Ball Games

    ### What are ball games?
    Ball games are games that involve balls. Some ball games also involve sports.

    ### Why play ball games?
    Ball games are fun because they allow players to play with balls. They also help people improve their hand-eye coordination. It's not for everyone, but it can be a great way to pass the time.
    `,
    relatedTags: ['sports', 'shooting', 'boy', '2p', 'brain'],
  },
  fashion: {
    id: 'fashion',
    name: 'Fashion Games',
    iconUrl: '/games/categories/fashion.svg',
    description: `
    ## Fashion Games
    ### What are fashion games?
    Fashion games are games that involve fashion. Most fashion games are simple and easy to play. The usually involve things like dressing up, makeup, and hair styling.
    `,
    relatedTags: ['girl', 'popular', '2p', 'action'],
  },
  shooting: {
    id: 'shooting',
    name: 'Shooting Games',
    iconUrl: '/games/categories/shooting.svg',
    description: `
    ## Shooting Games
    ### What are shooting games?
    Shooting games are games that involve shooting. Some shooting games also involve action or adventure.

    ### Are shooting games for kids?
    Most shooting games are suitable for kids, but some are not. It depends on the game and the age of the child. Some shooting games are violent, while others are not. Some shooting games are easy to play, while others are more difficult. Some shooting games are fast-paced, while others are slow-paced.

    ### Are shooting games fun?
    Shooting games are fun because they allow players to shoot things. They also help people improve their hand-eye coordination. It's not for everyone, but it can be a great way to pass the time.
    `,
    relatedTags: [
      'action',
      'arcade',
      'girl',
      'boy',
      'puzzle',
      'popular',
      'gun',
    ],
  },

  gun: {
    id: 'gun',
    name: 'Gun Games',
    iconUrl: '/games/categories/gun.svg',
    description: `
    ## Gun Games
    ### What are gun games?
    Gun games are games that involve guns. Some gun games also involve action or adventure.

    ### Are gun games for kids?
    No. Most gun games are not suitable for kids. It depends on the game and the age of the child. Most gun games are violent.
    `,
    relatedTags: ['grimace', 'fighting', 'shooting', 'action', '2p', 'new'],
  },
  sports: {
    id: 'sports',
    name: 'Sports Games',
    iconUrl: '/games/categories/sports.svg',
    description: `
    ## Sports Games
    ### What are sports games?
    Sports games are games that involve sports. Some sports games also involve action or adventure.

    ### What sports are in sports games?
    Sports games can involve any sport. Some sports games involve football, basketball, baseball, soccer, hockey, tennis, golf, and more.
    `,
    relatedTags: ['1p', 'arcade', 'adventure', 'ball', 'car', 'boy', 'girl'],
  },
  fighting: {
    id: 'fighting',
    name: 'Fighting Games',
    iconUrl: '/games/categories/fighting.svg',
    description: `
    ## Fighting Games
    ### What are fighting games?
    Fighting games are games that involve fighting. Fighting games can be played alone or with others.

    ### Are fighting games for kids?
    No. Most fighting games are not suitable for kids. It depends on the game and the age of the child. Most fighting games are violent.
    `,
    relatedTags: [
      '2p',
      'action',
      'brain',
      'car',
      'popular',
      'mobile',
      'sports',
    ],
  },
  boy: {
    id: 'boy',
    name: 'Boy Games',
    iconUrl: '/games/categories/boy.svg',
    description: `
    ## Boy Games
    Boy games are games for boys.
    `,
    relatedTags: ['girl', 'ball', 'fighting', 'shooting', 'drawing', 'popular'],
  },
  girl: {
    id: 'girl',
    name: 'Girl Games',
    iconUrl: '/games/categories/girl.svg',
    description: `
    ## Girl Games

    ### What are girl games?
    Girl games are games for girls.
    `,
    relatedTags: ['boy', 'fashion', 'drawing', 'popular', 'mobile'],
  },
  idle: {
    id: 'idle',
    name: 'Idle Games',
    iconUrl: '/games/categories/idle.svg',
    description: `
    ## Idle Games

    ### What are idle games?
    Idle games are games that can be played without any input from the player. They are usually played on a computer or mobile device.
    `,
    relatedTags: ['1p', 'car', 'fashion', 'word', 'sports', 'drawing'],
  },
  drawing: {
    id: 'drawing',
    name: 'Drawing Games',
    iconUrl: '/games/categories/drawing.svg',
    description: `
    ## Drawing Games
    ### What are drawing games?
    Drawing games are games that involve drawing. Most of these games are single-player. Drawing games are a great way to pass the time. They are also a great way to improve your drawing skills.
    `,
    relatedTags: ['girl', 'fashion', '1p', 'arcade', 'ball'],
  },
  grimace: {
    id: 'grimace',
    name: 'Grimace Games',
    iconUrl: '/games/categories/grimace.png',
    description: `
    ## Grimace Games
    
    ### What are grimace games?
    Grimace games are games that involve grimacing. Some grimace games also involve action or adventure.

    ### Who is Grimace?
    Grimace is a character from the McDonald's franchise. He is a large, purple anthropomorphic being of indeterminate species with short arms and legs. He is known for his slow-witted demeanor and his love of milkshakes. He is also known for his catchphrase, "I'm lovin' it."

    ### Are grimace games fun?
    Yes. Grimace games are fun because they allow players to play as grimace. These are our best games. 

    ### Are grimace games for kids?
    Most grimace games are suitable for kids, but some are not. It depends on the game and the age of the child. Some grimace games are violent, while others are not. Some grimace games are easy to play, while others are more difficult. Some grimace games are fast-paced, while others are slow-paced.
    `,
    relatedTags: ['popular'],
  },
  '3d': {
    id: '3d',
    name: '3D Games',
    iconUrl: '/games/categories/3d.svg',
    relatedTags: ['2d', 'popular'],
    description: `
    ## 3D Games

    ### What are 3D games?
    3D games are games that use three-dimensional graphics. Most 3D games are developed for consoles or PCs, but some are designed for mobile devices.

    ### Can I play 3D games on mobile?
    It depends, 3D games are usually more demanding than 2D games. Pick a game and try it out. If it doesn't work, try playing a different game. If you're having trouble with 3D games, try playing a different type of game. For example, most [action](/tags/action) or [word games](/tags/word) are easier to learn than 3D games.
    `,
  },
  '2d': {
    id: '2d',
    name: '2D Games',
    iconUrl: '/games/categories/2d.svg',
    relatedTags: ['3d', 'popular'],
    description: `
    ## 2D Games

    ### What are 2D games?
    2D games are games that use two-dimensional graphics. 2D games don't require as much processing power as 3D games, so they can be played on mobile devices. 

    ### What are examples of 2D games?
    Examples of 2D games include:
    - [Solitaire](/games/solitaire)
    - [Word Search](/games/word-search)
    - [Puzzle Words](/games/puzzle-words)
    - [Word Smith](/games/word-smith)
    - [Word Pack](/games/word-pack)

    ### Should I play 2D games?
    That's up to you! Some people enjoy playing 2D games, while others do not. If you're not sure if you'll like 2D games, try playing a few of them. If you like them, great! If not, try [3D games](/tags/3d) instead!
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
  '1p': {
    id: '1p',
    name: 'Single Player Games',
    iconUrl: '/games/categories/1p.svg',
    description: `
    ## Single Player Games
    ### What are single player games?
    Single player games are games that can be played alone. They are usually played on a computer or mobile device.

    ### Are single player games fun?
    Single player games are fun because they allow players to play alone. If you don't have any friends to play with then single player games are a great way to pass the time.
    `,
    relatedTags: ['2p', 'popular', 'mobile', 'desktop', 'new'],
  },
  '2p': {
    id: '2p',
    name: 'Multiplayer Games',
    iconUrl: '/games/categories/2p.svg',
    relatedTags: ['popular', 'action', 'arcade', 'board'],
    description: `
    ## Multiplayer Games
    ### What are multiplayer games?
    Multiplayer games are games that can be played with other people. Some multiplayer games can be played on a single device, while others require multiple devices.

    ### Are multiplayer games fun?
    Multiplayer games are fun because they allow players to play with other people. Multiplayer games can be played with friends or strangers.

    ### Can I play multiplayer games on mobile?
    Yes, multiplayer games can be played on mobile. Some multiplayer games are designed specifically for mobile devices, while others are designed for consoles or PCs.`,
  },
};

export const tagIds = Object.keys(tags) as GameTag[];
export const tagSchemas = Object.values(tags) as TagSchema[];
