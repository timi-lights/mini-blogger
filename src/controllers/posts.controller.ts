import { Request, Response, NextFunction } from 'express';
import { PostService } from '@/services/post.service';
import { Post } from '@/interfaces/post.interface';
import { RequestWithUser } from '@/interfaces/auth.interface';

export class PostController {
  private postService = new PostService();

  public createBlogPost = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const payload: Post = req.body;
      const user = req.user._id;
      const post = await this.postService.createBlogPost({ ...payload, author: user });
      res.status(201).json({ status: 'success', data: post, message: 'Post created sucessfully' });
    } catch (error) {
      next(error);
    }
  };

  public updateBlogPost = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const postId: string = req.params.id;
      const payload: Post = req.body;
      const updatedPost = await this.postService.updateBlogPost(postId, payload);
      res.status(200).json({ status: 'success', data: updatedPost, message: 'Post updated sucessfully' });
    } catch (error) {
      next(error);
    }
  };

  public getAllBlogPosts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const page: number = parseInt(req.query.page as string, 10) || 1;
      const pageSize: number = parseInt(req.query.pageSize as string, 10) || 10;
      const searchQuery: string | undefined = req.query.search as string | undefined;
      const posts: Post[] = await this.postService.getAllBlogPosts(page, pageSize, searchQuery);
      res.status(200).json({ status: 'success', data: posts, message: 'Post fetched sucessfully' });
    } catch (error) {
      next(error);
    }
  };

  public deleteBlogPost = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const postId: string = req.params.id;
      await this.postService.deleteBlogPost(postId);
      res.status(200).json({ status: 'success', data: {}, message: 'Post deleted sucessfully' });
    } catch (error) {
      next(error);
    }
  };
}
