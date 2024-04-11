import { RaffleId } from '@worksheets/data/raffles';

export type SeedableCode = {
  id: string;
  content: string;
  raffleId?: RaffleId;
};

const rawCodes = [
  {
    id: '5cdb404fc192',
    content:
      'CiQAsEda1/TsADblXC2hz4K+2qzvQJpnO0PU+gIIRQu71tCGAYISQQBNubuaU1Tp9C2NLBAGUe0VzEusLsY7iyBWzW28OCsfBHlVltD4LDFsIoJuoqGVa/ankj3k6rknM5qOgG2YpUna',
    raffleId: 1,
  } as const,
];

export const codes: SeedableCode[] = rawCodes;
