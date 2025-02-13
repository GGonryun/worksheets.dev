import { PrismaClient, PrismaTransactionalClient } from '@worksheets/prisma';
import { isUrl } from '@worksheets/util/strings';

export const convertReferralCode = async ({
  db,
  code,
}: {
  db: PrismaClient | PrismaTransactionalClient;
  code: string;
}) => {
  const referrer = await db.referralCode.findFirst({
    where: {
      code: cleanCode(code),
    },
    select: {
      code: true,
      user: {
        select: {
          id: true,
          username: true,
        },
      },
    },
  });

  return referrer;
};

const cleanCode = (code: string) => {
  // code can be a referral link
  if (isUrl(code)) {
    const sections = code.split('/');
    // last section is the code
    return sections[sections.length - 1];
  }
  return code;
};
