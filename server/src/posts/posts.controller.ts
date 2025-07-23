import { Request, Response } from 'express';
import * as postService from './posts.service';

export const createPost = async (req: Request, res: Response) => {
  try {
    const { content, scheduledAt, socialAccountId } = req.body;
    const userId = (req as any).user.userId;
    const post = await postService.createPost({
      content,
      scheduledAt,
      userId,
      socialAccountId,
    });
    res.status(201).json({ post });
  } catch (error) {
    res.status(500).json({ message: 'Error creating post' });
  }
};

export const getPosts = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user.userId;
        const posts = await postService.getPostsByUserId(userId);
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching posts' });
    }
};
