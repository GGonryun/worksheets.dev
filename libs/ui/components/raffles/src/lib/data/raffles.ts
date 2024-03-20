import common from '@worksheets/assets-common';
import {
  daysFromNow,
  hoursFromNow,
  minutesFromNow,
  weeksFromNow,
} from '@worksheets/util/time';
import { RaffleSchema } from '@worksheets/util/types';

export const mockRaffles: RaffleSchema[] = [
  {
    id: 1,
    prizeId: 1,
    name: "Baldur's Gate 3",
    headline:
      'A role-playing video game that is being developed and published by Larian Studios.',
    description:
      '<p><b>RollerCoaster Tycoon 3</b> is a 2004 construction and management simulation video game. It is the third installment in the RollerCoaster Tycoon series, and was developed by Frontier Developments. RollerCoaster Tycoon 3 places players in charge of managing amusement parks; rides can be built or demolished, terrain and scenery can be adjusted, and prices can be controlled to keep visitors or "peeps" happy.</p><br/><p>RollerCoaster Tycoon 3 features two methods of gameplay. In career mode, players must complete predetermined objectives in predesigned scenarios. In the newly added sandbox mode, players have unlimited time and money to create their own custom parks and rides. Features introduced in the series include the ability to import and export custom attractions, design custom scenarios and peeps, as well as design an in-game roller coaster and a fully three-dimensional world players can view from all angles.</p><br/><p>In 2014, a sequel, RollerCoaster Tycoon 4 Mobile was released on mobile devices, to largely negative reception.</p>',
    expiresAt: daysFromNow(3).getTime(),
    type: 'STEAM_KEY',
    imageUrl: '/prizes/steam-games/bg3.jpeg',
    numWinners: 1,
    sourceUrl: 'https://store.steampowered.com/app/1086940/Baldurs_Gate_3/',
    sponsor: {
      name: 'Larian Studios',
      logo: common.charityGames.logos.square128,
      url: 'https://larian.com/',
    },
  },
  {
    id: 2,
    prizeId: 2,
    name: 'City Skylines II',
    headline:
      'A city-building game developed by Colossal Order and published by Paradox Interactive.',
    description:
      '<p><b>RollerCoaster Tycoon 3</b> is a 2004 construction and management simulation video game. It is the third installment in the RollerCoaster Tycoon series, and was developed by Frontier Developments. RollerCoaster Tycoon 3 places players in charge of managing amusement parks; rides can be built or demolished, terrain and scenery can be adjusted, and prices can be controlled to keep visitors or "peeps" happy.</p><br/><p>RollerCoaster Tycoon 3 features two methods of gameplay. In career mode, players must complete predetermined objectives in predesigned scenarios. In the newly added sandbox mode, players have unlimited time and money to create their own custom parks and rides. Features introduced in the series include the ability to import and export custom attractions, design custom scenarios and peeps, as well as design an in-game roller coaster and a fully three-dimensional world players can view from all angles.</p><br/><p>In 2014, a sequel, RollerCoaster Tycoon 4 Mobile was released on mobile devices, to largely negative reception.</p>',
    expiresAt: weeksFromNow(2).getTime(),
    type: 'STEAM_KEY',
    imageUrl: '/prizes/steam-games/csii.jpeg',
    numWinners: 1,
    sourceUrl: 'https://store.steampowered.com/app/255710/Cities_Skylines/',
    sponsor: {
      name: 'Paradox Interactive',
      logo: common.charityGames.logos.square128,
      url: 'https://www.paradoxplaza.com/',
    },
  },
  {
    id: 3,
    prizeId: 3,
    name: 'Palworld',
    headline:
      'A multiplayer, open-world survival crafting game set in a beautiful, low-poly world.',
    description:
      '<p><b>RollerCoaster Tycoon 3</b> is a 2004 construction and management simulation video game. It is the third installment in the RollerCoaster Tycoon series, and was developed by Frontier Developments. RollerCoaster Tycoon 3 places players in charge of managing amusement parks; rides can be built or demolished, terrain and scenery can be adjusted, and prices can be controlled to keep visitors or "peeps" happy.</p><br/><p>RollerCoaster Tycoon 3 features two methods of gameplay. In career mode, players must complete predetermined objectives in predesigned scenarios. In the newly added sandbox mode, players have unlimited time and money to create their own custom parks and rides. Features introduced in the series include the ability to import and export custom attractions, design custom scenarios and peeps, as well as design an in-game roller coaster and a fully three-dimensional world players can view from all angles.</p><br/><p>In 2014, a sequel, RollerCoaster Tycoon 4 Mobile was released on mobile devices, to largely negative reception.</p>',
    expiresAt: minutesFromNow(32).getTime(),
    type: 'STEAM_KEY',
    imageUrl: '/prizes/steam-games/pw.jpeg',
    numWinners: 1,
    sourceUrl: 'https://store.steampowered.com/app/1208960/Palworld/',
    sponsor: {
      name: 'Pocketpair',
      logo: common.charityGames.logos.square128,
      url: 'https://www.pocketpair.jp/',
    },
  },
  {
    id: 4,
    prizeId: 4,
    name: 'EA Sports FC 24',
    headline: 'A football simulation video game published by Electronic Arts.',
    description:
      '<p><b>RollerCoaster Tycoon 3</b> is a 2004 construction and management simulation video game. It is the third installment in the RollerCoaster Tycoon series, and was developed by Frontier Developments. RollerCoaster Tycoon 3 places players in charge of managing amusement parks; rides can be built or demolished, terrain and scenery can be adjusted, and prices can be controlled to keep visitors or "peeps" happy.</p><br/><p>RollerCoaster Tycoon 3 features two methods of gameplay. In career mode, players must complete predetermined objectives in predesigned scenarios. In the newly added sandbox mode, players have unlimited time and money to create their own custom parks and rides. Features introduced in the series include the ability to import and export custom attractions, design custom scenarios and peeps, as well as design an in-game roller coaster and a fully three-dimensional world players can view from all angles.</p><br/><p>In 2014, a sequel, RollerCoaster Tycoon 4 Mobile was released on mobile devices, to largely negative reception.</p>',
    expiresAt: hoursFromNow(-1).getTime(),
    type: 'STEAM_KEY',
    imageUrl: '/prizes/steam-games/fc24.png',
    numWinners: 1,
    sourceUrl: 'https://store.steampowered.com/app',
    sponsor: {
      name: 'Electronic Arts',
      logo: common.charityGames.logos.square128,
      url: 'https://www.ea.com/',
    },
  },
  {
    id: 5,
    prizeId: 5,
    name: 'Roller Coaster Tycoon 3',
    headline: 'A construction and management simulation video game.',
    description:
      '<p><b>RollerCoaster Tycoon 3</b> is a 2004 construction and management simulation video game. It is the third installment in the RollerCoaster Tycoon series, and was developed by Frontier Developments. RollerCoaster Tycoon 3 places players in charge of managing amusement parks; rides can be built or demolished, terrain and scenery can be adjusted, and prices can be controlled to keep visitors or "peeps" happy.</p><br/><p>RollerCoaster Tycoon 3 features two methods of gameplay. In career mode, players must complete predetermined objectives in predesigned scenarios. In the newly added sandbox mode, players have unlimited time and money to create their own custom parks and rides. Features introduced in the series include the ability to import and export custom attractions, design custom scenarios and peeps, as well as design an in-game roller coaster and a fully three-dimensional world players can view from all angles.</p><br/><p>In 2014, a sequel, RollerCoaster Tycoon 4 Mobile was released on mobile devices, to largely negative reception.</p>',
    expiresAt: minutesFromNow(12341).getTime(),
    type: 'STEAM_KEY',
    imageUrl: '/prizes/steam-games/rct3.png',
    numWinners: 1,
    sourceUrl:
      'https://store.steampowered.com/app/2700/RollerCoaster_Tycoon_3_Platinum/',
    sponsor: {
      name: 'Frontier Developments',
      logo: common.charityGames.logos.square128,
      url: 'https://www.frontier.co.uk/',
    },
  },
  {
    id: 6,
    prizeId: 6,
    name: 'Ragnarok Online II',
    headline: 'A massively multiplayer online role-playing game.',
    description:
      '<p><b>RollerCoaster Tycoon 3</b> is a 2004 construction and management simulation video game. It is the third installment in the RollerCoaster Tycoon series, and was developed by Frontier Developments. RollerCoaster Tycoon 3 places players in charge of managing amusement parks; rides can be built or demolished, terrain and scenery can be adjusted, and prices can be controlled to keep visitors or "peeps" happy.</p><br/><p>RollerCoaster Tycoon 3 features two methods of gameplay. In career mode, players must complete predetermined objectives in predesigned scenarios. In the newly added sandbox mode, players have unlimited time and money to create their own custom parks and rides. Features introduced in the series include the ability to import and export custom attractions, design custom scenarios and peeps, as well as design an in-game roller coaster and a fully three-dimensional world players can view from all angles.</p><br/><p>In 2014, a sequel, RollerCoaster Tycoon 4 Mobile was released on mobile devices, to largely negative reception.</p>',
    expiresAt: minutesFromNow(12).getTime(),
    type: 'STEAM_KEY',
    imageUrl: '/prizes/steam-games/ro.jpeg',
    numWinners: 1,
    sourceUrl: 'https://store.steampowered.com/app/231060/Ragnarok_Online_2/',
    sponsor: {
      name: 'Gravity Interactive',
      logo: common.charityGames.logos.square128,
      url: 'https://www.warpportal.com/',
    },
  },
];
