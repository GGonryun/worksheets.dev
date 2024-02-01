import {
  EMOJI_WAR_URL,
  NONOGRAMS_URL,
  PUZZLE_WORDS_URL,
  SOLITAIRE_URL,
  WORD_PACK_URL,
  WORD_SEARCH_URL,
  WORD_SMITH_URL,
} from '@worksheets/ui/env';
import {
  GameMonetizeSchema,
  GameTag,
  gameTagSchema,
  SeedableGameSchema,
} from '@worksheets/util/types';

import { viewports } from './viewports';

export const gameMonetizeGames: GameMonetizeSchema[] = [
  {
    id: '21782',
    title: 'Plants vs Zombies',
    description:
      'Play the hit action-strategy adventure where you meet, greet, and defeat legions of hilarious zombies from the dawn of time, to the end of days. Amass an army of amazing plants, supercharge them with Plant Food, and devise the ultimate plan to protect your brain. DISCOVER HUNDREDS OF PLANTS AND ZOMBIES',
    instructions: 'Drag plants to merge them',
    url: 'https://html5.gamemonetize.com/iz9n0kx3zqfl4mo657zpb5y7v7qfbxij/',
    category: 'adventure',
    tags: 'Action, Adventure, Arcade, Defense',
    thumb:
      'https://img.gamemonetize.com/iz9n0kx3zqfl4mo657zpb5y7v7qfbxij/512x512.jpg',
  },
  {
    id: '49020',
    title: 'Skibidi vs Grimace Climber Race',
    description:
      'The Skibidi vs Grimace Climber Race promises an epic showdown between two daring competitors. Skibidi, known for agility and finesse, faces off against Grimace, renowned for sheer strength and determination. As they ascend challenging cliffs and scale treacherous peaks, spectators hold their breath, unsure who will conquer natures obstacles. This thrilling race blends athleticism and strategy, captivating audiences with the suspense of this exhilarating competition.',
    instructions: 'Mouse click or tap to play',
    url: 'https://html5.gamemonetize.com/ea9pxc7sygkekcm4vwludyadcaweojhx/',
    category: 'action',
    tags: 'Action, Sports, Skibidi, Grimace, Mobile',
    thumb:
      'https://img.gamemonetize.com/ea9pxc7sygkekcm4vwludyadcaweojhx/512x384.jpg',
  },
  {
    id: '46967',
    title: 'Skibidi Toilet IO',
    description:
      'Skibidi Toilet Io is a hilariously wacky game where your character is a head popping out of a toilet! Choose your head, collect toilet paper to increase your power, and push other toilets out of the bustling arena to claim your supremacy. Brace yourself for the unexpected attacks from other fierce toilet-heads and either ally or duel in a thrilling two-player mode. Will you reign as the supreme throne or be flushed away in this whirlwind of absurd, commode-filled colosseum? Its time to dive in and make a splash!',
    instructions:
      'Desktop WASD or ZQSD for Player 1 Arrow Keys or UJHK for Player 2 Mobile Touch the left side of the screen to control Analog for Player 1 Touch the right side of the screen to control Analog for Player 2 ',
    url: 'https://html5.gamemonetize.com/obbpn7enkbxnl39fy12itcid6bc3vo75/',
    category: '3d',
    tags: '2p, 3d, Skibidi, action',
    thumb:
      'https://img.gamemonetize.com/obbpn7enkbxnl39fy12itcid6bc3vo75/512x512.jpg',
  },
  {
    id: '50796',
    title: 'Turbo Racing 3D',
    description:
      'Navigate swiftly through rapid courses and passageways. Collide with rival vehicles to eliminate them from the race. Seize the advantage by soaring off the track for a quicker route. Craving velocity? Prepare, Position, Proceed!',
    instructions: 'Mouse click or tap to play',
    url: 'https://html5.gamemonetize.com/u9757y54l74izica7dvrbj6wtg58njes/',
    category: 'racing',
    tags: 'Mobile, Racing',
    thumb:
      'https://img.gamemonetize.com/u9757y54l74izica7dvrbj6wtg58njes/512x512.jpg',
  },
  {
    id: '50516',
    title: 'Math Class',
    description:
      'Math Class is a game in which you need to solve various problems with addition, subtraction, division and multiplication. The difficulty will vary depending on the level at which the player is.',
    instructions: 'Use mouse or touch on the screen ',
    url: 'https://html5.gamemonetize.com/4rtrsm8ayjjfposagnr1q54xayeysm4k/',
    category: 'puzzle',
    tags: 'Educational, Mobile, Brain, Puzzle',
    thumb:
      'https://img.gamemonetize.com/4rtrsm8ayjjfposagnr1q54xayeysm4k/512x512.jpg',
  },
  {
    id: '50320',
    title: 'Duo Robot Skibidi',
    description:
      'The robot toilet men are trying to escape. Work together with your friend to overcome all obstacles and reach the door. Progress in sequence and teamwork. First one, then the other should advance. Strive to reach the door with your friend. Be careful, some floors can disappear, and make sure not to die. There are sharp rotating saws everywhere.',
    instructions:
      'Player1 use Arrow keys to move Player2 use WASD to move Mobile Touch Control',
    url: 'https://html5.gamemonetize.com/e87ffo4t0qliunpdrb2mha5th9osinov/',
    category: 'arcade',
    tags: '2p, Skibidi, 2d, action, adventure, arcade',
    thumb:
      'https://img.gamemonetize.com/e87ffo4t0qliunpdrb2mha5th9osinov/512x512.jpg',
  },
  {
    id: '30678',
    title: 'Adventure Joystick',
    description:
      "Are you ready to accompany him in the adventure of joystick, who is a cute adventurer? Be careful, no matter how simple it may seem, there are walls you have to go through, obstacles you have to overcome. You'll get burned by hitting obstacles and you may have to start over. collect the ores, take the key and go to the door.",
    instructions: 'WASD Mobile touch control ',
    url: 'https://html5.gamemonetize.com/kad189dvzq61ef6wicxe6rp3z1buuzg9/',
    category: 'arcade',
    tags: '2d, Action, Adventure, Arcade',
    thumb:
      'https://img.gamemonetize.com/kad189dvzq61ef6wicxe6rp3z1buuzg9/512x512.jpg',
  },
  {
    id: '50498',
    title: 'Super Traffic Racer',
    description:
      'Super Traffic Racer is a milestone in the genre of endless arcade racing. Drive your car through highway traffic, earn cash, upgrade your car, and buy new ones. Try to be one of the fastest drivers in the global leader boards. Endless racing is now redefined!',
    instructions: 'Touch the screen or use the arrow keys',
    url: 'https://html5.gamemonetize.com/a5w7favv4e53hhyfev78m7xs0dcefnew/',
    category: 'racing',
    tags: '3D, Action, Arcade, Endless, Racing',
    thumb:
      'https://img.gamemonetize.com/a5w7favv4e53hhyfev78m7xs0dcefnew/512x512.jpg',
  },
  {
    id: '50859',
    title: 'Brain Master IQ Challenge 2',
    description:
      'Brain Master IQ Challenge 2 is an addictive brain-burning puzzle game. Parking, connecting lines, and various puzzle tests will challenge your brain. This new puzzle game may require you to exercise your brain by breaking the rules and thinking outside the box. Easy to play and addictive. If you are really bored, use this game to kill time! Have fun with it!',
    instructions: 'Click or tap to play',
    url: 'https://html5.gamemonetize.com/5sqxxqbes7qoh1kqdn2d5bvzvtw0ewjr/',
    category: 'puzzle',
    tags: 'Boy, Brain, Car, Funny',
    thumb:
      'https://img.gamemonetize.com/5sqxxqbes7qoh1kqdn2d5bvzvtw0ewjr/512x512.jpg',
  },
  {
    id: '18086',
    title: 'The Helix Fall Jump',
    description:
      "Helix Jump is a 3D arcade hyper casual game where players smash and bounce through helix platforms to reach the end. An addictive ball falling game to smash the helix jump 2 Welcome to the most addictive and exciting ball game you\u2019ve ever played. Your ball smashes through colorful platforms that block its descent, but if you hit a black one, it's all over! helix jump is not an easy game One-tap easy-to-learn controls, amazing visual effects and addictive game play mechanics of stack jump. But even black platforms are no match for a fireball falling at full speed!",
    instructions:
      'Features of helix jump - Crazy fast speed - Great time killer - Amazing graphics - Simple and easy to play - Fun and Free game play - One-tap game play - Fun for all ages - Best jump stacker - Regardless platforms - Twisted stack ',
    url: 'https://html5.gamemonetize.com/jkdypm0z8mutwhg7yw2gtqhvwn6uhvd0/',
    category: 'arcade',
    tags: 'Arcade, Endless, Mobile, Ball',
    thumb:
      'https://img.gamemonetize.com/jkdypm0z8mutwhg7yw2gtqhvwn6uhvd0/512x512.jpg',
  },
  {
    id: '15663',
    title: 'Basketball Line',
    description:
      'Draw a line and make the falling ball to score the basket! Time your drawings properly and avoid the bombs!',
    instructions: 'Use Mouse To Play and Keyboard',
    url: 'https://html5.gamemonetize.com/8as7877ussextjhihkwaj9gq625mr130/',
    category: 'sports',
    tags: '1p, Sports',
    thumb:
      'https://img.gamemonetize.com/8as7877ussextjhihkwaj9gq625mr130/512x512.jpg',
  },
  {
    id: '36745',
    title: 'Demolition Derby Car Game',
    description:
      '- Banger Racing - Destruction Derby - Open World Driving - Upgrade & Customize Vehicles - Smash and Bang your way to the lead in this fun and exciting Demolition game inspired by Banger Racing and Destruction Derbies all around the world. \u2022 Free Drive mode \u2022 Demolition Derbies and Races \u2022 Police Chases \u2022 50+ Unique Cars \u2022 3 Worlds \u2022 60+ Racing Tracks and Demolition Arenas \u2022 Upgrades and customization for each car \u2022 Replays We want to hear from you! Please post a review and let us know any bugs and what feature or car you want us to add to the game next!',
    instructions: 'use keyboards',
    url: 'https://html5.gamemonetize.com/e9xyzj0qvdn6oglczd6xvenpdmqwvyll/',
    category: 'racing',
    tags: '1p, 2p, 2D, 3D, Action, Adventure, Arcade, Car, Racing',
    thumb:
      'https://img.gamemonetize.com/e9xyzj0qvdn6oglczd6xvenpdmqwvyll/512x512.jpg',
  },
  {
    id: '50650',
    title: 'Air Hockey Cup',
    description:
      'Fasten your skates and winter jacket. Your favorite ice sport is here in a new fun form. Move your tokens like real players and get the puck under control. Climb the ranks and destroy the tournaments!',
    instructions:
      'Shoot the tokens to score a goal Advance in the league and win tournaments Use the money from your victories to upgrade your tokens buy rings or different formations ',
    url: 'https://html5.gamemonetize.com/ef9qq4qgxq1fa0ie4gv1t3igpvx029tm/',
    category: 'sports',
    tags: 'sports, mobile',
    thumb:
      'https://img.gamemonetize.com/ef9qq4qgxq1fa0ie4gv1t3igpvx029tm/512x512.jpg',
  },
  {
    id: '50382',
    title: 'The Best Russian Billiards',
    description:
      'Are you ready to play The Best Russian Billiards? This realistic billiards featuring stunning 3D graphics is for players of all levels. Worthy rivals are waiting for you! Get in the game and let them know who you are! There are two play modes: against a virtual rival and online. Try both and choose the one you like better. You can even choose the design of interiors, the color of the balls, a cue and other accessories to your taste all of them are available in the store. Two view modes and a sight allow to line up the shots accurately and consistently. Just start playing and enjoy!',
    instructions:
      'Sight the aiming point by keeping the mouse button pressed and moving the pointer Choose the force of the stroke moving the cue on the right of the screen Your goal is to be the first to pocket 8 balls ',
    url: 'https://html5.gamemonetize.com/i5bwxw1fst4xsezqwa4p5oxl6z037kqm/',
    category: 'sports',
    tags: '1p, 2p, 3d, sports, Arcade, Ball',
    thumb:
      'https://img.gamemonetize.com/i5bwxw1fst4xsezqwa4p5oxl6z037kqm/512x512.jpg',
  },
  {
    id: '22545',
    title: 'Real Car Driving Simulator',
    description:
      'How do you like car parking simulation games? Here we need you to help us park the sports car at the marked position on minimap without any time limitations. Keep driving stably and avoid any crash!',
    instructions: 'WASD - move',
    url: 'https://html5.gamemonetize.com/7d5m11z282c26ggra7lvptk5773rkyq1/',
    category: 'action',
    tags: '3d, Car, Racing, Mobile',
    thumb:
      'https://img.gamemonetize.com/7d5m11z282c26ggra7lvptk5773rkyq1/512x512.jpg',
  },
  {
    id: '50628',
    title: 'Sniper Strike',
    description:
      'Sniper Strike is a first-person shooter game that puts you in intense and difficult situations. Stay vigilant and exercise caution as you navigate through challenging missions. Your keen eye and precise aim are crucial as you identify and eliminate high-value targets to accomplish each mission triumphantly. Prepare for an adrenaline-pumping experience filled with tactical precision and thrilling sniper action.',
    instructions:
      'Desktop Left-click shoot Right-click iron sight Scroll mouse-wheel zoom in out R reload Tab pause Mobile Use UI controls',
    url: 'https://html5.gamemonetize.com/faj3w69flisi32koxs0ea4h1tawgogu8/',
    category: 'shooting',
    tags: '3D, Shooting, gun, mobile',
    thumb:
      'https://img.gamemonetize.com/faj3w69flisi32koxs0ea4h1tawgogu8/512x512.jpg',
  },
  {
    id: '49278',
    title: 'Classic chess',
    description:
      'Classic chess is a two-player board game played on a chessboard with 64 squares arranged in rows of an 8x8 grid. Each player starts with 16 pieces: including a king, one queen, two knights, two rooks, two bishops and eight pawns. The goal of this chess game is to checkmate the opponents king, putting him in imminent danger of being captured. The game can be played with artificial intelligence or together with another person on the same device. The game also has the ability to solve chess problems.',
    instructions: 'Mouse click or tap to play',
    url: 'https://html5.gamemonetize.com/4ntoq6issim7yfpyk52gtf7v8dowre4s/',
    category: 'puzzle',
    tags: 'Board, puzzle',
    thumb:
      'https://img.gamemonetize.com/4ntoq6issim7yfpyk52gtf7v8dowre4s/512x512.jpg',
  },
  {
    id: '25411',
    title: 'Little Archer',
    description:
      "Our hero is small in stature but with huge ambitions. He intends to participate and win, but you need to train a lot, which he will do, and you will help him in the game Little Archer. We built a special road along which round targets stand, you need to move and shoot. If you hit exactly the bull's eye, get an additional arrow as a gift.",
    instructions: 'Use mouse or touch the screen ',
    url: 'https://html5.gamemonetize.com/t61ljzpluulgeb4wk72zqo5ev3jqm3mg/',
    category: 'arcade',
    tags: '1p, Mobile, Shooting',
    thumb:
      'https://img.gamemonetize.com/t61ljzpluulgeb4wk72zqo5ev3jqm3mg/512x512.jpg',
  },
  {
    id: '31792',
    title: 'Tic Tac Toe: Colors Game',
    description:
      'Tic Tac Toe: the classic game with a top design Tic Tac Toe is free classic puzzle game (can also be named "noughts and crosses or sometimes X and O".)',
    instructions: 'Tic Tac Toe the classic game with a top design',
    url: 'https://html5.gamemonetize.com/0g0oox44qrdmtsl69fkg3gevxu3obku2/',
    category: '2p',
    tags: 'Arcade, Brain, 2p',
    thumb:
      'https://img.gamemonetize.com/0g0oox44qrdmtsl69fkg3gevxu3obku2/512x512.jpg',
  },
  {
    id: '12269',
    title: 'Chess',
    description:
      'Play chess com for free but develop your thinking skills, tactics and visual memory, why not try it our board chess? chess com is an intellectual board chess loved by many people around the world that allows you to learn chess bases . * Feature: - Play board chess with computer: There are 10 levels to try from beginner to super hard. - Two player offline: Challenge your friends right on your phone. - puzzle chess : Practice chess by decoding over 1,000 puzzles to improve your tactics. - Create puzzle chess: Place the chess piece as you like and solve it with friends or with the computer. - Review: Review the imported chess pieces to learn from your experience and improve your chess skills using our new free chess. live chess now and share your opinion and comments on live chess. We will improve application quality and answer any inquiries 24/7. Thank you for playing our free chess !',
    instructions: 'Use Mouse to move Chess',
    url: 'https://html5.gamemonetize.com/s5xljhtodf6uuuqs0j8auyqi2sejhw79/',
    category: 'puzzle',
    tags: 'puzzle, board, brain',
    thumb:
      'https://img.gamemonetize.com/s5xljhtodf6uuuqs0j8auyqi2sejhw79/512x512.jpg',
  },
  {
    id: '49274',
    title: 'Stickman fall',
    description:
      "Hang between two pillars with plungers on a bar. When you press space, the plungers touch the pillars, halting your descent. Navigate a path filled with obstacles, ensuring you don't collide. Your goal? See how far you can descend without hitting any barriers. Ready to take the challenge?",
    instructions:
      '1 Attach to the bar Space on the keyboard Left Mouse Click or Long Press on mobile devices 2 Descend while avoiding obstacles 3 Upon reaching the finish stop within the marked area ',
    url: 'https://html5.gamemonetize.com/4nsbkbsthace3imqxe11zdymbiwnc2bg/',
    category: 'action',
    tags: '3d, Action, arcade',
    thumb:
      'https://img.gamemonetize.com/4nsbkbsthace3imqxe11zdymbiwnc2bg/512x512.jpg',
  },
  {
    id: '49223',
    title: 'The Life Run',
    description:
      'The Life Run is an exhilarating adventure where players step into the shoes of a determined protagonist on a mission to save humanity. In a dystopian world plagued by a deadly virus, you must race against time, overcoming obstacles, and making crucial decisions. Your choices impact the fate of the remaining survivors. With stunning visuals, immersive storytelling, and heart-pounding action, The Life Run offers a gripping blend of strategy and adrenaline. Will you secure the future or succumb to the chaos? ',
    instructions: 'Mouse click or tap to play',
    url: 'https://html5.gamemonetize.com/f6cjgfvtj2j01s44qjgjqcyvj8t8bdlz/',
    category: 'arcade',
    tags: '1p, Arcade, endless, mobile',
    thumb:
      'https://img.gamemonetize.com/f6cjgfvtj2j01s44qjgjqcyvj8t8bdlz/512x384.jpg',
  },
  {
    id: '39784',
    title: 'Sonic Frontiers',
    description:
      'Worlds are colliding in Sonic the Hedgehog\u2019s newest high-speed adventure! In search of the missing Chaos emeralds, Sonic becomes stranded on an ancient island teeming with unusual creatures. Battle hordes of powerful enemies as you explore a breathtaking world of action, adventure, and mystery. Accelerate to new heights and experience the thrill of high-velocity, open-zone platforming freedom as you race across the five massive Star fall Islands. Jump into adventure, wield the power of the Ancients, and fight to stop these new mysterious foes. Collect rings to survive this adventure and complete all levels to stop the mysterious foes',
    instructions:
      'PC controls use the keyboard arrows or the WASD keys to move and jump Tablet and Mobile controls Tap the game buttons to move and jump ',
    url: 'https://html5.gamemonetize.com/f0bqmxcgegzqs1msrn4dvjvjpu2anr95/',
    category: 'boy',
    tags: 'adventure, endless, boy, mobile, desktop',
    thumb:
      'https://img.gamemonetize.com/f0bqmxcgegzqs1msrn4dvjvjpu2anr95/512x512.jpg',
  },
  {
    id: '50590',
    title: 'Stacklands',
    description:
      'Stacklands is a card game with innovative game play. It is a mixture of city management and stacked card game, where various entities are represented by cards, making it a novelty game. For example, by placing a Villager card on a Berry Shrub card, the villager will automatically collect berries and then drag the Berry card onto the Villager card to restore the villagers satiety. Dozens of quests and novelty game play await your challenge and digging, are you ready?',
    instructions: 'Drag or tap to move',
    url: 'https://html5.gamemonetize.com/9ydku0nbjt4tl5xam6mwmq8ss4govwip/',
    category: 'puzzle',
    tags: 'brain, card',
    thumb:
      'https://img.gamemonetize.com/9ydku0nbjt4tl5xam6mwmq8ss4govwip/512x384.jpg',
  },
  {
    id: '48630',
    title: 'Hero Inc 2 Online',
    description:
      'Hero Inc 2 is a unique casual game of hero creation. The Earth is suffering from the invasion of alien species, the people need you! Build a laboratory, research superpowers, collect new elements, create the strongest heroes and form a strong team of soldiers. Its up to you to save them from their suffering! Good luck, heroes!',
    instructions: 'Mouse click or tap to play',
    url: 'https://html5.gamemonetize.com/ahngs0yf9mnwhpm4ia2eaarjh6h5l61n/',
    category: 'arcade',
    tags: 'Arcade, Boy, Fighting',
    thumb:
      'https://img.gamemonetize.com/ahngs0yf9mnwhpm4ia2eaarjh6h5l61n/512x512.jpg',
  },

  {
    id: '35175',
    title: 'Sokonumber',
    description:
      'Sokonumber is a free online game for boys which is full of leisure and puzzle. The game is simple and fresh, and there are more levels waiting for you to unlock. It is fascinating, and you can have lasting fun by simply operating it. Drag the digital bricks to different tracks, and the bricks with the same number will automatically correspond. Note that you can move all the bricks at once. Come and try it!',
    instructions: 'Mouse or tap to play ',
    url: 'https://html5.gamemonetize.com/dvt7hq1mp08hfyjvdf02p5mgm1wvaoxb/',
    category: 'boy',
    tags: '3D, boy, Brain, Puzzle',
    thumb:
      'https://img.gamemonetize.com/dvt7hq1mp08hfyjvdf02p5mgm1wvaoxb/512x512.jpg',
  },
  {
    id: '32949',
    title: 'Shape Shift Run',
    description:
      'Shape Shift Run game is an interesting online game that uses fingers to control the graphic to transform its shape. The graphic in your hands has different elasticity, and you can change different shapes by clicking with your fingers. You need to adjust the shape in time according to the obstacles ahead and easily pass the customs by changing it into a matching graphic. All jelly shapes need to be completed in a very short time. Come and challenge it!',
    instructions: 'Mouse or tap to play ',
    url: 'https://html5.gamemonetize.com/gpkwnnubl6yfd36uin161lnd1zaxqoxw/',
    category: 'boy',
    tags: '3D,Boy, Brain, Puzzle, endless',
    thumb:
      'https://img.gamemonetize.com/gpkwnnubl6yfd36uin161lnd1zaxqoxw/512x512.jpg',
  },
  {
    id: '47964',
    title: 'Doge Blocks',
    description:
      'Doge Blocks is an addictive online puzzle game. The game design is unique, with a cute dog image as the theme, which adds fun and intimacy to the game. You need to drag the puppy with the mouse to fill the map. The game play in Doge Blocks is simple yet challenging. You must think carefully and plan Doge moves ahead to pass the game level. As the game levels increase, the challenges will become more complex.',
    instructions:
      '1 Use the mouse or tap the screen to click and drag on the screen to move the doge 2 With the theme of the cute dog image 3 The game play is simple and easy to understand you only need to click or drag to operate 4 Fill the map with puppy blocks ',
    url: 'https://html5.gamemonetize.com/uvo901lqxd34xm03ijg389in3dzvlm0i/',
    category: 'puzzle',
    tags: 'Brain, puzzle',
    thumb:
      'https://img.gamemonetize.com/uvo901lqxd34xm03ijg389in3dzvlm0i/512x512.jpg',
  },
  {
    id: '36108',
    title: 'Ricochet Arrow Game',
    description:
      'Ricochet Arrow is a casual archery online game for boys for free. You are trapped in a room surrounded by walls and guarded by skeletons. You need to make use of the rebound effect of bows and arrows, adjust to the best reflection angle, and shoot skeletons in corners that are difficult to find or use normal means to attack ineffective. It will not only exercise your logical understanding of rebound shooting but also test your operational ability. Are you ready for the challenge?',
    instructions: 'Mouse or tap to play ',
    url: 'https://html5.gamemonetize.com/ln72wyu9nsa0ph1x7jwmxx4vriilgbfl/',
    category: 'boy',
    tags: '3D, Boy, Brain, Puzzle, Shooting',
    thumb:
      'https://img.gamemonetize.com/ln72wyu9nsa0ph1x7jwmxx4vriilgbfl/512x512.jpg',
  },
  {
    id: '29683',
    title: 'Love Cat Line',
    description:
      'Love Cat Line is a super fun puzzle game for kids online and a free game to help you develop logical thinking. You just draw a horizontal line to bring two cats in love together and these two cats will be very happy. Think brain and enjoy the game. Can you help them to stay together?',
    instructions: 'Mouse or tap to play ',
    url: 'https://html5.gamemonetize.com/7kkpe70mi1pee3xz0ce7joszskmgwzgr/',
    category: 'brain',
    tags: 'Mobile, Girl, Brain,Puzzle',
    thumb:
      'https://img.gamemonetize.com/7kkpe70mi1pee3xz0ce7joszskmgwzgr/512x512.jpg',
  },
  {
    id: '39545',
    title: 'Merge Number',
    description:
      "Merge Number is a free puzzle online game for boys played on PuzzleGame. All you have to do is combine numbers in a limited grid to form a bigger number. Remember you also have the limit of touching numbers to complete the level. It's challenging, testing your tactics, so try to get the highest score! Play on Mobile, Tablet, and Desktop. Have fun.",
    instructions: 'Mouse or tap to play ',
    url: 'https://html5.gamemonetize.com/u7vzkl7ysv6vbmbb4gs0osv9rxw4b1m2/',
    category: 'puzzle',
    tags: '3D, Brain, Girl, Boy, Puzzle',
    thumb:
      'https://img.gamemonetize.com/u7vzkl7ysv6vbmbb4gs0osv9rxw4b1m2/512x512.jpg',
  },
  {
    id: '50589',
    title: 'Matching Mini Games Box',
    description:
      "Matching Mini Games Box is an ultra-casual triple puzzle game. If you're tired of playing the classic three elimination puzzle game and want something else more colorful and exciting, this game will be your new game. Find three identical items and eliminate them. Relax your mind, reduce your daily stress and improve your observation skills. Come and enjoy!",
    instructions: 'Click or tap to play',
    url: 'https://html5.gamemonetize.com/6cleowj5htr21ko031gvv4ljz59ir2bp/',
    category: 'puzzle',
    tags: 'Ball, Brain, Puzzle',
    thumb:
      'https://img.gamemonetize.com/6cleowj5htr21ko031gvv4ljz59ir2bp/512x512.jpg',
  },
  {
    id: '44794',
    title: 'Smash The Office',
    description:
      'Smash The Office is a free online casual game for boys played on PuzzleGame. In the game, you need to control an office worker, use all kinds of props to destroy the office, smash everything to pieces, and vent your dissatisfaction and pressure in your life. Meanwhile, you should be careful not to be found, or the security guard will come to you for trouble. Play on Mobile, Tablet, or Desktop!',
    instructions:
      'If you play on PC WASD click the mouse to move If you play on a mobile phone Click buttons to move',
    url: 'https://html5.gamemonetize.com/clda2n8vxrvjicvksf74kddhalohbwsw/',
    category: 'brain',
    tags: '3D, Boy, Brain, Drawing, Puzzle',
    thumb:
      'https://img.gamemonetize.com/clda2n8vxrvjicvksf74kddhalohbwsw/512x512.jpg',
  },
  {
    id: '50513',
    title: 'Friends Pug',
    description:
      'Collect all the food with your dog friend and return to your nest. Both friends need to collect their respective foods, overcome obstacles, and reach the nest together. Reach the nest with your friend. Catch the bone to gain special powers and have a superpower.',
    instructions:
      'Use the Arrow Keys to move the Brown Dog Use the WASD to move the Grey Dog both mobile and desktop playability ',
    url: 'https://html5.gamemonetize.com/wqwz5h5ri70ifll576ui3sieztueokdb/',
    category: 'adventure',
    tags: '2p, 2D, Action, Adventure, Arcade',
    thumb:
      'https://img.gamemonetize.com/wqwz5h5ri70ifll576ui3sieztueokdb/512x512.jpg',
  },

  {
    id: '50204',
    title: '2048 X2 Legends',
    description:
      'The elusive 2048 block is almost within your reach. Combine and count up your blocks. Reach higher and higher scores, sharpening your mind in the process.',
    instructions:
      'Shoot blocks of the same number to combine them into a higher number Get to the highest number possible before running out of space Use boosters to make the game easier ',
    url: 'https://html5.gamemonetize.com/dlewrko3e9s1074yicv4q5sydfoynash/',
    category: 'puzzle',
    tags: 'puzzle, brain',
    thumb:
      'https://img.gamemonetize.com/dlewrko3e9s1074yicv4q5sydfoynash/512x512.jpg',
  },
  {
    id: '4430',
    title: 'Cross That Road',
    description:
      'Have you ever felt the adrenaline of dodging traffic while crossing the road? Jump into the role of small animals desperately trying to reach their destination \u2013 whatever it may be \u2013 and cross as many roads, railways and rivers as you can!',
    instructions:
      'Guide your animal through as many roads railways and rivers as you can Watch out for traffic of course Collect coins along the way to unlock more animals ',
    url: 'https://html5.gamemonetize.com/a5yy39hn4vl80u2ef2aohthevqj2zou9/',
    category: 'puzzle',
    tags: 'Puzzle, endless, Car',
    thumb:
      'https://img.gamemonetize.com/a5yy39hn4vl80u2ef2aohthevqj2zou9/512x512.jpg',
  },
  {
    id: '2906',
    title: 'Star Battles',
    description:
      "Simple and fun space game. Fly in circles and avoid crashing into the enemy ships. Complete the missions and fly through the galaxy. Survive as long as you can. Speed up or slow down, just don't crash and have fun. Can you unlock and fly with all the spaceships available? Get ready, pilot!",
    instructions:
      'Fight against enemies ships Accelerate or brake your orbiting space ship to avoid crashing into orbiting enemy ships ',
    url: 'https://html5.gamemonetize.com/buyk5fgznwsi4ijrovufnv3snrh9clbn/',
    category: 'arcade',
    tags: 'Arcade, Shooting',
    thumb:
      'https://img.gamemonetize.com/buyk5fgznwsi4ijrovufnv3snrh9clbn/512x512.jpg',
  },
  {
    id: '983',
    title: 'Basketball Smash',
    description:
      'In this basketball game all you have to do is keep dunking those shots. However, the time is quicky running out and leaves room for less and less mistakes along the road. Easy to learn, hard to master. Can you unlock all the balls? Jump with the ball and shoot the basket within the time limit. Tap, Dunk, Repeat!',
    instructions:
      'Jump with the ball and shoot the basket within the time limit Earn massive scores Each score contributes to unlocking of a new ball Play unlock repeat ',
    url: 'https://html5.gamemonetize.com/afw3m1shjnvb288na8izq9i75aztrj72/',
    category: 'sports',
    tags: '1p, 2D, Action, Ball, Sports',
    thumb:
      'https://img.gamemonetize.com/afw3m1shjnvb288na8izq9i75aztrj72/512x512.jpg',
  },
  {
    id: '49041',
    title: 'Barbiemania',
    description:
      'Experience the ultimate makeup adventure with Barbiemania! Join the iconic doll, Ellie, and create stunning looks for three occasions. Lets dive into the magical world of Barbiemania and unleash your inner stylist!',
    instructions:
      'Use your mouse to play on a desktop and tap to play for mobile devices ',
    url: 'https://html5.gamemonetize.com/wdeki0lf306m9z07slrsasu6idpi20gm/',
    category: 'girl',
    tags: '1p, Fashion, Girl, Mobile',
    thumb:
      'https://img.gamemonetize.com/wdeki0lf306m9z07slrsasu6idpi20gm/512x512.jpg',
  },
  {
    id: '40386',
    title: 'Wunder Planes',
    description:
      '"A very dynamic shooter in which the player controls a single plane and fights against waves of enemies. Destroy enemy planes, gather upgrades and prepare for epic boss fights! As you progress in the game, you\'ll unlock more weapons and gear for bigger firepower!"',
    instructions:
      'Drag your finger or move your mouse to control the plane Shooting is automatic ',
    url: 'https://html5.gamemonetize.com/0n0h33bcfyq6ovxss6l8ermfdfhva0w7/',
    category: 'shooting',
    tags: 'arcade, shooting',
    thumb:
      'https://img.gamemonetize.com/0n0h33bcfyq6ovxss6l8ermfdfhva0w7/512x512.jpg',
  },
  {
    id: '46396',
    title: 'Tower Defense Zombies',
    description:
      'Get ready for hordes of zombies that only care about eating brains! Use your brain against them and build your defenses. Create towers of mass-zombie destruction to confront various enemies. Zombie siege! Endless 30 unique towers 13 different enemies 3 different power ups',
    instructions:
      'Collect coins to build new towers and buy more space for them Merge the towers together to make them stronger and faster Use boosters to give your towers special effects to destroy more zombies ',
    url: 'https://html5.gamemonetize.com/79erubfx45uiq8ksuuxofo7h79s9b1t0/',
    category: 'shooting',
    tags: 'endless, shooting',
    thumb:
      'https://img.gamemonetize.com/79erubfx45uiq8ksuuxofo7h79s9b1t0/512x512.jpg',
  },
  {
    id: '46277',
    title: 'Flappy Fish Journey',
    description:
      'Flappy Fish Journey is a fun and challenging game where you control a small fish as it swims through a series of obstacles. The goal of the game is to reach the end of the level without hitting any obstacles. To control your fish, simply tap the screen to make it flap its fins. The faster you flap, the faster your fish will swim. The obstacles in Flappy Fish Journey come in all shapes and sizes. There are rocks, seaweed, and even other fish. If you hit any of these obstacles, you will lose a life. Flappy Fish Journey is a great game for players of all ages. It is simple to learn, but challenging to master.',
    instructions: 'Mouse click or tap to play',
    url: 'https://html5.gamemonetize.com/hr962quu0hxd4mvcdobwtdd7g0btlt4i/',
    category: 'arcade',
    tags: 'Adventure, Arcade, Funny, Endless',
    thumb:
      'https://img.gamemonetize.com/hr962quu0hxd4mvcdobwtdd7g0btlt4i/512x512.jpg',
  },
  {
    id: '45876',
    title: 'Fashion Tailor Clothing 3d',
    description:
      'Fashion Tailor Clothing 3D is an addicting 3D game, you will become a tailor and your task is to cut out fashionable dresses for different girls. These girls all love fashion, but they cant afford the expensive price for those skirts, so help them! The only thing you need to do in this game Fashion Tailor 3D is tap the screen, sounds easy, right? What are you waiting for?',
    instructions: 'Use Mouse To Play and Keyboard',
    url: 'https://html5.gamemonetize.com/x0nxuoqwz6pjyluey6h7o4xkxkpdasnh/',
    category: 'fashion',
    tags: 'Fashion, Girl, 3d',
    thumb:
      'https://img.gamemonetize.com/x0nxuoqwz6pjyluey6h7o4xkxkpdasnh/512x512.jpg',
  },
  {
    id: '28475',
    title: 'Stick Shadow Fighter Legacy',
    description:
      'Have fun with this entertaining new game called Stick Shadow Fighter Legacy enjoy an action game, adventure accompanies your favorite stickman and help him get as far as you can! Play it now at kiz10.com totally free and enjoy this and many other fighting games. A new mission begins where the little stickman needs your ability to fight and jump the obstacles of a dungeon full of dangerous objects and enemies that will not hesitate to eliminate you! Destroy the robots, dodge the fragile bricks, jump at the right time to avoid falling. The objective of the game is to go as far as you can to accumulate a better score and thus be able to go as far as possible by improving your fighting skills !! Unlock new avatars to evolve your character.',
    instructions:
      'Instructions Use the mouse right click to jump or touch the game buttons on mobile devices ',
    url: 'https://html5.gamemonetize.com/z5xczcpconjvfj8o8i6lretlw1f36cob/',
    category: 'adventure',
    tags: 'adventure, fighting',
    thumb:
      'https://img.gamemonetize.com/z5xczcpconjvfj8o8i6lretlw1f36cob/512x512.jpg',
  },
  {
    id: '50160',
    title: 'Easy Coloring SantaClaus',
    description:
      'Welcome to Easy Coloring SantaClaus, where creativity knows no bounds! This delightful coloring game is designed to spark the imagination of both kids and adults alike. Dive into a world of vibrant hues and endless possibilities as you choose from a selection of charming images, waiting for your artistic touch. Unleash your creativity and bring these images to life with your favorite colors. Easy Coloring SantaClaus offers the perfect canvas for your artistic expression.',
    instructions: 'Mouse to play ',
    url: 'https://html5.gamemonetize.com/r4orr8uwing2wff6oizj89pqoo70ix0u/',
    category: 'drawing',
    tags: 'Drawing',
    thumb:
      'https://img.gamemonetize.com/r4orr8uwing2wff6oizj89pqoo70ix0u/512x512.jpg',
  },
  {
    id: '35485',
    title: 'Wanted Dead or Alive',
    description:
      'Wanted Dead or Alive is a super funny html5 game for kids. Make your own most wanted person and have fun. If you take your time you may make a celebrity!',
    instructions: 'Mouse to play ',
    url: 'https://html5.gamemonetize.com/u2j538iafj0iftfoh52784m0m321062f/',
    category: 'funny',
    tags: 'Fashion, Puzzle, Funny',
    thumb:
      'https://img.gamemonetize.com/u2j538iafj0iftfoh52784m0m321062f/512x512.jpg',
  },
  {
    id: '50111',
    title: 'Rebel Wings',
    description:
      'The player controls the ship, shooting laser to enemies, launching homing missiles and fighting bosses. Each level the enemies differ, more difficult enemies are added and more difficult bosses. Each boss moves on its own unique pattern. Collect power ups like health, missiles, and bomb that kills every visible enemy to clear the stage. Fight through 16 ready levels. Collect the parts from the exploded enemy ships. Use the collected scrap as a currency to upgrade your own ship.',
    instructions:
      'On desktop browsers use WASD or ARROW keys to move X of Shift key to launch missile Use the mouse to select levels or select which part of your ship to buy in hangar On mobile browsers there are two options to move the players ship which you can choose',
    url: 'https://html5.gamemonetize.com/sakdarokyhzgz75r2ybmf80pmt4ebdcn/',
    category: 'shooting',
    tags: '1p, Mobile, Shooting',
    thumb:
      'https://img.gamemonetize.com/sakdarokyhzgz75r2ybmf80pmt4ebdcn/512x512.jpg',
  },
  {
    id: '50032',
    title: 'Pipe Match',
    description:
      "Pipe Match is a rotating card game where the goal is to connect all pipes to the end. Click on a pipe to rotate it clockwise. Pipes that are faded out are not connected and pipes with a dark gray background can't be moved. To undo a previous move, click the rotating arrow button. To restart the whole puzzle, click the arrow in the circle.",
    instructions: 'Mouse click or Touch',
    url: 'https://html5.gamemonetize.com/pyke54t83mxkyomgt8bi4pz51rgkymi3/',
    category: 'puzzle',
    tags: '1p, 2D, Puzzle',
    thumb:
      'https://img.gamemonetize.com/pyke54t83mxkyomgt8bi4pz51rgkymi3/512x512.jpg',
  },
  {
    id: '32158',
    title: 'Magic Pet Salon - Magic Makeover',
    description:
      'Magic Pet Salon is open for business! The little witch Luna owns a pet salon shop. She gives some special pets a makeover with brilliant magic. There are so many cute customers, Luna needs your help! There are so many fun jobs you can do! In the Magic Pet Salon, you can become a groomer and a designer to make pets up and make their hair and nails look pretty! Have fun in the Magic Pet Salon!',
    instructions: 'Tap or click ',
    url: 'https://html5.gamemonetize.com/5sugrdej0t45tdj97zluykcq4a3jjdbn/',
    category: 'girl',
    tags: '2D, Girl, fashion',
    thumb:
      'https://img.gamemonetize.com/5sugrdej0t45tdj97zluykcq4a3jjdbn/512x384.jpg',
  },
  {
    id: '49768',
    title: 'Doggy Save',
    description:
      'Doggy Save is an original puzzle-solving casual game. It has a large number of brain-burning levels, and in each level, there is a puppy waiting for you to save. The rich creativity and interesting puzzle questions may break common sense and bring you something new.',
    instructions:
      'In Doge Bottle you can pass the level by drawing lines to prevent bees from touching the dog Once the bees touch the dog the dog will be hurt ',
    url: 'https://html5.gamemonetize.com/yuftzb5q9g4f9vwuygb6qxxv6y3pdzon/',
    category: '1p',
    tags: '1p, 2d',
    thumb:
      'https://img.gamemonetize.com/yuftzb5q9g4f9vwuygb6qxxv6y3pdzon/512x512.jpg',
  },
  {
    id: '49991',
    title: 'Blocks 8',
    description:
      'Simple but fun and challenging block puzzle tetris arcade game! Fill a row or column with the pieces you have available to score! The logic is similar with tetris, but you can move the blocks freely by dragging and drooping the pieces.',
    instructions:
      'Drag and drop the block pieces bellow in the board in a way that fills a row or column to clean the board and score points ',
    url: 'https://html5.gamemonetize.com/fd59gp2141j48dwbmte07pee03jcv0s6/',
    category: 'puzzle',
    tags: '1p, Puzzle',
    thumb:
      'https://img.gamemonetize.com/fd59gp2141j48dwbmte07pee03jcv0s6/512x512.jpg',
  },
  {
    id: '49210',
    title: 'Oh My Goth',
    description:
      "The Oh My Goth dress-up game shows that there are many ways to express your gothic style. Get inspired by this new trend that emerged from the collision of gothic and whimsical styles. It fuses codes from the 80s gothic style with surrealist evasions inspired by fairy tales and cinematic darkness. Gothic, grunge and goth fashion trends don't have to be restricted to the streets, thats why we are here to teach you all about their aesthetics and how to integrate them into your wardrobe. Website Developer",
    instructions:
      'Use your mouse to play on a desktop or tap to play for mobile devices ',
    url: 'https://html5.gamemonetize.com/c2jgqox91ea8jydniiiggb6dwx2ht8cn/',
    category: 'girl',
    tags: '1p, Fashion, Girl',
    thumb:
      'https://img.gamemonetize.com/c2jgqox91ea8jydniiiggb6dwx2ht8cn/512x512.jpg',
  },
  {
    id: '49916',
    title: 'Spiderman 2 Web Shadow',
    description: 'find mysteries between spiderman 2',
    instructions: 'mouse only',
    url: 'https://html5.gamemonetize.com/e427vwcyt159xm6cr75qerc3julzxhew/',
    category: 'adventure',
    tags: 'Adventure, Arcade, 2D',
    thumb:
      'https://img.gamemonetize.com/e427vwcyt159xm6cr75qerc3julzxhew/512x512.jpg',
  },
  {
    id: '49800',
    title: 'Sushi Supply Co',
    description:
      'Build a sushi empire with Kitty Chef! - Tap on chefs to speed up the making of sushi. - Upgrade your chefs &amp; warehouse to increase your income.',
    instructions:
      '- Tap on chefs to speed up the making of sushi - Upgrade your chefs amp warehouse to increase your income ',
    url: 'https://html5.gamemonetize.com/1o7ojdx0qdsl7gz3jpywu31qnxlffuuk/',
    category: '2d',
    tags: '2D, 1p',
    thumb:
      'https://img.gamemonetize.com/1o7ojdx0qdsl7gz3jpywu31qnxlffuuk/512x512.jpg',
  },
  {
    id: '49771',
    title: 'Doge Bottle',
    description:
      'Doge Bottle is an original puzzle-solving casual game. It has a large number of brain-burning levels, and in each level, there is a puppy waiting for you to save. The rich creativity and interesting puzzle questions may break common sense and bring you something new.',
    instructions:
      'Doge Bottle Collect all the puzzle icons in the glass by sorting them properly Once it overflows it is a failure ',
    url: 'https://html5.gamemonetize.com/j5x20vs1j80yti34pjl6a5ae9bzn7z0z/',
    category: '1p',
    tags: '1p, 2D',
    thumb:
      'https://img.gamemonetize.com/j5x20vs1j80yti34pjl6a5ae9bzn7z0z/512x512.jpg',
  },
  {
    id: '49099',
    title: 'X Bubble Sets',
    description:
      'Funny colored bubbles. Pop them! In the game X-Bubble Sets, you will need to launch bubbles and fall into piles with the same colors. Pop all the bubbles, earn points and complete the levels.',
    instructions:
      'Aim and tap to launch the bubble in the direction of pressing If they get into one-color bubbles they will burst if there are 3 or more of them Bubbles that remain hanging in the air will also burst ',
    url: 'https://html5.gamemonetize.com/u6gvxu2z1vu3vm737gtd9d2mjeflio1t/',
    category: 'puzzle',
    tags: 'Funny, Mobile, Puzzle',
    thumb:
      'https://img.gamemonetize.com/u6gvxu2z1vu3vm737gtd9d2mjeflio1t/512x512.jpg',
  },
  {
    id: '49765',
    title: 'Dragon Ball Z Epic Difference',
    description: 'Find any difference between 2 picture with dragon ball theme',
    instructions: 'mouse only',
    url: 'https://html5.gamemonetize.com/9qvff9n50iwy66vzawg9r8qx3gnvuxr6/',
    category: 'puzzle',
    tags: 'puzzle',
    thumb:
      'https://img.gamemonetize.com/9qvff9n50iwy66vzawg9r8qx3gnvuxr6/512x512.jpg',
  },
  {
    id: '49810',
    title: 'Pacific Ocean Adventure',
    description:
      'How about fishing in the depths of the Pacific ocean? You must fight against sharks and hunt other fish to earn gold! Join this wonderful adventurous game now!',
    instructions:
      'W A S D or Arrow Keys Movement Space Attack When you enter the game from a mobile device you can use the touch controls on the screen ',
    url: 'https://html5.gamemonetize.com/b3gmh9go2cl19hbsmci17bh738xcloty/',
    category: 'shooting',
    tags: '1p, 2D, Action, Adventure',
    thumb:
      'https://img.gamemonetize.com/b3gmh9go2cl19hbsmci17bh738xcloty/512x512.jpg',
  },
  {
    id: '49217',
    title: 'Makeup Studio Halloween',
    description:
      'If youre still seeking inspiration for your Halloween look, then stop right here. Our social media influencers bring three jaw-dropping makeup looks that are going to help you steal the spotlights during the spookiest night of the year. In the Halloween Makeup Trends game for girls, you can learn from Kiki how to create a unicorn makeup look, from Riri how to obtain a colorful Dia de Los Muertes-inspired makeup look, and from Regina the secrets of sophisticated fantasy makeup. Play now!',
    instructions:
      'Use your mouse to play on desktops or tap to play on mobile devices ',
    url: 'https://html5.gamemonetize.com/wul4k3yav7wgmbrr5ly7wg989bs4fw0g/',
    category: 'girl',
    tags: '1p, 2D, Fashion',
    thumb:
      'https://img.gamemonetize.com/wul4k3yav7wgmbrr5ly7wg989bs4fw0g/512x512.jpg',
  },
  {
    id: '49762',
    title: 'Skibidi Attack',
    description:
      'Welcome t Skibidi Attack shooting game! Tap or click to shoot skibidi toilets to get a high score! Dont let skibidi toilets come near to you. Enjoy and good luck!',
    instructions: 'Tap or click to shoot',
    url: 'https://html5.gamemonetize.com/d3rkszqi4fjxzuv900ibqo6v1cdo3xed/',
    category: 'shooting',
    tags: 'shooting, Skibidi',
    thumb:
      'https://img.gamemonetize.com/d3rkszqi4fjxzuv900ibqo6v1cdo3xed/512x512.jpg',
  },
  {
    id: '49737',
    title: 'SpobgeBob Halloween Coloring Book',
    description:
      'Dive into SpobgeBob Halloween Coloring Book! Express your creativity with SpobgeBob Halloween Coloring Book, a delightful and free online coloring game for all ages! Embark on a colorful adventure where you can bring your favorite SpobgeBob characters to life with just a tap of your finger. This game offers endless artistic possibilities and a chance to showcase your coloring skills in the spirit of Halloween.',
    instructions: 'Mouse to play ',
    url: 'https://html5.gamemonetize.com/8vtkqr5xztqk5g2mtrkszlp741l1cwid/',
    category: 'drawing',
    tags: 'Arcade,drawing',
    thumb:
      'https://img.gamemonetize.com/8vtkqr5xztqk5g2mtrkszlp741l1cwid/512x512.jpg',
  },
  {
    id: '49427',
    title: 'Monster Girls High School Squad',
    description:
      'Unleash your inner fashionista with the Monster Girls High School Squad dress-up game! Mix and match captivating outfits, accessorize with magical charms, and create spellbinding looks for supernatural students. Dive into a world of style, friendship, and enchantment as you explore the fantastic wardrobe options and dress up the alluring characters. Join the squad and let your creativity run wild in this thrilling fashion adventure!',
    instructions: 'Left Mouse Button Click',
    url: 'https://html5.gamemonetize.com/2pyaysp1kfnotpbda3q9xdltzvuz0n4m/',
    category: 'girl',
    tags: 'girl, fashion',
    thumb:
      'https://img.gamemonetize.com/2pyaysp1kfnotpbda3q9xdltzvuz0n4m/512x512.jpg',
  },
  {
    id: '49366',
    title: 'T20 Cricket',
    description:
      'Come and join the T20 cricket game! It takes place in a busy stadium with excited fans. The game is played on a green field. Pick the Bangladesh cricket team and show off your amazing skills and strategies. In this game, the bowler runs quickly towards the wicket and throws the ball fast. You have to play the role of the batsman and have to react quickly and either defend the ball or hit it hard. Showcase your cricket skills in front of others in your group.',
    instructions:
      'Mobile Tap on the screen to hit the ball PC Click on the screen to hit the ball ',
    url: 'https://html5.gamemonetize.com/3tgpavmaczut7bt1k4wgjkj09wco7s06/',
    category: 'sports',
    tags: 'Arcade, Ball, sports',
    thumb:
      'https://img.gamemonetize.com/3tgpavmaczut7bt1k4wgjkj09wco7s06/512x512.jpg',
  },
  {
    id: '49103',
    title: 'Need for Race',
    description:
      'Are you ready to accept the speed challenge and show everyone that you are a real racer without fear? Its time to come to the start of the race and drive as much as possible by car, avoiding collisions and not flying off the track! Rearrange between lanes, perform extreme detours and do everything possible to continue moving forward. The longer you can continue the race without collisions, the higher your speed will be and the higher the maximum record.',
    instructions:
      'The car moves automatically Clicking on the right side of the screen allows you to turn it to the right clicking on the left side of the screen makes a left turn You can also turn using the A D keys or the right and left arrows on the keyboard ',
    url: 'https://html5.gamemonetize.com/mb8kyh2eioqmmh42g3tw8tkk98yl6h7y/',
    category: 'racing',
    tags: 'Car, Mobile, Racing',
    thumb:
      'https://img.gamemonetize.com/mb8kyh2eioqmmh42g3tw8tkk98yl6h7y/512x512.jpg',
  },
  {
    id: '49245',
    title: 'Posing Puzzle',
    description:
      'Posing Puzzle is a funny game where you must help your characters to change their poses &amp; posture, help them blend into various shapes to escape a relentless pursuer in a limited time. Test your reflexes and problem-solving skills as you guide your characters to safety while evading capture. With each level, the challenges become more challenging, offering an exciting blend of puzzles and quick-thinking',
    instructions:
      'Tap into your characters to switch to the suitable pose that fits into the shape You may have to think twice if there is more than 2 person that need to hide',
    url: 'https://html5.gamemonetize.com/1d0q0upiud8b176a1vsagz9objq3yran/',
    category: 'puzzle',
    tags: '2D, Girl, Puzzle',
    thumb:
      'https://img.gamemonetize.com/1d0q0upiud8b176a1vsagz9objq3yran/512x512.jpg',
  },
  {
    id: '48586',
    title: 'Speed Demons Race',
    description:
      'Huge, powerful, brutal Monster Trucks. And what if we arrange a race on them? In the game Speed Demons Race you will be able to assemble your own Monster Truck and surpass all rivals! Each rider is faced with the task of driving a difficult track with hills, slopes, overcoming metal jumps, driving through containers, destroying wooden boxes. Only cool pilots can do it all! Winning and performing tricks, please the audience and earn coins for it, and use them to improve your Monster Truck. To prove that you are the best, come to the finish line first on all tracks!',
    instructions:
      'The right arrow key or the pedal on the right on the screen is gas The left arrow key or the pedal on the right on the screen is the brake reverse gear The space bar or the acceleration button on the screen is turbo ',
    url: 'https://html5.gamemonetize.com/ispiubqetu8nido89byhvrdvot9x6n91/',
    category: 'racing',
    tags: '2D, Car, Mobile, Racing',
    thumb:
      'https://img.gamemonetize.com/ispiubqetu8nido89byhvrdvot9x6n91/512x512.jpg',
  },
  {
    id: '49031',
    title: 'My Sliding Blocks',
    description:
      'Move the blocks to the stars of the same color. Time is not limited. Good luck!',
    instructions: 'Mouse click or tap to play',
    url: 'https://html5.gamemonetize.com/z28ckv5057loeuw7ill8ih14s51pb86j/',
    category: 'idle',
    tags: 'Arcade, idle, Puzzle',
    thumb:
      'https://img.gamemonetize.com/z28ckv5057loeuw7ill8ih14s51pb86j/512x512.jpg',
  },
  {
    id: '49156',
    title: 'Basketball Kings 2024',
    description:
      'Enter one of the four basketball courts and outshine everyone wherever you go. Zero-in on the hoop and shoot! Reach a high score to unlock new balls. Which ball will you play best with?',
    instructions:
      'A simple basketball game where your goal is to shoot the basket as many times as you can within the time limit You have to be quick and precise Try to reach the highest score and new balls will unlock The longer you play the less place for mistakes yo',
    url: 'https://html5.gamemonetize.com/xnzfab1hm5q86ofc9z9zuibgibo2wcrl/',
    category: 'sports',
    tags: 'Arcade, Ball, Sports',
    thumb:
      'https://img.gamemonetize.com/xnzfab1hm5q86ofc9z9zuibgibo2wcrl/512x512.jpg',
  },
  {
    id: '1278',
    title: 'Roll This Ball',
    description:
      'Do you like classic sliding and unblocking puzzles? Then this game is just for you! Move the wooden tiles to unblock the path and make a way for the steel ball to reach the red, shiny goal. Enjoy the fun with this wildly popular brain-teasing game and test your wits!',
    instructions:
      'Slide wooden tiles to make a path for the ball to the goal Iron tiles can t be moved Aim to win with as few moves as possible When you re stuck use a hint ',
    url: 'https://html5.gamemonetize.com/ga60e46mqmsgc2a4n8ec42u9aqnshs0y/',
    category: 'puzzle',
    tags: '1p, Arcade, Ball, Puzzle',
    thumb:
      'https://img.gamemonetize.com/ga60e46mqmsgc2a4n8ec42u9aqnshs0y/512x512.jpg',
  },
  {
    id: '49375',
    title: 'Minecraft World Adventure',
    description:
      "Join us on an extraordinary journey in the pixelated realm of Minecraft World Adventure! This arcade game is not just a game; its a thrilling odyssey suitable for adventurers of all ages. Picture this: you, as the iconic Steve from Minecraft, find yourself standing on a spinning platform lost in the vastness of the Minecraft universe. Your mission? To find your way home, navigating through a whirlwind of challenges and obstacles.With every jump, you'll defy gravity, avoiding pitfalls and dodging obstacles that come your way. Its a pulse-pounding adventure where your quick reflexes and strategic jumps are the keys to survival",
    instructions: 'Mouse or SPACE to jump ',
    url: 'https://html5.gamemonetize.com/7luhu49wunq8s1wgvea8e0s2vvu3uozl/',
    category: 'arcade',
    tags: 'Arcade, Endless, Puzzle',
    thumb:
      'https://img.gamemonetize.com/7luhu49wunq8s1wgvea8e0s2vvu3uozl/512x512.jpg',
  },
  {
    id: '49147',
    title: 'Color Race 3D',
    description:
      'Welcome to the Color Race 3D! Colorful game that will keep you on your toes all the very end! Grow, Fight, and Win! Collect stickmen of your color to win levels and clash against the Stickman Boss! GROW THE BIGGEST STICKMAN The largest stickman wins, the smallest lose. Run, grow and absorb other stickmen unik the finish line. Move let and right on the run and collect as many stickmen and coins as possible.',
    instructions: 'Mouse or tap to play',
    url: 'https://html5.gamemonetize.com/uh88hlz3d4j7kktr30seyaf3vxcgh8xm/',
    category: 'arcade',
    tags: '3D, Arcade, endless',
    thumb:
      'https://img.gamemonetize.com/uh88hlz3d4j7kktr30seyaf3vxcgh8xm/512x512.jpg',
  },
  {
    id: '49019',
    title: 'Hill Climb Pixel Car',
    description:
      'Hill Climb Pixel Car is an off-road racing game where riders race over rough terrains such as dirt, sand, mud, or grass tracks. You will need to control your bike skillfully to overcome different obstacles and perform spectacular jump scenes. Race as fast as possible and become the only champion of this motocross championship.',
    instructions:
      '- Hold the right pedal to start the engine and the left pedal to slow down or stop the vehicle You will need to increase your speed using the right pedal to overtake your opponents and reach the finish line as quickly as possible - You can use button A ',
    url: 'https://html5.gamemonetize.com/avws453b51tqcgibbrxzacjiwrm50akz/',
    category: 'racing',
    tags: '1p, 2D, Car, Racing',
    thumb:
      'https://img.gamemonetize.com/avws453b51tqcgibbrxzacjiwrm50akz/512x512.jpg',
  },
  {
    id: '49237',
    title: 'Sumo Smash!',
    description:
      'Step into the ring and embrace the ancient art of Sumo&mdash; with a twist! Welcome to Sumo Smash! an exhilarating game where youll wrestle for supremacy while indulging in a sushi feast to grow your sumo size. Features: Grow to Dominate. Push to Win. Treasure Chests &amp; Skins: Unlock treasure chests found within the arena to collect unique skins',
    instructions: 'WASD or QZSD to move on desktop Touch to move on mobile ',
    url: 'https://html5.gamemonetize.com/zyjcvyrbjdb4400t324nzijc1in3hi5k/',
    category: 'sports',
    tags: '3D, Action, Arcade, Fighting, Funny,sports',
    thumb:
      'https://img.gamemonetize.com/zyjcvyrbjdb4400t324nzijc1in3hi5k/512x512.jpg',
  },
  {
    id: '43346',
    title: 'Rider 2',
    description:
      'Perform insane stunts while you cruise through the never-ending world of Rider 2! Grab your motorcycle and start flipping to get unlimited coins! Make insane jumps and challenge your opponents with the best scores. You can buy your own favorite motorcycle and become master rider in flipping your bike.',
    instructions:
      'PC controls Use the mouse to drive accelerate and stop Mobile controls Touch the screen to speed up or stop',
    url: 'https://html5.gamemonetize.com/z2m8ibqxvup9gn3szyg09zkc67gunye9/',
    category: 'idle',
    tags: 'Car,idle, Racing',
    thumb:
      'https://img.gamemonetize.com/z2m8ibqxvup9gn3szyg09zkc67gunye9/512x512.jpg',
  },
  {
    id: '6542',
    title: 'Super RunCraft',
    description:
      'Super RunCraft is a wonderful 3D Run Game, run through a long minecraft land to collect rows of golden coins, number of special items such as Hover board along your running lane and avoid the obstacles in your way. The classic style endless running game that always gives you a big fantastic fun.',
    instructions: 'Arrow keys or Touch For Play',
    url: 'https://html5.gamemonetize.com/syoymgm7jw290t7mz0hpqjqmc8yqlmrd/',
    category: 'arcade',
    tags: 'Endless,Arcade',
    thumb:
      'https://img.gamemonetize.com/syoymgm7jw290t7mz0hpqjqmc8yqlmrd/512x512.jpg',
  },
  {
    id: '50281',
    title: 'One Bit',
    description:
      'Start overcoming the tracks with your one-bit character in the One bit game! Dont forget to get a checkpoint in the game and win the game by completing the obstacles!',
    instructions:
      'W A S D or Arrow Keys Movement C Checkpoint When you enter the game from a mobile device you can use the touch controls on the screen ',
    url: 'https://html5.gamemonetize.com/bhgysistyfih290cgcv3vsoamvlrk99t/',
    category: 'adventure',
    tags: '1p, 2D, Adventure, Arcade',
    thumb:
      'https://img.gamemonetize.com/bhgysistyfih290cgcv3vsoamvlrk99t/512x512.jpg',
  },
  {
    id: '50252',
    title: 'Agent Skibidi',
    description:
      'Hey, agents, load your weapons! All the toilet monsters have awakened and are coming to kill you. Eliminate all the monsters and collect the highest score. Remember, you can always reach a higher score. Monsters are coming from both the right and left. Work together with your friend to take them all down. Use different weapon modes to kill all the monsters.',
    instructions:
      'Press A-D keys to shoot You will move in the direction youre firing Press the Arrow keys to shoot Mobile gameplay is available ',
    url: 'https://html5.gamemonetize.com/4kbn6y0aadz1fssql42d6op1m3zgk2a6/',
    category: 'shooting',
    tags: '2p, 2D, Action, Gun, Skibidi, Shooting',
    thumb:
      'https://img.gamemonetize.com/4kbn6y0aadz1fssql42d6op1m3zgk2a6/512x512.jpg',
  },
  {
    id: '50267',
    title: 'Car Rapide',
    description:
      'Car Rapide is a one-finger game. Its an endless game in PORTRAIT mode Race your car, avoid obstacles, collect coins and unlock upgrades and other vehicles. Race your van through the streets of Africa. Get multipliers and power-ups to jump higher, fly and... shoot slippers. Car Rapide is a flappy-style one-finger game. By purchasing new cars with the collected coins you will gain fantastic powers.',
    instructions:
      'Car Rapide is a one-finger game Tap to jump and fly Race your car avoid obstacles collect coins and unlock upgrades and other vehicles ',
    url: 'https://html5.gamemonetize.com/b8ncavzg34mugfpzklzi2ykmay78xww4/',
    category: 'racing',
    tags: '1p, Car, Racing',
    thumb:
      'https://img.gamemonetize.com/b8ncavzg34mugfpzklzi2ykmay78xww4/512x512.jpg',
  },
  {
    id: '50109',
    title: 'Pill Puzzler',
    description:
      'Play the Pill Puzzler pill sorting game! Learn how to quickly distribute pills to patients. It takes accuracy and speed to assign the right amount of pills. Play Pill Puzzler right now and become the best doctor!',
    instructions:
      ' Controls Use your mouse or touch to take out pills and distribute them to the patients Show your skill in the game Pill Puzzler Reputation Treat patients and earn reputation If a patient dies or is treated incorrectly it leads to loss of reputat',
    url: 'https://html5.gamemonetize.com/40skpi6ebalali01rhtowsda0nioceg4/',
    category: 'puzzle',
    tags: 'puzzle',
    thumb:
      'https://img.gamemonetize.com/40skpi6ebalali01rhtowsda0nioceg4/512x512.jpg',
  },
  {
    id: '48844',
    title: 'Casstle Puzzle Fight',
    description:
      'Welcome to Castle Enigma! Ready your brave soldiers and brace yourself for an extraordinary clash! Seize rival realms with the assistance of your valiant troops. The dragon is here to wreak havoc on the battlefield. Meanwhile, the wizard and archer are primed to target distant foes. Nevertheless, the challenge ahead is formidable, for the adversarys monarch staunchly guards his fortress!',
    instructions: 'Mouse click or tap to play',
    url: 'https://html5.gamemonetize.com/0gtg17gekbuugpnss5fpullp2famfaqr/',
    category: 'arcade',
    tags: '3D, Arcade, Mobile',
    thumb:
      'https://img.gamemonetize.com/0gtg17gekbuugpnss5fpullp2famfaqr/512x512.jpg',
  },
  {
    id: '48987',
    title: 'Farmers Island',
    description:
      'Play the game as a farmer, start planting different crops, manage your own farm and restore the real planting process. Players can get gold coins in various ways, for example, by sowing, watering and waiting for the harvest to ripen. Various props are also available to allow you to harvest faster, and you can also hire a group of workers to quickly accumulate wealth and create your own farmers paradise.',
    instructions: 'Mouse click or tap to play',
    url: 'https://html5.gamemonetize.com/ji6h5gdlr5qadt5il9tzbzphj9ed8fhm/',
    category: 'arcade',
    tags: '3D, arcade, idle',
    thumb:
      'https://img.gamemonetize.com/ji6h5gdlr5qadt5il9tzbzphj9ed8fhm/512x512.jpg',
  },
  {
    id: '48669',
    title: 'Girls Nail Salon',
    description:
      'Girls Nail Salon is an interesting simulation game, we can be free for nail art style. All kinds of beautiful manicures can be freely matched. Come and play it!',
    instructions: 'Mouse click or tap to play',
    url: 'https://html5.gamemonetize.com/in6pkz9ymvcnspp1dz5vm4g715nlm1xj/',
    category: 'fashion',
    tags: 'Fashion, Funny, Girl,Mobile',
    thumb:
      'https://img.gamemonetize.com/in6pkz9ymvcnspp1dz5vm4g715nlm1xj/512x384.jpg',
  },
  {
    id: '48414',
    title: '2020 Plus Block Puzzle',
    description:
      '2020 Plus is the latest version of this classic block puzzle game. Your task is to place groups of three randomly formed blocks strategically on the board so that they fill complete rows or columns. Once you have placed all three blocks three new blocks will appear. As soon as a row or column is completely filled, the blocks placed in it get cleared. Each completed row or column will also give you points.Play 2020 Plus now for free and experience the most addictive version of this endless puzzle game ever! 2020 Plus: The Classic Block Puzzle Game, Reimagined',
    instructions: 'Mouse click or tap to play',
    url: 'https://html5.gamemonetize.com/0ixomyd8ge090yhhsqyrmjmcegg784dw/',
    category: 'puzzle',
    tags: 'Arcade, Boy, Drawing, Girl, Puzzle',
    thumb:
      'https://img.gamemonetize.com/0ixomyd8ge090yhhsqyrmjmcegg784dw/512x512.jpg',
  },
  {
    id: '47742',
    title: 'Real Airplane Simulator',
    description:
      'Here is an airplane-driving simulation game. There are many different airplanes to unlock and select in the garage. Following the green arrow and lines, adjust the height instantly. More practice will help you complete all levels.',
    instructions: 'Switch views for better driving sense Follow the hints',
    url: 'https://html5.gamemonetize.com/l2mrm0gwkvuj1g0qy0acw6fj7xnzxmas/',
    category: 'action',
    tags: '3D, Car, Mobile',
    thumb:
      'https://img.gamemonetize.com/l2mrm0gwkvuj1g0qy0acw6fj7xnzxmas/512x512.jpg',
  },
  {
    id: '44366',
    title: 'Spirall Rool',
    description:
      'Spiral Roll is an engaging and addictive mobile game that combines elements of puzzle-solving, precision, and creativity. Developed by SayGames, Spiral Roll challenges players to navigate a rolling ball through a dynamic, twisting path made up of various obstacles, gaps, and barriers. The goal is to guide the ball smoothly along the winding trail, avoiding obstacles and collecting gems or other in-game rewards along the way.',
    instructions: 'Mouse Control ',
    url: 'https://html5.gamemonetize.com/jp112o3o4hzgrnc7zaewjkrfk282pul8/',
    category: 'arcade',
    tags: '1p, 2D',
    thumb:
      'https://img.gamemonetize.com/jp112o3o4hzgrnc7zaewjkrfk282pul8/512x512.jpg',
  },
  {
    id: '47796',
    title: 'Space War 3D',
    description:
      'If you are a fan of space shooting games and experiencing sky shooting styles, then Space War is right up your alley. One day, our beautiful galaxy is attacked by space invaders. You are the last hero of the galaxy. Your goal will require quite a struggle because you have to save the galaxy from the enemies. Space War puts you in a front-line battle with space invaders. You will take control of the spaceship and protect the galaxy from alien swarms. As the game progresses, the spaceship qualifies for the upgrade and you will get the full lethal feature.',
    instructions:
      'FEATURES - Great lighting and special effects - Includes Power Upgrades and Bosses - wheel of luck -100 well designed levels ',
    url: 'https://html5.gamemonetize.com/2nvgjwud82nthgbyy15nqlzbtlv07g6h/',
    category: 'arcade',
    tags: '3D, Adventure, Shooting, Action, Arcade',
    thumb:
      'https://img.gamemonetize.com/2nvgjwud82nthgbyy15nqlzbtlv07g6h/512x512.jpg',
  },
  {
    id: '48592',
    title: 'Swing Grimace',
    description:
      'Help Grimace to jump side to side and try to avoid the spikes! Thats all you need to do but try to resist the more you can! Try to sign you best personal record in the leader board! Happy Birthday Grimace!',
    instructions: 'Mouse click or tap to play',
    url: 'https://html5.gamemonetize.com/m7gg5fgclnoyuwv247crbille8hwasgh/',
    category: 'grimace',
    tags: 'Arcade, Grimace, Mobile',
    thumb:
      'https://img.gamemonetize.com/m7gg5fgclnoyuwv247crbille8hwasgh/512x512.jpg',
  },
  {
    id: '48616',
    title: 'Grimace Vs Skibidi',
    description:
      'Like in a great tennis game, Help Grimace to stopping the tennis balls fired by Skibidi! Toilet! but requires speed and precision, make one mistake and you&rsquo;re out! its may be simple to play but it&rsquo;s a challenge to get high scores! The longer You stay on ground, the faster the tennis balls will come at you and it is your job to return them while also avoiding flying bottles. Youre warned! the Platinum medal is VERY hard to complete! only if youre a true grand slam may catch it!',
    instructions: 'Mouse click or tap to play',
    url: 'https://html5.gamemonetize.com/solbljhembpof7yo8r23hu90gu1n5d3v/',
    category: 'sports',
    tags: 'Grimace, Skibidi, sports',
    thumb:
      'https://img.gamemonetize.com/solbljhembpof7yo8r23hu90gu1n5d3v/512x512.jpg',
  },
  {
    id: '48594',
    title: 'Grimace Wood Cutter',
    description:
      'Happy Birthday Grimace! In this game you need to chop wood and avoid the branches. It could be an easy task? Its easy to play but hard to master! So help Grimace as every lumberjack does and chop the tree as fast the more you can! One-touch control system! Simple and addictive gameplay! Hmmm... So Delicious!',
    instructions: 'Mouse click or tap to play',
    url: 'https://html5.gamemonetize.com/67mgdpiz125xptemyjku86m0hr0vlonv/',
    category: 'arcade',
    tags: 'Arcade, Grimace, Mobile',
    thumb:
      'https://img.gamemonetize.com/67mgdpiz125xptemyjku86m0hr0vlonv/512x512.jpg',
  },
  {
    id: '48657',
    title: 'Grimace Commando',
    description:
      'Defend the world to the Grimace invasion! Use your mini machine gun to destroy all Grimace Inavders! This game is a classic endless trend arcade game when you need to resist the more you can and sign the best record!',
    instructions: 'Mouse click or tap to play',
    url: 'https://html5.gamemonetize.com/s5ckkqi51j69zm0nyghyuy03t8hoszyy/',
    category: 'shooting',
    tags: 'Arcade, Boy, Grimace, Mobile, Shooting',
    thumb:
      'https://img.gamemonetize.com/s5ckkqi51j69zm0nyghyuy03t8hoszyy/512x512.jpg',
  },
  {
    id: '48687',
    title: 'Flying Grimace',
    description:
      'Flying Grimace is a fun shooting game for all. To play this game, you need to be great at aiming. The game is set in colorful environments, and your aim is to destroy as many Grimaces as possible. Remember, you have limited bullets. Flying Grimace will surely test your aiming skills and keep you engaged for hours. This game is perfect for fans of arcade shooting games and anyone who loves a good challenge.',
    instructions:
      'PC You can use ASDW or the right-left and up-down arrow keys to fix your target And space key to shoot Mobile Use the joystick to fix your target and tap on the shoot button to shoot ',
    url: 'https://html5.gamemonetize.com/xbh3e5wb6bilzeu1l2r12otatxkc3uex/',
    category: 'shooting',
    tags: 'Funny, Grimace, Shooting',
    thumb:
      'https://img.gamemonetize.com/xbh3e5wb6bilzeu1l2r12otatxkc3uex/512x512.jpg',
  },
  {
    id: '48770',
    title: 'Grimace And Skibidi Whack A Mole',
    description:
      'This is a fun game for You, your friends and your family! Your objective is to hit all the popping Grimaces to get points the more you can! Do you like Whack A Mole? then you will love this game too! Enjoy it!',
    instructions: 'Mouse click or tap to play',
    url: 'https://html5.gamemonetize.com/d072erc0bmwxni5l601mant1z5na8gxs/',
    category: 'grimace',
    tags: 'Boy, Grimace, Skibidi, Mobile',
    thumb:
      'https://img.gamemonetize.com/d072erc0bmwxni5l601mant1z5na8gxs/512x512.jpg',
  },
  {
    id: '37107',
    title: 'Grimace Birthday Escape',
    description:
      'Run across the maze and find your way out before you got spotted by the grimace monster. Find the door to unlock the next level. collect lives and the grimace shake jus. attack the monster by shoot jus to destroy him. Enjoy',
    instructions: 'Follow the game instructions',
    url: 'https://html5.gamemonetize.com/zfi43hwcd7th9zlgr1occj1oi6b6ccg3/',
    category: 'adventure',
    tags: 'Grimace',
    thumb:
      'https://img.gamemonetize.com/zfi43hwcd7th9zlgr1occj1oi6b6ccg3/512x512.jpg',
  },
  {
    id: '49504',
    title: 'Grimace Shake Slide',
    description:
      'Welcome to Grimace Shake Slide! Tap and slide light and right or hold mouse click to control the paddle. Dont Let the grimace creatures fall into the purple lava. Send all grimaces to the tubes to make them fall into the juicy pool. Can you get the highest score?',
    instructions: 'Slide left and right or mouse click',
    url: 'https://html5.gamemonetize.com/1a8pz1adof4au8o5up62cj94urkvpehd/',
    category: 'grimace',
    tags: 'Grimace',
    thumb:
      'https://img.gamemonetize.com/1a8pz1adof4au8o5up62cj94urkvpehd/512x512.jpg',
  },
  {
    id: '49121',
    title: 'Grimace Hop',
    description:
      'Dive into the thrilling world of Grimace Hop and experience the adrenaline rush of head-to-head matchups. With its simple yet addictive gameplay, this game is designed to keep you entertained for hours on end. Show off your jumping skills, strategic thinking, and lightning-fast reflexes as you aim to be the first to reach five points.',
    instructions: 'Hold the Left Mouse Button and release to Jump High ',
    url: 'https://html5.gamemonetize.com/gsp3b58pcb0xikp5b4toch5p5y29itva/',
    category: 'grimace',
    tags: '1p, 3d, grimace, Mobile',
    thumb:
      'https://img.gamemonetize.com/gsp3b58pcb0xikp5b4toch5p5y29itva/512x512.jpg',
  },
  {
    id: '48846',
    title: 'Grimace Bullet Blender',
    description:
      'In the exciting game Grimace Bullet Blender, players are tasked with a thrilling challenge. Their objective is to click on the police officer or any object on the map to direct the bullet towards the character, Grimace. Once the bullet is perfectly aligned with Grimace, a SHOOT button will appear, ready to be activated. This dynamic gameplay mechanic adds an element of precision and strategy to the game, making it an engaging experience for players of all ages.',
    instructions: 'Mouse click or tap to play',
    url: 'https://html5.gamemonetize.com/74ijtek8l89t61rhi0x5f7f4feuhh78r/',
    category: 'shooting',
    tags: 'action, Grimace, Mobile, Shooting',
    thumb:
      'https://img.gamemonetize.com/74ijtek8l89t61rhi0x5f7f4feuhh78r/512x384.jpg',
  },
  {
    id: '49195',
    title: 'Rotating Grimace ',
    description:
      'Rotating Grimace is a unique platform puzzle game where you rotate the world to guide Mr Grimace to his lost stars. This is a great puzzle game with 40 challenge levels, push your logical brain abilities to the limit! Product feature bullets: &bull; Grimace on board! &bull; 40 different levels! &bull; Very Fun for children! &bull; Brain training for whole family! &bull; Cute graphics! &bull; Precise game physics! &bull; Great sounds!',
    instructions: 'Mouse click or tap to play',
    url: 'https://html5.gamemonetize.com/ws9aoikmtjv0t8n0s0v5cj4sxvrzf7x3/',
    category: 'puzzle',
    tags: 'arcade, Grimace, Mobile',
    thumb:
      'https://img.gamemonetize.com/ws9aoikmtjv0t8n0s0v5cj4sxvrzf7x3/512x512.jpg',
  },
  {
    id: '48877',
    title: 'Grimace vs giant clown shoes',
    description:
      'Help grimace escape from the giant clown shoe. Collect the coins with Grimaces image on them to break the platforms and the hamburgers to push the giant shoe away. Watch out for the small shoes! If you get hit, youll slow down.',
    instructions:
      'Touch or click on the left or right side of the screen Cursors left and right on the keyboard',
    url: 'https://html5.gamemonetize.com/a444wv2y6ce7cxrj5bp7jv6q8bi9esxr/',
    category: 'arcade',
    tags: 'Arcade, Grimace',
    thumb:
      'https://img.gamemonetize.com/a444wv2y6ce7cxrj5bp7jv6q8bi9esxr/512x512.jpg',
  },
  {
    id: '10369',
    title: 'Tower Defense',
    description:
      'A horde of horrible monsters is attacking your kingdom, build your towers fast and survive all the waves. If arrows or stones are not enough, use elements to your advantage and slay them all.',
    instructions:
      'Build towers on the free spots and they will automatically attack monsters that come near them Use different combinations of towers and elements to your advantage If you still feel pressured use spells and upgrade your towers to maximum ',
    url: 'https://html5.gamemonetize.com/72sb39iym3ldmid69aivqfi1jmookexr/',
    category: 'defense',
    tags: 'Action, Adventure, Defense, Defense',
    thumb:
      'https://img.gamemonetize.com/72sb39iym3ldmid69aivqfi1jmookexr/512x512.jpg',
  },
  {
    id: '25431',
    title: 'Kingdom Tower Defense',
    description:
      'Take control of the magic king and use your Skills to defend your castle from incoming enemy units. Engage in an epic battle to savethe kingdom with your heroes and magic from the monsters and enemies. Collect money to upgrade your weapons and buy new power upsbefore the final boss reach your castle. Use many special powers to stop the hordes and save the world in this fantasy defense game. Defend your tower from a wave of enemies that seek to invade and colonize your kingdom! Improve your weapons and properties to resist the terrible monsters much longer.',
    instructions:
      'Point and shoot with the mouse on desktopTouch the screen to aim and shoot on mobile devices ',
    url: 'https://html5.gamemonetize.com/13fbwj9nn17h14l0uwyqf37b50dipusw/',
    category: 'defense',
    tags: 'Adventure, Defense',
    thumb:
      'https://img.gamemonetize.com/13fbwj9nn17h14l0uwyqf37b50dipusw/512x384.jpg',
  },
  {
    id: '20970',
    title: 'Stickman Tower Defender',
    description:
      "Face countless challenging tower defense battles & taste hard earned victory as you shoot enemies. Aim and release the arrow and get a head-shot. Let's have fun",
    instructions: 'aim to shoot',
    url: 'https://html5.gamemonetize.com/gtaprsmat7o4o6vkg3unma7vxbw1w7dg/',
    category: 'defense',
    tags: '3D, Defense, Action, Boy',
    thumb:
      'https://img.gamemonetize.com/gtaprsmat7o4o6vkg3unma7vxbw1w7dg/512x512.jpg',
  },
];

const gameMonetizeConverter = (
  game: GameMonetizeSchema
): SeedableGameSchema => {
  const categories = game.tags
    .split(',')
    .map((t) => t.trim().toLowerCase()) as GameTag[];

  if (!gameTagSchema.array().safeParse(categories).success) {
    for (const category of categories) {
      if (!gameTagSchema.safeParse(category).success) {
        throw new Error(`Invalid category ${category} for game ${game.id}`);
      }
    }
  }

  return {
    id: game.id,
    name: game.title,
    developerId: 'gamemonetize',
    iconUrl: game.thumb,
    bannerUrl: game.thumb,
    viewport: viewports['ALL-DEVICES'],
    categories,
    file: {
      type: 'HTML',
      url: game.url,
    },
    createdAt: new Date('2023-12-01T00:00:00.000Z'),
    updatedAt: new Date('2023-12-01T00:00:00.000Z'),
    markets: {},
    description: `<p>${game.description}</p><h3>How to Play ${game.title}?</h3><p>${game.instructions}</p>`,
  };
};

export const games: SeedableGameSchema[] = [
  {
    id: 'fragile-floor',
    name: 'Fragile Floor',
    developerId: 'wmgcat',
    iconUrl: 'https://cdn.charity.games/fragile-floor/assets/thumbnail.png',
    bannerUrl: 'https://cdn.charity.games/fragile-floor/assets/banner.png',
    viewport: viewports['ALL-DEVICES'],
    categories: [
      'action',
      'ad-free',
      'popular',
      'action',
      'arcade',
      'desktop',
      'platform',
      'survival',
    ],
    file: {
      type: 'HTML',
      url: 'https://cdn.charity.games/fragile-floor/index.html',
    },
    markets: {
      itch: 'https://itch.io/embed/2328837',
    },
    createdAt: new Date('2023-12-19T00:00:00.000Z'),
    updatedAt: new Date('2021-12-19:00:00.000Z'),
    description:
      '<p>You will have to break the floor under your opponents to prevent them from surviving! Outsmart them and take first place for yourself!</p><h3>How to Play Fragile Floor?</h3><p>To move, use WASD or Arrow keys. If you are playing on a tablet or phone, use the joystick!</p><br/><p>To navigate the menu, use the mouse or touchscreen!</p>',
  },
  {
    id: 'kuttuk',
    name: 'Kuttuk',
    developerId: 'seredim',
    iconUrl: 'https://cdn.charity.games/seredim/kuttuk/assets/thumbnail.png',
    bannerUrl: 'https://cdn.charity.games/seredim/kuttuk/assets/banner.jpeg',
    viewport: viewports['DESKTOP-PORTRAIT'],
    categories: ['arcade', 'ad-free', 'popular', 'action', 'arcade', 'desktop'],
    file: {
      type: 'HTML',
      url: 'https://cdn.charity.games/seredim/kuttuk/index.html',
    },
    createdAt: new Date('2023-12-29T00:00:00.000Z'),
    updatedAt: new Date('2023-12-29T00:00:00.000Z'),
    markets: {
      android:
        'https://play.google.com/store/apps/details?id=com.SereDim.Kuttuk',
      itch: 'https://itch.io/embed/2269843',
    },
    description:
      '<p>Break the blocks in a center and dodge corners.</p><h3>What is Kuttuk?</h3><p>Kuttuk is a fast-paced arcade game. The goal of the game is to break up the blocks by hitting them on the flat side. If you get hit by the edge of a block you lose the game</p><h3>What are the controls for Kuttuk?</h3><p>Left</p><ul><li>desktop: left arrow</li><li>mobile: touch left</li></ul><p>Right</p><ul><li>right arrow</li><li>mobile: touch right</li></ul>',
  },
  {
    id: 'plane-fly',
    name: 'Plane Fly',
    developerId: 'charity-games',
    iconUrl: 'https://cdn.charity.games/plane-fly/assets/thumbnail.png',
    bannerUrl: 'https://cdn.charity.games/plane-fly/assets/banner.png',
    viewport: viewports['LANDSCAPE-ONLY'],
    categories: [
      'ad-free',
      'popular',
      'action',
      'arcade',
      'endless',
      'desktop',
      'mobile',
    ],
    file: {
      type: 'HTML',
      url: 'https://cdn.charity.games/plane-fly/index.html',
    },
    createdAt: new Date('2023-12-18T00:00:00.000Z'),
    updatedAt: new Date('2021-12-18T00:00:00.000Z'),
    markets: {},
    description:
      '<p><b>Use LANDSCAPE mode on mobile for the best experience</b></p><br/><br/><p>Plane Fly is an endless flappy bird style game. The goal of the game is to fly as far as you can without hitting any obstacles.</p><h3>How to Play Plane Fly?</h3><ul><li>Tap the screen to fly</li><li>Avoid the obstacles</li></ul>',
  },
  {
    id: 'blasteroids',
    name: 'Blasteroids',
    developerId: 'whitgroves',
    iconUrl:
      'https://cdn.charity.games/whitgroves/blasteroids/assets/thumbnail.png',
    bannerUrl:
      'https://cdn.charity.games/whitgroves/blasteroids/assets/banner.png',
    viewport: viewports['ALL-DEVICES'],
    categories: [
      'action',
      'ad-free',
      'popular',
      'action',
      'arcade',
      'desktop',
      'shooting',
    ],
    file: {
      type: 'HTML',
      url: 'https://cdn.charity.games/whitgroves/blasteroids/index.html',
    },
    createdAt: new Date('2023-12-29T00:00:00.000Z'),
    updatedAt: new Date('2021-12-29T00:00:00.000Z'),
    markets: {
      website: 'https://blasteroids.io/',
      github: 'https://github.com/whitgroves/blasteroids',
    },
    description:
      '<h3>What is Blasteroids?</h3><p>A re-imagined classic. How far will you go?</p><h3>How to play Blasteroids?</h3><ul><li>Desktop: Space to move, Click to shoot, Esc to pause</li><li>Mobile: Tilt to move, Tap to shoot, Hold to pause</li></ul>',
  },
  {
    id: 'solitaire',
    name: 'Solitaire',
    developerId: 'charity-games',
    iconUrl: '/games/solitaire/icon.jpg',
    bannerUrl: '/games/solitaire/banner.png',
    viewport: viewports['PORTRAIT-ONLY'],
    categories: [
      'ad-free',
      'card',
      'brain',
      'board',
      'puzzle',
      'popular',
      'new',
      'mobile',
    ],
    file: {
      type: 'HTML',
      url: SOLITAIRE_URL,
    },
    createdAt: new Date('2023-10-16T00:00:00.000Z'),
    updatedAt: new Date('2021-11-23T00:00:00.000Z'),
    markets: {},
    description: `<p>Solitaire is a card game that you play by yourself. You only need a standard deck of 52 cards to play, so it's a great game to play when traveling alone or just when you are bored and want something to do. There are a lot of different types of solitaire you can play.</p><h3>How to Play Solitaire?</h3><p>The goal of solitaire is to get all 52 cards into four piles, each arranged by suit and in order from ace to king. Game play varies depending on the type of solitaire you play, but the main goal is always the same: to get all cards into the correct order.</p><h3>Who created Solitaire?</h3><p>The first known solitaire game rules were recorded during the Napoleonic era. The author of the first known solitaire rules was Lady Adelaide Cadogan, who wrote her rules in the late 1870s or early 1880s. Lady Cadogan's book was titled Illustrated Games of Patience and it was published in the United Kingdom in 1875. The book was very popular among the upper classes and eventually became known as The Solitaire Bible.</p><h3>Controls</h3><ul><li>Click and drag to move cards</li><li>Double click to move cards to the foundation</li><li>Click on the deck to draw cards</li></ul>`,
  },
  {
    id: 'emoji-war',
    name: 'Emoji War',
    developerId: 'charity-games',
    iconUrl: '/games/emoji-war/icon.jpg',
    bannerUrl: '/games/emoji-war/banner.jpg',
    viewport: viewports['ALL-DEVICES'],
    categories: [
      'ad-free',
      'card',
      'board',
      'action',
      'popular',
      'desktop',
      'mobile',
    ],
    file: {
      type: 'HTML',
      url: EMOJI_WAR_URL,
    },
    createdAt: new Date('2023-10-01T00:00:00.000Z'),
    updatedAt: new Date('2021-11-07T00:00:00.000Z'),
    markets: {},
    description: `<p>Emoji War is a fast-paced card game. Players are randomly dealt movement and attack cards. Players quickly play as many cards as they can at the same time to defeat their opponents. The first player to run out of health loses the game.</p><h3>How to Play Emoji War?</h3><p>Emoji War is best played on mobile but it supports desktop too. All you need is a mouse or some fingers (toes would work too though, a nose might be pushing it). Click on the cards to play them. The game will automatically play the cards for you. The goal of the game is to defeat your opponents by playing cards faster than they can.</p><h3>Controls</h3><ul><li>Click on the cards to play them</li></ul>`,
  },
  {
    id: '1d-chess',
    name: '1D Chess',
    developerId: 'seredim',
    iconUrl: 'https://cdn.charity.games/seredim/1d-chess/assets/thumbnail.png',
    bannerUrl: 'https://cdn.charity.games/seredim/1d-chess/assets/banner.jpeg',
    viewport: viewports['DESKTOP-LANDSCAPE'],
    categories: ['ad-free', 'popular', 'board', 'desktop'],
    file: {
      type: 'HTML',
      url: 'https://cdn.charity.games/seredim/1d-chess/index.html',
    },
    createdAt: new Date('2023-12-29T00:00:00.000Z'),
    updatedAt: new Date('2023-12-29T00:00:00.000Z'),
    markets: {
      android:
        'https://play.google.com/store/apps/details?id=com.SereDim.OneDChess',
      itch: 'https://itch.io/embed/2383094',
    },
    description: `<h3>What is 1D Chess?</h3><p>The main idea is to make a simple strategy system for two equal sides fighting, which will give the player the opportunity to control the strength of each side, but at the same time the winning choice will not be pattern.</p><p>Chess pieces in their original quantity are ideal for this idea. They move abstractly correctly to the original game, and each piece is balanced equal to the other pieces.</p><p>Player control is limited to selecting one of a random three non-repeating pieces from a pool of 5 pieces. This way he can choose for each side, and defeat will be counted as soon as at least one figure reaches the opposite edge.</p><p>Next, a little about the logic of the game:</p><p>The board has 11 cells, and there are kings on the edges, that is, there are only 9 playable cells. All pieces have health and damage for smoother game play. The game is real time turn based, and the steps have the following logic: all pieces of the same color acts in a row, starting from the farthest to the last one created, their action can be either an attack or a movement, if a piece can hit, then it hits, if it cannot, then it tries to move forward on one cell, then the second color moves and so on alternating.</p><p>The Rogue-like system here is replaced by a special balance, which depends on the player's actions. You can feel what is making a difference in consider mistakes for future tries.</p><h3>How to Play 1D Chess?</h3><p>Select one of the three pieces for each side, and defeat will be counted as soon as at least one figure reaches the opposite edge.</p>`,
  },
  {
    id: 'baku-gamu',
    name: 'Baku Gamu',
    developerId: 'syb-coin-coin',
    iconUrl: 'https://cdn.charity.games/baku-gamu/assets/thumbnail.png',
    bannerUrl: 'https://cdn.charity.games/baku-gamu/assets/banner.png',
    viewport: viewports['PORTRAIT-ONLY'],
    categories: [
      'ad-free',
      'popular',
      'action',
      'arcade',
      'desktop',
      'mobile',
      'funny',
    ],
    file: {
      type: 'HTML',
      url: 'https://bakugamu.com/',
    },
    createdAt: new Date('2023-12-21T00:00:00.000Z'),
    updatedAt: new Date('2021-12-21:00:00.000Z'),
    markets: {},
    description: `<p>Baku Gamu is a collection of fast-paced microgames developed by Syb Coin Coin. This game is in active development with new games being added regularly. The goal of the game is to complete as many microgames as you can before you run out of lives. Each microgame is randomly selected from the pool of available games.</p><br/><br/><h3>How to Play Baku Gamu?</h3><p>Each game is unique, follow the instructions on the screen to complete the microgame!</p><h3>Who created Baku Gamu?</h3><p>Baku Gamu is developed by Syb Coin Coin. Syb Coin Coin is a game development studio based in France. They have been making games since 2015.</p>`,
  },
  {
    id: 'dino-rush',
    name: 'Dino Rush',
    developerId: 'charity-games',
    iconUrl: 'https://cdn.charity.games/dino-rush/assets/thumbnail.png',
    bannerUrl: 'https://cdn.charity.games/dino-rush/assets/banner.png',
    viewport: viewports['LANDSCAPE-ONLY'],
    categories: [
      'ad-free',
      'popular',
      'action',
      'arcade',
      'endless',
      'desktop',
      'mobile',
    ],
    file: {
      type: 'HTML',
      url: 'https://cdn.charity.games/dino-rush/index.html',
    },
    markets: {},
    createdAt: new Date('2023-12-21T00:00:00.000Z'),
    updatedAt: new Date('2021-12-21T00:00:00.000Z'),
    description: `<p>Dino Rush is an endless runner game. The goal of the game is to run as far as you can without hitting any obstacles.</p><h3>How to Play Dino Rush?</h3><ul><li>Tap the screen or press the space bar to jump</li>Tap the screen or press the space bar while in the air to fall down immediately.<li></li><li>Avoid the obstacles</li></ul><h3>Who created Dino Rush?</h3><p>Dino Rush is a free game created by Charity Games. We are a non-profit organization that creates games to raise money for charity. We donate 100% of our profits to charity.</p><h3>Known issues:</h3><p></p><ul><li>The game does not allow the user to mute sounds on mobile devices.</li></ul>`,
  },
  {
    id: 'conquer-the-world',
    name: 'RPG Conquer The World',
    developerId: 'llstd',
    iconUrl: 'https://cdn.charity.games/conquer-the-world/assets/thumbnail.png',
    bannerUrl: 'https://cdn.charity.games/conquer-the-world/assets/banner.jpg',
    categories: ['ad-free', 'adventure', 'desktop', 'mobile'],
    viewport: viewports['PORTRAIT-ONLY'],
    file: {
      type: 'HTML',
      url: 'https://cdn.charity.games/conquer-the-world/index.html',
    },
    createdAt: new Date('2023-12-21T00:00:00.000Z'),
    updatedAt: new Date('2023-12-21:00:00.000Z'),
    markets: {
      ios: `https://apps.apple.com/us/app/rpg-conquer-the-world/id6473287154`,
      itch: `https://itch.io/embed/2378162`,
    },
    description: `<p>RPG: Conquer the World ... at least our Village :-)</p><p>Experience the story of a common young boy, visit school, fight enemies, find your first love, andimportantly: Conquer the world!</p><p>Welcome, new soul, to the land of Lanthir Lamath! Since you can't have a mortgage, a car lease, orempty credit card here, you can certainly have a bunch of other problems.</p><p>Pixel art topdown RPG adventure made with RPG Maker MV.</p><p><b>THIS IS A DEMO ONLY!</b></p><p><a href="https://llstd.com/rpg-conquer-the-world/">Full game here</a></p><p>As the main hero, you go by the name Jacob. You're an ordinary boy who lives with your parents, goesschool, fights with classmates, and falls in love with the teacher's daughter. Sometimes, you even diea pool of blood while kicking your feet.</p><p>In the game, you'll learn to keep secrets, not trust anyone, and wash your hands after using the toileAnd the most important task? You want to conquer the entire world! Well, at least our village.</p><p>The game contains 8 chapters, several tasks, many sarcastic dialogues, and humorous situations. Youenjoy a lot of pleasant fun.</p>`,
  },
  {
    id: 'freedom-run',
    name: 'Freedom Run',
    developerId: 'charity-games',
    iconUrl: 'https://cdn.charity.games/freedom_run/icons/game-icon.png',
    bannerUrl: 'https://cdn.charity.games/freedom_run/icons/banner.png',
    viewport: viewports['ALL-DEVICES'],
    categories: [
      'ad-free',
      'popular',
      'action',
      'arcade',
      'endless',
      'desktop',
      'mobile',
    ],
    file: {
      type: 'HTML',
      url: 'https://cdn.charity.games/freedom_run/index.html',
    },
    createdAt: new Date('2023-12-11T00:00:00.000Z'),
    updatedAt: new Date('2021-12-11T00:00:00.000Z'),
    markets: {},
    description: `<p>Freedom Run is a one-button endless runner game. The goal of the game is to eat as many veggies as you can and avoid getting hit by birds or falling off the map.</p><h3>How to Play Freedom Run?</h3><p>Playing Freedom Run is easy! Just click or tap the screen to jump, double click or double tap to double jump and if you press and hold you'll stay in the air for much longer.</p><h3>Who created Freedom Run?</h3><p>Freedom Run is a free game created by Charity Games. We are a non-profit organization that creates free games to raise money for charity. We donate 100% of our profits to charity.</p><h3>Can I see the source code for Freedom Run?</h3><p>Sure! all of our games are open source. You can find the source code for Freedom Run on <a href="https://github.com/GGonryun/worksheets.dev/tree/main/construct3/freedom_run">GitHub</a></p>`,
    // credits: `
    // - [Land and Tiles by The Flavre](https://theflavare.itch.io/mondstadt-theme-background-pixel-art)
    // - [Background by Vnitti](https://vnitti.itch.io/grassy-mountains-parallax-background)
    // - [Character by Waters Create](https://waterscreate.itch.io/plastformer-animation-pack)
    // - [Fruits and Veggies by Helm3t](https://helm3t.itch.io/free-32x32-fruits-and-veggies-asset-pack)
    // - [GUI by Prinbles](https://prinbles.itch.io/robin)
    // - [Music by Sonatina](https://sonatina.itch.io/letsadventure)
    // - [Sound Effects by Shapeforms](https://shapeforms.itch.io/shapeforms-audio-free-sfx)
    // - [LPC Birds by bluecarrot16, commissioned by castelonia](https://opengameart.org/content/lpc-birds)`,
  },
  {
    id: 'word-search',
    name: 'Word Search',
    developerId: 'charity-games',
    iconUrl: '/games/word-search/icon.jpg',
    bannerUrl: '/games/word-search/banner.jpg',
    viewport: viewports['ALL-DEVICES'],
    categories: [
      'ad-free',
      'popular',
      'puzzle',
      'word',
      'brain',
      'desktop',
      'mobile',
    ],
    file: {
      type: 'HTML',
      url: WORD_SEARCH_URL,
    },
    createdAt: new Date('2023-10-09T00:00:00.000Z'),
    updatedAt: new Date('2023-11-23T00:00:00.000Z'),
    markets: {},
    description: `<h3></h3><p></p>Word Search is a word puzzle game. The goal of the game is to find all the words hidden in the grid.words may be placed horizontally, vertically, or diagonally. The words may also be placed backwards.<h3>Who created Word Search?</h3><p>The first known word search puzzle was created by Norman E. Gibat in 1968. Gibat was a professormathematics at the University of California, Berkeley. He created the puzzle as a way to help hislearn new vocabulary words.</p><h3>Why play Word Search?</h3><p>Word Search is a great way to improve your vocabulary. It's also a fun way to pass the time. You canit anywhere, anytime. All you need is our website and a device with an internet connection.</p><h3>Controls</h3><ul><li>Swipe your finger across the letters to form words</li></ul>`,
  },
  {
    id: 'feaare',
    name: 'Feaare',
    developerId: 'seredim',
    iconUrl: 'https://cdn.charity.games/seredim/feaare/assets/thumbnail.png',
    bannerUrl: 'https://cdn.charity.games/seredim/feaare/assets/banner.jpg',
    viewport: viewports['MOBILE-PORTRAIT'],
    categories: ['ad-free', 'popular', 'action', 'arcade', 'mobile'],
    file: {
      type: 'HTML',
      url: 'https://cdn.charity.games/seredim/feaare/index.html',
    },
    createdAt: new Date('2023-12-29T00:00:00.000Z'),
    updatedAt: new Date('2023-12-29T00:00:00.000Z'),
    markets: {
      android:
        'https://play.google.com/store/apps/details?id=com.SereDim.Feaare',
      itch: 'https://itch.io/embed/2302991',
    },
    description: `<h3>What is Feaare?</h3><p>The main idea is to give the player not direct control over the game, but through game play elements. player does not see enemies, but sees eyes that look at them.</p><p>Control is performed by clicking on an object in order to move each eye individually and understand where enemy is approximately located and where he is moving, and then move away from the dangerous place and as long as possible. Only 4 eyes. Since invisible enemies are usually unpleasant to play against, I decided make sure that they are always created from one point and the player knows for sure that no one can be him.</p><p>The graphic design is extremely simple - everything is black, only the white eyes are visible. There is story in the game, everything is concentrated on the game play design and its complication, which depends the actions of the player and makes each game unique and addictive.</p><h3>How to Play Feaare?</h3><p>Click on an eye to move it. The goal of the game is to survive as long as possible.</p>`,
  },
  {
    id: 'invention-timeline-game',
    name: 'Time Travel',
    developerId: 'gordo-raba',
    iconUrl:
      'https://cdn.charity.games/invention-timeline-game/assets/thumbnail.png',
    bannerUrl:
      'https://cdn.charity.games/invention-timeline-game/assets/banner.png',
    viewport: viewports['ALL-DEVICES'],
    categories: [
      'ad-free',
      'popular',
      'puzzle',
      'brain',
      'desktop',
      'mobile',
      'educational',
    ],
    file: {
      type: 'HTML',
      url: 'https://timeline-bge.pages.dev/',
    },
    createdAt: new Date('2023-12-20T00:00:00.000Z'),
    updatedAt: new Date('2021-12-20:00:00.000Z'),
    markets: {},
    description: `<p>Embark on a fascinating journey through history! Challenge your knowledge and speed in this exciting quest of invention discovery. Can you score the highest?</p><h3>Objective</h3><p>Players must correctly identify which of two or more presented inventions was invented first.</p><h3>Gameplay Mechanics</h3><p>Time Challenge: Players have a limited time to make their choice in each round, adding an element of speed and pressure.</p><p>Multiple Choices: Each question presents two or more inventions. The player selects the invention they believe is the oldest.</p>`,
  },
  {
    id: 'stick-jump',
    name: 'Stick Jump',
    developerId: 'charity-games',
    iconUrl: 'https://cdn.charity.games/stick-jump/assets/thumbnail.png',
    bannerUrl: 'https://cdn.charity.games/stick-jump/assets/banner.png',
    viewport: viewports['PORTRAIT-ONLY'],
    categories: ['ad-free', 'popular', 'arcade', 'endless', 'mobile'],
    file: {
      type: 'HTML',
      url: 'https://cdn.charity.games/stick-jump/index.html',
    },
    createdAt: new Date('2023-12-20T00:00:00.000Z'),
    updatedAt: new Date('2021-12-20:00:00.000Z'),
    markets: {},
    description: `<p>Stick Jump is an endless arcade game. Jump as high as you can and get the highest score.</p><h3>How to Play Stick Jump?</h3><ul><li>Press the left or right arrow keys to move</li></ul>`,
  },
  {
    id: 'puzzle-words',
    name: 'Puzzle Words',
    developerId: 'charity-games',
    iconUrl: '/games/puzzle-words/icon.jpg',
    bannerUrl: '/games/puzzle-words/banner.jpg',
    viewport: viewports['ALL-DEVICES'],
    categories: [
      'ad-free',
      'puzzle',
      'word',
      'brain',
      'popular',
      'desktop',
      'mobile',
    ],
    file: {
      type: 'HTML',
      url: PUZZLE_WORDS_URL,
    },
    createdAt: new Date('2023-10-07T00:00:00.000Z'),
    updatedAt: new Date('2021-11-23T00:00:00.000Z'),
    markets: {},
    description: `<p>Puzzle Words is a word anagram game. The goal of the game is to find all the valid words that can befrom the given letters.</p><h3>How to Play Puzzle Words?</h3><p>The goal of the game is to find all the valid words that can be made from the given letters. Therehundreds of levels but each one must be beaten in order. The game starts off easy but gets harder asprogress through the levels.</p><ul><li>Swipe your finger across the letters to form words</li><li>Tap the shuffle button to shuffle the letters</li></ul>`,
  },
  {
    id: 'word-smith',
    name: 'Word Smith',
    developerId: 'charity-games',
    iconUrl: '/games/word-smith/icon.jpg',
    bannerUrl: '/games/word-smith/banner.png',
    viewport: viewports['ALL-DEVICES'],
    categories: [
      'ad-free',
      'popular',
      'puzzle',
      'word',
      'brain',
      'desktop',
      'mobile',
    ],
    file: {
      type: 'HTML',
      url: WORD_SMITH_URL,
    },
    createdAt: new Date('2023-10-30T00:00:00.000Z'),
    updatedAt: new Date('2021-11-23T00:00:00.000Z'),
    markets: {},
    description: `<p>Word Smith is a word anagram game. You are given multiple horizontal lines of letters. The goal ofgame is to find the secret word that fits in the vertical line.</p><h3>Why play Word Smith?</h3><p>It'll help make your brain bigger. It's also a fun way to pass the time. You can play it anywhere, anytime.</p><h3>Why should I not play Word Smith?</h3><p>It's addictive. You might get addicted to it and spend all your time playing it instead of doingproductive.</p><h3>Controls</h3><p>A single vertical line appears across the middle of the screen. You must drag the letters up and downform words that fit in the vertical line. The words must be valid English words.</p><ul><li>Swipe your finger across the horizontal lines to form words</li></ul>`,
  },
  {
    id: 'quickbeat',
    name: 'Quick Beat',
    developerId: 'rainboworm',
    iconUrl: 'https://cdn.charity.games/quickbeat/assets/thumbnail.png',
    bannerUrl: 'https://cdn.charity.games/quickbeat/assets/banner.png',
    viewport: viewports['PORTRAIT-ONLY'],
    categories: ['ad-free', 'popular', 'action', 'arcade', 'desktop', 'mobile'],
    file: {
      type: 'HTML',
      url: 'https://cdn.charity.games/quickbeat/index.html',
    },
    createdAt: new Date('2023-12-21T00:00:00.000Z'),
    updatedAt: new Date('2021-12-21T00:00:00.000Z'),
    markets: {
      itch: 'https://itch.io/embed/2380665',
    },
    description: `<p>Quick Beat is a simple rhythm game in which you try to match the letter shown on screen with your keyboard or touchscreen. There's no penalty for not pressing a button so you can play the game at your own pace.</p><h3>How do you play Quick Beat?</h3><p>Either use WASD on your keyboard or the buttons on screen to match the letter displayed. There are more points the bigger the letter is. The game ends when you mess up 3 times.</p>`,
  },
  {
    id: 'hyper-wheel',
    name: 'Hyper Wheel',
    developerId: 'charity-games',
    iconUrl: 'https://cdn.charity.games/hyper-wheel/assets/thumbnail.png',
    bannerUrl: 'https://cdn.charity.games/hyper-wheel/assets/banner.png',
    viewport: viewports['ALL-DEVICES'],
    categories: ['ad-free', 'popular', 'action', 'arcade', 'desktop', 'mobile'],
    file: {
      type: 'HTML',
      url: 'https://cdn.charity.games/hyper-wheel/index.html',
    },
    createdAt: new Date('2023-12-20T00:00:00.000Z'),
    updatedAt: new Date('2021-12-20T00:00:00.000Z'),
    markets: {},
    description:
      '<p>Hyper Wheel is an endless arcade game. The goal of the game is to avoid the obstacles and get the highest score.</p><h3>How to Play Hyper Wheel?</h3><p>Tap on the screen to start spinning in the opposite direction.</p>',
  },
  {
    id: 'nonograms',
    name: 'Nonograms',
    developerId: 'charity-games',
    iconUrl: '/games/nonograms/icon.jpg',
    bannerUrl: '/games/nonograms/banner.png',
    viewport: viewports['ALL-DEVICES'],
    categories: ['ad-free', 'popular', 'puzzle', 'brain', 'desktop', 'mobile'],
    file: {
      type: 'HTML',
      url: NONOGRAMS_URL,
    },
    createdAt: new Date('2023-11-01T00:00:00.000Z'),
    updatedAt: new Date('2021-11-01T00:00:00.000Z'),
    markets: {},
    description:
      '<p>Nonograms, also known as Japanese Crossword puzzles, are a type of puzzle in which the player must fill in the correct squares to reveal a hidden picture. The player is given a grid with numbers along the top and left side. The numbers indicate how many squares in that row or column must be filled in. The player must use logic to figure out which squares to fill in and which to leave blank.</p><h3>Who created Nonograms?</h3><p>Nonograms were created by the Japanese puzzle company Nikoli in 1987. The name "Nonogram" comes from the Japanese words "nō" (meaning "picture") and "gram" (meaning "puzzle").</p><h3>Why play Nonograms?</h3><p>Nonograms are a great way to pass the time. They are also a great way to exercise your brain. They can help improve your memory, concentration, and problem solving skills.</p><h3>Are Nonograms fun?</h3><p>Nonograms are fun if you like puzzles. If you don\'t like puzzles, then you probably won\'t like nonograms.</p><h3>Are Nonograms hard?</h3><p>Nonograms are not very hard. They are easy to learn but hard to master. The puzzles start off easy but get harder as you progress through the levels. There are lots of pictures to unlock so you will never run out of puzzles to solve.</p><h3>Controls</h3><ul><li>Click on the squares to fill them in or remove them</li></ul>',
  },
  {
    id: 'word-pack',
    name: 'Word Pack',
    developerId: 'charity-games',
    iconUrl: '/games/word-pack/icon.jpg',
    bannerUrl: '/games/word-pack/banner.jpg',
    viewport: viewports['ALL-DEVICES'],
    categories: [
      'ad-free',
      'popular',
      'puzzle',
      'word',
      'brain',
      'desktop',
      'mobile',
    ],
    file: {
      type: 'HTML',
      url: WORD_PACK_URL,
    },
    createdAt: new Date('2023-10-21T00:00:00.000Z'),
    updatedAt: new Date('2021-11-23T00:00:00.000Z'),
    markets: {},
    description: `<p>Word Pack is a twist on the classic word search game. The goal of the game is to find all the words hidden in the grid. The words may be placed horizontally, vertically, or diagonally. The words may also be placed backwards. You are given all the words that you need to place. The hard part is figuring out where to place them!</p><h3>Who created Word Pack?</h3><p>No idea. It's a mystery.</p><h3>Is Word Pack hard?</h3><p>Word Pack is not very hard. It's just a little bit tricky. The words are all there, you just have to find them. The game starts off easy but gets harder as you progress through the levels.</p><h3>Controls</h3><ul><li>Click on a word and then click on the grid to place it.</li></ul>`,
  },
  {
    id: 'air-hockey-neon',
    name: 'Air Hockey Neon',
    developerId: 'charity-games',
    iconUrl: 'https://cdn.charity.games/air-hockey-neon/assets/thumbnail.png',
    bannerUrl: 'https://cdn.charity.games/air-hockey-neon/assets/banner.png',
    viewport: viewports['PORTRAIT-ONLY'],
    categories: ['ad-free', 'popular', 'action', 'arcade', 'desktop', 'mobile'],
    file: {
      type: 'HTML',
      url: 'https://cdn.charity.games/air-hockey-neon/index.html',
    },
    createdAt: new Date('2023-12-21T00:00:00.000Z'),
    updatedAt: new Date('2021-12-21T00:00:00.000Z'),
    markets: {},
    description: `<p>Air Hockey Neon is a fast-paced arcade game. The goal of the game is to score 5 points before your opponent does. You can play against the computer.</p><h3>How to Play Air Hockey Neon?</h3><ul><li>Use the mouse to move your paddle</li><li>If you are playing on mobile, use your finger to move your paddle</li></ul>`,
  },
  {
    id: 'solitaire-2048',
    name: 'Solitaire 2048',
    developerId: 'charity-games',
    iconUrl: 'https://cdn.charity.games/solitaire-2048/assets/thumbnail.png',
    bannerUrl: 'https://cdn.charity.games/solitaire-2048/assets/banner.png',
    viewport: viewports['PORTRAIT-ONLY'],
    categories: [
      'ad-free',
      'card',
      'brain',
      'board',
      'puzzle',
      'endless',
      'popular',
      'new',
      'mobile',
    ],
    file: {
      type: 'HTML',
      url: 'https://cdn.charity.games/solitaire-2048/index.html',
    },
    createdAt: new Date('2023-12-21T00:00:00.000Z'),
    updatedAt: new Date('2023-12-21T00:00:00.000Z'),
    markets: {},
    description: `<p>Solitaire 2048 is ultra casual card game. One of Very addictive kind.</p><h3>How to Play Solitaire 2048?</h3><p>Drag and drop the same value card to merge. Use special cards for benifits. Make 2048 to score bonus.</p>`,
  },
  {
    id: 'skwatta',
    name: 'Skwatta',
    developerId: 'seredim',
    iconUrl: 'https://cdn.charity.games/seredim/skwatta/assets/thumbnail.png',
    bannerUrl: 'https://cdn.charity.games/seredim/skwatta/assets/banner.jpg',
    viewport: viewports['MOBILE-PORTRAIT'],
    categories: ['ad-free', 'popular', 'action', 'arcade', 'mobile'],
    file: {
      type: 'HTML',
      url: 'https://cdn.charity.games/seredim/skwatta/index.html',
    },
    createdAt: new Date('2023-12-29T00:00:00.000Z'),
    updatedAt: new Date('2023-12-29T00:00:00.000Z'),
    markets: {
      android:
        'https://play.google.com/store/apps/details?id=com.SereDim.Skwatta',
      itch: 'https://itch.io/embed/2350947',
    },
    description: `<h3>What is Skwatta?</h3><p>The main idea is to make a large army with different types of characters, which automatically grows, and the player only chooses who to place.</p><p>There are only 3 types of troops: warriors, spearmen and archers, each has an advantageous position for attack range, but this is not a key parameter for proper combat. For each situation, it is necessary to choose the right strategy, based on where the enemy will come from, what another type are nearby, the equality of unit types, and the small abilities of the characters.</p><p>The player must only click on one of the three types of troops, which will be installed in a spiral behind the algorithm and create a compact group. Also, for convenience and better results, the player can examine the map to find out where the enemies will come from.</p><p>Very simple design so that as many units as possible are visible on the screen and are distinguishable.</p><p>The difficulty increases extremely quickly and on average one game takes 3 minutes.</p>`,
  },

  ...gameMonetizeGames.map(gameMonetizeConverter),
];
