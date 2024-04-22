import { Link, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { routes } from '@worksheets/routes';
import { HelpMobsQuestions } from '@worksheets/util/enums';
import { ENTRY_PER_DAMAGE } from '@worksheets/util/settings';
import { QuestionAnswer } from '@worksheets/util/types';

export const helpMobs: QuestionAnswer[] = [
  {
    id: HelpMobsQuestions.Description,
    question: 'What are boss fights?',
    summary:
      'Boss fights are global events that allow you to team up with other players to defeat a powerful boss. You can earn rewards by participating in boss fights.',
    answer: (
      <Box>
        Boss fights are global events that allow you to team up with other
        players to defeat a powerful boss. You can earn rewards by participating
        in boss fights.
        <br />
        <br />
        To participate in a boss fight, navigate to the{' '}
        <Link href={routes.battles.path()}>Boss List</Link> and select a boss to
        fight. You can join a boss fight by clicking the "Enter Dungeon" button.
        <br />
        <br />
        Players deal damage to the boss by using their{' '}
        <Link href={routes.help.tokens.path()}>tokens</Link> or combat items.
        The boss has a health bar that decreases as players deal damage. If the
        boss's health reaches zero, the boss is defeated and players earn loot.
        The boss loot is divided into MVP loot and regular loot. The MVP loot is
        given to the player who deals the most damage to the boss or who deals
        the final blow to the boss. The regular loot is randomly distributed
        across all players who participated in the boss fight. Players increase
        their chances of receiving rewards by dealing as much damage to the boss
        as possible. Every {ENTRY_PER_DAMAGE} damage dealt gives you one entry
        into the loot pool.
        <br />
        <br />
        Bosses stay around until they are defeated. There is no time limit to a
        boss fight, so players can take their time to defeat the boss. Some
        bosses have special mechanics that require players to work together to
        defeat the boss. Make sure to read the boss's description to learn about
        any special mechanics.
      </Box>
    ),
  },
  {
    id: HelpMobsQuestions.HowToJoin,
    question: 'How do I join a boss fight?',
    summary:
      'To join a boss fight, navigate to the Boss List and select a boss to fight. You can join a boss fight by clicking the "Enter Dungeon" button.',
    answer: (
      <Box>
        If this is your first time participating in a boss fight, we recommend
        you read the{' '}
        <Link
          href={routes.help.mobs.path({
            bookmark: HelpMobsQuestions.Description,
          })}
        >
          What are boss fights?
        </Link>{' '}
        question to learn more about how boss fights work.
        <br />
        <br />
        To join a boss fight, navigate to the{' '}
        <Link href={routes.battles.path()}>Boss List</Link> and select a boss to
        fight. You can join a boss fight by clicking the "Enter Dungeon" button.
        After you've entered a bosses dungeon you'll be able to see more
        information about the boss, the current fight, participants,
        leaderboards, and the rewards you can earn. It helps to participate in
        as many boss fights as you can, as you can earn{' '}
        <Link href={routes.help.prizes.path()}>rewards</Link> through
        participation, completing{' '}
        <Link href={routes.help.quests.path()}>related quests</Link> and by
        defeating the boss.{' '}
        <Link
          href={routes.help.mobs.path({
            bookmark: HelpMobsQuestions.HowToWin,
          })}
        >
          Learn more defeating bosses here.
        </Link>
        <br />
        <br />
        If you've already joined a boss fight, you can find all of your active
        fights at the top of the{' '}
        <Link href={routes.battles.path()}>Boss List</Link> page.
      </Box>
    ),
  },
  {
    id: HelpMobsQuestions.HowDoIDealDamage,
    question: 'How do I deal damage to a boss?',
    summary:
      "Players deal damage to the boss by using their tokens. The boss has a health bar that decreases as players deal damage. If the boss's health reaches zero, the boss is defeated and players earn loot.",
    answer: (
      <Box>
        Players deal damage to the boss by using their tokens or other items.
        The boss has a health bar that decreases as players deal damage. If the
        boss's health reaches zero, the boss is defeated and players earn loot.
        <br />
        <br />
        <Typography variant="h6" gutterBottom>
          Tokens
        </Typography>
        Tokens are the{' '}
        <Link href={routes.help.tokens.path()}>
          {' '}
          primary currency of the Charity Games platform
        </Link>
        . Tokens can be used to deal damage to a boss. You can earn tokens by
        participating in playing games on our platform, participating in
        raffles, completing quests, and other activities on the platform. You
        can view your token balance on your{' '}
        <Link href={routes.account.quests.path()}>profile</Link> page.
        <br />
        <br />
        <Typography variant="h6" gutterBottom>
          Items
        </Typography>
        Players can find items through boss fights, quests, and other activities
        on the platform. Items can be used to deal damage to a boss or provide
        other benefits during a boss fight. Make sure to read the item's
        description to learn how to use it. The most common items will
        immediately deal damage to a boss when used or provide a bonus damage
        multiplier to your next attack.
        <br />
        <br />
        <Typography variant="h6" gutterBottom>
          Attacking the Boss
        </Typography>
        To use your tokens or items, navigate to the boss fight page and click
        the "Deal Damage" button. You will be allowed to select any items you
        want to include in your attack and the number of tokens you want to use.
        Damage will be calculated for you and shown before you press "Attack".
        <br />
        <br />
        The boss's health will decrease as you deal damage. Make sure to read
        the boss's description to learn about any special mechanics or
        strategies that you need to use to defeat the boss. Some bosses are weak
        to certain types of damage or have special abilities that you need to
        watch out for.
        <br />
        <br />
        <Typography variant="h6" gutterBottom>
          VIP Members
        </Typography>
        <Link href={routes.help.vip.path()}>VIP members</Link> will
        automatically deal more damage to bosses with their tokens and have
        access to exclusive items that can be used during boss fights. VIP
        members can also earn additional tokens and items by participating in
        boss fights and other activities on the platform.
      </Box>
    ),
  },
  {
    id: HelpMobsQuestions.HowToWin,
    question: 'How do I defeat a boss?',
    summary:
      "Players deal damage to the boss by using their tokens. The boss has a health bar that decreases as players deal damage. If the boss's health reaches zero, the boss is defeated and players earn loot.",
    answer: (
      <Box>
        Defeating a boss requires teamwork and sometimes strategy between you
        and other players on the platform. Every player does damage to the boss
        by using their tokens and the boss has a health bar that decreases as
        players deal damage. If the boss's health reaches zero, the boss is
        defeated and players earn loot.
        <br />
        <br />
        <Link
          href={routes.help.mobs.path({
            bookmark: HelpMobsQuestions.HowDoIDealDamage,
          })}
        >
          Learn how to maximize your damage here.
        </Link>
        <br />
        <br />
        <Link href={routes.help.mobs.path({ bookmark: HelpMobsQuestions.MVP })}>
          Learn more about MVP loot here.
        </Link>
      </Box>
    ),
  },
  {
    id: HelpMobsQuestions.MVP,
    question: 'How is the MVP determined in a boss fight?',
    summary:
      'The MVP is the player who deals the most damage to the boss or who deals the final blow to the boss. The MVP loot is given to the player who is the MVP.',
    answer: (
      <Box>
        MVP stands for Most Valuable Player. The MVP is the player who deals the
        most damage to the boss or who deals the final blow to the boss. The MVP
        loot is given to the player who is the MVP. Under the MVP loot section
        of the boss fight page, you can see the current MVP and the MVP loot
        that they will receive.
        <br />
        <br />
        There are rare scenarios where multiple players might be considered the
        MVP. In these cases, the MVP loot will be randomly distributed among the
        players who are considered the MVP.
      </Box>
    ),
  },
  {
    id: HelpMobsQuestions.Rewards,
    question: 'What rewards can I earn from boss fights?',
    summary:
      'Players can earn rewards by participating in boss fights. Rewards include tokens, collectable cards, miscellaneous loot, and real world prizes like gift cards and swag.',
    answer: (
      <Box>
        When a boss is defeated, it will drop all the loot specified on the
        bosses description page. The loot is divided into MVP loot and regular
        loot. The MVP loot is given to the player who deals the most damage to
        the boss or who deals the final blow to the boss. The regular loot is
        randomly distributed across all players who participated in the boss
        fight. Players increase their chances of receiving rewards by dealing as
        much damage to the boss as possible. Every {ENTRY_PER_DAMAGE} damage
        dealt gives you one entry into the loot pool.
        <br />
        <br />
        <Typography variant="h6" gutterBottom>
          MVP Loot
        </Typography>
        MVP Loot is special and usually includes major prizes like gift cards,
        steam keys, merchandise and other valuable items. The player who deals
        the most damage to the boss or who deals the final blow to the boss will
        receive the MVP loot.
        <br />
        <br />
        <Typography variant="h6" gutterBottom>
          Regular Loot
        </Typography>
        Regular loot is randomly distributed across all players who participated
        in the boss fight. Regular loot can include tokens, collectable cards,
        miscellaneous loot, and other items. On rare occasions, regular loot can
        include major prizes like gift cards and merchandise.
        <br />
        <br />
        Dealing more damage to the boss increases your chances of receiving
        rewards.Every {ENTRY_PER_DAMAGE} damage dealt gives you one entry into
        the loot pool. Make sure to read the boss's description to learn about
        the rewards that you can earn from participating in the boss fight.
      </Box>
    ),
  },
];
