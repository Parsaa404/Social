import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient();

export const createPost = async (postData: any) => {
  const { content, scheduledAt, userId, socialAccountId } = postData;
  const status = scheduledAt ? 'scheduled' : 'draft';

  const post = await prisma.post.create({
    data: {
      content,
      scheduledAt: scheduledAt ? new Date(scheduledAt) : null,
      status,
      userId,
      socialAccountId,
    },
  });
  return post;
};

export const findScheduledPosts = async () => {
    return prisma.post.findMany({
        where: {
            status: 'scheduled',
            scheduledAt: {
                lte: new Date(),
            },
        },
        include: {
            socialAccount: true,
        },
    });
};

export const updatePostStatus = async (postId: string, status: string) => {
    return prisma.post.update({
        where: { id: postId },
        data: { status },
    });
};

export const getPostsByUserId = async (userId: string) => {
    return prisma.post.findMany({
        where: {
            userId: userId,
        },
        orderBy: {
            createdAt: 'desc',
        },
    });
};
