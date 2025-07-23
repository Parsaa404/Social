import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient();

export const getSocialAccountsByUserId = async (userId: string) => {
  return prisma.socialAccount.findMany({
    where: {
      userId: userId,
    },
    select: {
      id: true,
      provider: true,
      username: true,
    },
  });
};
