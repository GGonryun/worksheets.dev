import { Prize } from '@prisma/client';

export const prizes: Omit<Prize, 'id' | 'createdAt' | 'updatedAt'>[] = [
  {
    name: "Baldur's Gate 3",
    headline:
      'A role-playing video game that is being developed and published by Larian Studios.',
    description:
      "<p><b>Baldur's Gate 3</b> is a role-playing video game that is being developed and published by Larian Studios. It is the third main game in the Baldur's Gate series, itself based on the Dungeons & Dragons tabletop role-playing system. The game is based on the fifth edition of Dungeons & Dragons rules and features turn-based combat and cooperative multiplayer. It is the first game in the series since Baldur's Gate II: Shadows of Amn in 2000, and the first to be developed by Larian Studios.</p><br/><p>The game was announced with a teaser trailer in June 2019, and was released in early access for Microsoft Windows and Stadia on 6 October 2020. The game is set in the Forgotten Realms, a high fantasy campaign setting, and is based on the fifth edition of the Dungeons & Dragons role-playing system. The game is set in the world of the Forgotten Realms, a campaign setting for Dungeons & Dragons, and is based on the fifth edition of the Dungeons & Dragons rules.</p>",
    monetaryValue: 60,
    type: 'STEAM_KEY',
    imageUrl: '/prizes/steam-games/bg3.jpeg',
    sourceUrl: 'https://store.steampowered.com/app/1086940/Baldurs_Gate_3/',
  },
  {
    name: 'City Skylines II',
    headline:
      'A city-building game developed by Colossal Order and published by Paradox Interactive.',
    description:
      "<p><b>Cities: Skylines</b> is a city-building game developed by Colossal Order and published by Paradox Interactive. The game is a single-player open-ended city-building simulation. Players engage in urban planning by controlling zoning, road placement, taxation, public services, and public transportation of an area. Players work to maintain the city's budget, population, health, happiness, employment, pollution, traffic flow, and other factors. The game is fully moddable, allowing for a wide range of content, and has attracted a large community of modders who create new buildings, maps, and assets for the game.</p><br/><p>The game also features a robust transportation system based on Colossal Order's previous Cities in Motion, allowing the player to plan out effective public transportation for the city to reduce traffic. The game also features a policy system, allowing the player to influence the city's government for the cost of maintaining citizen satisfaction.</p>",
    monetaryValue: 30,
    type: 'STEAM_KEY',
    imageUrl: '/prizes/steam-games/csii-2.png',
    sourceUrl: 'https://store.steampowered.com/app/255710/Cities_Skylines/',
  },
  {
    name: 'Palworld',
    headline:
      'A multiplayer, open-world survival crafting game set in a beautiful, low-poly world.',
    description:
      '<p><b>Palworld</b> is a multiplayer, open-world survival crafting game set in a beautiful, low-poly world. The game is developed and published by Pocketpair, a South Korean game development studio. The game is set in a world where humans and Pokémon-like creatures called Pals live together. Players can capture, train, and breed Pals, and use them to help with farming, building, and fighting. The game features a day-night cycle, weather, and seasons, and players must manage their resources and protect their Pals from danger.</p><br/><p>The game features a crafting system, allowing players to build and customize their home, farm, and other structures. Players can also build vehicles and use them to explore the world. The game features a multiplayer mode, allowing players to team up with friends to build and survive together. The game is currently in development, with a release date yet to be announced.</p>',
    monetaryValue: 30,
    type: 'STEAM_KEY',
    imageUrl: '/prizes/steam-games/pw.jpeg',
    sourceUrl: 'https://store.steampowered.com/app/1208960/Palworld/',
  },
  {
    name: 'EA Sports FC 24',
    headline: 'A football simulation video game published by Electronic Arts.',
    description:
      '<p><b>EA Sports FC 24</b> is a football simulation video game published by Electronic Arts. The game is the latest installment in the FIFA series, and features updated graphics, gameplay, and features. The game features a single-player career mode, allowing players to create and manage their own football team, and a multiplayer mode, allowing players to compete against each other online. The game features a wide range of licensed teams, players, and stadiums, and features realistic ball physics, player animations, and crowd reactions.</p><br/><p>The game also features a new mode called Volta Football, which is a street football mode that features small-sided games with a focus on skill and flair. The game also features a new mode called Ultimate Team, which allows players to build and manage their own team of players from around the world. The game is available on multiple platforms, including Microsoft Windows, PlayStation, and Xbox.</p>',
    monetaryValue: 45,
    type: 'STEAM_KEY',
    imageUrl: '/prizes/steam-games/fc24.png',
    sourceUrl: 'https://store.steampowered.com/app',
  },
  {
    name: 'Roller Coaster Tycoon 3',
    headline: 'A construction and management simulation video game.',
    description:
      '<p><b>RollerCoaster Tycoon 3</b> is a 2004 construction and management simulation video game. It is the third installment in the RollerCoaster Tycoon series, and was developed by Frontier Developments. RollerCoaster Tycoon 3 places players in charge of managing amusement parks; rides can be built or demolished, terrain and scenery can be adjusted, and prices can be controlled to keep visitors or "peeps" happy.</p><br/><p>RollerCoaster Tycoon 3 features two methods of gameplay. In career mode, players must complete predetermined objectives in predesigned scenarios. In the newly added sandbox mode, players have unlimited time and money to create their own custom parks and rides. Features introduced in the series include the ability to import and export custom attractions, design custom scenarios and peeps, as well as design an in-game roller coaster and a fully three-dimensional world players can view from all angles.</p><br/><p>In 2014, a sequel, RollerCoaster Tycoon 4 Mobile was released on mobile devices, to largely negative reception.</p>',
    monetaryValue: 30,
    type: 'STEAM_KEY',
    imageUrl: '/prizes/steam-games/rct3.png',
    sourceUrl:
      'https://store.steampowered.com/app/2700/RollerCoaster_Tycoon_3_Platinum/',
  },
  {
    name: 'Ragnarok Online II',
    headline: 'A massively multiplayer online role-playing game.',
    description:
      '<p><b>Ragnarok Online II</b> is a massively multiplayer online role-playing game developed and published by Gravity Interactive. It is the sequel to the 2002 game Ragnarok Online. The game features a 3D graphics engine, and is set in the world of Midgard. Players can create and customize their own characters, and explore the world, complete quests, and battle monsters. The game features a wide range of classes and skills, and players can team up with other players to form parties and guilds.</p><br/><p>The game features a player-versus-player mode, allowing players to battle each other in arenas and battlegrounds. The game also features a player-versus-environment mode, allowing players to battle powerful monsters and bosses. The game is free to play, with optional in-game purchases. The game is available on multiple platforms, including Microsoft Windows, and features regular updates and events.</p>',
    monetaryValue: 30,
    type: 'STEAM_KEY',
    imageUrl: '/prizes/steam-games/ro.jpeg',
    sourceUrl: 'https://store.steampowered.com/app/231060/Ragnarok_Online_2/',
  },
];
