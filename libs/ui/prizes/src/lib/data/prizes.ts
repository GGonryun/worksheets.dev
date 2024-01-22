import {
  daysFromNow,
  hoursFromNow,
  minutesFromNow,
  weeksFromNow,
} from '@worksheets/util/time';

import { PrizeSchema } from '../types';

export const mockPrizes: PrizeSchema[] = [
  {
    id: '1',
    title: "Baldur's Gate 3",
    headline:
      'A role-playing video game that is being developed and published by Larian Studios.',
    description:
      '**RollerCoaster Tycoon 3** is a 2004 construction and management simulation video game. It is the third installment in the RollerCoaster Tycoon series, and was developed by Frontier Developments. RollerCoaster Tycoon 3 places players in charge of managing amusement parks; rides can be built or demolished, terrain and scenery can be adjusted, and prices can be controlled to keep visitors or "peeps" happy.\n\nRollerCoaster Tycoon 3 features two methods of gameplay. In career mode, players must complete predetermined objectives in predesigned scenarios. In the newly added sandbox mode, players have unlimited time and money to create their own custom parks and rides. Features introduced in the series include the ability to import and export custom attractions, design custom scenarios and peeps, as well as design an in-game roller coaster and a fully three-dimensional world players can view from all angles.\n\nIn 2014, a sequel, RollerCoaster Tycoon 4 Mobile was released on mobile devices, to largely negative reception.',
    value: 60,
    expires: daysFromNow(3).getTime(),
    company: 'steam-games',
    imageUrl: '/prizes/steam-games/bg3.png',
    entered: 2,
    tokens: 100,
  },
  {
    id: '2',
    title: 'City Skylines II',
    headline:
      'A city-building game developed by Colossal Order and published by Paradox Interactive.',
    description:
      '**RollerCoaster Tycoon 3** is a 2004 construction and management simulation video game. It is the third installment in the RollerCoaster Tycoon series, and was developed by Frontier Developments. RollerCoaster Tycoon 3 places players in charge of managing amusement parks; rides can be built or demolished, terrain and scenery can be adjusted, and prices can be controlled to keep visitors or "peeps" happy.\n\nRollerCoaster Tycoon 3 features two methods of gameplay. In career mode, players must complete predetermined objectives in predesigned scenarios. In the newly added sandbox mode, players have unlimited time and money to create their own custom parks and rides. Features introduced in the series include the ability to import and export custom attractions, design custom scenarios and peeps, as well as design an in-game roller coaster and a fully three-dimensional world players can view from all angles.\n\nIn 2014, a sequel, RollerCoaster Tycoon 4 Mobile was released on mobile devices, to largely negative reception.',
    value: 30,
    expires: weeksFromNow(2).getTime(),
    company: 'steam-games',
    imageUrl: '/prizes/steam-games/csii.png',
    entered: 1,
    tokens: 1,
  },
  {
    id: '3',
    title: 'Palworld',
    headline:
      'A multiplayer, open-world survival crafting game set in a beautiful, low-poly world.',
    description:
      '**RollerCoaster Tycoon 3** is a 2004 construction and management simulation video game. It is the third installment in the RollerCoaster Tycoon series, and was developed by Frontier Developments. RollerCoaster Tycoon 3 places players in charge of managing amusement parks; rides can be built or demolished, terrain and scenery can be adjusted, and prices can be controlled to keep visitors or "peeps" happy.\n\nRollerCoaster Tycoon 3 features two methods of gameplay. In career mode, players must complete predetermined objectives in predesigned scenarios. In the newly added sandbox mode, players have unlimited time and money to create their own custom parks and rides. Features introduced in the series include the ability to import and export custom attractions, design custom scenarios and peeps, as well as design an in-game roller coaster and a fully three-dimensional world players can view from all angles.\n\nIn 2014, a sequel, RollerCoaster Tycoon 4 Mobile was released on mobile devices, to largely negative reception.',
    value: 30,
    expires: minutesFromNow(32).getTime(),
    company: 'steam-games',
    imageUrl: '/prizes/steam-games/pw.jpeg',
    entered: 0,
    tokens: 20,
  },
  {
    id: '4',
    title: 'EA Sports FC 24',
    headline: 'A football simulation video game published by Electronic Arts.',
    description:
      '**RollerCoaster Tycoon 3** is a 2004 construction and management simulation video game. It is the third installment in the RollerCoaster Tycoon series, and was developed by Frontier Developments. RollerCoaster Tycoon 3 places players in charge of managing amusement parks; rides can be built or demolished, terrain and scenery can be adjusted, and prices can be controlled to keep visitors or "peeps" happy.\n\nRollerCoaster Tycoon 3 features two methods of gameplay. In career mode, players must complete predetermined objectives in predesigned scenarios. In the newly added sandbox mode, players have unlimited time and money to create their own custom parks and rides. Features introduced in the series include the ability to import and export custom attractions, design custom scenarios and peeps, as well as design an in-game roller coaster and a fully three-dimensional world players can view from all angles.\n\nIn 2014, a sequel, RollerCoaster Tycoon 4 Mobile was released on mobile devices, to largely negative reception.',
    value: 45,
    expires: hoursFromNow(-1).getTime(),
    company: 'steam-games',
    imageUrl: '/prizes/steam-games/fc24.png',
    entered: 0,
    tokens: 13,
  },
  {
    id: '5',
    title: 'Roller Coaster Tycoon 3',
    headline: 'A construction and management simulation video game.',
    description:
      '**RollerCoaster Tycoon 3** is a 2004 construction and management simulation video game. It is the third installment in the RollerCoaster Tycoon series, and was developed by Frontier Developments. RollerCoaster Tycoon 3 places players in charge of managing amusement parks; rides can be built or demolished, terrain and scenery can be adjusted, and prices can be controlled to keep visitors or "peeps" happy.\n\nRollerCoaster Tycoon 3 features two methods of gameplay. In career mode, players must complete predetermined objectives in predesigned scenarios. In the newly added sandbox mode, players have unlimited time and money to create their own custom parks and rides. Features introduced in the series include the ability to import and export custom attractions, design custom scenarios and peeps, as well as design an in-game roller coaster and a fully three-dimensional world players can view from all angles.\n\nIn 2014, a sequel, RollerCoaster Tycoon 4 Mobile was released on mobile devices, to largely negative reception.',
    value: 30,
    expires: minutesFromNow(12341).getTime(),
    company: 'steam-games',
    imageUrl: '/prizes/steam-games/rct3.png',
    entered: 1,
    tokens: 20,
  },
  {
    id: '6',
    title: 'Ragnarok Online II',
    headline: 'A massively multiplayer online role-playing game.',
    description:
      '**RollerCoaster Tycoon 3** is a 2004 construction and management simulation video game. It is the third installment in the RollerCoaster Tycoon series, and was developed by Frontier Developments. RollerCoaster Tycoon 3 places players in charge of managing amusement parks; rides can be built or demolished, terrain and scenery can be adjusted, and prices can be controlled to keep visitors or "peeps" happy.\n\nRollerCoaster Tycoon 3 features two methods of gameplay. In career mode, players must complete predetermined objectives in predesigned scenarios. In the newly added sandbox mode, players have unlimited time and money to create their own custom parks and rides. Features introduced in the series include the ability to import and export custom attractions, design custom scenarios and peeps, as well as design an in-game roller coaster and a fully three-dimensional world players can view from all angles.\n\nIn 2014, a sequel, RollerCoaster Tycoon 4 Mobile was released on mobile devices, to largely negative reception.',
    value: 30,
    expires: minutesFromNow(12).getTime(),
    company: 'steam-games',
    imageUrl: '/prizes/steam-games/ro.png',
    entered: 0,
    tokens: 20,
  },
];
